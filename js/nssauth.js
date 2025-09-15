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

const docIdSelect = document.getElementById('docId');
const form = document.getElementById('team-member-form');
const rankField = document.getElementById('rank');
const deleteButton = document.getElementById('deleteButton');

// Function to populate document IDs in the dropdown
async function populateDocIds() {
    const snapshot = await db.collection('teamMembers').get();
    snapshot.forEach(doc => {
        const option = document.createElement('option');
        option.value = doc.id;
        option.textContent = `${doc.data().role} (Rank: ${doc.data().rank})`;
        docIdSelect.appendChild(option);
    });
}

// Function to populate form fields when a document is selected
docIdSelect.addEventListener('change', async () => {
    const docId = docIdSelect.value;
    if (docId) {
        const doc = await db.collection('teamMembers').doc(docId).get();
        if (doc.exists) {
            const data = doc.data();
            form.name.value = data.name;
            form.role.value = data.role;
            form.instagramLink.value = data.instagramLink;
            form.phoneLink.value = data.phoneLink;
            rankField.value = data.rank;
        }
    } else {
        form.reset();
        rankField.value = '';
    }
});

// Function to update or add a team member
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const docId = docIdSelect.value;
    const name = form.name.value;
    const role = form.role.value;
    const photoFile = form.photo.files[0];
    const instagramLink = form.instagramLink.value;
    const phoneLink = form.phoneLink.value;
    const rank = form.rank.value;

    try {
        // Upload photo to Firebase Storage
        const photoRef = storage.ref(`teamMembers/${photoFile.name}`);
        await photoRef.put(photoFile);
        const photoURL = await photoRef.getDownloadURL();

        if (docId) {
            // Update existing team member
            await db.collection('teamMembers').doc(docId).update({
                name: name,
                role: role,
                photoPath: photoURL,
                instagramLink: instagramLink,
                phoneLink: phoneLink,
                rank: rank
            });
            alert('Team member updated successfully!');
        } else {
            // Add new team member
            const docRef = await db.collection('teamMembers').add({
                name: name,
                role: role,
                photoPath: photoURL,
                instagramLink: instagramLink,
                phoneLink: phoneLink,
                rank: rank
            });
            alert('New team member added successfully!');
            // Update dropdown with new member
            const option = document.createElement('option');
            option.value = docRef.id;
            option.textContent = `${name} (Rank: ${rank})`;
            docIdSelect.appendChild(option);
        }
        // Refresh the page after update or add
        location.reload();
    } catch (error) {
        console.error('Error updating/adding team member:', error);
        alert('Error updating/adding team member.');
    }
});

// Function to delete selected team member
deleteButton.addEventListener('click', async () => {
    const docId = docIdSelect.value;
    if (!docId) {
        alert('Select a team member to delete.');
        return;
    }

    try {
        await db.collection('teamMembers').doc(docId).delete();
        alert('Team member deleted successfully!');
        // Remove from dropdown
        docIdSelect.querySelector(`option[value="${docId}"]`).remove();
        // Reset form
        form.reset();
        rankField.value = '';
        // Refresh the page after delete
        location.reload();
    } catch (error) {
        console.error('Error deleting team member:', error);
        alert('Error deleting team member.');
    }
});

// Initial population of document IDs
populateDocIds();