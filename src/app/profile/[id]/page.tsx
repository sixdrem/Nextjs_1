import { UserCircleIcon } from "@heroicons/react/outline";

export default function UserProfile({ params }: any) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl flex flex-col items-center">
                <UserCircleIcon className="w-20 h-20 text-indigo-300 mb-2" />
                <h2 className="text-2xl font-bold text-gray-800 mb-1">User Profile</h2>
                <p className="text-gray-500 mb-2">Profile page for user:</p>
                <span className="p-2 rounded bg-orange-500 text-black font-mono text-lg">{params.id}</span>
                {/* Future: username, bio, etc. */}
            </div>
        </div>
    );
}