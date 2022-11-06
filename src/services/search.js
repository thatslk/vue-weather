import axios from "axios";
import { reactive } from 'vue';

const API_KEY = "gOWHYgG5xHxnGO2psQ6GSTipOtDGcunF"

export function useSearch() { 
    const searchState = reactive({
        lat: "",
        lon: "",
        widgets: []
    })

    const fetchData = async () => {
        let newWidget = {}
        validateCoordinates(searchState);

        await fetchPosition(searchState)
        .then(async (resp) => {
            appendPositionData(newWidget, resp);
            return await fetchWeather(resp.data.Key);
        })
        .then(resp => {
            appendWeatherData(newWidget, resp);
            searchState.widgets.unshift(newWidget);
        })
        .catch(e => {
            alert("Кажется, что-то пошло не по плану. Попробуйте еще раз. ");
            console.log(e)
        })
        .finally(() => {
            searchState.lat = "";
            searchState.lon = "";
        })
    }
    return { searchState, fetchData }
}

function validateCoordinates(searchState) {
    if(searchState.lat < -90 || searchState.lat > 90 || searchState.lon < -180 || searchState.lon > 180 || searchState.lat === "" || searchState.lon === "") {
        alert('Координаты указаны неверно. \nШирота может принимать значения из интервала [-90; 90], а долгота из интервала [-180; 180]');
        return;
    }
}

function determineNearestCity(resp) {
    if(resp.data.LocalizedName === "") {
        if("ParentCity" in resp.data) {
            return resp.data.ParentCity.LocalizedName
        }
        else {
            return resp.data.EnglishName
        }
    }
    else {
        if("ParentCity" in resp.data) {
            return resp.data.LocalizedName + ", " + resp.data.ParentCity.LocalizedName;
        }
        else {
            return resp.data.LocalizedName
        }
    }
}

async function fetchPosition(searchState) {
    return axios.get("https://dataservice.accuweather.com/locations/v1/cities/geoposition/search", {
        params: {
            apikey: API_KEY,
            q: searchState.lat + ", " + searchState.lon,
            language: "ru-ru"
        }
    })
}

async function fetchWeather(geoKey) {
    return axios.get("https://dataservice.accuweather.com/currentconditions/v1/" + geoKey , {
        params: {
            apikey: API_KEY,
            language: "ru-ru"
        }
    })
}

function appendPositionData(newWidget, resp) {
    newWidget.lat = resp.data.GeoPosition.Latitude;
    newWidget.lon = resp.data.GeoPosition.Longitude;
    newWidget.locationKey = resp.data.Key;
    let locationDate = new Date(((resp.data.TimeZone.GmtOffset * 3600) + Math.floor(Date.now() / 1000)) * 1000);
    newWidget.locationTime = locationDate.getUTCHours() + ":" + locationDate.getUTCMinutes();
    newWidget.nearestCityName = determineNearestCity(resp);
}

function appendWeatherData(newWidget, resp) {
    newWidget.temperature = resp.data[0].Temperature.Metric.Value;
    newWidget.weatherCondition = resp.data[0].WeatherText;
    newWidget.weatherIconId = resp.data[0].WeatherIcon < 10 ? "0" + resp.data[0].WeatherIcon : resp.data[0].WeatherIcon;
}