import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ComposeEmail from './ComposeEmail';

function Dashboard({ user }) {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/emails')
      .then(res => setEmails(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Welcome, {user.name}</h2>
      <ComposeEmail />
      <h3 className="text-xl font-semibold mt-6 mb-2">Communication History</h3>
      <ul className="space-y-2">
        {emails.map((email, i) => (
          <li key={i} className="p-3 bg-gray-100 rounded shadow-sm">
            <strong>{email.subject}</strong> to {email.to}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
