
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
const firestore = firebase.firestore();

document.addEventListener('DOMContentLoaded', async function () {
    const teamContainer = document.getElementById('team-container');

    try {
        // Fetch team members data from Firestore ordered by rank
        const snapshot = await firestore.collection('teamMembers').orderBy('rank').get();
        const teamMembers = snapshot.docs.map(doc => doc.data());

        // Loop through each team member data
        for (const member of teamMembers) {
            const photoURL = member.photoPath; // Assuming photoPath is the field in Firestore

            // Create HTML structure for each team member
            const teamMemberHTML = `
                <div class="col-md-6 col-lg-6 col-xl-3 wow fadeInUp" data-wow-delay="0.1s">
                    <div class="team-item rounded mb-4">
                        <div class="team-img rounded-top h-100">
                            <img src="${photoURL}" class="img-fluid rounded-top w-100" alt="${member.name}">
                            <div class="team-icon d-flex justify-content-center">
                                <a class="btn btn-square btn-primary text-white rounded-circle mx-1" href="${member.instagramLink}"><i class="fab fa-instagram"></i></a>
                                <a class="btn btn-square btn-primary text-white rounded-circle mx-1" href="tel:${member.phoneLink}"><i class="fas fa-phone"></i></a>
                            </div>
                        </div>
                        <div class="team-content text-center border border-primary border-top-0 rounded-bottom p-4">
                            <h5>${member.name}</h5>
                            <p class="mb-0">${member.role}</p>
                        </div>
                    </div>
                </div>
            `;

            // Append each team member HTML to the container
            teamContainer.innerHTML += teamMemberHTML;
        }
    } catch (error) {
        console.error('Error getting team member data:', error);
    }
});
