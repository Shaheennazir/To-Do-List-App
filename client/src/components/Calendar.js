import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

function CalendarComponent({ tasks }) {
  const events = tasks.map(task => ({
    title: task.title,
    start: task.dueDate,
    end: task.dueDate,
  }));

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin]}
      initialView="dayGridMonth"
      events={events}
    />
  );
}

export default CalendarComponent;