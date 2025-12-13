'use client'

import axios from '@/lib/axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import {
    FaUser, FaLock, FaEnvelope, FaPhone,
    FaArrowRight, FaCheckCircle, FaExclamationCircle
} from 'react-icons/fa'
import { Spinner } from '@/components/ui/spinner'
import Link from 'next/link'

const RegisterForm = () => {

    const [form, setForm] = useState({
        email: '',
        username: '',
        phone: '',
        name: '',
        lastname: '',
        password: '',
    })

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({ type: '', text: '' })
    const router = useRouter()

    const clearMessage = () => {
        setTimeout(() => setMessage({ type: '', text: '' }), 5000)
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMessage({ type: '', text: '' })

        if (form.password.length < 6) {
            setMessage({ type: 'error', text: 'Password must be at least 6 characters.' })
            setLoading(false)
            clearMessage()
            return
        }

        try {
            const res = await axios.post('/auth/register', form)
            setMessage({ type: 'success', text: '🎉 Registration successful!' })

            setForm({
                email: '',
                username: '',
                phone: '',
                name: '',
                lastname: '',
                password: '',
            })

            router.push('/features/auth/login')

        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Registration failed. Please try again.'
            setMessage({ type: 'error', text: errorMsg })
        } finally {
            setLoading(false)
            clearMessage()
        }
    }

    return (
        <div className='min-h-screen pt-18 flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 p-4'>
            <form
                onSubmit={handleSubmit}
                className='w-full max-w-lg bg-white p-8 rounded-2xl shadow-2xl space-y-6 border border-gray-100'
            >
                <div className='text-center'>
                    <h1 className='text-4xl font-extrabold text-gray-900'>Create Account</h1>
                    <p className='text-md text-gray-500 mt-1'>Please fill in all fields to register.</p>
                </div>

                {message.text && (
                    <div className={`p-4 rounded-xl flex items-center gap-3 font-medium ${
                        message.type === 'error'
                            ? 'bg-red-100 text-red-700 border border-red-300'
                            : 'bg-green-100 text-green-700 border border-green-300'
                    }`}>
                        {message.type === 'error' ? <FaExclamationCircle /> : <FaCheckCircle />}
                        <span>{message.text}</span>
                    </div>
                )}

                {[
                    { icon: <FaUser />, name: "name", placeholder: "First Name" },
                    { icon: <FaUser />, name: "lastname", placeholder: "Last Name" },
                    { icon: <FaUser />, name: "username", placeholder: "Username" },
                    { icon: <FaEnvelope />, name: "email", placeholder: "Email Address", type: "email" },
                    { icon: <FaPhone />, name: "phone", placeholder: "Phone Number" },
                ].map((field, index) => (
                    <div className="relative" key={index}>
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            {field.icon}
                        </span>
                        <input
                            type={field.type || "text"}
                            name={field.name}
                            placeholder={field.placeholder}
                            value={form[field.name]}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                ))}

                <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password (min. 6 characters)"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className='text-center'>
                    <Link
                        href="/features/auth/login"
                        className='text-indigo-600 text-sm font-medium hover:underline hover:text-indigo-800 transition'
                    >
                        Already have an account? Log in
                    </Link>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className='w-full cursor-pointer flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition disabled:bg-indigo-400'
                >
                    {loading ? (
                        <div className='flex items-center gap-2'>
                            <Spinner/>
                            <span>Loading</span>
                        </div>
                    ) : (
                        <>
                            Register
                            <FaArrowRight />
                        </>
                    )}
                </button>
            </form>
        </div>
    )
}

export default RegisterForm
