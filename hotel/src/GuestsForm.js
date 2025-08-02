// src/GuestForm.js
import React, { useState } from 'react';

const GuestForm = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    phone: '',
    email: ''
  });

  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/api/guests', {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const result = await res.json();
    setResponse(result);
  };

  return (
    <div>
      <h2>Add Guest</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="fname" placeholder="First Name" onChange={handleChange} required />
        <input type="text" name="lname" placeholder="Last Name" onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
      {response && (
        <pre>{JSON.stringify(response, null, 2)}</pre>
      )}
    </div>
  );
};

export default GuestForm;
