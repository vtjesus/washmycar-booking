import { useSignUpMutation } from "@/redux/api/authApi";
import {
  setAddress,
  setEmail,
  setName,
  setPassword,
  setPhone,
} from "@/redux/features/signupSlice";
import { useAppDispatch } from "@/redux/hooks";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [signUp] = useSignUpMutation();
  type Inputs = {
    name: string;
    email: string;
    address: string;
    password: string;
    phone: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const signUpInfo = {
      name: data.name,
      email: data.email,
      address: data.address,
      phone: data.phone,
      password: data.password,
    };

    try {
      const user = await signUp(signUpInfo);
      const err = user?.error as { data?: { message?: string } };

      if (err?.data?.message === "User already exists") {
        toast.error("User already exists");
      } else {
        toast.success("User Sign Up Successfully");
        navigate("/login"); // Redirect to login on success
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#30415A] via-[#3D6D8D] to-[#4A9BB5]">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-[#30415A]">
          Sign Up
        </h2>
        <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: true })}
              onChange={(e) => dispatch(setName(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#30415A] focus:border-[#30415A] sm:text-sm"
            />
            {errors.name && <p className="text-red-500">Name is required</p>}
          </div>
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              onChange={(e) => dispatch(setEmail(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#30415A] focus:border-[#30415A] sm:text-sm"
            />
            {errors.email && <p className="text-red-500">Email is required</p>}
          </div>
          {/* Address Input */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              {...register("address", { required: true })}
              onChange={(e) => dispatch(setAddress(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#30415A] focus:border-[#30415A] sm:text-sm"
            />
            {errors.address && (
              <p className="text-red-500">Address is required</p>
            )}
          </div>
          {/* Phone Input */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              {...register("phone", { required: true })}
              onChange={(e) => dispatch(setPhone(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#30415A] focus:border-[#30415A] sm:text-sm"
            />
            {errors.phone && <p className="text-red-500">Phone is required</p>}
          </div>
          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              onChange={(e) => dispatch(setPassword(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#30415A] focus:border-[#30415A] sm:text-sm"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#30415A] hover:bg-[#3D6D8D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4A9BB5]"
            >
              Register
            </button>
          </div>
        </form>
        {/* Redirect to Login */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-[#30415A] hover:text-[#3D6D8D]"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
