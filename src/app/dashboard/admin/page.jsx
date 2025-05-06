'use client';

import { useState } from 'react';
import styles from './admin.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleRightPanel = () => setRightPanelOpen(!rightPanelOpen);

  return (
    <div className={styles.dashboardWrapper}>
      {/* Sidebar Toggle Button - Visible on mobile */}
      <button 
        className={styles.hamburger}
        onClick={toggleSidebar}
      >
        <i className="fas fa-bars"></i>
      </button>

      {/* Right Panel Toggle Button - Visible on mobile */}
      <button 
        className={styles.rightToggleLabel}
        onClick={toggleRightPanel}
      >
        <i className="fas fa-sliders-h"></i>
      </button>

      {/* Sidebar */}
      <div className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div>
          <div className={styles.profile}>
            <img src="/profile_pic.jpeg" alt="Profile" />
            <div className={styles.profileText}>
              <h2>Welcome, Admin</h2>
            </div>
          </div>
          <ul className={styles.dashboard}>
            <div className={styles.dashboardItem}>
              <li><i className="fas fa-tachometer-alt"></i> Dashboard</li>
            </div>
            <li><i className="fas fa-users"></i> Manage Parents</li>
            <li><i className="fas fa-pencil-alt"></i> Assign Assignment</li>
            <li><i className="fas fa-bullhorn"></i> Announcement</li>
            <li><i className="fas fa-chart-line"></i> Result Management</li>
            <li><i className="fas fa-money-bill-wave"></i> Fees Management</li>
            <li><i className="fas fa-calendar-alt"></i> Event Calendar</li>
            <li><i className="fas fa-user-plus"></i> Admission</li>
          </ul>
        </div>
        <li><i className="fas fa-sign-out-alt"></i> Logout</li>
      </div>

      {/* Main Section */}
      <div className={styles.mainSection}>
        <input 
          type="text" 
          className={styles.searchBar} 
          placeholder="Search..." 
        />

        <div className={styles.headerGrid}>
          <div className={styles.gridItem}><h1>320</h1><h3>Total Students</h3></div>
          <div className={styles.gridItem}><h1>25</h1><h3>Total Teachers</h3></div>
          <div className={styles.gridItem}><h1>165</h1><h3>Total Parents</h3></div>
          <div className={styles.gridItem}><h1>3</h1><h3>Total Admin</h3></div>
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.card}><h3>Fees Collected</h3><p>$20,000</p><p>1st Term</p></div>
          <div className={styles.card}><h3>Announcements</h3><p>New school policies</p><p>Parents-Teacher Meeting</p></div>
          <div className={styles.card}><h3>Assign Subjects</h3><p>Grade 1 – English<br />Teacher: Ms Mar</p></div>
          <div className={styles.card}><h3>Upcoming Events</h3><p>Sports Day – June 12</p><p>Science Fair – June 2</p></div>
          <div className={styles.card}><h3>Attendance Today</h3><p>92%</p></div>
          <div className={styles.card}><h3>New Admission Applications</h3><p>122</p></div>
        </div>
      </div>

      {/* Right Panel */}
      <div className={`${styles.rightPanel} ${rightPanelOpen ? styles.rightPanelOpen : ''}`}>
        <h2>REPORTS & ANALYTICS</h2><hr />
        <a href="#"><i className="fas fa-user-shield"></i> Multi-admin Roles</a>
        <a href="#"><i className="fas fa-file-alt"></i> Audit Logs</a>
        <h2 className={styles.graphTitle}>Reports & Analytics Graph</h2><hr />
        <div className={styles.barChart}>
          <div className={styles.bar1}></div>
          <div className={styles.bar2}></div>
          <div className={styles.bar3}></div>
          <div className={styles.bar4}></div>
          <div className={styles.bar5}></div>
          <div className={styles.bar6}></div>
          <div className={styles.bar7}></div>
          <div className={styles.bar8}></div>
        </div>
      </div>
    </div>
  );
}