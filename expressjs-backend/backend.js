const express = require('express');
const app = express();
const port = 5001;
const cors = require('cors');
const e = require('express');

app.use(cors());
app.use(express.json());

const users = { 
  users_list :
  [
     { 
        id : 'xyz789',
        name : 'Charlie',
        job: 'Janitor',
     },
     {
        id : 'abc123', 
        name: 'Mac',
        job: 'Bouncer',
     },
     {
        id : 'ppp222', 
        name: 'Mac',
        job: 'Professor',
     }, 
     {
        id: 'yat999', 
        name: 'Dee',
        job: 'Aspring actress',
     },
     {
        id: 'zap555', 
        name: 'Dennis',
        job: 'Bartender',
     }
  ]
}

app.get('/users/:id', (req, res) => {
  const id = req.params['id']; //or req.params.id
  let result = findUserById(id);
  if (result === undefined || result.length == 0)
      res.status(404).send('Resource not found.');
  else {
      result = {users_list: result};
      res.send(result);
  }
});

app.get('/users', (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  if ((name == undefined) && (job == undefined)){
    res.send(users);
  } else if ((name != undefined) && (job != undefined)) {
    let result = findUserByNameAndJob(name, job);
    result = {users_list: result};
    res.send(result);
  } else if (name != undefined) {
    let result = findUserByName(name);
    result = {users_list: result};
    res.send(result);
  } else {
    let result = findUserByJob(job);
    result = {users_list: result};
    res.send(result);
  }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});   

app.delete('/users', (req, res) => {
  const userToDelete = req.body;
  const found = deleteUser(userToDelete);
  if (found) {
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

app.delete('/users/:id', (req, res) => {
  const id = req.params['id'];
  const found = deleteUser({id: id});
  if (found) {
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

app.post('/users', (req, res) => {
  let user = req.body;
  if (user.id === "" || user.id == undefined) {
    let newid = "";
    do {
      newid = Math.floor(Math.random() * 100000).toString();
    }
    while ((users['users_list'].find((obj) => obj.name === newid)) != undefined);
    user = {id: newid, name: user.name, job: user.job};
  }
  addUser(user);
  res.status(201).send(user).end();
});

function addUser(user){
  users['users_list'].push(user);
}

function deleteUser(user) {
  const sizeBefore = users['users_list'].length;
  users['users_list'] = users['users_list'].filter( (item) => item['id'] !== user['id']);
  const sizeAfter = users['users_list'].length;
  if (sizeBefore === sizeAfter) {
    return false;
  }
  return true;
}

function findUserByNameAndJob(name, job) {
  return users['users_list'].find( (user) => ((user['job'] === job) && (user['name'] === name)));
}

function findUserById(id) {
  return users['users_list'].find( (user) => user['id'] === id); // or line below
  //return users['users_list'].filter( (user) => user['id'] === id);
}

const findUserByName = (name) => { 
  return users['users_list'].filter( (user) => user['name'] === name); 
}

const findUserByJob = (job) => { 
  return users['users_list'].filter( (user) => user['job'] === job); 
}