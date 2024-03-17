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
                      <p class="pd">${project.description}</p>

                      <p class="pc">${project.created}</p>
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
    

      
       
           })
          // Listings.js

// Listings.js

// Listings.js


    // Fetch the token count from the server
    // fetch("http://127.0.0.1:8000/gettokens/")
    //   .then(response => {
    //     console.log('Response status:', response.status);
    //     if (!response.ok) {
    //       throw new Error('Failed to fetch token count');
    //     }
    //     return response.json();
    //   })
    //   .then(data => {
    //     console.log('Fetched data:', data);
    //     // Check if the data contains the 'tokens' property
    //     if (data && typeof data.tokens !== 'undefined') {
    //       // Update the navigation bar with the token count
    //       const tokenCountElement = document.getElementById('token-count');
    //       tokenCountElement.textContent = `Tokens: ${data.tokens}`;
    //     } else {
    //       console.error('Invalid response data:', data);
    //     }
    //   })
    //   .catch(error => {
    //     console.error("Error fetching token count:", error);
    //     // Update the navigation bar with an error message
    //     const tokenCountElement = document.getElementById('token-count');
    //     tokenCountElement.textContent = 'Failed to fetch tokens';
    //   });
    
    // Other logic for fetching and rendering event listings can go here
 
  // Listings.js

document.addEventListener('DOMContentLoaded', () => {
    // Fetch the token count from the server
    fetch("http://127.0.0.1:8000/gettokens/")
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch token count');
        }
        return response.json();
      })
      .then(data => {
        // Check if the data contains at least one user with tokens
        if (Array.isArray(data) && data.length > 0 && typeof data[0].tokens !== 'undefined') {
          // Update the navigation bar with the token count of the first user
          const tokenCountElement = document.getElementById('token-count');
          tokenCountElement.textContent = `Tokens: ${data[0].tokens}`;
        } else {
          console.error('Invalid response data:', data);
          // Update the navigation bar with an error message
          const tokenCountElement = document.getElementById('token-count');
          tokenCountElement.textContent = 'No tokens found';
        }
      })
      .catch(error => {
        console.error("Error fetching token count:", error);
        // Update the navigation bar with an error message
        const tokenCountElement = document.getElementById('token-count');
        tokenCountElement.textContent = 'Failed to fetch tokens';
      });
  });
  