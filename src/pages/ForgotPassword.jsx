import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const schema = yup.object().shape({
    email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
});

const ForgotPassword = () => {
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
            const response = await axios.post(" http://localhost:3001/api/auth/forgot-passowrd", data);
            setSuccess("Email sent successfully!");
            console.log(response)
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
        reset();
    };

    return (
        <div className="flex flex-wrap items-center justify-between gap-[2rem] max-w-full h-screen mx-auto bg-white shadow-md rounded-lg">
            <div className="relative md:w-1/2 lg:w-1/2 h-full">
                <img className="w-full h-full" src="https://plus.unsplash.com/premium_photo-1683134474181-8b88c82b6aa8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c3RvcmVzJTIwcmF0aW5nfGVufDB8fDB8fHww" alt="" />
            </div>

            <div className="w-[70%] sm:w-[40%] lg:w-[40%] mx-auto p-4 bg-white shadow-md rounded-lg">
                <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            {...register("email")}
                            className="w-full p-2 border rounded"
                        />
                        <p className="text-red-500 text-sm">{errors.email?.message}</p>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword