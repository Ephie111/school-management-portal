"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-xl shadow-md p-10 w-full max-w-xl text-center border border-gray-200">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          School Management Portal
        </h1>
        <p className="text-gray-600 mb-8">
          A centralized platform for managing academic activities, student records, and communication.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/login"
            className="inline-block bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="inline-block border border-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-50 transition"
          >
            Create Account
          </Link>
        </div>
      </div>
    </main>
  );
}