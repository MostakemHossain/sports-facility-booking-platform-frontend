import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { setUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const res = await login(data).unwrap();
    const user = verifyToken(res?.token);
    if (res?.success) {
      dispatch(setUser({ user: user, token: res.token }));
      toast.success(res?.message, {
        className: "custom-toast",
      });
      navigate("/");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex w-full max-w-4xl shadow-lg">
        {/* Left Side - Image */}
        <div className="hidden md:block w-1/2">
          <img
            src="https://img.freepik.com/free-vector/sign-concept-illustration_114360-5425.jpg"
            alt="Login"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 bg-white p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="mb-4 relative">
              <label className="block text-gray-700">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 bottom-2 transform -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="flex justify-between items-center mb-6">
              <a
                href="#"
                className="text-sm font-bold text-blue-600 hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Sign In
            </button>

            <div className="flex items-center justify-center mt-4">
              <span className="text-gray-600">Don't have an account?</span>
              <a
                href="#"
                className="text-blue-600 hover:underline font-bold ml-2"
              >
                Sign Up
              </a>
            </div>

            <div className="mt-6">
              <button className="w-full flex items-center justify-center bg-gray-100 text-gray-700 py-2 rounded-lg border border-gray-300 hover:bg-gray-200 transition duration-200">
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/google-logo.png"
                  alt="Google"
                  className="w-5 h-5 mr-2 "
                />
                Sign in with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
