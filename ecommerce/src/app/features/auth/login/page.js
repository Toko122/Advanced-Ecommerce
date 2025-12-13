'use client'

import { Spinner } from '@/components/ui/spinner'
import axios from '@/lib/axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FaEnvelope, FaLock, FaArrowRight, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa'
import { useAuth } from '../AuthProvider'
import Link from 'next/link'

const LoginForm = () => {
    const [form, setForm] = useState({ email: '', password: '' })
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({ type: '', text: '' })
    const router = useRouter()
    const {login} = useAuth()

    const clearMessage = () => setTimeout(() => setMessage({ type: '', text: '' }), 5000)

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMessage({ type: '', text: '' })

        if (!form.email.includes('@')) {
            setMessage({ type: 'error', text: 'Invalid email format.' })
            setLoading(false)
            clearMessage()
            return
        }
        if (form.password.length < 6) {
            setMessage({ type: 'error', text: 'Password must be at least 6 characters.' })
            setLoading(false)
            clearMessage()
            return
        }

        try {
            const res = await axios.post('/auth/login', form)
            setMessage({ type: 'success', text: 'Welcome back!' })
            setForm({ email: '', password: '' })
            login(res.data.token, res.data.user.id)
            router.push('/')
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Login failed. Try again.'
            setMessage({ type: 'error', text: errorMsg })
        } finally {
            setLoading(false)
            clearMessage()
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 p-4 sm:p-8'>
            <form onSubmit={handleSubmit} className='w-full max-w-lg bg-white p-6 sm:p-10 rounded-2xl shadow-2xl space-y-6 border border-gray-100'>
                
                <div className='text-center'>
                    <h1 className='text-4xl font-extrabold text-gray-900'>Login</h1>
                    <p className='text-md text-gray-500 mt-1'>Enter your credentials to continue</p>
                </div>

                {message.text && (
                    <div className={`p-4 rounded-xl flex items-center gap-3 font-medium ${
                        message.type === 'error'
                            ? 'bg-red-100 text-red-700 border border-red-300'
                            : 'bg-green-100 text-green-700 border border-green-300'
                    }`}>
                        {message.type === 'error' ? <FaExclamationCircle /> : <FaCheckCircle />}
                        <span className="text-sm">{message.text}</span>
                    </div>
                )}

                <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-200 shadow-inner"
                    />
                </div>

                <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-200 shadow-inner"
                    />
                </div>

                <button
                    type='submit'
                    disabled={loading}
                    className='w-full cursor-pointer flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 active:bg-indigo-800 transition duration-300 disabled:bg-indigo-400 disabled:cursor-not-allowed transform hover:scale-[1.01]'
                >
                    {loading ? (
                        <div className='flex items-center gap-2'>
                            <Spinner />
                            <span>Loading</span>
                        </div>
                    ) : (
                        <>
                            Login
                            <FaArrowRight />
                        </>
                    )}
                </button>

                <div className="flex flex-col items-center gap-2 mt-3">
                    
                    <Link
                        href="/features/auth/forgot-password"
                        className="text-indigo-600 text-sm font-medium hover:text-indigo-800 hover:underline transition"
                    >
                        Forgot your password?
                    </Link>

                    <Link
                        href="/features/auth/register"
                        className="text-gray-700 text-sm font-semibold hover:text-gray-900 hover:underline transition"
                    >
                        Don’t have an account? Create one
                    </Link>

                </div>

            </form>
        </div>
    )
}

export default LoginForm
