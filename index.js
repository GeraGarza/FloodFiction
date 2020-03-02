//  npm init to make package folder
//  npm install express 
//  makes node_models folder which has all dependencies of express
//  npm install nedb ; this is for the db https://github.com/louischatriot/nedb
//  npm install -g nodemon // this will let the server rebuild ever time its updated
//  npm install jquery,popper, then bootstrap
//  https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch 
//  https://expressjs.com/en/4x/api.html#express routing,getting,posting,etc.

//  npm install grunt --save-dev
//  npm install -g grunt-cli 
//  npm install grunt-bake --save-dev   // https://www.npmjs.com/package/grunt-bake/v/0.0.11
//  npm install grunt-contrib-watch --save-dev


//  npm install w3 -g

//----- SERVER SIDE -----
const express = require('express');
const Datastore = require('nedb')
const app = express();

//  port we arent using , callback
app.listen(3000, () => console.log('listening at 3000'))
app.use(express.static('public'))

const database = new Datastore('database.db');
database.loadDatabase();
// database.insert({name:"Garza", status: '😁'})


app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        response.json(data);
    })
})

//  client to send data to me;  callback(es6 js), \
//  fnc erq holds data being sent, response is used to send to client
// recieve post from client's api route.
app.use(express.json({ limit: '10mb' }));
app.post('/api', (request, response) => {
    const data = request.body
    const timestamp = Date.now();
    data.timestamp = timestamp
    data.status = '😁';
    database.insert(data)
    response.json(data)
    response.end();
});



app.delete('/del/:id', function (req, res) {


    database.remove({ _id: req.params.id }, {}, function (err, numRemoved) {
        // numRemoved = 1
    });


})
