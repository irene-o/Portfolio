const button = document.getElementById("contactButton");
const carousel = document.getElementById("carouselinfo");

const colors = ["dark", "primary", "info", "success"];

// Add event listener for the carousel slide event
carousel.addEventListener("slid.bs.carousel", () => {
    // Get the index of the currently active slide
    const activeIndex = Array.from(carousel.querySelectorAll(".carousel-item"))
      .findIndex(item => item.classList.contains("active"));

    // Remove all btn-* classes from the button
    button.className = button.className.replace(/\bbtn-\S+/g, "").trim();

    // Add the new btn-* class based on the active slide
    button.classList.add(`btn-${colors[activeIndex]}`);
});

// Select all tabs
const tabs = document.querySelectorAll('.tab');

// Add click event to each tab
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove 'active' styling from all tabs
        tabs.forEach(t => {
            t.style.backgroundColor = 'transparent';
            t.style.borderColor = 'transparent';
        });

        // Add 'active' styling to clicked tab
        tab.style.backgroundColor = 'rgb(176, 255, 255)';
        tab.style.borderColor = 'black';
    });
});


document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from refreshing the page
    submitButton.style.display = 'none';
    submittingButton.style.display = 'block';

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const replyEmail = document.getElementById('replyEmail').value;
    const message = document.getElementById('message').value;

    const emailData = {
        firstName: firstName,
        lastName: lastName,
        replyEmail: replyEmail,
        message: message
    };

    emailjs.init('G1npnWQTE-f71etJi');
    emailjs.send('gmail_service', 'portfolio_template', emailData)
        .then(() => {
            // Hide spinner
            submittingButton.style.display = 'none';
            submitButton.style.display = 'block';
            // Show confirmation message
            const confirmationMessage = document.getElementById('confirmationMessage');
            confirmationMessage.style.display = 'block';

            // Hide confirmation message after 3 seconds
            setTimeout(() => {
                confirmationMessage.style.display = 'none';
            }, 3000);

            // Clear form
            document.getElementById('contactForm').reset();
        })
        .catch((error) => {
            console.error('Error sending email:', error);
            submittingButton.style.display = 'none';
            submitButton.style.display = 'block';
            alert('There was an error sending your message. Please try again later.');
        });
});
