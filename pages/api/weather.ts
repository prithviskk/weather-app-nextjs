import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const API_KEY = process.env.OPENWEATHER_API_KEY!;
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const city = req.query.city as string;

  if (!city) {
    return res.status(400).json({ message: 'city param is required' });
  }

  try {
    const response = await axios.get(API_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
    });

    const weatherData = response.data;

    return res.status(200).json({
      city: weatherData.name,
      temperature: weatherData.main.temp,
      description: weatherData.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching weather data' });
  }
}
