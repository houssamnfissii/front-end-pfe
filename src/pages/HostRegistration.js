import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterHosterForm = ({ setIsModalOpen,toggleForm }) => {
    const [formData, setFormData] = useState({
      email: '',
        password: '',
        first_name: '',
        last_name: '',
        company_name: '',
        telephone: '8182881281',
        birth_date: '',
        address: '',
        CIN: ''
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/host/registerH', formData);
        console.log(response.data);
        // Handle success response
        navigate('/home');
        // Open the modal after navigating to home page
        setIsModalOpen(true);
        toggleForm(true)
    } catch (error) {
        console.error('Error:', error);
        // Handle error response
    }
    console.log(formData);
};
  

    return (
        <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px] bg-white">
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="password" className="mb-3 block text-base font-medium text-[#07074D]">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="firstName" className="mb-3 block text-base font-medium text-[#07074D]">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="first_name"
                            id="first_name"
                            placeholder="Enter your first name"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            defaultValue={formData.first_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="lastName" className="mb-3 block text-base font-medium text-[#07074D]">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="last_name"
                            id="last_name"
                            placeholder="Enter your last name"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            defaultValue={formData.last_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="companyName" className="mb-3 block text-base font-medium text-[#07074D]">
                            Company Name
                        </label>
                        <input
                            type="text"
                            name="company_name"
                            id="company_name"
                            placeholder="Enter your company name"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            defaultValue={formData.company_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="birth_date" className="mb-3 block text-base font-medium text-[#07074D]">
                            Birth Date
                        </label>
                        <input
                            type="date"
                            name="birth_date"
                            id="birth_date"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            defaultValue={formData.birth_date}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="address" className="mb-3 block text-base font-medium text-[#07074D]">
                            Address
                        </label>
                        <input
                            type="text"
                            name="address"
                            id="address"
                            placeholder="Enter your address"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            defaultValue={formData.address}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="CIN" className="mb-3 block text-base font-medium text-[#07074D]">
                            CIN (Customer Identification Number)
                        </label>
                        <input
                            type="text"
                            name="CIN"
                            id="CIN"
                            placeholder="Enter your CIN"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            defaultValue={formData.CIN}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterHosterForm;
