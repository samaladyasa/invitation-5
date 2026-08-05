

export function downloadIcsFile(event) {
  const { title, description, location, startDate, endDate } = event;

  const formatDate = (date) => {
    return date.toISOString().replace(/-|:|\.\d\d\d/g, '');
  };

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    `DTSTART:${formatDate(new Date(startDate))}`,
    `DTEND:${formatDate(new Date(endDate))}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\\');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${title.replace(/\s+/g, '_')}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function getGoogleCalendarUrl(event) {
  const { title, description, location, startDate, endDate } = event;
  const start = new Date(startDate).toISOString().replace(/-|:|\.\d\d\d/g, '');
  const end = new Date(endDate).toISOString().replace(/-|:|\.\d\d\d/g, '');
  
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(
    location
  )}&dates=${start}/${end}`;
}
