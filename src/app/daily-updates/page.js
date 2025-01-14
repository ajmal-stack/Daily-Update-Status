'use client';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import html2canvas from 'html2canvas'; // <-- import here

export default function DailyUpdatesPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPopup, setShowPopup] = useState(false);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowPopup(true);
  };

  return (
    <main className='p-4 min-h-screen bg-gray-50'>
      <h1 className='text-2xl font-bold mb-6'>Select a Date</h1>

      <div className='flex flex-col items-start'>
        <Calendar
          onClickDay={handleDateClick}
          value={selectedDate}
          className='react-calendar'
        />
      </div>

      {showPopup && (
        <PopupModal date={selectedDate} onClose={() => setShowPopup(false)} />
      )}
    </main>
  );
}

function PopupModal({ date, onClose }) {
  const [userName, setUserName] = useState('');
  const [taskTitle, setTaskTitle] = useState('');

  // 1) Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Convert date to a string (YYYY-MM-DD)
    const isoDateString = date.toISOString().split('T')[0];

    const payload = {
      date: isoDateString,
      userName,
      tasks: [
        {
          title: taskTitle,
          status: 'In Progress',
          comments: '',
        },
      ],
    };

    try {
      const res = await fetch('http://localhost:5000/api/daily-updates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      alert('Daily update saved!');
      onClose();
    } catch (error) {
      console.error('Error creating daily update:', error);
    }
  };

  // 2) Screenshot function
  const handleScreenshot = async () => {
    // We'll capture the entire popup content
    const popupEl = document.getElementById('popup-content');
    if (!popupEl) return;

    try {
      const canvas = await html2canvas(popupEl);
      const dataUrl = canvas.toDataURL('image/png');

      // For demonstration: open the screenshot in a new tab
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`<img src="${dataUrl}" />`);
      }

      // Alternatively, you could:
      // - Let the user download it
      // - Send it to the backend
      // - Or share via email/WhatsApp (with extra steps)
    } catch (err) {
      console.error('Screenshot error:', err);
    }
  };

  return (
    <div
      className='
        fixed inset-0
        flex items-center justify-center
        bg-black bg-opacity-50
      '
    >
      {/* ID for the element we want to capture in the screenshot */}
      <div
        id='popup-content'
        className='bg-white rounded-md shadow-md p-6 relative w-full max-w-md mx-2'
      >
        <button
          onClick={onClose}
          className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
        >
          ✕
        </button>
        <h2 className='text-xl font-semibold mb-4'>
          Selected Date: {date.toLocaleDateString()}
        </h2>

        {/* Our form */}
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block font-medium mb-1'>User Name</label>
            <input
              type='text'
              className='border border-gray-300 rounded w-full p-2'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className='block font-medium mb-1'>Task Title</label>
            <input
              type='text'
              className='border border-gray-300 rounded w-full p-2'
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              required
            />
          </div>

          <button
            type='submit'
            className='
              bg-blue-600
              text-white
              px-4 py-2
              rounded
              hover:bg-blue-700
              mr-4
            '
          >
            Save Daily Update
          </button>

          {/* Button to trigger screenshot */}
          <button
            type='button'
            onClick={handleScreenshot}
            className='
              bg-green-600
              text-white
              px-4 py-2
              rounded
              hover:bg-green-700
            '
          >
            Take Screenshot
          </button>
        </form>
      </div>
    </div>
  );
}
