import moment from "moment";
export const FormatDate = (date) => {
  function formatDate(date) {
    return moment(date).format("Do MMMM, YYYY");
  }

  const formattedDate = formatDate(date);

  return formattedDate;
};

function getDueOrdinal(day) {
  const lastDigit = day.slice(-1);
  const suffix =
    day > 10 && day < 20
      ? "th"
      : lastDigit === "1"
      ? "st"
      : lastDigit === "2"
      ? "nd"
      : lastDigit === "3"
      ? "rd"
      : "th";
  // return day.replace(/\D/g, "") + suffix;
  return Number(day) + suffix;
}

export const FormatDueDate = (dueDay, dueMonth) => {
  const monthArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = getDueOrdinal(dueDay);
  const month = monthArray[dueMonth];

  return `${month} ${date}`;
};

export const showSlashFormatDueDate = (dueDate) => {
  const array = dueDate.split("-");
  return `${array[1]}/${array[2]}/${array[0]}`;
};
