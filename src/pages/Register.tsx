import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import SHForm from "../components/form/SHForm";
import SHInput from "../components/form/SHInput";
import { useRegisterAUserMutation } from "../redux/features/auth/authApi";

interface FormData {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}

const Register = () => {
  const registerSchema = z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    email: z.string({
      required_error: "Email is required",
    }),
    password: z.string({
      required_error: "Password is required",
    }),
    phone: z.string({
      required_error: "Phone is required",
    }),
    address: z.string({
      required_error: "Address is required",
    }),
  });
  const navigate = useNavigate();
  const [registerAUser] = useRegisterAUserMutation();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit = async (data: FormData) => {
    try {
      const res = await registerAUser(data).unwrap();
      if (res.success) {
        toast.success(res.message, {
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

          <SHForm onSubmit={onSubmit} resolver={zodResolver(registerSchema)}>
            <div className="mb-4">
              <SHInput
                type="text"
                name="name"
                placeholder="Mr. John"
                label="Name"
              />
            </div>

            <div className="mb-4">
              <SHInput
                type="email"
                name="email"
                placeholder="john@gmail.com"
                label="Email"
              />
            </div>

            <div className="mb-4 relative">
              <SHInput
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="********"
                label="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-4 top-12 transform -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="mb-4">
              <SHInput
                type="text"
                name="phone"
                placeholder="+88018-496322"
                label="Phone"
              />
            </div>

            <div className="mb-6">
              <SHInput
                type="text"
                name="address"
                placeholder="Dhaka"
                label="Address"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
              Register
            </button>
          </SHForm>

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
                className="w-5 h-5 mr-2"
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
