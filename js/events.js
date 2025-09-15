// Your web app's Firebase configuration
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
const db = firebase.firestore();
const storage = firebase.storage();

const eventIdSelect = document.getElementById('eventId');
const eventForm = document.getElementById('event-form');
const deleteEventButton = document.getElementById('deleteEventButton');

// Function to populate event IDs in the dropdown
async function populateEventIds() {
    const snapshot = await db.collection('events').orderBy('rank').get();
    snapshot.forEach(doc => {
        const option = document.createElement('option');
        option.value = doc.id;
        option.textContent = doc.data().eventName;
        eventIdSelect.appendChild(option);
    });
}

// Function to populate form fields when an event is selected
eventIdSelect.addEventListener('change', async () => {
    const eventId = eventIdSelect.value;
    if (eventId) {
        const doc = await db.collection('events').doc(eventId).get();
        if (doc.exists) {
            const data = doc.data();
            eventForm.eventName.value = data.eventName;
            eventForm.rank.value = data.rank;
            // These fields are for display only, files cannot be pre-filled
            // eventForm.photoPath.value = data.photoPath;
            // eventForm.reportLink.value = data.reportLink;
        }
    } else {
        eventForm.reset();
    }
});

// Function to update or add an event
eventForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const eventId = eventIdSelect.value;
    const eventName = eventForm.eventName.value;
    const rank = parseInt(eventForm.rank.value);
    const photoFile = eventForm.photo.files[0];
    const reportFile = eventForm.report.files[0];

    try {
        // Upload files to Firebase Storage
        const photoRef = storage.ref(`events/${photoFile.name}`);
        const reportRef = storage.ref(`events/${reportFile.name}`);

        await photoRef.put(photoFile);
        await reportRef.put(reportFile);

        const photoURL = await photoRef.getDownloadURL();
        const reportURL = await reportRef.getDownloadURL();

        if (eventId) {
            // Update existing event
            await db.collection('events').doc(eventId).update({
                eventName: eventName,
                rank: rank,
                photoPath: photoURL,
                reportLink: reportURL
            });
            alert('Event updated successfully!');
        } else {
            // Add new event
            const docRef = await db.collection('events').add({
                eventName: eventName,
                rank: rank,
                photoPath: photoURL,
                reportLink: reportURL
            });
            alert('New event added successfully!');
            // Update dropdown with new event
            const option = document.createElement('option');
            option.value = docRef.id;
            option.textContent = eventName;
            eventIdSelect.appendChild(option);
        }
        // Refresh the page after update or add
        location.reload();
    } catch (error) {
        console.error('Error updating/adding event:', error);
        alert('Error updating/adding event.');
    }
});

// Function to delete selected event
deleteEventButton.addEventListener('click', async () => {
    const eventId = eventIdSelect.value;
    if (!eventId) {
        alert('Select an event to delete.');
        return;
    }

    try {
        await db.collection('events').doc(eventId).delete();
        alert('Event deleted successfully!');
        // Remove from dropdown
        eventIdSelect.querySelector(`option[value="${eventId}"]`).remove();
        // Reset form
        eventForm.reset();
        // Refresh the page after delete
        location.reload();
    } catch (error) {
        console.error('Error deleting event:', error);
        alert('Error deleting event.');
    }
});

// Initial population of event IDs
populateEventIds();