const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));

// Data storage
let assignments = [
    { id: 1, title: 'Math Problem Set', subject: 'Math', dueDate: '2026-06-01', status: 'Pending' },
    { id: 2, title: 'Biology Lab Report', subject: 'Biology', dueDate: '2026-06-03', status: 'Pending' },
];

// Routes
app.get('/', (req, res) => {
    res.render('index', { assignments });
});

app.get('/add', (req, res) => {
    res.render('addAssignment');
});

app.post('/add', (req, res) => {
    const { title, subject, dueDate } = req.body;
    const newAssignment = { id: Date.now(), title, subject, dueDate, status: 'Pending' };
    assignments.push(newAssignment);
    res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
    const assignment = assignments.find(a => a.id == req.params.id);
    if (!assignment) return res.redirect('/');
    res.render('editAssignment', { assignment });
});

app.post('/edit/:id', (req, res) => {
    const assignment = assignments.find(a => a.id == req.params.id);
    if (assignment) {
        assignment.title = req.body.title;
        assignment.subject = req.body.subject;
        assignment.dueDate = req.body.dueDate;
        assignment.status = req.body.status;
    }
    res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
    assignments = assignments.filter(a => a.id != req.params.id);
    res.redirect('/');
});

app.listen(3000, () => console.log('Study Tracker running on http://localhost:3000'));