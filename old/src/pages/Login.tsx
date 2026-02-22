import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, GraduationCap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/endpoints';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { data } = await login(email, password);
            localStorage.setItem('userInfo', JSON.stringify(data));

            if (data.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-white">
            {/* Left Panel - Branding */}
            <div className="hidden md:flex flex-1 bg-[#483C5C] p-12 flex-col justify-between relative overflow-hidden">
                <div className="relative z-10">
                    <Link to="/" className="flex items-center gap-2 text-white mb-12">
                        <div className="bg-orange-500 p-1.5 rounded">
                            <span className="text-white text-xs font-black tracking-tighter">afr</span>
                        </div>
                        <span className="text-2xl font-bold">AfRESH</span>
                    </Link>

                    <div className="mt-20">
                        <h1 className="text-5xl font-bold text-white mb-6">Welcome Back!</h1>
                        <p className="text-white/80 text-lg max-w-md">
                            Sign in to continue your learning journey and access your dashboard.
                        </p>
                    </div>
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-4 text-white/60">
                        <GraduationCap className="w-8 h-8" />
                        <span className="text-sm">Empowering the next generation of digital leaders.</span>
                    </div>
                </div>

                {/* Decorative background shapes */}
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
            </div>

            {/* Right Panel - Login Form */}
            <div className="flex-1 flex items-center justify-center bg-gray-100 p-6">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                    <Link
                        to="/"
                        className="mb-6 text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2 inline-flex"
                    >
                        <ArrowRight className="rotate-180 w-5 h-5" />
                        Back to Home
                    </Link>

                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Sign In</h2>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Input */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#483C5C] focus:bg-white transition-all"
                                    required
                                />
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#483C5C] focus:bg-white transition-all"
                                    required
                                />
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            <div className="text-right mt-2">
                                <a href="#" className="text-sm text-[#483C5C] hover:text-[#3D2F4A] font-medium">Forgot Password?</a>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#483C5C] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#3D2F4A] transform active:scale-95 transition-all shadow-lg hover:shadow-xl mt-4 disabled:opacity-50"
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>

                        {/* Sign Up Link */}
                        <p className="text-center text-sm text-gray-700">
                            Don't have an account?{' '}
                            <Link
                                to="/signup"
                                className="text-[#483C5C] hover:text-[#3D2F4A] font-semibold"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
