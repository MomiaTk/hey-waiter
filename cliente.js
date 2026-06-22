import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    query,
    where
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyAxsNfukE1DwDNtA609jkIDk00c5_p_nZQ",
  authDomain: "celoraheywaiter.firebaseapp.com",
  projectId: "celoraheywaiter",
  storageBucket: "celoraheywaiter.firebasestorage.app",
  messagingSenderId: "740535745216",
  appId: "1:740535745216:web:0d425b572ac87b94744b25",
  measurementId: "G-WHRLXFTV18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Obtener mesa desde la URL
const params = new URLSearchParams(window.location.search);
const mesa = params.get("mesa") || "Desconocida";
const negocioId =
    params.get("negocio") ||
    "demo_restaurante";

// Mostrar mesa en pantalla
document.getElementById("mesaNumero").textContent = mesa;

const mensaje = document.getElementById("mensaje");

// Función para enviar solicitud

async function enviarSolicitud(tipo, boton) {

    try {

        boton.disabled = true;
        boton.textContent = "⏳ Enviando...";

        const consulta = query(
    collection(db, "llamadas"),
    where("mesa", "==", mesa),
    where("negocioId", "==", negocioId)

);

const resultado = await getDocs(consulta);

if (!resultado.empty) {

    mensaje.textContent =
        "⏳ Ya existe una solicitud pendiente para esta mesa";

    return;
}

        await addDoc(collection(db, "llamadas"), {

    negocioId: negocioId,

    mesa: mesa,
    tipo: tipo,
    fecha: new Date()

});

        boton.textContent = "✅ Enviado";

        mensaje.textContent =
            "Solicitud enviada correctamente";

    } catch (error) {

        console.error(error);

        boton.textContent = "❌ Error";

        mensaje.textContent =
            error.message;
    }
}

// Eventos botones
document
.getElementById("btnMesero")
.addEventListener("click", function() {

    enviarSolicitud("Llamar Mesero", this);

});

document
.getElementById("btnCuenta")
.addEventListener("click", function () {

        enviarSolicitud(
            "Solicitar Cuenta",
            this
        );

    });

document
.getElementById("btnPedido")
.addEventListener("click", function () {

        enviarSolicitud(
            "Nuevo Pedido",
            this
        );

    });

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
