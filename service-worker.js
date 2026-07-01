self.addEventListener("install", (event) => {

    console.log("Service Worker instalado");

});
const CACHE_NAME = "heywaiter-v1";

self.addEventListener("activate", (event) => {

    console.log("Service Worker activado");

});