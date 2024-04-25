// Register.js
import React, { useState } from 'react';

const Register = ({ toggleModal, toggleForm }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    // Here you can implement the logic to submit the registration details
    console.log('Registering with:', firstName, lastName, email, password, confirmPassword, birthDate);
    // After successful registration, you can close the modal
    toggleModal();
  };

  return (
    <>
      <h3 className="text-xl font-semibold mb-4">Create an account</h3>
      <form onSubmit={handleRegister}>
        {/* First Name Input */}
        <div className="mb-4">
          <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</label>
          <input type="text" id="first_name" name="first_name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="mt-1 p-3 w-full border rounded-lg" required />
        </div>
        {/* Last Name Input */}
        <div className="mb-4">
          <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</label>
          <input type="text" id="last_name" name="last_name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="mt-1 p-3 w-full border rounded-lg" required />
        </div>
        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your email</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 p-3 w-full border rounded-lg" placeholder="name@company.com" required />
        </div>
        {/* Birth Date Input */}
        <div className="mb-4">
          <label htmlFor="birth_date" className="block text-sm font-medium text-gray-700">Your birth date</label>
          <input type="date" id="birth_date" name="birth_date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="mt-1 p-3 w-full border rounded-lg" required />
        </div>
        {/* Password Input */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Your password</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 p-3 w-full border rounded-lg" placeholder="••••••••" required />
        </div>
        {/* Confirm Password Input */}
        <div className="mb-4">
          <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">Confirm password</label>
          <input type="password" id="confirm_password" name="confirm_password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-1 p-3 w-full border rounded-lg" placeholder="••••••••" required />
        </div>
        {/* Register Button */}
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-600">Register</button>
          <a href="#" className="text-sm text-blue-600 hover:underline" onClick={toggleForm}>Already have an account?</a>
        </div>
      </form>
    </>
  );
}

export default Register;
