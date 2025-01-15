import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axiosInstance from "../constants/config";


const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const qrcodeId = searchParams.get("qrcodeId");


    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const response = await axiosInstance.post("/auth/login", {
          email,
          password,
        });
        const {data} = response;
        if (data.success) {
          if (qrcodeId){
            navigate(`/scanOption?qrcodeId=${qrcodeId}`);
          } else {
            navigate("/admin")
          }
        } else {
          const errorMessage = document.getElementById("errorMessage");
          if (errorMessage) {
            errorMessage.classList.remove("hidden");
          }
        }
      } catch (error) {
        console.error(error);
        const errorMessage = document.getElementById("errorMessage");
        if (errorMessage) {
          errorMessage.classList.remove("hidden");
        }
      }
    };

    return (
      <div className="w-screen h-screen bg-gradient-to-br from-blue-600 to-sky-400 flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md">
          <h1 className="text-3xl font-semibold text-gray-800 text-center">
            Welcome Back
          </h1>
          <p className="text-center text-gray-600 mt-2">
            Log in to your account to continue
          </p>
          <form
            onSubmit={handleSubmit}
           className="grid gap-5 mt-6">
            {/* Email Field */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                className="mt-1 bg-gray-100 p-3 text-black border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="you@example.com"
                type="email"
                name="email"
                id="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* Password Field */}
            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                className="mt-1 bg-gray-100 p-3 text-black border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                type="password"
                name="password"
                id="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* Error Handling Placeholder */}
            <p className="text-red-500 text-sm hidden" id="errorMessage">
              Invalid email or password.
            </p>
            {/* Login Button */}
            <button
              type="submit"
              className="bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default LoginPage;
  