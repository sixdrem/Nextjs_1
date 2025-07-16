"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing");
    const [user, setUser] = useState<{ _id?: string, username?: string, email?: string, avatarUrl?: string }>({});
    const [editMode, setEditMode] = useState(false);
    const [editUser, setEditUser] = useState<{ username: string; email: string; avatarUrl?: string }>({ username: '', email: '' });
    const [saving, setSaving] = useState(false);

    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success('Logout successful');
            router.push('/login');
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me');
        setData(res.data.data._id);
        setUser({
            _id: res.data.data._id,
            username: res.data.data.username,
            email: res.data.data.email,
            avatarUrl: res.data.data.avatarUrl,
        });
        setEditUser({
            username: res.data.data.username || '',
            email: res.data.data.email || '',
            avatarUrl: res.data.data.avatarUrl || '',
        });
    };

    const handleEdit = () => {
        setEditUser({
            username: user.username || '',
            email: user.email || '',
            avatarUrl: user.avatarUrl || '',
        });
        setEditMode(true);
    };

    const handleSave = async () => {
        if (!editUser.username.trim() || !editUser.email.trim()) {
            toast.error('Username and email are required.');
            return;
        }
        setSaving(true);
        try {
            await axios.put('/api/users/me', {
                username: editUser.username,
                email: editUser.email,
            });
            toast.success('Profile updated!');
            setUser({ ...user, ...editUser });
            setEditMode(false);
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Update failed.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl flex flex-col items-center">
                <div className="flex flex-col items-center">
                    <UserCircleIcon className="w-20 h-20 text-indigo-300 mb-2" />
                    {!editMode ? (
                        <>
                            <h2 className="text-2xl font-bold text-gray-800 mb-1">{user.username || "Your Username"}</h2>
                            <p className="text-gray-500 mb-2">{user.email || "your@email.com"}</p>
                        </>
                    ) : (
                        <>
                            <input
                                className="mb-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 w-full text-black"
                                type="text"
                                value={editUser.username}
                                onChange={e => setEditUser({ ...editUser, username: e.target.value })}
                                placeholder="Username"
                            />
                            <input
                                className="mb-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 w-full text-black"
                                type="email"
                                value={editUser.email}
                                onChange={e => setEditUser({ ...editUser, email: e.target.value })}
                                placeholder="Email"
                            />
                            {/* Avatar upload placeholder */}
                            <div className="mb-2 w-full">
                                <label className="block text-xs text-gray-500 mb-1">Avatar (coming soon)</label>
                                <input type="file" className="w-full" disabled />
                            </div>
                        </>
                    )}
                    <span className="text-xs text-gray-400">ID: {user._id || data || "-"}</span>
                </div>
                <div className="flex flex-col gap-3 w-full">
                    <button
                        onClick={getUserDetails}
                        className="w-full py-2 px-4 rounded-lg font-semibold bg-green-600 text-white hover:bg-green-700 transition-colors"
                    >
                        Get User Details
                    </button>
                    <button
                        onClick={logout}
                        className="w-full py-2 px-4 rounded-lg font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                    >
                        Logout
                    </button>
                    {!editMode ? (
                        <button
                            className="w-full py-2 px-4 rounded-lg font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                            onClick={handleEdit}
                        >
                            Edit Profile
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button
                                className="w-full py-2 px-4 rounded-lg font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                                onClick={handleSave}
                                disabled={saving}
                            >
                                {saving ? 'Saving...' : 'Save'}
                            </button>
                            <button
                                className="w-full py-2 px-4 rounded-lg font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                                onClick={() => setEditMode(false)}
                                disabled={saving}
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}