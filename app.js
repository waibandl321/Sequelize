const express = require('express');
const app = express();
const User = require('./models').User;

app.get('/users', (req, res) => {
    User.findAll().then(users => {
        res.send(users);
    })
});

app.get('/users/:id', async (req, res) => {
    const row = await User.findOne({
        where: {
            id: req.params.id,
        },
    });
    if(row) {
        res.json(row);
    } else {
        res.sendStatus(404);
    }
});

app.post('/users', (req, res) => {
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    .then((user) => {
        res.status(201).json(user);
    })
    .catch((err) => {
        console.log(err);
        res.json(err);
    })
})

app.delete('/users/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        },
    })
    .then(() => {
        res.send('');
    })
    .catch((err) => {
        console.error(err);
        res.json(err);
    });
});


app.listen(3000, () => {
    console.log(`Listening server on port 3000`);
});