const firebaseConfig = {
    apiKey: "AIzaSyBl9M2WAmSnJFhky66OL4Sn4YzEmrnwvvA",
    authDomain: "nsskmitauth.firebaseapp.com",
    projectId: "nsskmitauth",
    storageBucket: "nsskmitauth.appspot.com",
    messagingSenderId: "88019575925",
    appId: "1:88019575925:web:c8b27ffed9bb03169b843c",
    measurementId: "G-D5FM01D17G"
  };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

document.addEventListener('DOMContentLoaded', async function () {
    const videoElement1 = document.getElementById('plyrVideo1');
    const videoElement2 = document.getElementById('plyrVideo2');

    try {
        // Video 1
        const videoRef1 = storage.ref().child('home page videos/video 1.MP4');
        const url1 = await videoRef1.getDownloadURL();
        videoElement1.src = url1;
        videoElement1.load(); // Reload the video with the new source

        // Video 2 (example, update with your actual video path)
        const videoRef2 = storage.ref().child('home page videos/video 2.MP4');
        const url2 = await videoRef2.getDownloadURL();
        videoElement2.src = url2;
        videoElement2.load(); // Reload the video with the new source
    } catch (error) {
        console.error('Error getting video URL:', error);
    }
});