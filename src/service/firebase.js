import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDmj5rcI5ctDDdWqAP7sijkJGpixMuSYdo",
    authDomain: "cv-maker-ead9a.firebaseapp.com",
    projectId: "cv-maker-ead9a",
    storageBucket: "cv-maker-ead9a.firebasestorage.app",
    messagingSenderId: "1007834907145",
    appId: "1:1007834907145:web:d63bb1cff3829b06c62ed8"
};

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_apiKey,
//     authDomain: process.env.REACT_APP_authDomain,
//     projectId: process.env.REACT_APP_projectId,
//     storageBucket: process.env.REACT_APP_storageBucket,
//     messagingSenderId: process.env.REACT_APP_messagingSenderId,
//     appId: process.env.REACT_APP_appId
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebase_db = getFirestore(app);

async function getData(document, userId) {
    const docRef = doc(firebase_db, document, userId);
    try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return null;
        }
    }
    catch (ex) {

    }
}

// Cover letter
const getCoverLetterByUserId = async (userId) => {
    const data = await getData("coverLetters", userId);
    return data;
}

// Cover letter
const getResumeByUserId = async (userId) => {
    const data = await getData("resumes", userId);
    return data;
}

export { getCoverLetterByUserId, getResumeByUserId }