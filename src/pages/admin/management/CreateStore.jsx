import React, { useState } from 'react'
import Sidebar from '../../../components/Sidebar'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { server } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
    name: yup
        .string()
        .min(10, "Name must be at least 10 characters")
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
})


const CreateStore = () => {
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [loading, setLoading] = useState(false)
    const { token } = useSelector(state => state.user);

    const navigate = useNavigate();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    })

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            setError(null);
            setSuccess(null);
            console.log(import.meta.env.VITE_SERVER)
            const response = await axios.post(`${server}/api/store/create-store`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setSuccess(response.data.message);
            console.log(response)
        } catch (error) {
            setError(error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false)
        }
        reset();
    }
    return (
        <div className='h-screen flex'>
            <div className='flex-1'>
                <Sidebar />
            </div>
            <div className='flex-3 flex items-start pt-6 justify-center'>
                <form className='h-[80%] w-[50%] flex flex-col pt-8 items-center justify-start shadow-[13px_16px_28px_0px_rgba(0,_0,_0,_0.1)]' action="" onSubmit={handleSubmit(onSubmit)}>
                <h2 className='text-center mx-auto text-3xl'>Create Store</h2>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}
                    <div>
                        <label className='mr-8' htmlFor="">Name</label>
                        <input
                            className='mt-4 mb-2 border-2 border-gray-700 rounded-md'
                            type="text"
                            {...register("name")}
                        />
                        <p className='text-red-500'>{errors.name?.message}</p>
                    </div>
                    <div>
                        <label className='mr-8' htmlFor="">Email</label>
                        <input
                            className='mt-4 mb-2 border-2 border-gray-700 rounded-md'
                            type="text"
                            {...register("email")}
                        />
                        <p className='text-red-500'>{errors.email?.message}</p>
                    </div>
                    <div>
                        <label className='mr-8' htmlFor="">Address</label>
                        <input
                            className='mt-4 mb-2 border-2 border-gray-700 rounded-md'
                            type="text"
                            {...register("address")}
                        />
                        <p className='text-red-500'>{errors.address?.message}</p>
                    </div>
                    <button className='mx-auto border-2 border-gray-400 w-[50%] mt-6 font-bold text-lg hover:text-white hover:bg-black ease-in-out duration-300' type='submit'>Create</button>
                </form>
            </div>
        </div>
    )
}

export default CreateStore