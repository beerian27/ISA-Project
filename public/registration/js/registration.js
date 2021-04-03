$(document).ready(function() {
    console.log("ready");

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

        // ajax call
        $.post("https://brian-scheduler.herokuapp.com/v1/user", userData, function(res) {
            console.log(res);
        });
    });

    $.get("https://brian-scheduler.herokuapp.com/v1/user/24", function(data) {
        console.log(data);
    });


});