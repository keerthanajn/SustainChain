document.addEventListener("DOMContentLoaded", async function() {
    // Global variables to store selected options
    let categoryOption = null;
    // let locationOption = null;
    // let categoryOption = null;

    // Load options data from optionsData.json
    const optionsResponse = await fetch('optionsData.json');
    const optionsData = await optionsResponse.json();

    // Extract options from optionsData
    const categoryOptions = optionsData.categoryOptions;
    // const locationOptions = optionsData.locationOptions;
    // const categoryOptions = optionsData.categoryOptions;

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
        const user = "Aryaa"
        // const projectID = 1;
        const projectName = document.getElementById('eventName').value;
        // const eventDate = document.getElementById('eventDate').value;
        const eventDescription = document.getElementById('eventDescription').value;
        const postcode = document.getElementById('postcode').value;
        

        if (projectName && eventDescription && postcode) {
            const eventData = {
                user: user,
                // projectID: projectID,
                projectName: projectName,
                eventDescription: eventDescription,
                categoryOption: categoryOption,
                postcode: postcode
                
                // locationOption: locationOption,
                // categoryOption: categoryOption,
                
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
                    categoryOption = null;
                    // locationOption = null;
                    // categoryOption = null;
                } else {
                    throw new Error('Failed to create event.');
                }
            })
            .catch(error => {
                console.error("Error creating event:", error);
            });

            categoryOption = null;
            // locationOption = null;
            // categoryOption = null;
        } else {
            alert("Please fill in all fields before creating an event.");
        }
    }

    // Add event listeners to category buttons
    document.querySelectorAll(".button-with-icon button").forEach(button => {
        button.addEventListener("click", function(event) {
            // Prevent the default form submission behavior
            event.preventDefault();

            const categoryOptionText = this.textContent;
            // Check if the clicked option is valid
            if (categoryOptions.includes(categoryOptionText)) {
                categoryOption = categoryOptionText;
                console.log("Selected category option:", categoryOption);

                // Remove border from all buttons
                document.querySelectorAll(".button-with-icon button").forEach(btn => {
                    btn.classList.remove("selected");
                });

                // Add border to the clicked button
                this.classList.add("selected");
            } else {
                console.error("Invalid category option:", categoryOptionText);
            }
        });
    });


    // // Add event listeners to location buttons
    // document.querySelectorAll(".location-buttons button").forEach(button  => {
    //     button.addEventListener("click", function(event) {
    //         // Prevent the default form submission behavior
    //         event.preventDefault();

    //         const locationOptionText = this.textContent;
    //         // Check if the clicked option is valid
    //         if (locationOptions.includes(locationOptionText)) {
    //             locationOption = locationOptionText;
    //             console.log("Selected location option:", locationOption);
    //         } else {
    //             console.error("Invalid location option:", locationOptionText);
    //         }
    //     });
    // });

    // // Add event listeners to category buttons
    // document.querySelectorAll(".category-buttons button").forEach(button => {
    //     button.addEventListener("click", function(event) {
    //         // Prevent the default form submission behavior
    //         event.preventDefault();

    //         const categoryOptionText = this.textContent;
    //         // Check if the clicked option is valid
    //         if (categoryOptions.includes(categoryOptionText)) {
    //             categoryOption = categoryOptionText;
    //             console.log("Selected category option:", categoryOption);
    //         } else {
    //             console.error("Invalid category option:", categoryOptionText);
    //         }
    //     });
    // });
});
