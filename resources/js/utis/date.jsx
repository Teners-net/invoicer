
/**
 * Get the diffrence between to time intervals
 */
export function date_dif(__to, abs = true, __from = Date.now()) {
  if (!__to) return 0
  var diff = Date.parse(__to.toString()) - __from

  const result = (diff / (1000 * 60 * 60 * 24)).toFixed(0)
  return (!abs) ? result : Math.abs(parseInt(result))
}

export function formatDate(dateString = Date.now(), addHour = 0, showYear = false, showTime = false, timeJoin = 'by') {
  const dateObj = new Date(dateString);
  dateObj.setHours(dateObj.getHours() + addHour);

  const now = new Date();
  const isToday = dateObj.toDateString() === now.toDateString();

  let formattedDate = "";

  const hour = dateObj.getHours() % 12 || 12;
  const minute = dateObj.getMinutes().toString().padStart(2, "0");
  const amPm = dateObj.getHours() < 12 ? "AM" : "PM";

  if (showTime && isToday) {
    formattedDate = `Today`;
  } else {
    const dayOfMonth = dateObj.getDate();

    const suffixes = ["th", "st", "nd", "rd"];
    const suffix = suffixes[
      (dayOfMonth) % 10 === 1 && dayOfMonth !== 11 ? 1 :
        (dayOfMonth) % 10 === 2 && dayOfMonth !== 12 ? 2 :
          (dayOfMonth) % 10 === 3 && dayOfMonth !== 13 ? 3 : 0
    ];

    const formattedDay = dayOfMonth + suffix;

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthName = monthNames[dateObj.getMonth()];

    const year = dateObj.getFullYear();
    const formattedYear = showYear ? `, ${year}` : "";

    formattedDate = `${formattedDay} ${monthName}${formattedYear}`;
  }
  if (showTime) formattedDate += ` ${timeJoin} ${hour}:${minute} ${amPm}`;

  return formattedDate;
}


export const dateInputFormat = (dateString) => {
  return new Date(dateString)?.toISOString().split('T')[0]
}
