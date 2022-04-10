import React, {useState, useEffect} from 'react';
import Table from './Table';
import Form from './Form';
import axios from 'axios';


function MyApp() {
  async function fetchAll(){
    try {
       const response = await axios.get('http://localhost:5001/users');
       return response.data.users_list;     
    }
    catch (error){
       //We're not handling errors. Just logging into the console.
       console.log(error); 
       return false;         
    }
  }

  async function makeDeleteCall(person){
    try {
      const response = await axios.delete('http://localhost:5001/users/' + person.id);
      return response;
    }
    catch (error){
      console.log(error); 
      return false;
    }
  }

  async function makePostCall(person){
    try {
      const response = await axios.post('http://localhost:5001/users', person);
      return response.data;
    }
    catch (error) {
       console.log(error);
       return false;
    }
  }

  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    makeDeleteCall(characters[index]).then(result => {
      if (result.status === 204) {
        const updated = characters.filter((character, i) => {
          return i !== index
        });
        setCharacters(updated);
      }
    })
  }

 function updateList(person) { 
  makePostCall(person).then( result => {
  if (result && result.status === 201)
     setCharacters([...characters, person] );
  });
 }

useEffect(() => {
  fetchAll().then( result => {
     if (result)
        setCharacters(result);
   });
}, [] );

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  )
}

export default MyApp;