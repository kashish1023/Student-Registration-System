const studentForm = document.getElementById('studentForm');
const studentTableBody = document.querySelector('#studentTable tbody');
let students = JSON.parse(localStorage.getItem('students')) || [];

window.addEventListener('DOMContentLoaded', loadStudents);

studentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors(); // Clear previous errors

    const formData = new FormData(studentForm);
    const student = {
        name: formData.get('studentName'),
        id: formData.get('studentID'),
        email: formData.get('emailID'),
        contact: formData.get('contactNo'),
        class: formData.get('class'),
        address: formData.get('address'),
    };

    if (validateForm(student)) {
        students.push(student);
        updateLocalStorage();
        renderStudents();
        studentForm.reset();
    }
});

function validateForm(student) {
    let isValid = true;

    // Check each input field and display an error if invalid
    if (!student.name) {
        showError('studentName', 'nameError');
        isValid = false;
    }
    if (!student.id) {
        showError('studentID', 'idError');
        isValid = false;
    }
    if (!validateEmail(student.email)) {
        showError('emailID', 'emailError');
        isValid = false;
    }
    if (!validateContact(student.contact)) {
        showError('contactNo', 'contactError');
        isValid = false;
    }
    if (!student.class) {
        showError('class', 'classError');
        isValid = false;
    }
    if (!student.address) {
        showError('address', 'addressError');
        isValid = false;
    }

    return isValid;
}

function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
}

function validateContact(contact) {
    const contactPattern = /^\d{10}$/;
    return contactPattern.test(contact);
}

function showError(inputId, errorId) {
    const input = document.getElementById(inputId);
    const errorMessage = document.getElementById(errorId);

    input.classList.add('input-error');  // Highlight the input field with an error
    errorMessage.style.display = 'block'; // Show the error message
}

function clearErrors() {
    const inputs = document.querySelectorAll('.form-box input, .form-box textarea');
    const errorMessages = document.querySelectorAll('.error-message');

    inputs.forEach(input => input.classList.remove('input-error')); // Remove previous error highlights
    errorMessages.forEach(message => message.style.display = 'none'); // Hide all error messages
}

function renderStudents() {
    studentTableBody.innerHTML = '';
    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>${student.class}</td>
            <td>${student.address}</td>
            <td>
                <button class="edit-button" onclick="editStudent(${index})">Edit</button>
                <button class="delete-button" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        studentTableBody.appendChild(row);
    });
}

function editStudent(index) {
    const student = students[index];
    document.getElementById('studentName').value = student.name;
    document.getElementById('studentID').value = student.id;
    document.getElementById('emailID').value = student.email;
    document.getElementById('contactNo').value = student.contact;
    document.getElementById('class').value = student.class;
    document.getElementById('address').value = student.address;
}

function deleteStudent(index) {
    students.splice(index, 1);
    updateLocalStorage();
    renderStudents();
}

function updateLocalStorage() {
    localStorage.setItem('students', JSON.stringify(students));
}

function loadStudents() {
    renderStudents();
}
