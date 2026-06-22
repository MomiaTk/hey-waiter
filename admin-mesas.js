import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getFirestore,
    collection,
    query,
    where,
    onSnapshot
}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


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

const params =
    new URLSearchParams(
        window.location.search
    );

const negocioId =
    params.get("negocio")
    || "demo_restaurante";

    const listaMesas =
    document.getElementById(
        "listaMesas"
    );

const mesasQuery = query(
    collection(db, "mesas"),
    where(
        "negocioId",
        "==",
        negocioId
    )
);

onSnapshot(
    mesasQuery,
    (snapshot) => {

        listaMesas.innerHTML = "";

        snapshot.forEach(
            (documento) => {

                const mesa =
                    documento.data();

                listaMesas.innerHTML += `
                    <div class="mesa-card">

                        <h3>
                            Mesa ${mesa.numero}
                        </h3>

                    </div>
                `;

            }
        );

    }
);
