import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyAxsNfukE1DwDNtA609jkIDk00c5_p_nZQ",
  authDomain: "celoraheywaiter.firebaseapp.com",
  projectId: "celoraheywaiter",
  storageBucket: "celoraheywaiter.firebasestorage.app",
  messagingSenderId: "740535745216",
  appId: "1:740535745216:web:0d425b572ac87b94744b25",
  measurementId: "G-WHRLXFTV18"
}

const db = initializeFirestore(app, {
      localCache: persistentLocalCache({
              tabManager: persistentSingleTabManager()
                  })
                  });

                  export { db };

export const db = getFirestore(app);