// This script is a placeholder, you'll need to implement the search logic here

const searchInput = document.getElementById('search-input');

// Add event listener for search input changes
searchInput.addEventListener('keyup', () => {
  // Implement your search functionality here
  // Based on the user's input, filter the event listings in the UL
  console.log('User is searching for:', searchInput.value);
});

/// Listings.js
document.addEventListener('DOMContentLoaded', () => {
  // Fetch the project data from the server
  fetch("http://127.0.0.1:8000/getprojects/")
      .then(response => response.json())
      .then(projects => {
          // Get the parent element where event details will be added
          const eventList = document.querySelector('.ad-listings ul');

          // Iterate over the projects and create list items for each event
          projects.forEach(project => {
              // Create a list item element for each event
              const eventItem = document.createElement("li");
              eventItem.classList.add("event-listing");

              // Populate event details inside the list item
              eventItem.innerHTML = `
                  <img src="sustainable.jpeg" alt="Event Image">
                  <div class="event-details">
                      <h3>${project.projectName}</h3>
                      <p>${project.description}</p>

                      <p>${project.created}</p>
                      <a href="#" class="read-more">Read More</a>
                  </div>
              `;

              // Append the event list item to the event list
              eventList.appendChild(eventItem);
          });
      })
      .catch(error => console.error("Error fetching projects:", error));



      fetch("http://127.0.0.1:8000/getprojects/")
      .then(response => response.json())
      .then(projects => {
          // Get the parent element where event details will be added
          const eventList = document.querySelector('.signed-up ul');
    
          // Check if there are any projects fetched
          if (projects.length > 0) {
              // Create a list item element for the first event
              const project = projects[0];
              const eventItem = document.createElement("li");
              eventItem.classList.add("event-listing");
    
              // Populate event details inside the list item
              eventItem.innerHTML = `
                  <img src="sustainable.jpeg" alt="Event Image">
                  <div class="event-details">
                      <h3>${project.projectName}</h3>
                      <p>${project.description}</p>
                      <p>${project.created}</p>
                      <a href="#" class="read-more">Read More</a>
                  </div>
              `;
    
              // Append the event list item to the event list
              eventList.appendChild(eventItem);
          } else {
              console.error("No projects fetched.");
          }
      })
      .catch(error => console.error("Error fetching projects:", error));
    

      
        // Fetch the project data from the server
        // fetch("http://127.0.0.1:8000/getprojects/")
        //     .then(response => response.json())
        //     .then(projects => {
        //         // Filter projects for user "Aryaa" and those marked as signed up
        //         const aryaaSignedUpProjects = projects.filter(project => project.user === "Aryaa" && project.signedUp === true);
    
        //         // Get the parent element where signed-up event details will be added
        //         const signedUpEventsList = document.querySelector('.signed-up ul');
    
        //         // Iterate over Aryaa's signed-up projects and create list items for each event
        //         aryaaSignedUpProjects.forEach(project => {
        //             // Create a list item element for each event
        //             const eventItem = document.createElement("li");
    
        //             // Populate event details inside the list item
        //             eventItem.innerHTML = `
        //                 <h3>${project.projectName} (Signed Up)</h3>
        //                 <p>${project.description}</p>
        //                 <p>Date and Time</p>
        //             `;
    
        //             // Append the event list item to the signed-up events list
        //             signedUpEventsList.appendChild(eventItem);
        //         });
        //     })
        //     .catch(error => console.error("Error fetching projects:", error));
    
           })
