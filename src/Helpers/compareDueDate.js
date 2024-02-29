// export const compareDueDate = (day, month, year, dueDay, dueMonth, dueYear) => {
//   if (dueYear > year) {
//     return "#DBDBDB";
//   } else if (dueYear < year) {
//     return "#CF3636";
//   } else {
//     if (dueMonth > month) {
//       return "#DBDBDB";
//     } else if (dueMonth < month) {
//       return "#CF3636";
//     } else {
//       if (dueDay >= day) {
//         return "#DBDBDB";
//       } else {
//         return "#CF3636";
//       }
//     }
//   }
// };

export const compareDueDate = (date, dueDate, status) => {
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  var dueDateArray = dueDate.split("-").reverse();

  var dueDay = Number(dueDateArray[0]);
  var dueMonth = Number(dueDateArray[1]);
  var dueYear = Number(dueDateArray[2]);

  if (status === "done") {
    return "#63C05B";
  } else {
    if (dueYear > year) {
      return "#DBDBDB";
    } else if (dueYear < year) {
      return "#CF3636";
    } else {
      if (dueMonth > month) {
        return "#DBDBDB";
      } else if (dueMonth < month) {
        return "#CF3636";
      } else {
        if (dueDay >= day) {
          return "#DBDBDB";
        } else {
          return "#CF3636";
        }
      }
    }
  }
};
