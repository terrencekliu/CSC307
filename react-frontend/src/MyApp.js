import React, {useState, useEffect} from 'react';
import Table from './Table';
import Form from './Form';
import axios from 'axios';


function MyApp() {
  const [characters, setCharacters] = useState([]);

  async function fetchAll(){
    try {
      const response = await axios.get('http://localhost:5001/users');
      return response.data.users_list;     
    }
    catch (error){
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
      return response;
    }
    catch (error) {
       console.log(error);
       return false;
    }
  }

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
    const response = makePostCall(person);
    response.then( result => {
      if (result && result.status === 201)
        setCharacters([...characters, result.data] );
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