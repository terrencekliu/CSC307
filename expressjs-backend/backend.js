const express = require('express');
const app = express();
const port = 5001;

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

const cors = require('cors');
app.use(cors());
app.use(express.json());

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

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});   

app.post('/users', (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.status(200).end();
});

function addUser(user){
  users['users_list'].push(user);
}

app.delete('/users', (req, res) => {
  const userToDelete = req.body;
  console.log(userToDelete);
  deleteUser(userToDelete);
  res.status(204).end();
});

function deleteUser(user) {
  users['users_list'] = users['users_list'].filter( (item) => item['id'] !== user['id']);
}