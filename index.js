require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT;
const host = '127.0.0.1';

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome, everything is working well'})
});

app.use('/users', require('./routes/users.routes.js'));
app.use('/attractions', require('./routes/attractions.routes.js'));
app.use('/badges', require('./routes/badges.routes.js'));
app.use('/categories', require('./routes/categories.routes.js'));
app.use('/login', require('./routes/login.routes.js'));

app.get('*', (req, res) =>{
    res.status(404).json({ message: 'Could not find a page'})
});

app.listen(port, () => console.log(`App listening at http://${host}:${port}/`));