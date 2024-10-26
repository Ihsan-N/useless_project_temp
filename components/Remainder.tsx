'use client';
import React, { useState, useEffect } from 'react';
import '../app/globals.css';

interface Task {
  text: string;
  time: string;
  offset: number; // Random offset in minutes for each task
}

const sarcasticReminders = [
    "If you’re waiting for motivation, it called in sick today.",
    "Oh, still here? I’d have quit by now.",
    "Another day, another task you won’t complete!",
    "I’d say ‘you’ve got this,’ but we both know the truth.",
    "Is this the part where you actually try? Didn't think so.",
    "Remember that goal you set? Yeah, me neither.",
    "At this pace, you’ll finish by… never.",
    "Oh, you added another task? Bold move.",
    "Don't rush, it's only been… forever.",
    "This is the part where you make excuses, right?",
    "Another reminder because you clearly need it.",
    "You’ll get to this after your next nap, I'm sure.",
    "Remember: someday is not a day of the week.",
    "If effort were a currency, you'd be broke.",
    "Your dedication to ignoring this is admirable.",
    "Why work on it now? Procrastination is an art form!",
    "Today’s motivational quote: ‘Eh, maybe tomorrow.’",
    "I’ll wait… but not holding my breath.",
    "When you finish this, pigs might actually fly.",
    "You know, this task won’t finish itself. Or will it?",
  ];
  

const Reminder: React.FC = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState<string>("");
  const [newTaskTime, setNewTaskTime] = useState<string>("");
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(checkReminders, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [taskList]);

  const checkReminders = () => {
    const currentTime = new Date();
    // Get current time in HH:MM format

    taskList.forEach((task) => {
      const [taskHour, taskMinute] = task.time.split(':').map(Number);

      // Calculate the task time with the random offset
      const taskTime = new Date();
      taskTime.setHours(taskHour, taskMinute + task.offset);

      // Check if the reminder should appear within a 5-minute window
      if (
        Math.abs(currentTime.getTime() - taskTime.getTime()) <= 5 * 60 * 1000
      ) {
        const randomReminderIndex = Math.floor(Math.random() * sarcasticReminders.length);
        const reminderText = `${sarcasticReminders[randomReminderIndex]} - Task: ${task.text}`;
        setNotification(reminderText);
        playNotificationSound();

        // Auto-dismiss notification after 5 seconds
        setTimeout(() => setNotification(null), 10000);
      }
    });
  };

  const addTask = () => {
    if (newTaskText.trim() && newTaskTime.trim()) {
      const randomOffset = Math.floor(Math.random() * 11) - 5; // Random offset between -5 and +5 minutes
      const newTask: Task = { text: newTaskText, time: newTaskTime, offset: randomOffset };
      setTaskList([...taskList, newTask]);
      setNewTaskText("");
      setNewTaskTime("");
    }
  };

  const playNotificationSound = () => {
    const sounds = [
      '/notification.mp3',
      '/noname.mp3',
      '/123.mp3',
      // Add more sounds as needed
    ];
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    const audio = new Audio(randomSound);
    audio.play();
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 max-w-md mx-auto bg-yellow-100 rounded-lg shadow-lg mt-10">
      <div className="w-full bg-gray-300 rounded-full h-6 mt-4 relative overflow-hidden">
  <div className="bg-red-600 h-full text-white text-center p-1 font-bold text-sm animate-pulse">
    99% Task Complete - Just Kidding!
  </div>
</div>


      {/* Fixed-position Notification Popup */}
      {notification && (
        <div className="fixed top-4 right-4 px-6 py-4 bg-pink-500 text-white rounded-md shadow-md animate-blast flex items-center justify-between z-50 animate-fade-in">
          <span className="text-lg font-bold">{notification}</span>
          <button onClick={() => setNotification(null)} className="ml-4 text-sm underline text-yellow-200">
            Dismiss 👋
          </button>
        </div>
      )}

      {/* Input for Adding New Tasks */}
      <div className="mt-6 w-full">
        <input
          type="text"
          placeholder="Add a new task... (or don't!)"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300  text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <input
          type="time"
          value={newTaskTime}
          onChange={(e) => setNewTaskTime(e.target.value)}
          className="w-full mt-2 px-4 py-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          onClick={addTask}
          className="w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Procrastinate Later 😜
        </button>
        <div>
          {taskList.map((task, index) => (
            <div
              key={index}
              className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-md shadow-md transition-all hover:bg-gray-300"
            >
              {task.text} - {task.time}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reminder;
