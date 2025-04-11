import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { server } from "../redux/store";

const schema = yup.object().shape({
    name: yup
        .string()
        .min(5, "Name must be at least 5 characters")
        .max(60, "Name cannot exceed 60 characters")
        .required("Name is required"),
    address: yup
        .string()
        .max(400, "Address cannot exceed 400 characters")
        .required("Address is required"),
    email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(16, "Password cannot exceed 16 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
        .required("Password is required"),
});

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const response = await axios.post(`${server}/api/auth/register`, data);
            setSuccess("Registration successful!");
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
        reset();
    };

    return (
        <div className="flex flex-wrap items-center justify-between gap-[2rem] max-w-full h-screen mx-auto bg-white shadow-md rounded-lg">
            <div className="relative w-full md:w-full lg:w-1/2 h-full">
                <img className="w-full h-full object-cover" src="https://img.freepik.com/free-vector/hotel-booking-concept-flat-style_23-2148167146.jpg?ga=GA1.1.2136706286.1699891344&semt=ais_hybrid&w=740" alt="" />
            </div>

            <div className="w-full sm:w-[70%] lg:w-[40%] mx-auto p-4 bg-white shadow-md rounded-lg">
                <h2 className="text-xl font-bold mb-4">Register</h2>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Name</label>
                        <input
                            type="text"
                            {...register("name")}
                            className="w-full p-2 border rounded"
                        />
                        <p className="text-red-500 text-sm">{errors.name?.message}</p>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            {...register("email")}
                            className="w-full p-2 border rounded"
                        />
                        <p className="text-red-500 text-sm">{errors.email?.message}</p>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password")}
                                className="w-full p-2 border rounded pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-sm text-gray-600"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                        <p className="text-red-500 text-sm">{errors.password?.message}</p>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium">Address</label>
                        <textarea
                            {...register("address")}
                            className="w-full p-2 border rounded"
                        ></textarea>
                        <p className="text-red-500 text-sm">{errors.address?.message}</p>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
            </div>

        </div>
    );
};

export default Signup;
