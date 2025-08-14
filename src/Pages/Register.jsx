import React, { useState } from 'react';
import { Link } from 'react-router';
import { addNewAccount, checkAccountExisted } from '../api/RegisterApi';

function Register(props) {
    const [accountData, setAccountData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccountData({
            ...accountData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password, confirmPassword } = accountData;
        if (password !== confirmPassword) {
            window.alert("Passwords do not match!");
            return;
        }
        const AccountExist = await checkAccountExisted(email);
        if (AccountExist) {
            window.alert("Tài khoản đã tồn tại!");
            return;
        }
        await addNewAccount({ email, password });
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                    className="mx-auto h-10 w-auto" />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
                    Sign up for your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className='block text-sm/6 font-medium text-gray-100'>Email:</label>
                        <div className="mt-2">
                            <input
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="email"
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className='block text-sm/6 font-medium text-gray-100'>Password:</label>
                        <div className="mt-2 relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                onChange={handleChange}
                                required
                                className='block rounded-md w-full outline-1 outline-white/10 bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm/6'
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white text-sm"
                            >
                                {showPassword ? "Ẩn" : "Hiện"}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label htmlFor="confirmPassword" className='block text-sm/6 font-medium text-gray-100'>Confirm Password:</label>
                        <div className="mt-2 relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                onChange={handleChange}
                                required
                                className='block rounded-md w-full outline-1 outline-white/10 bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm/6'
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white text-sm"
                            >
                                {showConfirmPassword ? "Ẩn" : "Hiện"}
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <div>
                        <button
                            type="submit"
                            className="flex justify-center bg-indigo-500 text-white px-3 py-1.5 w-full text-sm/6 font-semibold rounded hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-indigo-500"
                        >
                            Login
                        </button>
                    </div>
                </form>

                <div className="mt-6">
                    <p className="text-center text-sm text-gray-100">
                        Have an account?{' '}
                        <Link to="/" className="font-semibold text-indigo-500 hover:text-indigo-400">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
