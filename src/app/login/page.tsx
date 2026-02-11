"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./login.module.css";

import {
  auth,
  provider,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from "@/app/firebase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [resetEmail, setResetEmail] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showForgot, setShowForgot] = useState<boolean>(false);
  const [resetSent, setResetSent] = useState<boolean>(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/student");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      await signInWithPopup(auth, provider);
      router.push("/student");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!resetEmail) {
      setError("Please enter your email");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetSent(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {!showForgot ? (
          <>
            <h3 className={styles.title}>Welcome Back</h3>
            <h5 className={styles.subtitle}>
              Please sign in to your account
            </h5>

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.inputGroup}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Password</label>
              <input
                type="password"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <div
              className={styles.forgot}
              onClick={() => setShowForgot(true)}
            >
              Forgot password?
            </div>

            <button
              className={styles.btn}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>

            <div className={styles.divider}>or</div>

            <button
              className={styles.googleBtn}
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              Continue with Google
            </button>

            <div className={styles.footer}>
              Don't have an account? <Link href="/signup">Sign Up</Link>
            </div>
          </>
        ) : (
          <>
            <h3 className={styles.title}>Reset Password</h3>
            <h5 className={styles.subtitle}>
              Enter your email to receive a reset link
            </h5>

            {error && <p className={styles.error}>{error}</p>}

            {resetSent ? (
              <>
                <p className={styles.success}>
                  Reset link sent. Check your email.
                </p>
                <button
                  className={styles.btn}
                  onClick={() => {
                    setShowForgot(false);
                    setResetSent(false);
                    setResetEmail("");
                  }}
                >
                  Back to Login
                </button>
              </>
            ) : (
              <>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Email</label>
                  <input
                    type="email"
                    className={styles.input}
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <button
                  className={styles.btn}
                  onClick={handleResetPassword}
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>

                <button
                  className={styles.backBtn}
                  onClick={() => setShowForgot(false)}
                  disabled={loading}
                >
                  Back
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
