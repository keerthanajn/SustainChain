// Listings.js

document.addEventListener('DOMContentLoaded', () => {
  // Fetch the project data from the server
  fetch("http://127.0.0.1:8000/getprojects/")
      .then(response => response.json())
      .then(projects => {
          // Get the parent element where event details will be added
          const eventList = document.querySelector('.ad-listings ul');

          // Filter projects with the name "Aryaa"
          const filteredProjects = projects.filter(project => project.user === "Aryaa");

          // Check if there are any projects to display
          if (filteredProjects.length > 0) {
              // Iterate over the filtered projects and create list items for each event
              filteredProjects.forEach(project => {
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
                          <input class="code-input" type="text" placeholder="Enter Code"> 
                          <button class="submit-btn">Submit</button>
                          <a href="#" class="read-more">Read More</a>
                      </div>
                  `;

                  // Append the event list item to the event list
                  eventList.appendChild(eventItem);
              });

              // Add event listener to submit button
              const submitButtons = document.querySelectorAll('.submit-btn');
              submitButtons.forEach(button => {
                  button.addEventListener('click', handleCodeSubmission);
              });
          } else {
              console.error("No projects with the name 'Aryaa' found.");
          }
      })
      .catch(error => console.error("Error fetching projects:", error));
});



  // Fetch the projects data and render event listings
//   fetch("http://127.0.0.1:8000/getprojects/")
//   .then(response => response.json())
//   .then(projects => {
//       // Get the parent element where event details will be added
//       const eventList = document.querySelector('.signed-up ul');

//       // Check if there are any projects fetched
//       if (projects.length > 0) {
//           // Create a list item element for the first event
//           const project = projects[0];
//           const eventItem = document.createElement("li");
//           eventItem.classList.add("event-listing");

//           // Populate event details inside the list item
//           eventItem.innerHTML = `
//               <img src="sustainable.jpeg" alt="Event Image">
//               <div class="event-details">
//                   <h3>${project.projectName}</h3>
//                   <p>${project.description}</p>
//                   <p>${project.created}</p>
//                   <a href="#" class="read-more">Read More</a>
//               </div>
//           `;

//           // Append the event list item to the event list
//           eventList.appendChild(eventItem);
//       } else {
//           console.error("No projects fetched.");
//       }
//   })
//   .catch(error => console.error("Error fetching projects:", error));


// Define the submit function to handle code submission
function handleCodeSubmission(event) {
  const input = event.target.parentElement.querySelector('.code-input');
  const code = input.value.trim();

  // Check if the entered code is correct
  if (code === "123Aryaa") {
    // Show verification message
    alert('Verification successful! Tokens increased by 5.');

    // Clear the input
    input.value = '';
    // Increase token count by 5 (you would need a mechanism to update the actual token count on the server)
    // Fetch the updated token count and update the UI
    fetch("http://127.0.0.1:8000/increasetokens/")
      .then(response => response.json())
      .then(data => {
        if (typeof data.tokens !== 'undefined') {
          const tokenCountElement = document.getElementById('token-count');
          tokenCountElement.textContent = `Tokens: ${data.tokens}`;
        } else {
          console.error('Invalid response data:', data);
        }
      })
      .catch(error => console.error("Error increasing token count:", error));
  } else {
    // Show error message
    alert('Verification failed!');
  }
}

// Fetch token count and update UI
document.addEventListener('DOMContentLoaded', () => {
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
