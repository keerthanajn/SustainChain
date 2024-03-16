document.addEventListener('DOMContentLoaded', () => {
    // Fetch the project data from the server
    fetch("http://127.0.0.1:8000/getprojects/")
        .then(response => response.json())
        .then(projects => {
            // Log the received projects data for debugging
            console.log("Projects:", projects);

            // Extract the names from the JSON data
            const name1 = projects[0].projectName; // Assuming the first project's name goes to name1
            // Assuming the second project's name goes to name2

            // Log the extracted names for debugging
            console.log("Name1:", name1);
            //console.log("Name2:", name2);

            // Populate names into the HTML
            document.getElementById("name1").textContent = name1;
            //document.getElementById("name2").textContent = name2;
        })
        .catch(error => console.error("Error fetching projects:", error));
});
