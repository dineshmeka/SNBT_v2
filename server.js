const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 80;
const DATA_FILE = path.join(__dirname, 'data', 'students.json');

app.use(cors());
app.use(bodyParser.json());

// Helper to read data
const readData = () => {
    try {
        if (!fs.existsSync(DATA_FILE)) {
            // Create default structure if file missing
            const defaultData = { students: {} };
            fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2));
            return defaultData;
        }
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading data file:", err);
        return { students: {} };
    }
};

// Helper to write data 
const writeData = (data) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Error writing data file:", err);
    }
};

// Routes
app.get('/', (req, res) => {
    res.json({ status: 'online', message: 'SNBT Backend Server is running', port: PORT });
});

app.get('/api/students/:ht', (req, res) => {
    const ht = req.params.ht.toUpperCase();
    const data = readData();
    const student = data.students[ht];
    
    if (student) {
        res.json({ success: true, student });
    } else {
        res.status(404).json({ success: false, message: 'Student record not found' });
    }
});

app.post('/api/students/:ht/marks', (req, res) => {
    const ht = req.params.ht.toUpperCase();
    const newMarks = req.body.marks; // Array of marks
    const data = readData();
    
    if (data.students[ht]) {
        // Here we could update the results or a separate assessment field
        // For now, we'll store assessment marks separately in the student object
        data.students[ht].assessment = newMarks;
        writeData(data);
        res.json({ success: true, message: 'Marks saved successfully' });
    } else {
        res.status(404).json({ success: false, message: 'Student not found' });
    }
});

// Serve frontend files (optional but good for local dev)
app.use(express.static(path.join(__dirname, '.')));

app.listen(PORT, () => {
    console.log(`Server running at http://www.snbt.ac.in`);
    console.log(`Local fallback: http://localhost:${PORT}`);
});
