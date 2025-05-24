"use client";

import { useState } from 'react';
import Head from 'next/head';
import styles from './student.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function StudentPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  // static version for avatar Pull Request
  const getInitials = () => 'US';
  const getDisplayName = () => 'User';
  const getShortName = () => 'User';

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <Head><title>Student Dashboard</title></Head>
      <div className={styles.container}>
        <main>
          {/* Sidebar with Avatar profile*/}
          <div className={`${styles.sidebar} ${menuOpen ? styles.sidebarOpen : ''}`}>
            <div className={styles.profileInfo}>
              <div className={styles.initialsAvatar}>
                {getInitials()}
              </div>
              <div className={styles.profileText}>
                <h2>{getDisplayName()}</h2>
                <p>Class: 5th Grade</p>
              </div>
            </div>
            {/* ... other sidebar content ... */}
          </div>

          {/* Welcome Message */}
          <div className={styles.content}>
            <div className={styles.topbar}>
              <h2>Welcome, {getShortName()}</h2>
              {/* ... */}
            </div>
            {/* ... rest of the UI ... */}
          </div>
        </main>
      </div>
    </>
  );
}