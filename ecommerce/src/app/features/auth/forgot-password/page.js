'use client'

import axios from '@/lib/axios'
import React, { useState } from 'react'
import { Mail } from 'lucide-react'
import Link from 'next/link'
import { Spinner } from '@/components/ui/spinner'

const ForgotPassword = () => {
  const [form, setForm] = useState({ email: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess('')
    setError('')

    try {
      const res = await axios.post('/auth/sendEmail', form)
      setSuccess('Reset link has been sent to your email')
    } catch (err) {
      setError('Something went wrong. Please try again')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/90 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-2xl transition-all duration-300"
      >
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="bg-indigo-100 p-4 rounded-full">
            <Mail className="text-indigo-600" size={28} />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-800">
            Forgot Password
          </h1>
          <p className="text-sm text-gray-500 text-center">
            Enter your email and we’ll send you a reset link
          </p>
        </div>

        <div className="mb-4">
          <input
            type="email"
            placeholder="example@mail.com"
            value={form.email}
            onChange={(e) => setForm({ email: e.target.value })}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>

        {success && (
          <div className="mb-4 text-sm text-green-700 bg-green-100 border border-green-300 rounded-xl p-3 text-center">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-4 text-sm text-red-700 bg-red-100 border border-red-300 rounded-xl p-3 text-center">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? <span className='flex items-center gap-2 justify-center'><Spinner /> Loading</span> : 'Send Reset Link'}
        </button>

        <p className="mt-6 text-center text-sm text-gray-500">
          Remember your password?{' '}
          <Link href={'/features/auth/login'} className="text-indigo-600 hover:underline cursor-pointer">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  )
}

export default ForgotPassword
