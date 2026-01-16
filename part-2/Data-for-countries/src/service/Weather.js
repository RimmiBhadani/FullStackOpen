const API_KEY = import.meta.env.VITE_OPENWEATHER_API;

const getWeatherData = (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  return fetch(url).then((response) => response.json());
};

export default { getWeatherData };


