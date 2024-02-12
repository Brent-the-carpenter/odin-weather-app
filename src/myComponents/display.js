import callWeatherApi from "./gather-data";
import { dateReformat, hourFormater, getDayOfWeek } from "./dateReformat";

// let currentWeatherInfo;
async function updateUi(search) {
  const currentWeatherInfo = await callWeatherApi(search);
  const date = document.querySelector(".date");
  date.textContent = await dateReformat(
    currentWeatherInfo.current.last_updated
  );
  const city = document.querySelector(".city");
  city.textContent = `${currentWeatherInfo.name},`;
  const state = document.querySelector(".region");
  state.textContent = currentWeatherInfo.region;
  const currentTemp = document.querySelector("#currentTemp");
  currentTemp.textContent = `${currentWeatherInfo.current.temp_f}°`;
  const conditionIcon = document.querySelector(".conditionIcon");

  conditionIcon.src = currentWeatherInfo.current.condition.icon;
  const condition = document.querySelector(".condition");
  condition.textContent = currentWeatherInfo.current.condition.text;
  const uv = document.querySelector(".uv");
  uv.textContent = `UV ${currentWeatherInfo.current.uv}`;
  const humidity = document.querySelector(".humidity");
  humidity.textContent = `Humidity ${currentWeatherInfo.current.humidity} %`;
  const lowTemp = document.querySelector("#lowToday");
  lowTemp.textContent = `Low ${currentWeatherInfo.days[0].day.mintemp_f}°`;
  const highTemp = document.querySelector("#highToday");
  highTemp.textContent = `High ${currentWeatherInfo.days[0].day.maxtemp_f}°`;

  const hourlyForecast = document.querySelector(".hourlyForecast");

  if (hourlyForecast !== null) {
    while (hourlyForecast.firstChild) {
      hourlyForecast.removeChild(hourlyForecast.firstChild);
    }
  }
  currentWeatherInfo.days[0].hour.forEach(async (hour) => {
    const hourCard = document.createElement("div");
    const time = document.createElement("div");
    const hourIcon = document.createElement("img");
    const hourTemp = document.createElement("div");
    time.textContent = await hourFormater(hour.time);
    hourIcon.src = hour.condition.icon;
    hourTemp.textContent = `${hour.temp_f}°`;
    hourCard.appendChild(time);
    hourCard.appendChild(hourIcon);
    hourCard.appendChild(hourTemp);
    hourlyForecast.appendChild(hourCard);
  });
  const threeDayForecast = document.querySelector(".threeDayForecast");
  if (threeDayForecast !== null) {
    while (threeDayForecast.firstChild) {
      threeDayForecast.removeChild(threeDayForecast.firstChild);
    }
    currentWeatherInfo.days.forEach(async (day) => {
      const dayCard = document.createElement("div");
      dayCard.setAttribute("id", "dayCard");
      const dayName = document.createElement("div");

      const dayIcon = document.createElement("img");
      const dayLow = document.createElement("div");
      const dayHigh = document.createElement("div");
      dayName.textContent = await getDayOfWeek(day.date);
      console.log(dayName);
      dayLow.textContent = ` Low ${day.day.mintemp_f}`;
      dayHigh.textContent = `High ${day.day.maxtemp_f}`;
      dayIcon.src = day.day.condition.icon;
      dayCard.appendChild(dayName);
      dayCard.appendChild(dayIcon);
      dayCard.appendChild(dayLow);
      dayCard.appendChild(dayHigh);
      threeDayForecast.appendChild(dayCard);
    });
  }
}
const search = document.querySelector("#search");
search.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    console.log("enter");
    updateUi(search.value);
  }
});

export default { updateUi };
