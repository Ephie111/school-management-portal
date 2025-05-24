"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, createUserWithEmailAndPassword, signInWithPopup, signOut } from "@/app/firebase";
import Link from "next/link";
import styles from "./signup.module.css";
import { getAuthErrorMessage } from "@/app/utils/authErrors";

export default function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await createUserWithEmailAndPassword(email, password);
      router.push("/login");
    } catch (error: any) {
      setError(getAuthErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError(null);

    try {
      // Force sign out first to ensure account selector appears
      await signOut(auth);
      
      // Initiate Google sign-in with account selector
      const result = await signInWithPopup();
      
      // Check if user is new or existing
      const isNewUser = result.user.metadata.creationTime === result.user.metadata.lastSignInTime;
      
      if (isNewUser) {
        router.push("/welcome"); // New user onboarding
      } else {
        router.push("/student"); // Existing user dashboard
      }
    } catch (error: any) {
      setError(getAuthErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.accountForm}>
      <div className={styles.formWrapper}>
        <h3>Create Your Account</h3>
        <h5>Please enter your details</h5>

        {error && <div className={styles.error}>{error}</div>}

        <form className={styles.formContainer} onSubmit={handleEmailSignup}>
          <div className={styles.inputLine}>
            <h5>Email</h5>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className={styles.inputLine}>
            <h5>Password</h5>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className={styles.inputLine}>
            <h5>Confirm Password</h5>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className={styles.buttons}>
            <button type="submit" disabled={loading}>
              {loading ? "Creating Account..." : "Sign Up"}
            </button>

            <button
              type="button"
              className={styles.google}
              onClick={handleGoogleSignup}
              disabled={loading}
            >
              <img
                src="/google.jpeg"
                alt="Google Logo"
                width={20}
                height={20}
              />
              {loading ? "Signing Up..." : "Sign Up with Google"}
            </button>
          </div>
        </form>

        <div className={styles.loginLink}>
          Already have an account? <Link href="/login">Log In</Link>
        </div>
      </div>
    </div>
  );
}