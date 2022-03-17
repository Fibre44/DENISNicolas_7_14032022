import './style/body.sass';
import React, { useState, useEffect } from 'react';
import { Login } from './components/Login'
import { Site } from './components/Site'

export default function App() {
  const [tocken, setTocken] = useState(null)

  return (
    tocken ? <Site /> : <Login />
  );
}
