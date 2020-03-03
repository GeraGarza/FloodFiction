//----- SERVER SIDE -----
const express = require('express');
const cors = require('cors');
const monk = require('monk');
const Filter = require('bad-words');


const app = express();

const db = monk(process.env.MONGO_URI || 'localhost/meower')
db.then(() =>console.log('Connected correctly to server'))

const database = db.get('database');    // mews is a collection inside db
const filter = new Filter();
app.use(cors());


app.listen(5000, () => console.log('listening at 5000'))

app.use(express.json({ limit: '10mb' }));

app.get('/', (req, res) => {


    database
        .find()
        .then(data => {
            res.json(data);
        });
});

app.get('/db', (req, res) => {
    database
        .find()
        .then(database => {
            res.json(database);
        });
});

function isValidTxt(userTxt) {
    return userTxt.name && userTxt.name.toString().trim() !== '' &&
        userTxt.content && userTxt.content.toString().trim() !== '';
}

app.post('/db', (req, res) => {


    console.log(req.body);
    if (isValidTxt(req.body)) {
        //   insert into db..
        const data = {
            name: filter.clean(req.body.name.toString().trim()),
            content: filter.clean(req.body.content.toString().trim()),
            created: new Date()
        };

        database.insert(data)
        .then(dataAdded => {
            res.json(dataAdded);
        });
    } else {
        res.status(422);
        res.json({
            message: 'Hey! no input was typed.'
        });
    }

});

app.delete('/del/:id', function (req, res) {
    var id = req.params.id;
    database.remove({ _id: id })
    res.json({
        message: 'Hey! Deleted.'
    });
})


app.delete('/del', function (req, res) {
    var id = req.params.id;
    database.remove()
    res.json({
        message: 'Hey! Deleted.'
    });
})
