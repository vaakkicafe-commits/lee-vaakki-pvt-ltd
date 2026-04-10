import React, { useState } from 'react';

const AIChat: React.FC = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    alert(message);
    setMessage('');
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Lee Vaakki Pvt Ltd</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          style={{ padding: 10, width: 300 }}
        />
        <button type="submit" style={{ marginLeft: 8, padding: '10px 16px' }}>
          Send
        </button>
      </form>
    </div>
  );
};

export default AIChat;
