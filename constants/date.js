const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const today = new Date();
const date = today.getDate();
const day = days[today.getDay()];
const month = months[today.getMonth()];

const dateGetter = () => {
  const today = new Date();
  const date = today.getDate();
  const day = days[today.getDay()];
  const month = months[today.getMonth()];
  const year = today.getFullYear();
  return { day, date, month, year };
};

export { dateGetter };

export { day, date, month };
