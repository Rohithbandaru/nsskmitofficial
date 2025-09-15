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
const firestore = firebase.firestore();

// Function to fetch and display events for a specific page
async function displayEvents(pageNumber) {
const eventContainer = document.getElementById('eventCardsContainer');
const eventsPerPage = 8; // Number of events per page

try {
    // Fetch events data from Firestore based on rank
    const snapshot = await firestore.collection('events').orderBy('rank').get();
    const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Calculate start and end index for events array based on page number
    const startIndex = (pageNumber - 1) * eventsPerPage;
    const endIndex = startIndex + eventsPerPage;

    // Slice the events array for the current page
    const pageEvents = events.slice(startIndex, endIndex);

    // Clear previous content in event container
    eventContainer.innerHTML = '';

    // Loop through each event data for the current page
    pageEvents.forEach(event => {
        const url = event.photoPath; // Directly use the URL stored in Firestore

        // Create HTML structure for each event
        const eventHTML = `
            <div class="col-md-6 col-lg-4 col-xl-3 wow fadeInUp" data-wow-delay="0.1s">
                <div class="service-item rounded">
                    <div class="service-img rounded-top">
                        <img src="${url}" class="img-fluid rounded-top w-100" alt="${event.eventName}">
                    </div>
                    <div class="service-content rounded-bottom bg-light p-4">
                        <div class="service-content-inner">
                            <h5 class="mb-4">${event.eventName}</h5>
                            <a href="${event.reportLink}" class="btn btn-primary rounded-pill text-white py-2 px-4 mb-2" target="_blank">Read More</a>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Append each event HTML to the container
        eventContainer.innerHTML += eventHTML;
    });

} catch (error) {
    console.error('Error getting event data:', error);
}
}

// Initial load of events for the first page
document.addEventListener('DOMContentLoaded', () => {
displayEvents(1); // Display events for the first page by default
});


function navigateToPage(pageNumber) {
    let url;
    switch(pageNumber) {
        case 1:
            url = "service.html";
            break;
        case 2:
            url = "page2.html"; // replace with the actual link to page 2
            break;
        case 3:
            url = "page3.html"; // replace with the actual link to page 3
            break;
        case 4:
            url = "page4.html"; // replace with the actual link to page 3
            break;
        case 5:
            url = "page5.html"; // replace with the actual link to page 3
            break;
        case 6:
            url = "page6.html"; // replace with the actual link to page 3
            break;
        case 7:
            url = "page7.html"; // replace with the actual link to page 3
            break;
        case 8:
            url = "page8.html"; // replace with the actual link to page 3
            break;
        default:
            url = "index.html"; // fallback in case of an invalid page number
    }
    window.location.href = url;
}
