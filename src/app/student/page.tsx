"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from './student.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { auth } from '@/app/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export default function StudentPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const getInitials = (name?: string | null) => {
    if (!name) return 'US';
    const cleanName = name.includes('@') ? name.split('@')[0] : name;
    const names = cleanName.split(' ').filter(name => name.length > 0);
    if (names.length === 0) return 'US';
    if (names.length === 1) {
      return names[0].substring(0, 2).toUpperCase();
    }
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  };

  const getDisplayName = () => {
    if (!currentUser) return 'User';
    return currentUser.displayName || currentUser.email?.split('@')[0] || 'User';
  };

  const getShortName = () => {
    if (!currentUser) return 'User';
    if (currentUser.displayName) {
      return currentUser.displayName.split(' ')[0];
    }
    if (currentUser.email) {
      return currentUser.email.split('@')[0];
    }
    return 'User';
  };

  return (
    <>
      <Head>
        <title>Student Dashboard</title>
      </Head>

      <div className={styles.container}>
        <main>
          <button onClick={toggleMenu} className={styles.menuIcon}>
            <i className="fas fa-bars"></i>
          </button>

          <div className={`${styles.sidebar} ${menuOpen ? styles.sidebarOpen : ''}`}>
            <div className={styles.profileInfo}>
              {currentUser?.photoURL ? (
                <img src={currentUser.photoURL} alt="Profile" className={styles.profilePhoto} />
              ) : (
                <div className={styles.initialsAvatar}>
                  {getInitials(currentUser?.displayName || currentUser?.email)}
                </div>
              )}
              <div className={styles.profileText}>
                <h2>{getDisplayName()}</h2>
                <p>Class: 5th Grade</p>
              </div>
            </div>

            <ul className={styles.sidebarList}>
              <div className={styles.dashboardItem}>
                <li><i className="fas fa-tachometer-alt"></i> Dashboard</li>
              </div>
              <li><i className="fas fa-chart-bar"></i> Results</li>
              <li><i className="fas fa-calendar-alt"></i> Schedule</li>
              <li><i className="fas fa-comments"></i> Messages</li>
              <li><i className="fas fa-user"></i> Profile</li>
            </ul>
          </div>

          <div
            className={styles.sidebarOverlay}
            style={{
              opacity: menuOpen ? 1 : 0,
              pointerEvents: menuOpen ? 'auto' : 'none',
            }}
            onClick={closeMenu}
          ></div>

          <div className={styles.content}>
            <div className={styles.topbar}>
              <h2>Welcome, {getShortName()}</h2>
              <input className={styles.searchBar} type="text" placeholder="Search..." />
            </div>

            <button className={styles.downloadBtn}>
              <i className="fas fa-file-pdf"></i> Report Card
            </button>

            <div className={styles.gridContainer}>
              <div className={`${styles.card} ${styles.results}`}>
                <h3><i className="fas fa-chart-bar"></i> View Results</h3>
                <table className={styles.dataTable}>
                  <thead>
                    <tr><th>Subject</th><th>Score</th><th>Grade</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Math</td><td>95</td><td>A</td></tr>
                    <tr><td>Science</td><td>88</td><td>B+</td></tr>
                    <tr><td>English</td><td>92</td><td>A</td></tr>
                  </tbody>
                </table>
              </div>

              <div className={`${styles.card} ${styles.announcements}`}>
                <h3><i className="fas fa-bullhorn"></i> Announcements</h3>
                <ul className={styles.cardList}>
                  <li>School will be closed on December 25th for the holidays.</li>
                  <li>Final exams start on January 10th.</li>
                  <li>Parent-Teacher meetings on January 15th.</li>
                </ul>
              </div>

              <div className={`${styles.card} ${styles.feesInfo}`}>
                <h3><i className="fas fa-money-bill-wave"></i> Fees Information</h3>
                <p>Balance: <strong>$200</strong></p>
                <p>Due Date: <strong>January 5th</strong></p>
              </div>

              <div className={`${styles.card} ${styles.homework}`}>
                <h3><i className="fas fa-book"></i> Assignments</h3>
                <ul className={styles.cardList}>
                  <li>Math: Complete exercises 1-10 from the textbook.</li>
                  <li>Science: Write a report on the solar system.</li>
                  <li>English: Read chapters 5-6 and answer questions.</li>
                </ul>
              </div>
            </div>
          </div>
        </main>

        <footer className={styles.footer}>
          <p>&copy; 2025 School Portal. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
