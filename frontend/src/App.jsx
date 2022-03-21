import './style/body.sass';
import React, { useState } from 'react';
import { Login } from './components/users/Login'
import { Site } from './components/Site'

export default function App() {
  const [token, setToken] = useState(null)

  return (
    token ? <Site /> : <Login onConnect={setToken} />
  );
}
