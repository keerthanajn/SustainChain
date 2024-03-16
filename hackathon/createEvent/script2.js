document.addEventListener("DOMContentLoaded", async function() {
    // Global variables to store selected options
    let sustainabilityOption = null;
    let locationOption = null;
    let categoryOption = null;

    // Load options data from optionsData.json
    const optionsResponse = await fetch('optionsData.json');
    const optionsData = await optionsResponse.json();

    // Extract options from optionsData
    const sustainabilityOptions = optionsData.sustainabilityOptions;
    const locationOptions = optionsData.locationOptions;
    const categoryOptions = optionsData.categoryOptions;

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
        const projectID = 1;
        const eventName = document.getElementById('eventName').value;
        const eventDate = document.getElementById('eventDate').value;
        const eventDescription = document.getElementById('eventDescription').value;
        const postcode = document.getElementById('postcode').value;
        const user = "Aryaa"

        if (eventName && eventDate && eventDescription && postcode) {
            const eventData = {
                projectID: projectID,
                eventName: eventName,
                eventDate: eventDate,
                eventDescription: eventDescription,
                postcode: postcode,
                sustainabilityOption: sustainabilityOption,
                locationOption: locationOption,
                categoryOption: categoryOption,
                user: user
            };

            console.log("Event Data:", eventData);

            // Send POST request to the backend server
            fetch("http://127.0.0.1:8000/createevent/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventData)
            })
            .then(response => {
                if (response.ok) {
                    console.log("Event created successfully!");
                    // Reset options
                    sustainabilityOption = null;
                    locationOption = null;
                    categoryOption = null;
                } else {
                    throw new Error('Failed to create event.');
                }
            })
            .catch(error => {
                console.error("Error creating event:", error);
            });
            
            sustainabilityOption = null;
            locationOption = null;
            categoryOption = null;
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
    document.querySelectorAll(".location-buttons button").forEach(button  => {
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
