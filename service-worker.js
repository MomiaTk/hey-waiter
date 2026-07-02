// ===== HeyWaiter Service Worker v1.0 =====

const CACHE_NAME = "heywaiter-v1";

const APP_ASSETS = [

    "/",

        "/mesero.html",

            "/style.css",

                "/mesero.js",

                    "/js/config.js",

                        "/icon-192.png",

                            "/icon-512.png",

                                "/manifest.json"

                                ];


                                // ==========================
                                // INSTALACIÓN
                                // ==========================

                                self.addEventListener("install", (event) => {

                                    console.log("📦 Instalando HeyWaiter...");

                                        event.waitUntil(

                                                caches.open(CACHE_NAME)

                                                            .then((cache) => {

                                                                            return cache.addAll(APP_ASSETS);

                                                                                        })

                                                                                            );

                                                                                                self.skipWaiting();

                                                                                                });


                                                                                                // ==========================
                                                                                                // ACTIVACIÓN
                                                                                                // ==========================

                                                                                                self.addEventListener("activate", (event) => {

                                                                                                    console.log("✅ HeyWaiter activado");

                                                                                                        event.waitUntil(

                                                                                                                caches.keys().then((keys) => {

                                                                                                                            return Promise.all(

                                                                                                                                            keys.map((key) => {

                                                                                                                                                                if (key !== CACHE_NAME) {

                                                                                                                                                                                        console.log("🗑 Eliminando", key);

                                                                                                                                                                                                                return caches.delete(key);

                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                    })

                                                                                                                                                                                                                                                                );

                                                                                                                                                                                                                                                                        })

                                                                                                                                                                                                                                                                            );

                                                                                                                                                                                                                                                                                self.clients.claim();

                                                                                                                                                                                                                                                                                });


                                                                                                                                                                                                                                                                                // ==========================
                                                                                                                                                                                                                                                                                // PETICIONES
                                                                                                                                                                                                                                                                                // ==========================

                                                                                                                                                                                                                                                                                self.addEventListener("fetch", (event) => {

                                                                                                                                                                                                                                                                                    event.respondWith(

                                                                                                                                                                                                                                                                                            caches.match(event.request)

                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                            .then((response) => {

                                                                                                                                                                                                                                                                                                                        if (response) {

                                                                                                                                                                                                                                                                                                                                            return response;

                                                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                                                            return fetch(event.request);

                                                                                                                                                                                                                                                                                                                                                                                        })

                                                                                                                                                                                                                                                                                                                                                                                            );

                                                                                                                                                                                                                                                                                                                                                                                            });