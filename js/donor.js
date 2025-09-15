document.addEventListener('DOMContentLoaded', function () {
    function calculateAge(dob) {
        const today = new Date();
        const birthdate = new Date(dob);
        const ageInMilliseconds = today - birthdate;
        const ageInYears = Math.floor(ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000));
        return ageInYears;
    }

    function updateCalculatedAge() {
        const dob = document.getElementById('dob').value;
        const ageElement = document.getElementById('calculated-age');

        if (dob) {
            const age = calculateAge(dob);
            if (age < 18 || age > 65) {
                ageElement.textContent = `Invalid Age: ${age} years. Age must be between 18 and 65 years.`;
            } else {
                ageElement.textContent = `Age: ${age} years (Valid Age to be a Donor)`;
            }
        } else {
            ageElement.textContent = '';
        }
    }

    function isValidAge(dob) {
        const age = calculateAge(dob);
        if (age < 18 || age > 65) {
            alert('Invalid Age: Age must be between 18 and 65 years.');
            return false;
        }
        return true;
    }

    function isValidPhoneNumber(phone) {
        const phoneRegex = /^\d{10}$/; // Assuming a 10-digit phone number
        return phoneRegex.test(phone);
    }

    function submitForm(event) {
event.preventDefault();

const phone = document.getElementById('phone').value;
const phoneVerification = document.getElementById('phone-verification').value;

// Validate phone number and phone verification
if (isValidPhoneNumber(phone) && phone === phoneVerification) {
const formData = {
    name: document.getElementById('name').value,
    gmail: document.getElementById('gmail').value,
    bloodGroup: document.getElementById('blood-group').value,
    dob: document.getElementById('dob').value,
    age: document.getElementById('dob').value ? calculateAge(document.getElementById('dob').value) : null,
    healthProblems: document.getElementById('health-problems').value,
    phone: phone,
    phoneVerification: phoneVerification
};

// Submit form data
fetch('/.netlify/functions/submitDonorform', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
})
.then(response => response.json())
.then(data => {
    console.log('Response from server:', data);

    if (data.message === 'Form submitted successfully') {
        alert(data.message);
        window.location.reload();
    } else {
        alert('Form submission failed');
    }
})
.catch(error => {
    console.error('Error:', error);
});
} else {
alert('Invalid phone number or phone verification. Please check and try again.');
}
}




    // Attach the updateCalculatedAge function to the change event of the date of birth input
    document.getElementById('dob').addEventListener('change', updateCalculatedAge);

    // Attach the submitForm function to the form's submit event
    document.getElementById('donor-form').addEventListener('submit', submitForm);
});