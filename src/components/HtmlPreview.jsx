import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';

const firebaseConfig = {
    apiKey: "AIzaSyDmj5rcI5ctDDdWqAP7sijkJGpixMuSYdo",
    authDomain: "cv-maker-ead9a.firebaseapp.com",
    projectId: "cv-maker-ead9a",
    storageBucket: "cv-maker-ead9a.firebasestorage.app",
    messagingSenderId: "1007834907145",
    appId: "1:1007834907145:web:d63bb1cff3829b06c62ed8"
};

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


function HtmlPreview() {
    const [contentHtml, setContentHtml] = useState('');

    useEffect(() => {
        // Lấy query string từ URL
        const queryParams = new URLSearchParams(window.location.search);

        // Lấy các tham số 'type' và 'userId'
        const type = queryParams.get('type');
        const userId = queryParams.get('userId');

        console.log({ type, userId });
    }, []);  // Chạy 1 lần khi component mount

    useEffect(() => {
        const getdataDemo = async () => {
            const data = await getCoverLetterByUserId('PMWBy0PBMRMSfLQfOpVLJqjYyNr2');
            setContentHtml(data.html);
            console.log(data);
        };
        getdataDemo();
    }, []);

    return (
        <div style={{ maxWidth: '796px' }} dangerouslySetInnerHTML={{ __html: contentHtml }}>

        </div>
    );
}

export default HtmlPreview;
