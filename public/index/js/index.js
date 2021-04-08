
$(document).ready(function () {
    if (!Cookies.get("uid")) {
        location.href = "/login"
    } else {
        $("#logOut").click(onClickLogout);
        $("#newTaskBtn").click(onClickNewTask);
        getUserData();
    }

    

});

const getNewToken = async () => {
    // req body building
    let req = {};
    req.token = Cookies.get("rToken");

    // ajax call
    $.ajax({
        type: "POST",
        url: "http://brian-scheduler.herokuapp.com/token",
        data: JSON.stringify(req),
        crossDomain: true,
        contentType: "application/json",
        success: function (res) {
            Cookies.set("aToken", res.accessToken);
        },
        error: function (xhr, status, err) {
            if (xhr.status === 403) {
                alert("Invalid token. Signing out");
            }
        }
    })
}

const getUserData = () => {
    // Obtain tokens from Cookies
    let aToken = Cookies.get("aToken");
    let rToken = Cookies.get("rToken");
    let uid = Cookies.get("uid");

    // AJAX call to get UserID
    $.ajax({
        type: "GET",
        url: `https://brian-scheduler.herokuapp.com/v1/user/${uid}`,
        crossDomain: true,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${aToken}`)
        },
        contentType: "application/json",
        success: function (res) {
            let name = res[0].name;
            $("#name").html(`Welcome back ${name}`);
            $("#header").css("display", "block");
            $("#content").css("display", "block");
            $("#loadingContainer").css("display", "none");
        },
        error: async function (xhr, status, err) {
            if (xhr.status === 403) {
                await getNewToken();
                getUserData();
            }

        }
    });
}

const onClickLogout = () => {
    let req = {};
    req.token = Cookies.get("rToken");
    $.ajax({
        type: "DELETE",
        url: "http://brian-scheduler.herokuapp.com/logout",
        data: JSON.stringify(req),
        crossDomain: true,
        contentType: "application/json",
        success: function (res) {
            Cookies.remove("aToken");
            Cookies.remove("rToken");
            Cookies.remove("uid");
            location.href = "/login"
        },
        error: function (xhr, status, err) {
            if (xhr.status === 500) {
                console.log("Something went wrong...");
                location.href = "/"
            }
        }
    });
}

const onClickNewTask = () => {
    location.href = "/taskList"
}