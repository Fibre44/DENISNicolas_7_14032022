import './style/body.sass';
import React, { useState } from 'react';
import { Login } from './components/users/Login'
import { Site } from './components/Site'

export default function App() {

  const [credentials, setCredentials] = useState(null)

  return (
    credentials ? <Site credentials={credentials} onDisconnect={setCredentials} /> : <Login onConnect={setCredentials} />
  );
}
