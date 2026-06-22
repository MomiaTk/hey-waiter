import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getFirestore,
    collection,
    onSnapshot,
    query,
    where,
    doc,
    getDoc,
    deleteDoc
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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const alerta = document.getElementById("alerta");
const sonido = document.getElementById("sonido");
const listaLlamadas = document.getElementById("listaLlamadas");

function nuevaLlamada(mesa, tipo) {

    alerta.innerHTML =
        `🔔 Mesa ${mesa}<br>${tipo}`;

    if (navigator.vibrate) {
        navigator.vibrate([500, 200, 500]);
    }

    sonido.play().catch(() => {});

}
async function atenderMesa(idDocumento) {

    try {

        await deleteDoc(
            doc(db, "llamadas", idDocumento)
        );

        console.log("Mesa atendida");

    } catch(error) {

        console.error(error);

    }

}
window.atenderMesa = atenderMesa;
let llamadasConocidas = new Set();

const params = new URLSearchParams(
    window.location.search
);

const negocioId =
    params.get("negocio") ||
    "demo_restaurante";
    cargarNegocio();

const llamadasQuery = query(
    collection(db, "llamadas"),
    where("negocioId", "==", negocioId)
);

async function cargarNegocio() {

    try {

        const negocioRef =
            doc(db, "negocios", negocioId);

        const negocioSnap =
            await getDoc(negocioRef);

        if (!negocioSnap.exists()) {

            alert(
                "Negocio no encontrado"
            );

            return;
        }

        const negocio =
            negocioSnap.data();

        console.log(
            "Negocio cargado:",
            negocio
        );

    } catch(error) {

        console.error(error);

    }

}

onSnapshot(llamadasQuery, (snapshot) => {

    listaLlamadas.innerHTML = "";

    const llamadas = [];

    snapshot.forEach((documento) => {
        
        if (!llamadasConocidas.has(documento.id)) {

    if (llamadasConocidas.size > 0) {

        const datos = documento.data();

        nuevaLlamada(
            datos.mesa,
            datos.tipo
        );

    }

    llamadasConocidas.add(documento.id);

}

        llamadas.push({
            id: documento.id,
            ...documento.data()
        });

    });

    llamadas.sort((a, b) => {

        return b.fecha.seconds - a.fecha.seconds;

    });

    llamadas.forEach((datos) => {
            const hora = datos.fecha.toDate().toLocaleTimeString();
        listaLlamadas.innerHTML += `
      <div class="llamada">

           <h3>🍽️ Mesa ${datos.mesa}</h3>

          <p>${datos.tipo}</p>

           <small>🕒 ${hora}</small>

         <br><br>

               <button
                  onclick="atenderMesa('${datos.id}')"
          >
            ✅ Atendida
           </button>

    </div>
`;

    });

});

