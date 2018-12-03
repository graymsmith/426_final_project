var root_url = "http://comp426.cs.unc.edu:3001";

$(document).ready(() => {

    var login_btn =  $('#login_btn');

    // Execute a function when the user releases a key on the keyboard
    $('#login_pass').on('keyup', function(event) {
        // Cancel the default action, if needed
        event.preventDefault();
        var key = event.which;
        // Number 13 is the "Enter" key on the keyboard
        if (key == 13) {
            // Trigger the button element with a click
            login_btn.click();
        }
    });


    login_btn.on('click', () => {
        //alert('clicked');

        let user = $('#login_user').val();
        let pass = $('#login_pass').val();

        console.log(user);
        console.log(pass);

        $.ajax({
            url: root_url+'/sessions',
            type: 'POST',
            xhrFields: { withCredentials: true },
            data: {
                "user": {
                    "username": ""+user+"",
                    "password": ""+pass+""
                }
            },
            success: (response) => {
                console.log(response);
                //alert('successfully logged in');
                build_interface();
            },
            error: () => {
                //alert('not logged in');
                $('#message_div').removeClass('hidden');
            }
        });


    });

});


var build_interface = function () {
    let body = $('body');

    body.empty();

    body.removeClass('login-body');
    body.addClass('reg-body');

    let outside_container_title = $("<div class='container-fluid' id='title_page_stuff'></div>");

    let outside_container_bottom = $("<div class='container-fluid' id='bottom_stuff'></div>");

    body.append(outside_container_title);
    outside_container_title.after(outside_container_bottom);

    // outside_container_title.empty();
    // outside_container_bottom.empty();

    let page_title = $("<h1 class='title' id='page_title'>Trip Planner</h1>");
    outside_container_title.append(page_title);

    let page_description = $("<h5 class='well' id='note'>This site lets you plan a trip. Not satisfied with the below options? Click <i id='not_satisfied_btn'>here</i>.</i></h5>")
    outside_container_title.append(page_description);

    let outside_row = $("<div class='row' id='outside_row'></div>");
    outside_container_bottom.append(outside_row);

    let departing = $("<div id='departing' class='col-sm-4 col-md-4 col-lg-4'><h2 class='title'>Departing Information</h2></div>");
    outside_row.append(departing);

    // $.ajax({
    //     url: root_url+'/airlines',
    //     type: 'GET',
    //     dataType: 'json',
    //     xhrFields: { withCredentials: true },
    //     success: (response) => {
    //         for (let i=0; i<response.length; i++) {
    //             //alert('got airlines');
    //             airlines.append($('<p>'+response[i].name+'</p>'));
    //         }
    //     },
    //     error: () => {
    //         console.log('error getting airlines');
    //     }
    // });

    let returning = $("<div id='returning' class='col-sm-4 col-md-4 col-lg-4'><h2 class='title'>Returning Information</h2></div>");
    outside_row.append(returning);

    let generate_flights_btn = $("<br><div id='generate_flights'><button class='bottom-column btn' id='find_flights_btn'>Find Flights</button></div>");
    outside_container_bottom.append(generate_flights_btn);

    // $.ajax({
    //     url: root_url+'/airports',
    //     type: 'GET',
    //     dataType: 'json',
    //     xhrFields: { withCredentials: true },
    //     success: (response) => {
    //         for (let i=0; i<response.length; i++) {
    //             //alert('got airlines');
    //             airports.append($('<p>'+response[i].name+'</p>'));
    //         }
    //         //console.log(response);
    //     },
    //     error: () => {
    //         console.log('error getting airports');
    //     }
    // });

    let departing_information = $("<div id='departing_information'></div>");
    departing.append(departing_information);
    departing_information.append($("<div id='departing_location'><p>Location: </p></div>"))

    let returning_information = $("<div id='returning_information'></div>");
    returning.append(returning_information);
    returning_information.append($("<div id='returning_location'><p>Location: </p></div>"))


};



$(document).on('click', '#not_satisfied_btn', function(e) {
   console.log('worked');
});

