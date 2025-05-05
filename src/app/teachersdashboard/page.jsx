"use client";

import { useState } from 'react';
import styles from './teachers.module.css';
import Head from 'next/head';
import '@fortawesome/fontawesome-free/css/all.min.css';


export default function TeachersDashboardPage() {
  const [leftToggle, setLeftToggle] = useState(false);
  const [rightToggle, setRightToggle] = useState(false);

  return (
    <>
    <Head>
        <title>Teacher Dashboard</title>
      </Head>

    <div className={styles.dashboard}>
      {/* Checkbox inputs for toggle functionality */}
      <input 
        type="checkbox" 
        id="leftToggleCheckbox" 
        className={styles.toggleCheckbox}
        checked={leftToggle}
        onChange={() => {setLeftToggle(!leftToggle)}}
      />
      <input 
        type="checkbox" 
        id="rightToggleCheckbox" 
        className={styles.toggleCheckbox}
        checked={rightToggle}
        onChange={() => setRightToggle(!rightToggle)}
      />

      {/* Mobile Toggle Buttons as labels for checkboxes */}
      <label 
        htmlFor="leftToggleCheckbox" 
        className={`${styles.mobileToggle} ${styles.mobileToggleLeft}`}
      >
        <i className="fas fa-bars"></i>
      </label>
      <label 
        htmlFor="rightToggleCheckbox" 
        className={`${styles.mobileToggle} ${styles.mobileToggleRight}`}
      >
        <i className="fas fa-calendar-alt"></i>
      </label>

      {/* Overlay for mobile */}
      <label 
        htmlFor="leftToggleCheckbox" 
        className={styles.sidebarOverlay}
        style={{ display: (leftToggle || rightToggle) ? 'block' : 'none' }}
      ></label>

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${leftToggle ? styles.active : ''}`}>
        <div className={styles.profileInfo}>
          <img src="/profile_pic.jpeg" alt="Profile Photo" className={styles.profilePhoto} />
          <h3>Mr. John Doe</h3>
          <h4>Mathematics</h4>
        </div>

        <nav className={styles.nav}>
          <div className={styles.dashboardItem}>
            <a href="#"><span className="fas fa-home"></span> Dashboard</a>
          </div>
          <a href="#"><span className="fas fa-book"></span> Professional Development</a>
          <a href="#"><span className="fas fa-envelope"></span> Messages</a>
          <a href="#"><span className="fas fa-chart-line"></span> Performance</a>
          <a href="#"><span className="fas fa-bullhorn"></span> Announcement</a>
          <a href="#"><span className="fas fa-calendar-alt"></span> Class Schedule</a>
          <a href="#"><span className="fas fa-user-check"></span> Attendance</a>
          <a href="#"><span className="fas fa-calendar-plus"></span> Upcoming Event</a>
          <a href="#"><span className="fas fa-trophy"></span> Grade</a>
          <a href="#"><span className="fas fa-calendar"></span> Event Calendar</a>
          <a href="#"><span className="fas fa-sign-out-alt"></span> Logout</a>
        </nav>
      </aside>

      {/* Content Area */}
      <div className={styles.contentArea}>
        {/* Main Content */}
        <main className={styles.mainContent}>
          <header className={styles.header}>
            <input type="text" className={styles.searchBar} placeholder="Search..." />
          </header>

          <section className={styles.topGridContainer}>
            <div className={styles.card}>
              <h4>2 hr</h4>
              <p>Hours Spent</p>
            </div>
            <div className={styles.card}>
              <h4>166/200</h4>
              <p>Average Test Result</p>
            </div>
            <div className={styles.card}>
              <h4>12</h4>
              <p>Class Completed</p>
            </div>
          </section>

          <section className={styles.middleGrids}>
            <div className={`${styles.grid} ${styles.schedule}`}>
              <h4>Class Schedule</h4>
              <p>Next: Science</p>
            </div>
            <div className={`${styles.grid} ${styles.attendance}`}>
              <h4>Attendance</h4>
              <p>Present: 24</p>
            </div>
            <div className={`${styles.grid} ${styles.grade}`}>
              <h4>Grade</h4>
              <p>Assignment: 4</p>
            </div>
          </section>

          <section className={styles.upcomingEvents}>
            <h4>Upcoming Event</h4>
            <p><span className={styles.eventTitle}>Maths Test</span> <span className={styles.eventDate}>22nd April, 2025</span></p>
          </section>

          <section className={styles.messages}>
            <h4>Messages</h4>
            <p>Mrs. Amanda, could you please let me know how Emily is doing in mathematics this term?</p>
          </section>

          <section className={styles.announcements}>
            <h4>Announcements</h4>
            <p>School closed next Monday!</p>
          </section>
        </main>

        {/* Right Sidebar */}
        <aside className={`${styles.rightSidebar} ${rightToggle ? styles.active : ''}`}>
          <div className={styles.calendar}>
            <h4>Event Calendar</h4>
            <div className={styles.calendarGrid}>
              <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
              <span></span><span></span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
              <span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span>
              <span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span>
              <span>20</span><span>21</span><span className={styles.today}>22</span><span>23</span><span>24</span><span>25</span><span>26</span>
              <span>27</span><span>28</span><span>29</span><span>30</span><span>31</span>
            </div>
          </div>

          <div className={styles.professionalDevelopment}>
            <h4>Professional Development</h4>
            <div className={styles.trainingResources}>
              <h5>Training Resources</h5>
              <p>Access training materials and online courses.</p>
            </div>
            <div className={styles.certificationTracking}>
              <h5>Certification Tracking</h5>
              <p>Monitor your certification progress and renewals.</p>
            </div>
          </div>

          <div className={styles.performanceChart}>
            <h4>Performance Chart</h4>
            <div className={styles.subject}>
              <span>Math</span>
              <div className={styles.bar}>
                <div className={styles.fill} style={{ width: '85%' }}></div>
              </div>
            </div>
            <div className={styles.subject}>
              <span>English</span>
              <div className={styles.bar}>
                <div className={styles.fill} style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
    </>
  );
}