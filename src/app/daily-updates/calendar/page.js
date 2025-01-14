'use client';
import React, { useState } from 'react';
import Calendar from 'react-calendar'; // from 'react-calendar'
import 'react-calendar/dist/Calendar.css'; // default CSS
import styles from './styles.module.css'; // optional custom styling

export default function DailyUpdatesPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPopup, setShowPopup] = useState(false);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowPopup(true);
  };

  return (
    <main className={styles.container}>
      <h1>Select a Date</h1>
      <Calendar onClickDay={handleDateClick} value={selectedDate} />

      {showPopup && (
        <PopupModal date={selectedDate} onClose={() => setShowPopup(false)} />
      )}
    </main>
  );
}

// Simple Popup component below (we'll define it inline for clarity)
function PopupModal({ date, onClose }) {
  // date is the user-chosen date from the Calendar
  // We could embed a form or an Excel-like table library here.

  return (
    <div className={styles.popupBackdrop}>
      <div className={styles.popupContainer}>
        <button onClick={onClose} className={styles.closeBtn}>
          X
        </button>
        <h2>Selected Date: {date.toLocaleDateString()}</h2>
        {/* 
          Here is where you’d add the "Excel-like" tasks input or
          a form to POST tasks to your backend for this date.
        */}
      </div>
    </div>
  );
}
