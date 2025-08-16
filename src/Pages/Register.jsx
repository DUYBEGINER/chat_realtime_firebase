import React, { useState } from 'react';
import { Link } from 'react-router';
import { checkAccountExisted } from '../api/RegisterApi';
import { validateSignup } from '../utils/validators';
import { signUpWithEmailPassword } from '../api/authAPI';
import { toast } from "react-toastify";
import Spiner from '../components/Spiner';

function Register(props) {

    const [accountData, setAccountData] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    });
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    // Định nghĩa cấu hình các field
    const fields = [
        { id: "email", type: "email", label: "Email", autoComplete: "email" },
        { id: "username", type: "text", label: "Username" },
        { id: "password", type: showPassword ? "text" : "password", label: "Password", toggle: true },
        { id: "confirmPassword", type: showConfirmPassword ? "text" : "password", label: "Confirm Password", toggle: true }
    ];


  const [errorsInput, setErrorsInput] = useState({});
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountData({
      ...accountData,
      [name]: value
    });
  };

  console.log("errorInput", errorsInput)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorsInput({}); // reset errors each submit
    const { email, password, username } = accountData;
    try {
        const validation = validateSignup(accountData);
        if (!validation.valid) {
            setErrorsInput(validation.errors);
            return;
        }
        // Bật loading
        setLoading(true);

        const AccountExist = await checkAccountExisted(email);
        if (AccountExist) {
            console.log("check")
            toast.error("Tài khoản đã tồn tại!");
            return;
        }

        //Call API Sign up with firebase
        await signUpWithEmailPassword({ email, password, username });

        toast.success("Đăng kí thành công!");
        setTimeout(() => {
            window.location.href = "/";
        }, 1500); // delay cho toast hiện trước khi redire
        } catch (e) {
            console.error("Error checking account existence:", e);
            toast.error("Đã xảy ra lỗi!");
        } finally {
            setLoading(false); // Tắt loading
        }
  };

  return (
    <div className="relative">
      {/* Overlay loading */}
      {loading && (
          <Spiner />
      )}
      
      {/* Form content */}
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
            Đăng kí tài khoản
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
           {fields.map((field) => (
                <div key={field.id}>
                    <label htmlFor={field.id} className="block text-sm/6 font-medium text-gray-100">
                        {field.label}:
                    </label>
                    <div className="mt-2 relative">
                    <input
                        id={field.id}
                        name={field.id}
                        type={field.type}
                        autoComplete={field.autoComplete}
                        onChange={handleChange}
                        required
                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 outline-white/10 
                                placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm/6"
                    />
                    {/* Nút toggle password */}
                    {field.toggle && (
                        <button
                        type="button"
                        onClick={() =>
                            field.id === "password"
                            ? setShowPassword(!showPassword)
                            : setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white text-sm"
                        >
                        {field.id === "password"
                            ? showPassword ? "Ẩn" : "Hiện"
                            : showConfirmPassword ? "Ẩn" : "Hiện"}
                        </button>
                    )}
                    </div>
                    {/* Error message */}
                    {errorsInput[field.id] && (
                        <p className="mt-1 text-xs text-red-500">{errorsInput[field.id]}</p>
                    )}
                </div>
                ))}

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex justify-center bg-indigo-500 text-white px-3 py-1.5 w-full text-sm/6 font-semibold rounded hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-indigo-500"
              >
                {loading ? "Signing up..." : "Sign up"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <p className="text-center text-sm text-gray-100">
              Đã có tài khoản?{' '}
              <Link to="/" className="font-semibold text-indigo-500 hover:text-indigo-400">
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
