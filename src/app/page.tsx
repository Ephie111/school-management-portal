"use client";

import Link from "next/link";
import "./global.css"; // Import global CSS

export default function Home() {
  return (
    <main className="main-container">
      <div className="auth-card">
        <h1 className="auth-title">
          School Management Portal
        </h1>
        <p className="auth-description">
          A centralized platform for managing academic activities, student records, and communication.
        </p>
        
        <div className="auth-buttons-container">
          <Link href="/login" className="btn-primary">
            Login
          </Link>
          <Link href="/signup" className="btn-secondary">
            Create Account
          </Link>
        </div>
      </div>
    </main>
  );
}