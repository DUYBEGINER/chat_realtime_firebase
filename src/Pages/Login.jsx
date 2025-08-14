import React, {useState} from 'react';
import {login} from '../api/LoginApi';
import { useNavigate } from 'react-router';
import { Link } from 'react-router';
function Login(props) {
     const [accountData, setAccountData] = useState({
            email: "",
            password: "",
        });
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccountData({
            ...accountData,
            [name]: value
        });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = accountData;
        const loginData = await login( email, password );
        if (loginData) {
            navigate("/appchat", { state: { user: loginData } });
        }else{
            window.alert("Tên đăng nhập hoặc mật khẩu không đúng!");
        }
       
    }


    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
             {/* Logo Tailwind */}
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" class="mx-auto h-10 w-auto" />
                <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form action="#" className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className='block text-sm/6 font-medium text-gray-100'>Username:</label>
                        <div class="mt-2">
                            <input onChange={(e)=>handleChange(e)} id="email" type="email" name="email" required autocomplete="email" class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className='block text-sm/6 font-medium text-gray-100'>Password:</label>
                        <div className="mt-2">
                            <input  onChange={(e)=>handleChange(e)} type="password" id="password" name="password" required className='block rounded-md w-full  outline-1  -outline-1 outline-white/10 bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6' />
                        </div>
                    </div>
                
                    <div>
                        <button type="submit" className="flex justify-center bg-indigo-500 text-white px-3 py-1.5 w-full text-sm/6 font-semibold rounded hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Login</button>
                    </div>
                </form>
                <div className="mt-6">
                    <p className="text-center text-sm text-gray-100">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-semibold text-indigo-500 hover:text-indigo-400">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
            
        </div>
    );
}

export default Login;