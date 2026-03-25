let resultContainer = document.getElementById("results-container");
const API_URL = "http://www.snbt.ac.in/api";

let captchaMgr;
function refreshCaptcha() {
    if (captchaMgr) {
        captchaMgr.refresh();
        document.getElementById('captcha-text').innerText = captchaMgr.currentCaptcha;
    }
}

async function submitResultQuery() {
    const ht = document.getElementById("hallticket-input").value.toUpperCase().trim();
    const captchaInput = document.getElementById("captcha-input").value.toLowerCase();

    if (!ht) {
        alert("Please enter Hall Ticket Number");
        return;
    }

    if (captchaMgr && !captchaMgr.validate(captchaInput)) {
        alert("Invalid Captcha! Try again.");
        refreshCaptcha();
        return;
    }

    resultContainer.innerHTML = `<div style="text-align:center; padding:20px;"><i class="fa fa-spinner fa-spin"></i> Fetching results...</div>`;

    // --- Backend Fetch Logic with Fallback ---
    try {
        let studentData = null;
        
        try {
            // Attempt to hit the real backend first
            const response = await fetch(`${API_URL}/students/${ht}`);
            if (response.ok) {
                const data = await response.json();
                if (data.success) studentData = data.student;
            }
        } catch (backendErr) {
            console.warn("Backend unavailable, falling back to static data:", backendErr);
        }

        // If backend failed or didn't return data, try static data file
        if (!studentData) {
            try {
                // Fetching from the root data folder (../data from Results/ folder)
                const staticResponse = await fetch('../data/students.json');
                const staticData = await staticResponse.json();
                studentData = staticData.students[ht];
            } catch (staticErr) {
                console.error("Static data fetch failed:", staticErr);
            }
        }

        if (studentData) {
            renderFormalReport(ht, studentData);
        } else {
            resultContainer.innerHTML = `
                <div class="warning-box" style="background: #fff3cd; color: #856404; padding: 20px; border-radius: 8px; border: 1px solid #ffeeba; margin-top: 20px; text-align: center;">
                    <i class="fa fa-exclamation-triangle"></i> No results found for <strong>${ht}</strong>.<br>
                    Please check the number and try again.
                </div>
            `;
        }
    } catch (err) {
        console.error("Critical Error:", err);
        alert("An error occurred while fetching results. Please try again later.");
    }
}

function renderFormalReport(ht, student) {
    let marksHtml = "";
    // Note: backend uses 'results' (lowercase) instead of 'SUBJECTS'
    const subjects = student.results || student.SUBJECTS || [];
    
    subjects.forEach(s => {
        marksHtml += `<tr><td>${s.code}</td><td>${s.marks}</td></tr>`;
    });

    resultContainer.innerHTML = `
        <div class="formal-report">
            <div class="report-top-bar"></div>
            <table class="report-table">
                <tr><td class="label-cell">Hall Ticket Number :</td><td><strong>${ht}</strong></td></tr>
                <tr><td class="label-cell">Student Name :</td><td>${student.name || student.NAME}</td></tr>
                <tr><td class="label-cell">Father Name :</td><td>${student.father || student.FATHER}</td></tr>
                <tr><td class="label-cell">COURSE :</td><td>${student.course || student.COURSE}</td></tr>
                <tr><td class="label-cell">Object Code :</td><td>${student.objectCode || student.OBJECT_CODE || ''}</td></tr>
            </table>

            <div class="marks-section">
                <table class="marks-inner-table">
                    <thead>
                        <tr><th>Subject Code</th><th>Marks Obtained</th></tr>
                    </thead>
                    <tbody>
                        ${marksHtml}
                    </tbody>
                </table>
            </div>

            <table class="report-table">
                <tr><td class="label-cell">Remarks</td><td></td></tr>
                <tr><td class="label-cell">Remark 1</td><td></td></tr>
                <tr><td class="label-cell">RT Flag</td><td>0</td></tr>
            </table>
        </div>
        <div class="report-footer">
            <a href="javascript:void(0)" onclick="window.print()">Print result</a>
            <a href="javascript:void(0)" onclick="location.reload()">Back</a>
        </div>
    `;

    // Scroll to results
    resultContainer.scrollIntoView({ behavior: 'smooth' });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    captchaMgr = new CaptchaSystem('captcha-canvas', 'captcha-input');
    refreshCaptcha();

    // Add click to refresh on canvas
    const canvas = document.getElementById('captcha-canvas');
    if (canvas) {
        canvas.addEventListener('click', () => {
            refreshCaptcha();
        });
    }
});