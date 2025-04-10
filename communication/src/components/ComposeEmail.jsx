import React, { useState } from 'react';
import axios from 'axios';

function ComposeEmail() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/emails/send', { to, subject, body })
      .then(() => alert('Email sent!'))
      .catch(() => alert('Failed to send'));
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-2">
      <input
        type="email"
        placeholder="Recipient"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="border p-2 w-full rounded"
        required
      />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="border p-2 w-full rounded"
        required
      />
      <textarea
        placeholder="Email Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="border p-2 w-full rounded"
        rows={4}
        required
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Send Email
      </button>
    </form>
  );
}

export default ComposeEmail;
