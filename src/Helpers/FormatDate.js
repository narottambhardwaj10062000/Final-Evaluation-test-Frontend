export const FormatDate = (date) => {

  function formatDate(date) {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = new Date(date).toLocaleDateString("en-US", options);
    const [month, day, year] = formattedDate.split(" ");
    const ordinalDay = getOrdinal(day);

    return `${ordinalDay} ${month}, ${year}`;
  }

  function getOrdinal(day) {
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
    return day.replace(/\D/g, "") + suffix;
  }

  const formattedDate = formatDate(date);

  return formattedDate;

};
