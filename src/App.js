import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';



function App() {

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedUserMultiple, setSelectedUserMultiple] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //Gestion d'evenement du select simple
  const handleChange = (event) => {
    setSelectedUser(event.target.value);
  };

  //Gestion d'evenement de selection du select multiple
  const handleChangeSelectMultiple = (event) => {
    
  };

  //Gestion d'evenement de deselection du select multiple
  const handleDeselectMultiple = (id) => {
    setSelectedUserMultiple(selectedUserMultiple.filter(selectedId => selectedId !== id));
  };

  useEffect(() => {
    //Appel de l'API
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);//On met les elements dans une liste users
        setLoading(false);//Le loading est fini
      })
      .catch(error => {
        setError(error);//On renvoi l'erreur
        setLoading(false);//Le loading est fini
      });
  }, []);

  return (
    <div>
      <h1>Niveau 1 : Fetch et affichage de base</h1>
      <h2>Sélectionnez un utilisateur :</h2>
      {loading ? (
        <p>Chargement en cours...</p>
      ) : error ? (
        <p>Erreur lors du chargement des données : {error.message}</p>
      ) : (
        <div>
          <select value={selectedUser} onChange={handleChange}>
            <option value="">Sélectionnez un utilisateur</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
      )}
      <h2>Niveau 2 : Sélection multiple</h2>
      <div>
          <select value={selectedUserMultiple} onChange={handleChangeSelectMultiple} multiple>
            <option>Sélectionnez un utilisateur</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
    </div>
  );
}

export default App;
