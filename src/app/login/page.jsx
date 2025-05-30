"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  auth, 
  provider,
  signInWithEmailAndPassword,
  signInWithPopup
} from "@/app/firebase";
import Link from "next/link";
import styles from "./login.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // This effect just checks if user is logged in, but doesn't redirect
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsCheckingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/student");
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message);
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
    } catch (error) {
      console.error("Google login error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (isCheckingAuth) {
    return <div className={styles.loginContainer}>Checking authentication...</div>;
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.images}>
        <div className={styles.image}>
          <svg
            fill="#000000"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 31.644 31.644"
            xmlSpace="preserve"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <g>
                <g>
                  <polygon points="7.533,11.303 6.799,11.303 6.799,14.404 9.37,14.404 9.37,11.303 8.594,11.303 8.594,6.99 21.408,11.098 29.561,3.819 16.302,0 5.88,6.12 7.533,6.649 "></polygon>
                  <path d="M20.174,27.277c0,1.854,1.503,3.356,3.356,3.356h0.155c1.854,0,3.356-1.504,3.356-3.356v-1.703h-6.868V27.277z"></path>
                  <path d="M30.498,18.268c0.799-0.72,1.434-2.723,0.33-3.473c-1.612-1.096-4.178-0.538-6.004-0.605 c-0.384-0.014-0.736-0.089-1.08-0.181c0.897-0.577,1.532-0.983,1.532-0.983V8.64l-3.739,3.304L11.41,8.486v5.672 c0,0,2.057-0.714,4.065-0.021c2.009,0.693,5.403,2.736,5.403,2.736s0.979-1.586,2.146-2.392c1.79,0.5,3.879,0.176,5.678,0.241 c2.429,0.089,2.746,2.312,0.846,3.672c-0.836,0.598-1.951,0.815-2.93,1.067c-1.414,0.362-2.558,0.943-3.033,2.179H23.51 c-0.007,0.043-0.013,0.088-0.019,0.121h-3.317v3.618h6.868v-3.618h-2.955C25.059,19.714,28.919,19.689,30.498,18.268z M24.108,24.328c0,0.268-0.218,0.488-0.487,0.488h-0.022c-0.269,0-0.487-0.222-0.487-0.488v-1.27c0-0.201,0.123-0.375,0.299-0.449 c0.076,0.145,0.291,0.144,0.398-0.002c0.178,0.074,0.301,0.248,0.301,0.451L24.108,24.328L24.108,24.328z"></path>
                  <path d="M18.753,26.682c-0.238-0.494-0.596-0.836-1.022-1.061c-0.649-0.393-3.867-2.352-6.608-4.305 c0.241-0.324,0.95-1.215,1.796-1.705c1.051-0.611,2.749-1.168,2.749-1.168l-1.358-0.275l0.066-0.877c0,0-1.554,0.488-2.354,1.174 c-0.8,0.682-1.585,1.561-1.585,1.561s0.328-1.357,0.931-2.233c0.604-0.877,2.009-1.875,2.009-1.875l-1.012-0.25l-0.627-1.262 c0,0-1.393,2.507-1.631,3.086c-0.21,0.515-0.713,1.918-0.978,2.335c-2.004-1.58-3.636-3.08-3.759-3.215 c-0.685-0.741-1.453-1.101-2.224-1.034c-0.947,0.082-1.858,0.787-2.705,2.099L0.224,18.01l0.344,0.207 c0.285,0.172,0.566,0.342,0.841,0.508c-0.358,0.65-0.995,2.118-0.554,3.715l0.058,0.207l0.206,0.06 c3.742,1.095,10.087,6.923,10.822,7.604c0.183,0.284,0.478,0.578,0.941,0.854c1.676,0.996,3.703,0.295,4.876-0.779 c1.012-0.923,1.438-2.089,1.188-3.152C18.904,27.045,18.839,26.861,18.753,26.682z M10.285,21.666 c1.82,1.318,3.918,2.673,5.373,3.583c-1.396,0.062-2.827,0.551-3.438,0.785c-0.361-0.497-1.315-1.599-3.635-3.392 C9.186,22.146,9.814,21.843,10.285,21.666z M5.499,24.126c-1.378-0.925-2.762-1.706-3.948-2.095 c-0.255-1.219,0.231-2.363,0.516-2.898c1.615,1.002,2.967,1.899,4.095,2.691C5.506,22.667,5.418,23.494,5.499,24.126z M1.315,17.766c0.637-0.889,1.273-1.365,1.897-1.418c0.531-0.046,1.065,0.219,1.59,0.787c0.191,0.205,1.686,1.568,3.502,3.021 c-0.346,0.085-0.821,0.303-1.616,1.092C5.268,20.246,3.505,19.088,1.315,17.766z M17.24,29.814 c-0.973,0.887-2.625,1.479-3.961,0.686c-0.67-0.398-0.938-0.842-0.798-1.316c0.093-0.313,0.332-0.613,0.634-0.869 c0.329,0.211,0.999,0.662,2.15,1.513l0.184,0.136l0.208-0.095c1.332-0.607,1.328-1.413,1.266-1.732 c-0.157-0.737-0.995-1.28-2.108-1.323c-0.948-0.037-2.696,0.871-3.074,2.153c-0.009,0.029-0.017,0.06-0.024,0.093 c-0.913-0.822-2.484-2.187-4.238-3.517c-0.03-0.7,0.049-1.644,0.557-2.344c3.071,2.362,3.681,3.469,3.688,3.481l0.161,0.329 l0.337-0.144c1.331-0.568,4.974-1.649,5.838,0.152C18.561,28.068,17.962,29.15,17.24,29.814z M13.819,27.852 c0.354-0.177,0.708-0.276,0.964-0.268c0.803,0.029,1.305,0.374,1.378,0.688c0.001,0.004,0.002,0.01,0.003,0.015 c0.049,0.252-0.183,0.534-0.63,0.778C14.736,28.479,14.183,28.095,13.819,27.852z"></path>
                </g>
              </g>
            </g>
          </svg>
        </div>
        <div className={styles.image} id="school-svg">
          <svg
            fill="#000000"
            height="200px"
            width="200px"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 395 395"
            xmlSpace="preserve"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <g>
                <path d="M313.001,0H81.999C36.785,0,0,36.784,0,81.998v230.993C0,358.211,36.785,395,81.999,395h231.002 C358.216,395,395,358.211,395,312.991V81.998C395,36.784,358.216,0,313.001,0z M380,312.991C380,349.94,349.945,380,313.001,380 H81.999C45.056,380,15,349.94,15,312.991V81.998C15,45.055,45.056,15,81.999,15h231.002C349.945,15,380,45.055,380,81.998V312.991z "></path>
                <g>
                  <path d="M342.641,258.162v-64.777c0,0-4.857-37.577-7.21-56.366c-2.159-15.756-9.991-40.049-84.894-40.049 c-74.905,0-82.893,24.297-85.054,40.049c-2.355,18.789-4.703,37.578-7.054,56.366v64.779c-1.657,1.255-2.733,3.238-2.733,5.475 v9.901c0,3.792,3.079,6.872,6.872,6.872h14.766v11.951c0,2.545,2.061,4.605,4.605,4.605h14.73c2.539,0,4.605-2.06,4.605-4.605 v-11.951h98.52v11.951c0,2.545,2.063,4.605,4.605,4.605h14.73c2.545,0,4.608-2.06,4.608-4.605v-11.951h14.766 c3.792,0,6.871-3.08,6.871-6.872v-9.901C345.376,261.401,344.299,259.418,342.641,258.162z M220.622,114.053h59.824 c2.471,0,4.466,2.003,4.466,4.47c0,2.465-1.995,4.467-4.466,4.467h-59.824c-2.468,0-4.463-2.002-4.463-4.467 C216.159,116.056,218.154,114.053,220.622,114.053z M204.951,246.511c-7.629,0-13.81-6.186-13.81-13.811 c0-7.631,6.181-13.811,13.81-13.811c7.627,0,13.809,6.181,13.809,13.811C218.76,240.324,212.578,246.511,204.951,246.511z M296.122,246.511c-7.631,0-13.812-6.186-13.812-13.811c0-7.631,6.181-13.811,13.812-13.811c7.625,0,13.809,6.181,13.809,13.811 C309.932,240.324,303.747,246.511,296.122,246.511z M309.639,186.591c-2.82,0-5.872,0-9.108,0c-0.94-3.4-2.102-5.98-3.57-8.049 c-4.451-6.285-11.221-6.807-17.209-6.807c-5.992,0-12.758,0.521-17.205,6.807c-1.468,2.069-2.63,4.649-3.57,8.049 c-24.628-0.001-50.35-0.001-67.541,0.001c-3.91,0-6.891-3.073-6.652-6.87c0.735-11.832,1.477-23.664,2.219-35.496 c0.234-3.796,3.414-6.875,7.093-6.875c28.692,0,84.187,0,112.881,0c3.679,0,6.857,3.079,7.096,6.875 c0.737,11.832,1.476,23.664,2.214,35.496C316.524,183.519,313.545,186.591,309.639,186.591z"></path>
                  <path d="M266.439,151.769c-0.395,1.298-0.615,2.672-0.615,4.098c0,7.691,6.236,13.921,13.927,13.921 c7.692,0,13.93-6.229,13.93-13.921c0-1.426-0.222-2.8-0.622-4.098l4.103-7.035H262.34L266.439,151.769z"></path>
                  <path d="M94.775,213.339c14.616-3.332,25.529-16.399,25.529-32.026c0-18.148-14.712-32.86-32.857-32.86 c-18.146,0-32.86,14.712-32.86,32.86c0,15.627,10.914,28.695,25.532,32.026v70.034H49.624v14.657h75.642v-14.657H94.775V213.339z"></path>
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>

      <div className={styles.accountForm}>
        <div className={styles.formWrapper}>
          <h3>Welcome Back!</h3>
          <h5>Please enter your details</h5>
          
          {error && <div className={styles.error}>{error}</div>}
          
          <form className={styles.formContainer} onSubmit={handleEmailLogin}>
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
            
            <div className={styles.forgotPassword}>
              <Link href="#">Forgot Password?</Link>
            </div>
            
            <div className={styles.buttons}>
              <button type="submit" disabled={loading}>
                {loading ? "Loading..." : "Log In"}
              </button>
              
              <button
                type="button"
                className={styles.google}
                onClick={handleGoogleLogin}
                disabled={loading}
              >
                <img src="/google.jpeg" alt="Google Logo" />
                {loading ? "Signing In..." : "Log In with Google"}
              </button>
            </div>
          </form>
          
          <div className={styles.loginLink}>
            Don't have an account? <Link href="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}