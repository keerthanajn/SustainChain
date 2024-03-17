document.addEventListener('DOMContentLoaded', () => {
    // Fetch the project data from the server
    fetch("http://127.0.0.1:8000/getprojects/")
        .then(response => response.json())
        .then(projects => {
            // Filter projects for user "Aryaa"
            const aryaaProjects = projects.filter(project => project.user === "Aryaa");

            // Get the parent element where project details will be added
            const projectsList = document.getElementById("projects-list");

            // Iterate over Aryaa's projects and create elements to display details
            aryaaProjects.forEach(project => {
                // Create a div element for each project
                const projectDiv = document.createElement("div");
                projectDiv.classList.add("project");

                // Populate project details inside the div
                projectDiv.innerHTML = `
                    <h2>${project.projectName}</h2>
                    <p><strong>Description:</strong> ${project.description}</p>
                    <p><strong>Category:</strong> ${project.category}</p>
                    <p><strong>Postcode:</strong> ${project.postcode}</p>
                `;

                // Append the project div to the projects list
                projectsList.appendChild(projectDiv);
            });
        })
        .catch(error => console.error("Error fetching projects:", error));
});


