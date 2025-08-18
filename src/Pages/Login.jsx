import React, { useState } from "react";
import { login } from "../services/LoginApi";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { loginEmailPassword, loginWithFacebook} from "../services/authAPI"; // Import the login function
import { toast } from "react-toastify";
import { addDocument, generateKeywords } from "../services/firestoreService";

function Login(props) {
  const navigate = useNavigate();
  const [accountData, setAccountData] = useState({
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountData({
      ...accountData,
      [name]: value,
    });
  };

  //LOGIN WITH FACEBOOK
  const handle_Fblogin = async () => {
     try {
      const { user, additionalUserInfo } = await loginWithFacebook();

      if (additionalUserInfo?.isNewUser) {
        addDocument("accounts", {
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL,
          displayName: user.displayName,
          provider: additionalUserInfo.providerId,
          keywords: generateKeywords(user.displayName),
        });
      }
      toast.success("Đăng nhập thành công");
    } catch (error) {
      toast.error("Đăng nhập bằng Facebook thất bại!");
    }
  };

  //LOGIN WITH EMAIL AND PASSWORD
  const handle_LoginWithEmailAndPassword = async (e) => {
    e.preventDefault();
    const { email, password } = accountData;
    try {
      const user = await loginEmailPassword(email, password);
      console.log({ user });
      if (user) {
        navigate("/appchat", { state: { user: user } });
      }
    } catch (e) {
      toast.error("Tên đăng nhập hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      {/* Logo Tailwind */}
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
          alt="Your Company"
          class="mx-auto h-10 w-auto"
        />
        <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
          Đăng nhập vào AppChat
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          action="#"
          className="space-y-6"
          onSubmit={handle_LoginWithEmailAndPassword}
        >
          <div>
            <label
              htmlFor="username"
              className="block text-sm/6 font-medium text-gray-100"
            >
              Username:
            </label>
            <div class="mt-2">
              <input
                onChange={(e) => handleChange(e)}
                id="email"
                type="email"
                name="email"
                required
                autocomplete="email"
                class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm/6 font-medium text-gray-100"
            >
              Password:
            </label>
            <div className="mt-2">
              <input
                onChange={(e) => handleChange(e)}
                type="password"
                id="password"
                name="password"
                required
                className="block rounded-md w-full  outline-1  -outline-1 outline-white/10 bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              onClick={handle_Fblogin}
              className="w-full px-3 py-1.5 border border-blue-600 text-blue-500 hover:bg-blue-500 hover:text-white"
            >
              Facebook Login
            </button>
          </div>
          <div>
            <button
              type="submit"
              className="flex justify-center bg-indigo-500 text-white px-3 py-1.5 w-full text-sm/6 font-semibold rounded hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-6">
          <p className="text-center text-sm text-gray-100">
            Chưa có tài khoản?{" "}
            <Link
              to="/register"
              className="font-semibold text-indigo-500 hover:text-indigo-400"
            >
              Đăng kí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
