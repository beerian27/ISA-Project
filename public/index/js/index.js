$(document).ready(function() {
    console.log("ready");

    // Get request for user info. Right now just gets user 74, but the endpoint works
    $.get("https://brian-scheduler.herokuapp.com/v1/user/74", function(data) {
        console.log(data);
        let name = data[0].name;
        console.log(name);
        $("#name").html(`Welcome back ${name}`);
    });
});