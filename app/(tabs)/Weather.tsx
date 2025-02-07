import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import axios from "axios";

interface WeatherData {
  name: string;
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: { description: string; icon: string }[];
  wind: { speed: number };
  sys: {
    sunrise: number;
    sunset: number;
  };
}

const Weather = () => {
  const [city, setCity] = useState("Iligan City");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=d862b4b7a910dbfe9ca8dca553055bd0`
      );
      setWeatherData(response.data);
    } catch (error) {
      Alert.alert("Error", "City not found. Please enter a valid city name.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ImageBackground
    source={{
      uri: "https://images.tech.co/wp-content/uploads/2015/06/weather.jpg", // Replace with the correct direct URL
    }}
    style={styles.background}
  >
  
      <View style={styles.container}>
        <Text style={styles.title}>Weather App</Text>

        <TextInput
          placeholder="Enter city name"
          value={city}
          onChangeText={setCity}
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={fetchData}>
          <Text style={styles.buttonText}>Get Weather</Text>
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator size="large" color="#007BFF" />
        ) : weatherData ? (
          <ScrollView>
            <View style={styles.card}>
              <Text style={styles.city}>{weatherData.name}</Text>
              <Text style={styles.date}>
                {new Date(weatherData.dt * 1000).toLocaleDateString("en-IN")}
              </Text>

              <Image
                source={{
                  uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`,
                }}
                style={styles.weatherIcon}
              />

              <Text style={styles.temperature}>{weatherData.main.temp}°C</Text>
              <Text style={styles.description}>
                {weatherData.weather[0].description}
              </Text>

              <View style={styles.details}>
                <Text>Feels Like: {weatherData.main.feels_like}°C</Text>
                <Text>Wind: {weatherData.wind.speed} m/s</Text>
                <Text>Humidity: {weatherData.main.humidity}%</Text>
                <Text>Air Pressure: {weatherData.main.pressure} hPa</Text>
                <Text>
                  Sunrise:{" "}
                  {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(
                    "en-IN"
                  )}
                </Text>
                <Text>
                  Sunset:{" "}
                  {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(
                    "en-IN"
                  )}
                </Text>
              </View>
            </View>
          </ScrollView>
        ) : (
          <Text style={styles.loadingText}>No weather data available</Text>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
    background: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center",
    },
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "rgba(135, 206, 235, 0.5)", // More transparent sky blue overlay
      alignItems: "center",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      color: "black",
    },
    input: {
      height: 40,
      borderColor: "#ccc",
      borderWidth: 2,
      borderRadius: 10,
      marginBottom: 10,
      paddingLeft: 10,
      width: "80%",
      backgroundColor: "rgba(255, 255, 255, 0.1)", // Semi-transparent white input
    },
    button: {
      backgroundColor: "rgba(0, 0, 128, 0.6)",
      paddingVertical: 10,
      borderRadius: 10,
      alignItems: "center",
      width: "80%",
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    card: {
      backgroundColor: "rgba(255, 255, 255, 0.1)", // Semi-transparent white card
      padding: 40,
      borderRadius: 15,
      width: "100%",
      alignItems: "center",
      elevation: 5,
      marginTop: 20,
      borderWidth: 2,
      borderColor: "#ccc",
    },
    city: {
      fontSize: 25,
      fontWeight: "bold",
      color: "#333",
    },
    date: {
      fontSize: 14,
      color: "#555",
      marginBottom: 10,
    },
    weatherIcon: {
      width: 100,
      height: 80,
      marginBottom: 10,
    },
    temperature: {
      fontSize: 30,
      fontWeight: "bold",
      color: "#333",
    },
    description: {
      fontSize: 22,
      color: "#666",
      marginBottom: 10,
    },
    details: {
      width: "100%",
      paddingHorizontal: 20,
      marginTop: 10,
    },
    loadingText: {
      fontSize: 16,
      color: "#555",
    },
  });
  

export default Weather;
