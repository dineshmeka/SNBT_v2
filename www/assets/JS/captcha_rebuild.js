class CaptchaSystem {
    constructor(canvasId, inputId) {
        this.canvas = document.getElementById(canvasId);
        this.input = document.getElementById(inputId);
        this.ctx = this.canvas.getContext('2d');
        this.currentCaptcha = "";
        this.generateCaptcha();
    }

    generateCaptcha() {
        const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789"; // Removed similar looking chars
        let captcha = "";
        for (let i = 0; i < 6; i++) {
            captcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        this.currentCaptcha = captcha;
    }

    draw() {
        if (!this.canvas) return;
        const w = this.canvas.width;
        const h = this.canvas.height;

        // Background
        this.ctx.fillStyle = "#ffffff";
        this.ctx.fillRect(0, 0, w, h);

        // Grid lines (noise)
        this.ctx.strokeStyle = "#e0e0e0";
        for (let i = 0; i < 10; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(Math.random() * w, Math.random() * h);
            this.ctx.lineTo(Math.random() * w, Math.random() * h);
            this.ctx.stroke();
        }

        // Random dots (noise)
        for (let i = 0; i < 50; i++) {
            this.ctx.fillStyle = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255}, 0.3)`;
            this.ctx.beginPath();
            this.ctx.arc(Math.random() * w, Math.random() * h, 1, 0, 2 * Math.PI);
            this.ctx.fill();
        }

        // Draw Characters
        const charArray = this.currentCaptcha.split("");
        const spacing = w / (charArray.length + 1);
        
        this.ctx.font = "bold 34px 'Courier New', monospace";
        this.ctx.textBaseline = "middle";

        charArray.forEach((char, i) => {
            const x = spacing * (i + 1);
            const y = h / 2 + (Math.random() * 10 - 5);
            const angle = (Math.random() * 40 - 20) * Math.PI / 180;

            this.ctx.save();
            this.ctx.translate(x, y);
            this.ctx.rotate(angle);
            
            // Random color for each character
            this.ctx.fillStyle = `rgb(${Math.random() * 100},${Math.random() * 100},${Math.random() * 100})`;
            this.ctx.fillText(char, -10, 0);
            
            this.ctx.restore();
        });
        
        // Final noise lines
        this.ctx.strokeStyle = "#999";
        this.ctx.lineWidth = 1;
        for (let i = 0; i < 3; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, Math.random() * h);
            this.ctx.bezierCurveTo(w/3, Math.random()*h, 2*w/3, Math.random()*h, w, Math.random()*h);
            this.ctx.stroke();
        }
    }

    refresh() {
        this.generateCaptcha();
        this.draw();
        if (this.input) this.input.value = "";
    }

    validate(userInput) {
        return userInput.trim().toLowerCase() === this.currentCaptcha.toLowerCase();
    }
}
