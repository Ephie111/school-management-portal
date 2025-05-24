"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  auth, 
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut 
} from "@/app/firebase";
import Link from "next/link";
import styles from "./login.module.css";
import { getAuthErrorMessage } from "@/app/utils/authErrors";

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState({
    email: false,
    google: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(prev => ({ ...prev, email: true }));

    try {
      await signInWithEmailAndPassword(formData.email, formData.password);
      router.push("/student");
    } catch (error: any) {
      setError(getAuthErrorMessage(error.code));
    } finally {
      setLoading(prev => ({ ...prev, email: false }));
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(prev => ({ ...prev, google: true }));

    try {
      await signOut(auth);
      await signInWithPopup();
      router.push("/student");
    } catch (error: any) {
      setError(getAuthErrorMessage(error.code));
    } finally {
      setLoading(prev => ({ ...prev, google: false }));
    }
  };

  return (
    <div className={styles.formWrapper}>
      <h3>Welcome Back!</h3>
      <h5>Please enter your details</h5>

      {error && <div className={styles.error}>{error}</div>}

      <form className={styles.formContainer} onSubmit={handleEmailLogin}>
        <div className={styles.inputLine}>
          <h5>Email</h5>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading.email}
          />
        </div>

        <div className={styles.inputLine}>
          <h5>Password</h5>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading.email}
          />
        </div>

        <div className={styles.forgotPassword}>
          <Link href="/forgot-password">Forgot Password?</Link>
        </div>

        <div className={styles.buttons}>
          <button 
            type="submit" 
            disabled={loading.email}
            className={loading.email ? styles.loading : ""}
          >
            {loading.email ? (
              <span className={styles.spinner}></span>
            ) : "Log In"}
          </button>

          <button
            type="button"
            className={`${styles.google} ${loading.google ? styles.loading : ""}`}
            onClick={handleGoogleLogin}
            disabled={loading.google}
          >
         
           <img
                src="/google.jpeg"
                alt="Google Logo"
                width={20}
                height={20}
              />
              {loading ? "Login With Google" : "Login with Google"}
            </button>
          </div>
        </form>

      <div className={styles.loginLink}>
        Don't have an account? <Link href="/signup">Sign Up</Link>
      </div>
    </div>
  );
}