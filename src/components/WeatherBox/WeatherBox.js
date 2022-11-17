import { useCallback, useState } from 'react';

import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = props => {

  const [weatherData, setWeatherData] = useState({});
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleCityChange = useCallback(async (city) => {

    setIsPending(true);

    await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=64a2cf3695bfedcfb55e4c0e3f52687e&units=metric`)
      .then(res => {
        if (res.status === 200) {
          return res.json()
            .then(data => {

              setWeatherData({
                city: data.name,
                temp: data.main.temp,
                icon: data.weather[0].icon,
                description: data.weather[0].main
              })
              setIsPending(false)
              setIsError(false)

            });
        } else {
          setIsError(true)
        }
      })


  }, []);

  return (
    <section>
      <PickCity submitFunction={handleCityChange} />
      {(weatherData.city && !isPending) ?
        <WeatherSummary weatherData={weatherData} /> :
        !isError ?
          <Loader /> : ``}
      {isError ? <ErrorBox /> : ``}
    </section>
  )
};

export default WeatherBox;