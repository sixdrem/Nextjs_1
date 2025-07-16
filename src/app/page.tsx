import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md p-10 space-y-8 bg-white rounded-2xl shadow-xl flex flex-col items-center">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={120}
          height={30}
          priority
        />
        <h1 className="text-3xl font-bold text-gray-800 mt-4 text-center">
          Welcome to Your Modern App
        </h1>
        <div className="flex flex-col gap-4 w-full">
          <Link href="/login" className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors text-center">
            Login
          </Link>
          <Link href="/signup" className="px-6 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors text-center">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
