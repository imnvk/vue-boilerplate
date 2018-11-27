import Vue from "vue";
import AppComponent from "./App.vue";
import "vuetify/dist/vuetify.min.css";
import * as Vuetify from 'vuetify';
import "./error/index";

 
Vue.use(<any>Vuetify);

new Vue({
    el: "#app",
    template: "<AppComponent/>",
    components: { AppComponent }
});