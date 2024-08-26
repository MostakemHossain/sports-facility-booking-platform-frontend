import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useRegisterAUserMutation } from "../redux/features/auth/authApi";

// Define the types for form data
interface FormData {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [registerAUser] = useRegisterAUserMutation();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await registerAUser(data);
      if (res.data.success) {
        toast.success(res?.data?.message, {
          className: "custom-toast",
        });
        navigate("/login");
      }
    } catch (error: any) {
      toast.error(error.data.message, {
        className: "custom-toast",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg max-w-4xl w-full gap-2">
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://img.freepik.com/free-vector/sign-concept-illustration_114360-5425.jpg"
            alt="Register"
            className="object-cover w-full h-full rounded-l-lg"
          />
        </div>

        {/* Right Side Form */}
        <div className="md:w-1/2 p-6">
          <h2 className="text-4xl font-bold mb-6 text-center">Register</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                placeholder="Mr. John"
                {...register("name", { required: "Name is required" })}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                placeholder="john@gmail.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 top-1/2 transform -translate-y-1/2 text-gray-600 focus:outline-none"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Phone</label>
              <input
                type="text"
                placeholder="+88018-496322"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^\d{11}$/,
                    message: "Invalid phone number",
                  },
                })}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700">Address</label>
              <input
                type="text"
                placeholder="Dhaka"
                {...register("address", { required: "Address is required" })}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
              Register
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Sign in
              </Link>
            </p>
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
        </div>
      </div>
    </div>
  );
};

export default Register;
