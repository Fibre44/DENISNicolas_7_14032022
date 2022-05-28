import './style/body.sass';
import React, { useState, useEffect } from 'react';
import { Login } from './components/users/Login'
import { Site } from './components/Site'
import { getData } from './api/api';

export default function App() {
  const [credentials, setCredentials] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getData('/users/identity')
        const userIdentity = await response.json()
        setCredentials(() => true)
      } catch {
        setCredentials(() => false)
      }
    }
    fetchData();
  }, []);

  //Le cookie est sur httpOnly donc on ne peut pas le récupérer 
  //Solution on va envoyer une requete de test si le status est Ok ca signifie qu'on a bien un cookie sinon on affiche la page de connexion

  return (
    credentials ? <Site credentials={credentials} onDisconnect={setCredentials} /> : <Login onConnect={setCredentials} />
  );
}
