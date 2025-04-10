import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

axios.defaults.withCredentials = true;

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  const [user, setUser] = useState(null);
  }, [user]);
  
  const token = localStorage.getItem("token") || null
  return (
    <div className="p-4 font-sans">
      {token ? <Dashboard user={user} /> : <Login setUser = {setUser} />}
    </div>
  );
}

export default App;
