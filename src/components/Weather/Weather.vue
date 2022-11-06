<template>
    <section class="search">
        <div class="search-wrapper">
            <div class="search-box">
                <div class="search-box-container">
                    <input type="number" class="search-box__input" placeholder="Широта"
                        v-model="main.searchState.lat" />
                    <input type="number" class="search-box__input" placeholder="Долгота" v-model="main.searchState.lon" />
                    <button class="search-box__button" value="" @click="main.fetchData()">
                        Vue weather!
                    </button>
                </div>
            </div>
        </div>
    </section>

    <section class="welcome" v-if="main.searchState.widgets.length === 0">
        <div class="welcome-wrapper">
            <h1>Welcome to Vue Weather!</h1>
            <p>Здесь вы можете посмотреть текущую погоду в указанной вами локации. Для этого введите долготу и широту вашей локации в поля выше.</p>
            <p>Попробуйте, например: </p>
            <ul>
                <li>город Екатеринбург: <b>56.838011, 60.597474</b></li>
                <li>город Писек: <b>49.309492, 14.151026</b></li>
                <li>город Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch: <b>53.220918, -4.202822</b></li>
            </ul>
            <p>Сервис использует бесплатную версию API AccuWeather. Пожалуйста, не отправляйте более 50 запросов в день.</p>
        </div>
    </section>

    <section class="weather-widgets" v-else>
        <div class="weather-widgets-wrapper">
            <widget v-for="widgetData in main.searchState.widgets" :temperature="widgetData.temperature"
                :key="widgetData.locationKey" :lat="widgetData.lat" :lon="widgetData.lon"
                :city-name="widgetData.nearestCityName" :weatherCondition="widgetData.weatherCondition"
                :icon-id="widgetData.weatherIconId" :local-time="widgetData.locationTime" />
        </div>
    </section>
</template>

<script setup>
import Widget from "./Widget.vue";
import { useSearch } from "@/services/search.js";

const main = { ...useSearch() };
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap");

.search {
    &-wrapper {
        display: flex;
        justify-content: center;
    }

    &-box {
        display: flex;
        width: 793px;
        height: 75px;
        background-color: #fff;
        border-radius: 10px;

        &-container {
            display: flex;
            margin: auto;
            gap: 24px;
        }

        &__input {
            background-color: #dfdfdf;
            border: none;
            border-radius: 10px;
            width: 241px;
            height: 37px;
            padding: 10px 20px;
            box-sizing: border-box;

            &::placeholder {
                color: #75606a;
                font-family: "Roboto";
            }

            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }

            &[type=number] {
                -moz-appearance: textfield;
            }
        }

        &__button {
            background-color: #3fb27f;
            border: none;
            color: #fff;
            border-radius: 10px;
            width: 184px;
            height: 37px;
            box-sizing: border-box;
            font-family: "Roboto";
            font-weight: 500;
            font-size: 15px;
        }
    }
}

.welcome {
    margin: 30px auto 0px auto;
    display: flex;

    &-wrapper {
        margin: 0 auto;
        border-radius: 10px;
        background-color: #FFF;
        width: 793px;
        padding: 15px 39.5px;
        box-sizing: border-box;

        & h1 {
            color: #3FB27F;
        }

        & p, & li{
            text-align: left;
            margin: 10px 0;
        }

        & b {
            background-color: #dfdfdf;
            padding: 3px 8px;
            box-sizing: border-box;
            border-radius: 5px;
        }
    }
}

.weather-widgets {
    margin: 30px auto 0px auto;
    display: flex;

    &-wrapper {
        gap: 20px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin-bottom: 50px;
    }
}
</style>
