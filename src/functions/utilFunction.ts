import axios from "axios";
import { WeatherData } from "../interface/IWeatherData";

export const getPlacesAutocomplete = async (userInput: any) => {
  const format = "json";
  const addressDetails = 1;
  const limit = 10;
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=${format}&q=${userInput}&addressdetails=${addressDetails}&limit=${limit}`
    );
    return response;
  } catch (error) {
    console.log("places auto complete error", error);
    return error;
  }
};

export const getUserLocation = (): Promise<{
  latitude: number;
  longitude: number;
}> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          storeDataInLocalStorage(latitude, longitude);
          resolve({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting user location:", error.message);
          reject(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      reject(new Error("Geolocation not supported"));
    }
  });
};
const storeDataInLocalStorage = (latitude: number, longitude: number) => {
  window.localStorage.setItem(
    "locationCoordinate",
    JSON.stringify({ latitude, longitude })
  );
};

export const getWeatherDetails = async (
  latitude: number,
  longitude: number,
  unit: string = "metric"
) => {
  const apiKey = "b300406d7c6ee09a4133cfe76e70b495";

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`
    );
    window.localStorage.setItem(
      "weatherDetails",
      JSON.stringify({ weatherDetails: response.data })
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const getFiveDayWeatherForecast = async (
  latitude: number,
  longitude: number,
  unit = "metric"
) => {
  const apiKey = "b300406d7c6ee09a4133cfe76e70b495";

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`
    );
    return response.data;
  } catch (error) {
    console.log("forecast data error", error);
    return error;
  }
};

export function generateTimeZones(): Record<number, string> {
  const timeZones: Record<number, string> = {};
  const maxOffset = 14 * 3600; // Maximum offset in seconds (14 hours ahead or behind UTC)

  for (let offset = -maxOffset; offset <= maxOffset; offset += 3600) {
    const hours = offset / 3600;
    const sign = hours >= 0 ? "+" : "-";
    const absHours = Math.abs(hours);
    const formattedOffset = `${sign}${absHours.toString().padStart(2, "0")}:00`;

    timeZones[offset] = `UTC${formattedOffset}`;
  }

  return timeZones;
}

export const getWeatherIconURL = (weatherCode: string) => {
  return `https://openweathermap.org/img/wn/${weatherCode}@2x.png`;
};

export function convertUnixTimestampToReadableDateTime(
  unixTimestamp: number
): string {
  const milliseconds = unixTimestamp * 1000; // Convert seconds to milliseconds
  const date = new Date(milliseconds);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

export function convertUnixTimestampToReadableTime(
  unixTimestamp: number
): string {
  const milliseconds = unixTimestamp * 1000; // Convert seconds to milliseconds
  const date = new Date(milliseconds);
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
  };
  return date.toLocaleTimeString("en-US", options);
}
export function createFiveDaysTotalInfo(data: WeatherData[]) {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  // slice the data  into a key value pair of 8 elemennts where the key is the day
  const newDataArray = [
    [
      data.slice(0, 8),
      new Date(data[0].dt_txt).toLocaleDateString("en-US", options),
    ],

    [
      data.slice(8, 16),
      new Date(data[8].dt_txt).toLocaleDateString("en-US", options),
    ],

    [
      data.slice(16, 24),
      new Date(data[16].dt_txt).toLocaleDateString("en-US", options),
    ],

    [
      data.slice(24, 32),
      new Date(data[24].dt_txt).toLocaleDateString("en-US", options),
    ],
    [
      data.slice(32, 40),
      new Date(data[32].dt_txt).toLocaleDateString("en-US", options),
    ],
  ];

  return newDataArray;
}
export function categorizeDataByTime(
  data: WeatherData[]
): Record<string, WeatherData | null> {
  const categorizedData: Record<string, WeatherData | null> = {
    morning: null,
    afternoon: null,
    evening: null,
    overnight: null,
  };

  const currentHour = new Date().getHours();

  data.forEach((obj) => {
    const time = new Date(obj.dt_txt).getHours();

    if (time >= 5 && time < 12) {
      categorizedData.morning = obj;
      obj.time = "Morning";
    } else if (time >= 12 && time < 17) {
      categorizedData.afternoon = obj;
      obj.time = "Afternoon";
    } else if (time >= 17 && time < 20) {
      categorizedData.evening = obj;
      obj.time = "Evening";
    } else {
      categorizedData.overnight = obj;
      obj.time = "Overnight";
    }
  });

  // Find the object closest to the current time and add currentSelected property
  let closestTimePeriod: string | null = null;
  let closestTimeDiff = Infinity;

  Object.keys(categorizedData).forEach((period) => {
    const obj = categorizedData[period];
    if (obj) {
      const time = new Date(obj.dt_txt).getHours();
      const diff = Math.abs(currentHour - time);
      if (diff < closestTimeDiff) {
        closestTimePeriod = period;
        closestTimeDiff = diff;
      }
    }
  });

  if (closestTimePeriod) {
    categorizedData[closestTimePeriod]!.currentSelected = true;
  }

  // Set currentSelected property to false for other time periods
  Object.keys(categorizedData).forEach((period) => {
    if (period !== closestTimePeriod && categorizedData[period]) {
      categorizedData[period]!.currentSelected = false;
    }
  });

  return categorizedData;
}

function findClosestTimeIndex(data: WeatherData[]): number {
  const currentTime = new Date().getTime();
  let closestIndex = 0;
  let closestDiff = Math.abs(currentTime - data[0].dt * 1000);

  for (let i = 1; i < data.length; i++) {
    const timeDiff = Math.abs(currentTime - data[i].dt * 1000);
    if (timeDiff < closestDiff) {
      closestIndex = i;
      closestDiff = timeDiff;
    }
  }

  return closestIndex;
}

// Function to create the array of five objects
export function createArrayWithTimes(data: WeatherData[]): WeatherData[] {
  const closestIndex = findClosestTimeIndex(data);
  const result: WeatherData[] = [];

  // Add the closest object with the "now" key
  result.push({ ...data[closestIndex], now: "now" });

  // Add the next four objects after the closest one
  for (let i = closestIndex + 1; i < closestIndex + 5 && i < data.length; i++) {
    const time = data[i].dt_txt.split(" ")[1]; // Extract time from dt_txt
    result.push({ ...data[i], now: time });
  }

  return result;
}

// U

// Function to group objects by day
function groupByDay(data: WeatherData[]): Record<string, WeatherData[]> {
  const grouped: Record<string, WeatherData[]> = {};

  data.forEach((item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(item);
  });

  return grouped;
}

// Function to create array with one object from each day
export function createArrayWithOneObjectPerDay(
  data: WeatherData[]
): WeatherData[] {
  const dataRequired = data.filter((item, index) => {
    if (index % 8 === 0) {
      return item;
    }
  });
  const result: WeatherData[] = [];

  // Iterate over each day and pick one object
  const newData = dataRequired.map((item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    return { ...item, now: date };
  });

  return newData;
}
