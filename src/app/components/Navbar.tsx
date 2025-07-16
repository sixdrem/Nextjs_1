"use client";
import Link from "next/link";
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Toaster } from "react-hot-toast";

export default function Navbar() {
  const [navOpen, setNavOpen] = React.useState(false);
  const [theme, setTheme] = React.useState("light");

  React.useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      // Hide page until theme is set
      document.documentElement.classList.add("invisible");
      const stored = localStorage.getItem("theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialTheme = stored || (prefersDark ? "dark" : "light");
      setTheme(initialTheme);
      if (initialTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      // Show page after theme is set
      document.documentElement.classList.remove("invisible");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <nav className="w-full bg-white dark:bg-gray-950 shadow-md sticky top-0 z-50 transition-colors">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600 dark:text-indigo-400">
              <span className="bg-indigo-100 dark:bg-indigo-900 rounded-full px-3 py-1">LOGO</span>
            </Link>
            <div className="hidden md:flex gap-6 items-center">
              <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</Link>
              <Link href="/login" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Login</Link>
              <Link href="/signup" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Signup</Link>
              <Link href="/profile" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Profile</Link>
              <button
                onClick={toggleTheme}
                className="ml-4 p-2 rounded hover:bg-indigo-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle dark mode"
              >
                {theme === "dark" ? (
                  <SunIcon className="w-6 h-6 text-yellow-400" />
                ) : (
                  <MoonIcon className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>
            <button
              className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onClick={() => setNavOpen((open) => !open)}
              aria-label="Toggle navigation menu"
            >
              {navOpen ? (
                <XMarkIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              ) : (
                <Bars3Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              )}
            </button>
          </div>
          {navOpen && (
            <div className="md:hidden flex flex-col gap-2 py-2 animate-fade-in">
              <Link href="/" className="px-2 py-2 hover:bg-indigo-50 dark:hover:bg-gray-800 rounded" onClick={() => setNavOpen(false)}>Home</Link>
              <Link href="/login" className="px-2 py-2 hover:bg-indigo-50 dark:hover:bg-gray-800 rounded" onClick={() => setNavOpen(false)}>Login</Link>
              <Link href="/signup" className="px-2 py-2 hover:bg-indigo-50 dark:hover:bg-gray-800 rounded" onClick={() => setNavOpen(false)}>Signup</Link>
              <Link href="/profile" className="px-2 py-2 hover:bg-indigo-50 dark:hover:bg-gray-800 rounded" onClick={() => setNavOpen(false)}>Profile</Link>
              <button
                onClick={toggleTheme}
                className="mt-2 p-2 rounded hover:bg-indigo-100 dark:hover:bg-gray-800 transition-colors w-fit self-end"
                aria-label="Toggle dark mode"
              >
                {theme === "dark" ? (
                  <SunIcon className="w-6 h-6 text-yellow-400" />
                ) : (
                  <MoonIcon className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}