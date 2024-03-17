document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("login-form").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission
    
        // Get username and password from form
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
    
        fetch("http://127.0.0.1:8000/getuser/")
       
        .then(response => response.json())
        .then(users => {
            var authenticatedUser = users.find(user => user.username === username && user.password === password);
    
            if (authenticatedUser) {
                try {
                    // Redirect to a dashboard page or perform other actions for successful login
                    window.location.href = "Listings.html";
                } catch (error) {
                    console.error("Error redirecting:", error);
                }
            } else {
                // Display error message for incorrect credentials
                document.getElementById("error-message").textContent = "Invalid username or password";
                
    
            }
        })
        .catch(error => console.error("Error fetching users:", error));
    });
    
    });
    
    
    
