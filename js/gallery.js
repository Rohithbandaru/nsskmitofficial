const firebaseConfig = {
    apiKey: "AIzaSyDEEwOv6tA3e6_Bx_OHhiWO1-9erDIBvd0",
    authDomain: "gallery-4a51d.firebaseapp.com",
    projectId: "gallery-4a51d",
    storageBucket: "gallery-4a51d.appspot.com",
    messagingSenderId: "752225685620",
    appId: "1:752225685620:web:8241d3ed63a41619f7c121",
    measurementId: "G-KBS0ZS71S4"
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();

  document.addEventListener('DOMContentLoaded', async function () {
    const container = document.querySelector('.content-section');

    if (container) {
      const storageRef = firebase.storage().ref().child('images');

      try {
        const result = await storageRef.listAll();

        for (const item of result.items) {
          try {
            const url = await item.getDownloadURL();

            // Create an anchor element with BaguetteBox attributes
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.setAttribute('data-caption', 'Image Caption'); // Replace with a meaningful caption

            // Create image element and append it to the anchor
            const img = document.createElement('img');
            img.src = url;
            img.alt = 'Firebase Image';
            anchor.appendChild(img);

            // Append the anchor to the container
            container.appendChild(anchor);
          } catch (error) {
            console.error('Error getting download URL:', error);
          }
        }

        // Initialize BaguetteBox after adding all images
        baguetteBox.run('.content-section');
      } catch (error) {
        console.error('Error listing items:', error);
      }
    } else {
      console.error('Container not found');
    }
  });