function filterThreeDaysdata(object) {
  try {
    const { name, region, country } = object.location;
    const { last_updated, temp_c, temp_f, humidity, uv, condition } =
      object.current;
    const [day1, day2, day3] = object.forecast.forecastday;
    const current = { last_updated, temp_c, temp_f, humidity, uv, condition };
    const days = [day1, day2, day3];
    return { name, region, country, current, days };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function callWeatherApi(location) {
  try {
    const threeDaysCallResults = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=be860411547b4bc8ad6191258240702&q=${location}&days=3&aqi=no&alerts=no`,
      { mode: "cors" }
    );
    const threeDaysResults = await threeDaysCallResults.json();
    console.log(threeDaysResults);
    const filterData = filterThreeDaysdata(threeDaysResults);

    return filterData;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default callWeatherApi;
