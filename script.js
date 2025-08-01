// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Update nav links to use smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// Waste Submission Form
const wasteForm = document.getElementById('wasteSubmissionForm');
const historyTableBody = document.getElementById('historyTableBody');

// Pricing rates
const rates = {
    'metal': 50,
    'decaying': 10,
    'non-decaying': 20
};

// Load submissions from localStorage
let submissions = JSON.parse(localStorage.getItem('wasteSubmissions')) || [];

// Update table on page load
updateHistoryTable();

wasteForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const date = document.getElementById('submissionDate').value;
    const type = document.getElementById('wasteType').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const notes = document.getElementById('notes').value;
    
    // Calculate earnings
    const earnings = weight * rates[type];
    
    // Create submission object
    const submission = {
        id: Date.now(),
        date: date,
        type: type,
        weight: weight,
        earnings: earnings,
        notes: notes,
        status: 'pending'
    };
    
    // Add to submissions array
    submissions.unshift(submission);
    
    // Save to localStorage
    localStorage.setItem('wasteSubmissions', JSON.stringify(submissions));
    
    // Update table
    updateHistoryTable();
    
    // Reset form
    wasteForm.reset();
    
    // Show success message
    alert(`Waste submission successful! You'll earn ₹${earnings} for ${weight}kg of ${type} waste.`);
});

function updateHistoryTable() {
    // Clear existing rows except the default ones
    const defaultRows = historyTableBody.innerHTML;
    historyTableBody.innerHTML = '';
    
    // Add user submissions
    submissions.forEach(submission => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${submission.date}</td>
            <td>${capitalizeFirst(submission.type)}</td>
            <td>${submission.weight}</td>
            <td>₹${submission.earnings}</td>
            <td><span class="status ${submission.status}">${capitalizeFirst(submission.status)}</span></td>
        `;
        historyTableBody.appendChild(row);
    });
    
    // Add default rows if no submissions
    if (submissions.length === 0) {
        historyTableBody.innerHTML = `
            <tr>
                <td>2023-06-15</td>
                <td>Metal</td>
                <td>2.5</td>
                <td>₹125</td>
                <td><span class="status completed">Completed</span></td>
            </tr>
            <tr>
                <td>2023-06-10</td>
                <td>Decaying</td>
                <td>3.2</td>
                <td>₹32</td>
                <td><span class="status completed">Completed</span></td>
            </tr>
            <tr>
                <td>2023-06-05</td>
                <td>Non-Decaying</td>
                <td>1.8</td>
                <td>₹36</td>
                <td><span class="status pending">Pending</span></td>
            </tr>
        `;
    }
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).replace('-', ' ');
}

// Search functionality
const searchInput = document.getElementById('searchHistory');
searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const rows = historyTableBody.querySelectorAll('tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

// Clear dashboard function
function clearDashboard() {
    if (confirm('Are you sure you want to clear all submissions?')) {
        submissions = [];
        localStorage.removeItem('wasteSubmissions');
        updateHistoryTable();
    }
}

// Contact Form
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send the data to a server
    alert(`Thank you for your message, ${name}! We'll get back to you soon.`);
    
    // Reset form
    contactForm.reset();
});

// Set today's date as default in the date input
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('submissionDate').value = today;
});

// Active navigation highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});