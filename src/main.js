import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import YmapPlugin from 'vue-yandex-maps'

const settings = {
    apiKey: 'dc5128c5-db95-46b5-97d0-222255a2de63', 
    // P.S.: I'm not so stupid to leave a working key here :). It will be deactivated in a month.
    lang: 'ru_RU', 
    coordorder: 'latlong', 
    debug: false, 
    version: '2.1' 
}

createApp(App).use(store).use(YmapPlugin, settings).mount('#app')
