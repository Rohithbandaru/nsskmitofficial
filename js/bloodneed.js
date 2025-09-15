document.addEventListener('DOMContentLoaded', function () {
    function submitForm() {
        // Get form data
        const name = document.getElementById('name').value;
        const gender = document.getElementById('gender').value;
        const bloodGroup = document.getElementById('blood-group').value;
        const packets = document.getElementById('packets').value;
        const hospital = document.getElementById('hospital').value;
        const fromKmit = document.getElementById('from-kmit').value;
        const phone = document.getElementById('phone').value;
        const phoneVerification = document.getElementById('phone-verification').value;

        // Validate phone number and phone verification
        if (phone !== phoneVerification) {
            alert('Phone number and phone verification do not match. Please check and try again.');
            return;
        }

        const formData = {
            name: name,
            gender: gender,
            bloodGroup: bloodGroup,
            packets: packets,
            hospital: hospital,
            fromKmit: fromKmit,
            phone: phone,
            phoneVerification: phoneVerification,
        };

        // Display loading/spinner if needed

        // Trigger Netlify Function for form submission
        fetch('/.netlify/functions/submitDonorform', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert(data.message);

            // Display donor information if available
if (data.donorData && data.donorData.length > 0) {
// Display donor information in the specified container
const donorInfoContainer = document.getElementById('donorInfoContainer');

// Create a table element
const table = document.createElement('table');
table.id = 'donorTable'; // Set an ID for styling
table.border = '1';

// Create a header row
const headerRow = table.insertRow(0);
const nameHeader = headerRow.insertCell(0);
const bloodGroupHeader = headerRow.insertCell(1);
const phoneHeader = headerRow.insertCell(2);
nameHeader.innerHTML = '<b>Name</b>';
bloodGroupHeader.innerHTML = '<b>Blood Group</b>';
phoneHeader.innerHTML = '<b>Phone</b>';

// Iterate through donor data and create rows
data.donorData.forEach((donor, index) => {
const row = table.insertRow(index + 1);
const nameCell = row.insertCell(0);
const bloodGroupCell = row.insertCell(1);
const phoneCell = row.insertCell(2);

// Set cell values
nameCell.innerHTML = donor.name;
bloodGroupCell.innerHTML = donor.bloodGroup;
phoneCell.innerHTML = donor.phone;
});

// Clear existing content and append the table
donorInfoContainer.innerHTML = '';
donorInfoContainer.appendChild(table);
} else {
// Clear the donorInfoContainer if no donor data is available
document.getElementById('donorInfoContainer').innerHTML = '';
}



            // Additional handling if needed
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Internal Server Error');
        });
    }

    document.getElementById('recipient-form').addEventListener('submit', function (event) {
        event.preventDefault();
        submitForm();
    });
});