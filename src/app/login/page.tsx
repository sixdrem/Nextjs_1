"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { EyeIcon, EyeSlashIcon, EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";


export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const validate = () => {
        if (!user.email.trim()) {
            toast.error('Email is required.');
            return false;
        }
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(user.email)) {
            toast.error('Please enter a valid email address.');
            return false;
        }
        if (!user.password.trim()) {
            toast.error('Password is required.');
            return false;
        }
        if (user.password.length < 6) {
            toast.error('Password must be at least 6 characters.');
            return false;
        }
        return true;
    };

    const onLogin = async () => {
        console.log('Login button clicked');
        if (!validate()) return;
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile");
            
        } catch (error:any) {
            console.log("Signup failed", error.message);
            
            toast.error(error.message);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 ) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl">
                <div className="flex flex-col items-center">
                    {/* Logo Placeholder */}
                    <div className="w-16 h-16 mb-2 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-indigo-600">LOGO</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
                    <p className="text-gray-500">Sign in to your account</p>
                </div>
                <div className="space-y-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <div className="relative">
                        <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                        <input
                            className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 text-black bg-gray-50"
                            id="email"
                            type="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            placeholder="you@example.com"
                            autoComplete="email"
                        />
                    </div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <div className="relative">
                        <LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                        <input
                            className="pl-10 pr-10 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 text-black bg-gray-50"
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            placeholder="••••••••"
                            autoComplete="current-password"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-2.5 text-gray-400 hover:text-indigo-500 focus:outline-none"
                            onClick={() => setShowPassword((prev) => !prev)}
                            tabIndex={-1}
                        >
                            {showPassword ? (
                                <EyeSlashIcon className="w-5 h-5" />
                            ) : (
                                <EyeIcon className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>
                <button
                    onClick={onLogin}
                    disabled={buttonDisabled || loading}
                    className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${buttonDisabled || loading ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-indigo-600 text-white hover:bg-indigo-700"}`}
                >
                    {loading ? "Processing..." : "Login"}
                </button>
                <div className="flex justify-between text-sm">
                    <Link href="/signup" className="text-indigo-600 hover:underline">Create account</Link>
                    <Link href="/forgot-password" className="text-gray-500 hover:underline">Forgot password?</Link>
                </div>
            </div>
        </div>
    );
}