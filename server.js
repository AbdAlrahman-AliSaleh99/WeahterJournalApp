let projectData = {};

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

app.use(express.static('website'));

const port = 5045;
app.listen(port, () => {
    console.log(`Server running on localhost: ${port}`);
});

app.get('/all', (req, res) => {
    res.send(projectData);
});

app.post('/add', (req, res) => {
    const { temperature, date, userResponse } = req.body;
    projectData = { temperature, date, userResponse };
    res.send({ message: 'Data added successfully', projectData });
});
