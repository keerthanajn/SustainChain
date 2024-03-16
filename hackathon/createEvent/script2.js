document.addEventListener("DOMContentLoaded", function() {
    // Global variables to store selected options
    let sustainabilityOption = null;
    let locationOption = null;
    let categoryOption = null;
    let uploadedImage = null;

    // Add event listeners to buttons
    document.getElementById("exitButton").addEventListener("click", exitPage);
    document.getElementById("createEventButton").addEventListener("click", createEvent);

    // Function for Exit button
    function exitPage() {
        alert("Exiting the page...");
        var confirmExit = confirm("Are you sure you want to exit?");
        if (confirmExit) {
            window.location.href = 'exit.html';
        }
    }

    // Function for Create Event button
    function createEvent() {
        const eventName = document.getElementById('eventName').value;
        const eventDate = document.getElementById('eventDate').value;
        const eventDescription = document.getElementById('eventDescription').value;
        const postcode = document.getElementById('postcode').value;

        if (eventName && eventDate && startTime && endTime && eventDescription && postcode) {
            const eventData = {
                eventName: eventName,
                eventDate: eventDate,
                startTime: startTime,
                endTime: endTime,
                eventDescription: eventDescription,
                postcode: postcode,
                sustainabilityOption: sustainabilityOption,
                locationOption: locationOption,
                categoryOption: categoryOption,
                uploadedImage: uploadedImage
            };

            console.log("Event Data:", eventData);

            sustainabilityOption = null;
            locationOption = null;
            categoryOption = null;
            uploadedImage = null;
        } else {
            alert("Please fill in all fields before creating an event.");
        }
    }

    // Add event listeners to sustainability buttons
    document.querySelectorAll(".sustainability-buttons button").forEach(button => {
        button.addEventListener("click", function(event) {
            // Prevent the default form submission behavior
            event.preventDefault();

            const sustainabilityOptionText = this.textContent;
            // Check if the clicked option is valid
            if (sustainabilityOptions.includes(sustainabilityOptionText)) {
                sustainabilityOption = sustainabilityOptionText;
                console.log("Selected sustainability option:", sustainabilityOption);
            } else {
                console.error("Invalid sustainability option:", sustainabilityOptionText);
            }
        });
    });

    // Add event listeners to location buttons
    document.querySelectorAll(".location-buttons button").forEach(button => {
        button.addEventListener("click", function(event) {
            // Prevent the default form submission behavior
            event.preventDefault();

            const locationOptionText = this.textContent;
            // Check if the clicked option is valid
            if (locationOptions.includes(locationOptionText)) {
                locationOption = locationOptionText;
                console.log("Selected location option:", locationOption);
            } else {
                console.error("Invalid location option:", locationOptionText);
            }
        });
    });

    // Add event listeners to category buttons
    document.querySelectorAll(".category-buttons button").forEach(button => {
        button.addEventListener("click", function(event) {
            // Prevent the default form submission behavior
            event.preventDefault();

            const categoryOptionText = this.textContent;
            // Check if the clicked option is valid
            if (categoryOptions.includes(categoryOptionText)) {
                categoryOption = categoryOptionText;
                console.log("Selected category option:", categoryOption);
            } else {
                console.error("Invalid category option:", categoryOptionText);
            }
        });
    });
});
