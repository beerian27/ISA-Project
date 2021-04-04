$(document).ready(function() {
    console.log("ready");

    // Submit button's onclick
    $("#submitBtn").click(function() {
        // Get values of inputs
        let username = $("#usernameInput").val();
        let password = $("#passwordInput").val();
        let name = $("#nameInput").val();

        // Input validation (Right now just checks if empty)
        // Username
        if (!username || !username.trim()) {
            alert("You have not filled out the username field");
            return;
        } 
        // Password
        if (!password || !password.trim()) {
            alert("You have not filled out the password field");
            return;
        }
        // Name
        if (!name || !name.trim()) {
            alert("You have not filled out the full name field");
            return;
        }

        // Create object to POST
        let userData = {};
        userData.username = username;
        userData.password = password;
        userData.name = name;
        userData.isAdmin = false;

        // POST Call for registration
        $.ajax({
            type: "POST",
            url: "https://brian-scheduler.herokuapp.com/v1/user",
            data: JSON.stringify(userData),
            crossDomain: true,
            contentType: "application/json",
            success: function(res) {
                console.log(res);
            },
        });
    
    });
});