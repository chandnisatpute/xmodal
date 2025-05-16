import React, { useState, useEffect, useRef } from 'react';
import './XModal.css';

export default function XModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    dob: '',
  });

  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
        resetForm();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const resetForm = () => {
    setFormData({
      username: '',
      email: '',
      phone: '',
      dob: '',
    });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, phone, dob } = formData;

    if (!username || !email || !phone || !dob) {
      alert(`Please fill out the ${!username ? 'Username' : !email ? 'Email' : !phone ? 'Phone Number' : 'Date of Birth'} field.`);
      return;
    }

    if (!email.includes('@')) {
      alert("Invalid email. Please check your email address.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    const dobDate = new Date(dob);
    const today = new Date();
    if (dobDate > today) {
      alert("Invalid Date of Birth. Date of Birth cannot be in the future.");
      return;
    }

    // Success
    setIsOpen(false);
    resetForm();
  };

  return (
    <div className="modal">
      <button onClick={() => setIsOpen(true)}>Open Form</button>

      {isOpen && (
        <div className="modal">
          <div className="modal-content" ref={modalRef}>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Username:</label>
                <input id="username" value={formData.username} onChange={handleChange} />
              </div>
              <div>
                <label>Email:</label>
                <input id="email" value={formData.email} onChange={handleChange} />
              </div>
              <div>
                <label>Phone Number:</label>
                <input id="phone" value={formData.phone} onChange={handleChange} />
              </div>
              <div>
                <label>Date of Birth:</label>
                <input id="dob" type="date" value={formData.dob} onChange={handleChange} />
              </div>
              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
