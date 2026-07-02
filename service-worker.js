const CACHE_NAME = "heywaiter-v1";
self.addEventListener("install", (event) => {

    console.log("Service Worker instalado");

});


self.addEventListener("activate", (event) => {

    console.log("Service Worker activado");

});