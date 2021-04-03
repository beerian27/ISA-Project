$(document).ready(function() {
    console.log("ready");

    $.get("https://brian-scheduler.herokuapp.com/v1/admin/stats", function(data) {
        data.forEach(element => {
            // Getting required fields from each element
            let method = element.httpMethod;
            let endpoint = element.endpoint;
            let requests = element.requests;
            
            // Creating the <tr>
            let content = `<tr><th scope="row">${method}</th><td>${endpoint}</td><td>${requests}</td></tr>`
            $('tbody').append(content);
        });
    });
});