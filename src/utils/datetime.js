export const toDMY = (date) => {
  const year = date.getFullYear();
  const month = (+date.getMonth() + 1 < 10 && "0") + (+date.getMonth() + 1);
  const day = (+date.getDate() < 10 && "0") + +date.getDate();
  return day + "-" + month + "-" + year;
};

export const toYMD = (dmyString) => {
  return (
    dmyString.substr(-4) +
    "-" +
    dmyString.substr(3, 2) +
    "-" +
    dmyString.substr(0, 2)
  );
};

export const convert = (inputTime) => {
  let clone = new Date(inputTime);
  let hours = clone.getHours();
  hours = hours < 10 ? "0" + hours : hours;
  let minutes = clone.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return hours + ":" + minutes;
};
