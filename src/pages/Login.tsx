/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import SHForm from "../components/form/SHForm";
import SHInput from "../components/form/SHInput";
import { auth, googleProvider } from "../firebaseConfig";
import {
  useGoogleMutation,
  useLoginMutation,
} from "../redux/features/auth/authApi";
import { setUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const loginSchema = z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email"),
    password: z.string({ required_error: "Password is required" }),
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [google] = useGoogleMutation();
  const [loading, setLoading] = useState(false); 

  const { reset } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    setLoading(true); 
    try {
      const res = await login(data).unwrap();
      const user = verifyToken(res?.token);
      if (res?.success) {
        dispatch(setUser({ user: user, token: res.token }));
        toast.success(res?.message, { className: "custom-toast" });
        navigate(`/${res?.data?.role}/dashboard`);
      }
    } catch (error: any) {
      toast.error(error.data.message, { className: "custom-toast" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true); 
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userInfo = result.user;
      const token = await userInfo.getIdToken();
      const data = {
        email: userInfo.email,
        name: userInfo.displayName,
        id: token,
        password: userInfo.uid,
      };

      const res = await google(data).unwrap();
      const user = verifyToken(res?.data?.token);
      if (res?.success) {
        dispatch(setUser({ user: user, token: res.data.token }));
        toast.success(res?.message, { className: "custom-toast" });
        navigate(`/${res?.data?.data?.role}/dashboard`);
      }
    } catch (error: any) {
      toast.error(`Google sign-in failed: ${error.message}`, {
        className: "custom-toast",
      });
    } finally {
      setLoading(false); 
    }
  };

  const handleDemoUserLogin = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setLoading(true); 
    reset();
    const demoUserData = {
      email: import.meta.env.VITE_DUMMY_USER,
      password: import.meta.env.VITE_DUMMY_PASS,
    };
    await onSubmit(demoUserData);
  };

  const handleDemoAdminLogin = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setLoading(true); 
    reset();
    const demoAdminData = {
      email: import.meta.env.VITE_DUMMY_ADMIN,
      password: import.meta.env.VITE_DUMMY_PASS,
    };
    await onSubmit(demoAdminData);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex w-full max-w-4xl shadow-lg">
        <div className="hidden md:block w-1/2">
          <img
            src="https://img.freepik.com/free-vector/sign-concept-illustration_114360-5425.jpg"
            alt="Login"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 bg-white p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>

          <SHForm onSubmit={onSubmit} resolver={zodResolver(loginSchema)}>
            <div className="mb-4">
              <SHInput
                type="email"
                name="email"
                placeholder="Enter your email"
                label="Email"
              />
            </div>

            <div className="mb-4 relative">
              <SHInput
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                label="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 bottom-2 transform -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
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
              className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading} 
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <div className="flex items-center justify-center mt-4">
              <span className="text-gray-600">Don't have an account?</span>
              <Link
                to={"/register"}
                className="text-blue-600 hover:underline font-bold ml-2"
              >
                Sign Up
              </Link>
            </div>

            <div className="mt-6">
              <button
                onClick={handleGoogleLogin}
                className={`w-full flex items-center justify-center bg-gray-100 text-gray-700 py-2 rounded-lg border border-gray-300 hover:bg-gray-200 transition duration-200 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading} // Disable button when loading
              >
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/google-logo.png"
                  alt="Google"
                  className="w-5 h-5 mr-2"
                />
                {loading ? "Signing in with Google..." : "Sign in with Google"}
              </button>
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={handleDemoUserLogin}
                className={`w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200 mr-2 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading} 
              >
                {loading ? "Loading..." : "Demo User"}
              </button>
              <button
                onClick={handleDemoAdminLogin}
                className={`w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200 ml-2 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Loading..." : "Demo Admin"}
              </button>
            </div>
          </SHForm>
        </div>
      </div>
    </div>
  );
};

export default Login;
