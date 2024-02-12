async function dateReformat(input) {
  const parts = input.split(" ");
  const datePart = parts[0];
  const timePart = parts[1];

  const dateParts = datePart.split("-");
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1; // Months are zero-based
  const day = parseInt(dateParts[2]);

  const timeParts = timePart.split(":");
  const hour = parseInt(timeParts[0]);
  const minute = parseInt(timeParts[1]);

  // Create a new Date object with the parsed values
  const formattedDate = new Date(year, month, day, hour, minute);

  // Format the date to a readable date and time string
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedDateString = formattedDate.toLocaleDateString(
    "en-US",
    options
  );
  return formattedDateString;
}

async function hourFormater(input) {
  let ampm = "";
  const parts = input.split(" ");
  const timeParts = parts[1].split(":");
  const hour = parseInt(timeParts[0]);
  let formatedHour = hour > 12 ? hour - 12 : hour;
  if (formatedHour === 0) {
    formatedHour = "12";
  }

  ampm = hour >= 12 ? "PM" : "AM";

  return `${formatedHour}:${timeParts[1]} ${ampm}`;
}

async function getDayOfWeek(input) {
  console.log(`input${input}`);
  const [year, month, day] = input.split("-");
  const date = new Date(year, month - 1, day); // Month is zero-based

  const dayOfWeek = date.getDay();
  console.log(`day of week output${dayOfWeek}`);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  console.log(daysOfWeek[dayOfWeek]);
  return daysOfWeek[dayOfWeek];
}
export { dateReformat, hourFormater, getDayOfWeek };
