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

        //console.log(user);
        //console.log(pass);

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
                //console.log(response);
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

    // define and append top and bottom container fluids

    let outside_container_title = $("<div class='container-fluid' id='title_page_stuff'></div>");

    let outside_container_bottom = $("<div class='container-fluid' id='bottom_stuff'></div>");



    body.append(outside_container_title);
    outside_container_title.after(outside_container_bottom);

    // put title and note in top container

    let page_title = $("<h1 class='title' id='page_title'>Trip Planner</h1>");
    outside_container_title.append(page_title);

    let page_description = $("<h5 class='well' id='note'>This site lets you plan a trip. Not satisfied with the below options? Click <i id='not_satisfied_btn'>here</i>.</i></h5>")
    outside_container_title.append(page_description);

    // put row and two columns in bottom container

    let outside_row = $("<div class='row' id='outside_row'></div>");
    outside_container_bottom.append(outside_row);

    // all things with departing column below

    let departing = $("<div id='departing' class='col-sm-4 col-md-4 col-lg-4'><h2 class='title'>Departing Information</h2></div>");
    outside_row.append(departing);

    let departing_information = $("<div id='departing_information'></div>");
    departing.append(departing_information);

    let departing_leaving_location = $("<div id='departing_leaving_location'><p>Departing Airport: </p></div>");
    departing_information.append(departing_leaving_location);

    let departing_leaving_location_dropdown = $("<select class='form-control' id='depart_leav_loc_dropdown'><option value='' disabled selected>select your option</option></select>");
    departing_information.append(departing_leaving_location_dropdown);

    let departing_arriving_location = $("<br><div id='departing_arriving_location'><p>Arriving Airport: </p></div>");
    departing_information.append(departing_arriving_location);

    let departing_arriving_location_dropdown = $("<select class='form-control' id='depart_arriv_loc_dropdown'><option value='' disabled selected>select your option</option></select>");
    departing_information.append(departing_arriving_location_dropdown);

    let departing_day = $("<br><div id='departing_day'><p>Day of flight: </p></div>");
    departing_information.append(departing_day);

    let departing_day_text = $("<input type='text' class='form-control' id='departing_datepicker'>")
    departing_information.append(departing_day_text);
    departing_day_text.datepicker();

    // all things with returning column below

    let returning = $("<div id='returning' class='col-sm-4 col-md-4 col-lg-4'><h2 class='title'>Returning Information</h2></div>");
    outside_row.append(returning);

    let returning_information = $("<div id='returning_information'></div>");
    returning.append(returning_information);

    let returning_departing_location = $("<div id='returning_departing_location'><p>Departing Airport: </p></div>");
    returning_information.append(returning_departing_location);

    let returning_departing_location_dropdown = $("<select class='form-control' id='return_dep_loc_dropdown'><option value='' disabled selected>select your option</option></select>");
    returning_information.append(returning_departing_location_dropdown);

    let returning_arriving_location = $("<br><div id='returning_arriving_location'><p>Arriving Airport: </p></div>");
    returning_information.append(returning_arriving_location);

    let returning_arriving_location_dropdown = $("<select class='form-control' id='return_arriv_loc_dropdown'><option value='' disabled selected>select your option</option></select>");
    returning_information.append(returning_arriving_location_dropdown);

    let returning_day = $("<br><div id='returning_day'><p>Day of flight: </p></div>");
    returning_information.append(returning_day);

    let returning_day_text = $("<input type='text' class='form-control' id='returning_datepicker'>")
    returning_information.append(returning_day_text);
    returning_day_text.datepicker();




    // append submit button here

    let generate_flights_btn = $("<br><div id='generate_flights'><button class='bottom-column btn' id='find_flights_btn'>Find Flights</button></div>");
    outside_container_bottom.append(generate_flights_btn);


    // fill in stuff from backend here

    $.ajax({
        url: root_url+'/airports',
        type: 'GET',
        dataType: 'json',
        xhrFields: { withCredentials: true },
        success: (response) => {
            for (let i=0; i<response.length; i++) {
                //alert('got airlines');
                departing_leaving_location_dropdown.append($('<option>'+response[i].name+'</option>'));
                departing_arriving_location_dropdown.append($('<option>'+response[i].name+'</option>'));
                returning_departing_location_dropdown.append($('<option>'+response[i].name+'</option>'));
                returning_arriving_location_dropdown.append($('<option>'+response[i].name+'</option>'));
            }
            //console.log(response);
        },
        error: () => {
            console.log('error getting airports');
        }
    });


};



$(document).on('click', '#not_satisfied_btn', function(e) {
   console.log('worked');
});

$(document).on('click', '#departing_datepicker', function(e) {
    $('#departing_datepicker').datepicker('show');
});

$(document).on('click', '#returning_datepicker', function(e) {
    $('#returning_datepicker').datepicker('show');
});


var found_departure_flight_id, found_return_flight_id, departing_day_transformed, returning_day_transformed,
    departing_leave_airport_text, departing_arrive_airport_text, departing_day, returning_depart_airport_text,
    returning_arrive_airport_text, returning_day, departing_leave_airport_id, departing_arrive_airport_id,
    returning_depart_airport_id, returning_arrive_airport_id, departing_airline, returning_airline;

var depart_departing_time, depart_arriving_time, return_departing_time, return_arriving_time;

var depart_departing_time_transformed, depart_arriving_time_transformed,
    return_departing_time_transformed, return_arriving_time_transformed;

var depart_airline_id, return_airline_id;

var depart_instance_id, return_instance_id;



$(document).on('click', '#find_flights_btn', function(e) {
    //console.log('clicked generate flights');

    $('#find_flights_btn').text("Finding flights...");

    // var , ;
    // var ;

    departing_leave_airport_text = $("#depart_leav_loc_dropdown").val();
    departing_arrive_airport_text = $("#depart_arriv_loc_dropdown").val();
    departing_day = $("#departing_datepicker").val();

    returning_depart_airport_text = $("#return_dep_loc_dropdown").val();
    returning_arrive_airport_text = $("#return_arriv_loc_dropdown").val();
    returning_day = $("#returning_datepicker").val();

    var departing_day_year = departing_day.substring(6,10);
    var departing_day_month = departing_day.substring(0,2);
    var departing_day_day = departing_day.substring(3,5);

    departing_day_transformed = departing_day_year + '-' + departing_day_month + '-' + departing_day_day;

    //console.log(departing_day_transformed);

    var returning_day_year = returning_day.substring(6,10);
    var returning_day_month = returning_day.substring(0,2);
    var returning_day_day = returning_day.substring(3,5);

    returning_day_transformed = returning_day_year + '-' + returning_day_month + '-' + returning_day_day;

    //console.log(returning_day_transformed);


    // console.log(returning_depart_airport_text);
    // console.log(returning_arrive_airport_text);
    // console.log(returning_day);


    // each airport has an id, each flight has a departure_id and arrival_id
    // need to get id's of airports named, then need to see if there is a flight with the corresponding departure and arrival ids
    // if yes, go on. if no, pop up no flight modal
    // moving on - somehow find instance with date and corresponding flight id (but flights don't have an id??)

    //var

    //find airport id from name of airport
    $.ajax({
        url: root_url+'/airports',
        type: 'GET',
        dataType: 'json',
        xhrFields: { withCredentials: true },
        success: (response) => {
            for (let i=0; i<response.length; i++) {
                let airport_name = response[i].name;
                let airport_id = response[i].id;

                if (airport_name == departing_leave_airport_text) {
                    departing_leave_airport_id = airport_id;
                    // console.log('found departing leave!!!!');
                    // console.log(airport_name);
                    // console.log(departing_leave_airport_id);
                }

                if (airport_name == departing_arrive_airport_text) {
                    departing_arrive_airport_id = airport_id;
                    // console.log('found departing arrive!!!!');
                    // console.log(airport_name);
                    // console.log(departing_arrive_airport_id);
                }

                if (airport_name == returning_depart_airport_text) {
                    returning_depart_airport_id = airport_id;
                    // console.log('found returning depart!!!!');
                    // console.log(airport_name);
                    // console.log(returning_depart_airport_id);
                }

                if (airport_name == returning_arrive_airport_text) {
                    returning_arrive_airport_id = airport_id;
                    // console.log('found returning arrive!!!!');
                    // console.log(airport_name);
                    // console.log(returning_arrive_airport_id);
                }
            }
            //console.log(response);
        },
        error: () => {
            console.log('error getting airports');
        }
    });


    let found_departure = 0, found_return = 0;

    found_departure_flight_id = 0;
    found_return_flight_id = 0;

    //find flight from above ids for both departure and return
    $.ajax({
        url: root_url+'/flights',
        type: 'GET',
        dataType: 'json',
        xhrFields: { withCredentials: true },
        success: (response) => {
            for (let i=0; i<response.length; i++) {
                let arrival_id = response[i].arrival_id;
                let departure_id = response[i].departure_id;


                if(departure_id == departing_leave_airport_id && arrival_id == departing_arrive_airport_id) {
                    console.log('found flight for departure!!!!');
                    console.log(response[i]);
                    found_departure_flight_id = response[i].id;
                    depart_departing_time = response[i].departs_at;
                    depart_arriving_time = response[i].arrives_at;
                    depart_airline_id = response[i].airline_id;
                    found_departure = 1;
                }

                if(departure_id == returning_depart_airport_id && arrival_id == returning_arrive_airport_id) {
                    console.log('found flight for return!!!!');
                    console.log(response[i]);
                    found_return_flight_id = response[i].id;
                    return_departing_time = response[i].departs_at;
                    return_arriving_time = response[i].arrives_at;
                    return_airline_id = response[i].airline_id;
                    found_return = 1;
                }

                if(i==(response.length-1) && found_departure == 0) {
                    console.log('could not find flight for departure...');
                }

                if(i==(response.length-1) && found_return == 0) {
                    console.log('could not find flight for return...');
                }

                if (i==(response.length-1) && (found_departure == 0 || found_return == 0)) {
                    console.log('did not find flight meeting requirements...');
                    $('#find_flights_btn').text("Find Flights");
                    //pop up a modal or something
                } else if (i==(response.length-1)) {
                    console.log('found two flights!, now finding instances');
                    find_instances();
                }
            }

            depart_departing_time_transformed = depart_departing_time.substring(11,16);
            depart_arriving_time_transformed = depart_arriving_time.substring(11,16);
            return_departing_time_transformed = return_departing_time.substring(11,16);
            return_arriving_time_transformed = return_arriving_time.substring(11,16);
        },
        error: () => {
            console.log('error getting flights');
        }
    });


});


var find_instances = function () {

    let found_departure_instance = 0, found_return_instance = 0;

    $.ajax({
        url: root_url+'/instances',
        type: 'GET',
        dataType: 'json',
        xhrFields: { withCredentials: true },
        success: (response) => {
            console.log('getting instances');
            for (let i=0; i<response.length; i++) {
                let flight_id = response[i].flight_id;
                let date = response[i].date;

                if(flight_id == found_departure_flight_id && date == departing_day_transformed) {
                    console.log('found flight instance for departure!!!')
                    console.log(response[i]);
                    found_departure_instance = 1;
                    depart_instance_id = response[i].id;
                }

                if(flight_id == found_return_flight_id && date == returning_day_transformed) {
                    console.log('found flight instance for return!!!')
                    console.log(response[i]);
                    found_return_instance = 1;
                    return_instance_id = response[i].id;
                }

                if(i==(response.length-1) && found_departure_instance == 0) {
                    console.log('could not find instance for departure...');
                }

                if(i==(response.length-1) && found_return_instance == 0) {
                    console.log('could not find instance for return...');
                }

                if (i==(response.length-1) && found_departure_instance != 0 && found_return_instance != 0) {
                    console.log('make new interface!!');
                    //need
                    make_new_interface();

                } else if (i==(response.length-1)) {
                    console.log('did not find flight meeting requirements :(');
                    $('#find_flights_btn').text("Find Flights");
                    //pop up a modal or something
                }

            }
            //console.log(response[0]);
        },
        error: () => {
            console.log('error getting instances');
        }
    });

    //find airline names
    $.ajax({
        url: root_url+'/airlines',
        type: 'GET',
        dataType: 'json',
        xhrFields: { withCredentials: true },
        success: (response) => {
            for (let i=0; i<response.length; i++) {
                let id = response[i].id;


                if(id == depart_airline_id) {
                    //console.log('found airline for departure!!!');
                    departing_airline = response[i].name;
                }

                if(id == return_airline_id) {
                    //console.log('found airline for return!!!');
                    returning_airline = response[i].name;
                }
            }
            //console.log(response[0]);
        },
        error: () => {
            console.log('error getting airlines');
        }
    });

};


var make_new_interface = function() {
    $('#bottom_stuff').empty();

    let outside_container_bottom = $('#bottom_stuff');

    outside_container_bottom.addClass('blue_background');

    let total_body = $('.reg-body');

    total_body.addClass('blue_background');
    total_body.removeClass('reg-body');

    let outside_row = $("<div class='row' id='outside_row'></div>");
    outside_container_bottom.append(outside_row);

    // all things with departing column below

    let departing = $("<div id='departing' class='col-sm-4 col-md-4 col-lg-4'><h2 class='title'>Departing Flight</h2></div>");
    outside_row.append(departing);

    let departing_information = $("<div id='departing_flight_info'></div>");
    departing.append(departing_information);

    let depart_flight_airline = $("<div id='depart_flight_airline'><p><strong>Airline: </strong></p></div>");
    departing_information.append(depart_flight_airline);

    depart_flight_airline.append($("<p class='colored_text'>"+departing_airline+"</p><br>"));

    let depart_flight_leaving_from = $("<div id='depart_flight_leave_from'><p><strong>Leaving From: </strong></p></div>");
    departing_information.append(depart_flight_leaving_from);

    depart_flight_leaving_from.append($("<p class='colored_text'>"+departing_leave_airport_text+"</p><br>"));

    let depart_flight_arriving_to = $("<div id='depart_flight_arrive_to'><p><strong>Arriving To: </strong></p></div>");
    departing_information.append(depart_flight_arriving_to);

    depart_flight_arriving_to.append($("<p class='colored_text'>"+departing_arrive_airport_text+"</p><br>"));

    let depart_flight_date = $("<div id='depart_flight_date'><p><strong>Date: </strong></p></div>");
    departing_information.append(depart_flight_date);

    depart_flight_date.append($("<p class='colored_text'>"+departing_day+"</p><br>"));

    let depart_flight_departing_time = $("<div id='depart_flight_time'><p><strong>Departing Time: </strong></p></div>");
    departing_information.append(depart_flight_departing_time);

    depart_flight_departing_time.append($("<p class='colored_text'>"+depart_departing_time_transformed+"</p><br>"));

    let depart_flight_arriving_time = $("<div id='depart_flight_time'><p><strong>Arriving Time: </strong></p></div>");
    departing_information.append(depart_flight_arriving_time);

    depart_flight_arriving_time.append($("<p class='colored_text'>"+depart_arriving_time_transformed+"</p>"));

    // all things with returning column below

    let returning = $("<div id='returning' class='col-sm-4 col-md-4 col-lg-4'><h2 class='title'>Returning Flight</h2></div>");
    outside_row.append(returning);

    let returning_information = $("<div id='returning_flight_info'></div>");
    returning.append(returning_information);

    let return_flight_airline = $("<div id='return_flight_airline'><p><strong>Airline: </strong></p></div>");
    returning_information.append(return_flight_airline);

    return_flight_airline.append($("<p class='colored_text'>"+returning_airline+"</p><br>"));

    let return_flight_leaving_from = $("<div id='return_flight_leave_from'><p><strong>Leaving From: </strong></p></div>");
    returning_information.append(return_flight_leaving_from);

    return_flight_leaving_from.append($("<p class='colored_text'>"+returning_depart_airport_text+"</p><br>"));

    let return_flight_arriving_to = $("<div id='return_flight_arrive_to'><p><strong>Arriving To: </strong></p></div>");
    returning_information.append(return_flight_arriving_to);

    return_flight_arriving_to.append($("<p class='colored_text'>"+returning_arrive_airport_text+"</p><br>"));

    let return_flight_date = $("<div id='return_flight_date'><p><strong>Date: </strong></p></div>");
    returning_information.append(return_flight_date);

    return_flight_date.append($("<p class='colored_text'>"+returning_day+"</p><br>"));

    let return_flight_departing_time = $("<div id='return_flight_time'><p><strong>Departing Time: </strong></p></div>");
    returning_information.append(return_flight_departing_time);

    return_flight_departing_time.append($("<p class='colored_text'>"+return_departing_time_transformed+"</p><br>"));

    let return_flight_arriving_time = $("<div id='return_flight_time'><p><strong>Arriving Time: </strong></p></div>");
    returning_information.append(return_flight_arriving_time);

    return_flight_arriving_time.append($("<p class='colored_text'>"+return_arriving_time_transformed+"</p>"));


    //button stuff
    let make_ticket_btn = $("<br><div id='make_ticket'><button class='bottom-column btn' id='make_ticket_btn' data-toggle=\"modal\" data-target=\"#exampleModal\">Ready to Commit? Get Tickets!</button></div><br>");
    outside_container_bottom.append(make_ticket_btn);


};


$(document).on('click', '#make_ticket_btn', function(e) {
    //console.log('ooo yeah');

    //need first name, last name, age, gender, instance_id, seat_id



});

