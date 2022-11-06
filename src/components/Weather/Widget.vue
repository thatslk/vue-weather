<template>
    <div class="widget">
        
        <div class="widget-wrapper">
            
            <div class="widget-map-wrapper">
                <yandex-map 
                    :coordinates="[lat, lon]"
                    :controls="[]">
                </yandex-map>
            </div>
            <div class="widget-content">
                <div class="widget-content-wrapper">
                    <img class="widget-content__icon" :src="'https://developer.accuweather.com/sites/default/files/' + iconId + '-s.png'"/>
                    <h1 class="widget-content__tempertature">{{props.temperature}} °C</h1>
                </div>
                <div class="widget-tags">
                    <data-tag type="Город" :value="cityName" />
                    <data-tag type="Сейчас" :value="weatherCondition" />
                    <data-tag type="Координаты" :value="lat + ', ' + lon" />
                    <data-tag type="Местное время" :value="localTime" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import DataTag from './DataTag.vue'
import { defineProps } from 'vue'

const props = defineProps({
    temperature: String,
    lat: Number,
    lon: Number,
    cityName: String,
    weatherCondition: String,
    iconId: String,
    localTime: String,
})

</script>

<style lang="scss"> 

.yandex-container {
  height: 200px;
  width: 200px;
  border-radius: 10px;
}

.widget {
    width: 793px;
    min-height: 205px;
    height: auto;
    border-radius: 10px;
    background-color: #FFF;
    padding: 28px 32px;
    box-sizing: border-box;

    &-wrapper {
        display: flex;
        gap: 15px;
    }

    &-map {
        width: 150px;
        height: 150px;
        background-color: #9CC0F9;

        &-wrapper {
            border-radius: 10px;
        }
    }

    &-content {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: left;
        text-align: left;

        &-wrapper {
            display: flex;
        }

        &__icon {
            width: 75px;
            height: 45px;
            margin: auto 0 auto -10px;
        }

        &__tempertature {
            font-style: normal;
            font-family: "Roboto";
            font-weight: 400;
            font-size: 49px;
            line-height: 76px;
            color: #000000;
            margin: 0;
        }

        &__description{
            margin: 0;
        }
    }

    &-tags {
        display: flex;
        width: 530px;
        height: auto;
        max-width: 530px;
        flex-wrap: wrap;
        gap: 10px;
    }
}
</style>