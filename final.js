var root_url = "http://comp426.cs.unc.edu:3001";
var weather_root_url = "https://api.darksky.net/forecast/5df59b1806b8c925f9502f5a98a80be0/";

$(document).ready(() => {



    $(window).resize(function() {
       // alert("tried");
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();
        //alert("closer");
        $('#weather_div').css({'height': windowHeight-220 + 'px'});
        //alert("resided");
    });

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

        //$('#get_tickets_modal').modal();

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

    let total_body = $('.orange_background');
    let other_total_body = $('.blue_background');

    total_body.addClass('reg-body');
    total_body.removeClass('orange_background');

    other_total_body.addClass('reg-body');
    other_total_body.removeClass('blue_background');


    let body = $('body');

    //remove all sidebar stuff that you need to remove
    $('#weather_title').remove();

    //body.empty();

    $('.container-fluid').remove();
    $('#left_column').remove();

    body.removeClass('login-body');
    body.addClass('reg-body');

    // make outermost_row_sidebar row

    let outermost_row_for_sidebar = $("<div class='row' id='outermost_row_for_sidebar'></div>");
    body.append(outermost_row_for_sidebar);

    //now need two columns, one for everything I have now and one for sidebar

    let left_column = $("<div id='left_column' class='col-sm-9 col-md-9 col-lg-9'></div>");
    outermost_row_for_sidebar.append(left_column);

    let right_column = $("<div id='sidebar' class='col-sm-3 col-md-3 col-lg-3'></div>");
        //"<h2 class='title' id='weather_title'>Weather</h2></div>");
    outermost_row_for_sidebar.append(right_column);

    // define and append weather api stuff

    let weather_container_title = $("<div class='container-fluid' id='weather_title_stuff'></div>");

    let weather_container_bottom = $("<div class='container-fluid' id='weather_stuff'></div>");
    right_column.append(weather_container_title);

    weather_container_title.after(weather_container_bottom);

    let weather_title = $("<h1 class='title' id='weather_title'>Weather</h1>");
    weather_container_title.append(weather_title);

    // define and append top and bottom container fluids

    let outside_container_title = $("<div class='container-fluid' id='title_page_stuff'></div>");

    let outside_container_bottom = $("<div class='container-fluid' id='bottom_stuff'></div>");

    left_column.append(outside_container_title);
    outside_container_title.after(outside_container_bottom);

    // put title and note in top container

    let page_title = $("<h1 class='title' id='page_title'>Trip Planner</h1>");
    outside_container_title.append(page_title);

    let page_description = $("<h5 class='well' id='note'>This site lets you plan a trip. Not satisfied with the below options? Click <i id='not_satisfied_btn'><a>here</a></i>.</i></h5>")
    outside_container_title.append(page_description);

    generate_bottom_container_stuff();

    generate_weather_container_stuff();

};

var generate_weather_container_stuff = function() {
    let weather_container_bottom = $('#weather_stuff');

    let weather_information = $("<div id='weather_information'></div>");
    weather_container_bottom.append(weather_information);

    let weather_location = $("<div id='departing_leaving_location'><p>Airport: </p></div>");
    weather_information.append(weather_location);

    let weather_location_dropdown = $("<select class='form-control' id='weather_loc_dropdown'><option value='' disabled selected>select your option</option></select>");
    weather_information.append(weather_location_dropdown);

    // append submit button here

    let generate_weather_btn = $("<br><div id='generate_weather'><button class='bottom-column btn' id='generate_weather_btn'>Find Weather</button></div>");
    weather_container_bottom.append(generate_weather_btn);

    let weekly_weather_div = $("<div class = 'form-control' id='weather_div'></div>");


    weather_container_bottom.append(weekly_weather_div);

    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    //alert("closer");
    $('#weather_div').css({'height': windowHeight-220 + 'px'});

    //Backend to get airports

    $.ajax({
        url: root_url+'/airports',
        type: 'GET',
        dataType: 'json',
        xhrFields: { withCredentials: true },
        success: (response) => {
            for (let i=0; i<response.length; i++) {
                //alert('got airlines');
                weather_location_dropdown.append($('<option>'+response[i].name+'</option>'));
            }
            //console.log(response);
        },
        error: () => {
            console.log('error getting airports');
        }
    });


}

var generate_bottom_container_stuff = function() {
    let outside_container_bottom = $('#bottom_stuff');

    // put row and two columns in bottom container

    let outside_row = $("<div class='row' id='outside_row'></div>");
    outside_container_bottom.append(outside_row);

    // all things with departing column below

    let departing = $("<div id='departing' class='col-sm-6 col-md-6 col-lg-6'><h2 class='title'>Departing Information</h2></div>");
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

    let returning = $("<div id='returning' class='col-sm-6 col-md-6 col-lg-6'><h2 class='title'>Returning Information</h2></div>");
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

}

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

var weather_airport_text, weather_airport_id, weather_latitude, weather_longitude;

var currentDay, dailySummary, weather0, weather1, weather2, weather3, weather4, weather5, weather6, weather7;

var weatherData;



$(document).on('click', '#generate_weather_btn', function(e) {
    //console.log('clicked generate flights');
    $("#weather_div").empty();
    var thisWeather;

    $('#generate_weather_btn').text("Finding Weather...");

    weather_airport_text = $("#weather_loc_dropdown").val();

    //$.support.cors = true;
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
                let airport_latitude = response[i].latitude;
                let airport_longitude = response[i].longitude;

                if (airport_name == weather_airport_text) {
                    weather_airport_id = airport_id;
                    weather_latitude = airport_latitude;
                    weather_longitude = airport_longitude;
                }
            }
            $.ajax({
                url: 'https://api.darksky.net/forecast/5df59b1806b8c925f9502f5a98a80be0/' + weather_latitude + "," + weather_longitude,
                type: 'GET',
                dataType: 'jsonp',
                crossDomain: true,
               // xhrFields: {withCredentials: true},
                success: (response) => {
                    dailySummary = response;
                    dailySummary = response.daily.summary;
                    weather0 = response.daily.data[0].summary;
                    //alert(dailySummary);
                    //alert(weather0);
                    thisWeather = response;
                    implementWeather(thisWeather);


                },
                error: () => {
                    console.log('error getting weather');
                    alert(weather_root_url + weather_latitude + "," + weather_longitude);

                }
            });
            //console.log(response);
        },
        error: () => {
            console.log('error getting airports');
        }
    });


});

var implementWeather = function(thisWeather)
{

    var today = new Date();
    currentDay = today.getDay();

    var dateCounter = currentDay;
    var dayOfWeekInt = 0;
    var dayOfWeekString = "";

    var thisWeatherSummary = thisWeather.daily.summary;

    thisWeatherSummaryDiv = $("<p>Weekly Summary:  "+thisWeatherSummary+"</p>");
    thisWeatherSummaryDiv.addClass('weatherSummary');
    $("#weather_div").append(thisWeatherSummaryDiv);

    while(dateCounter < currentDay + 7)
    {
        if(dateCounter > 6)
        {
            dayOfWeekInt = dateCounter % 7;
        }
        else
        {
            dayOfWeekInt = dateCounter;
        }

        dayOfWeekString = dayOfWeek(dayOfWeekInt);
        if(dateCounter == currentDay)
        {
            dayOfWeekString = "Today";
        }
        else if(dateCounter == currentDay + 1)
        {
            dayOfWeekString = "Tomorrow";
        }
        //alert(dayOfWeekString);

        var dailySummary = thisWeather.daily.data[dayOfWeekInt].summary;
        thisTodaySummaryDiv = $("<p>"+dayOfWeekString+" Summary:  "+dailySummary+"</p>");
        if(dateCounter % 2 == 0)
            thisTodaySummaryDiv.addClass('weatherSummaryEven');
        else
            thisTodaySummaryDiv.addClass('weatherSummaryOdd');
        $("#weather_div").append(thisTodaySummaryDiv);

        //alert(dayOfWeekString);



        dateCounter++;
    }
    $('#generate_weather_btn').text("Find Weather");
}

var dayOfWeek = function(dayNum)
{
    if (dayNum == 0)
    {
        return "Sunday";
    }
    if (dayNum == 1)
    {
        return "Monday";
    }
    if (dayNum == 2)
    {
        return "Tuesday";
    }
    if (dayNum == 3)
    {
        return "Wednesday";
    }
    if (dayNum == 4)
    {
        return "Thursday";
    }
    if (dayNum == 5)
    {
        return "Friday";
    }
    if (dayNum == 0)
    {
        return "Saturday";
    }
}

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
                    $('#no_can_do_modal').modal();


                } else if (i==(response.length-1)) {
                    console.log('found two flights!, now finding instances');
                    depart_departing_time_transformed = depart_departing_time.substring(11,16);
                    depart_arriving_time_transformed = depart_arriving_time.substring(11,16);
                    return_departing_time_transformed = return_departing_time.substring(11,16);
                    return_arriving_time_transformed = return_arriving_time.substring(11,16);
                    find_instances();
                }
            }


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
                    $('#no_instances_modal').modal();
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

    let home_button = $("<button class='bottom-column btn' id='go_home_btn'>Home</button><br>");
    $('#title_page_stuff').append(home_button);

    // ---------

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
    let make_ticket_btn = $("<br><div id='make_ticket'><button class='bottom-column btn' id='make_ticket_btn'>Ready to Commit? Get Tickets!</button></div><br>");
    outside_container_bottom.append(make_ticket_btn);


};


$(document).on('click', '#make_ticket_btn', function(e) {
    //console.log('ooo yeah');

    //need first name, last name, age, gender, instance_id, seat_id (could just give seat_id of 5 every time or something)

    //instance id and seat id are no longer required

    //pop up get tickets modal

    $('#get_tickets_modal').modal();


});

var depart_ticket_success = 0, return_ticket_success = 0;

$(document).on('click', '#ticket_submit_btn', function(e) {
    depart_ticket_success = 0;
    return_ticket_success = 0;

    let fname = $('#ticket_fname').val();
    let lname = $('#ticket_lname').val();
    let age = $('#ticket_age').val();
    let gender = $('#ticket_gender').val();

    // console.log(fname);
    // console.log(lname);
    // console.log(age);
    // console.log(gender);
    //
    // console.log(depart_instance_id);
    // console.log(return_instance_id);

    //put departing ticket info in database
    $.ajax({
        url: root_url+'/tickets',
        type: 'POST',
        dataType: 'json',
        xhrFields: { withCredentials: true },
        data: {
            "ticket": {
                "first_name": ''+fname+'',
                "last_name": ''+lname+'',
                "age": ''+age+'',
                "gender": ''+gender+'',
                "is_purchased": true,
                "instance_id": ''+depart_instance_id+''
            }
        },
        success: (response) => {
            console.log('success submitting departing ticket!');
            depart_ticket_success = 1;
            put_return_ticket_in();
        },
        error: () => {
            console.log('error submitting departing ticket');
        }
    });




});


var put_return_ticket_in = function() {
    let fname = $('#ticket_fname').val();
    let lname = $('#ticket_lname').val();
    let age = $('#ticket_age').val();
    let gender = $('#ticket_gender').val();

    //put returning ticket info in database
    $.ajax({
        url: root_url+'/tickets',
        type: 'POST',
        dataType: 'json',
        xhrFields: { withCredentials: true },
        data: {
            "ticket": {
                "first_name": ''+fname+'',
                "last_name": ''+lname+'',
                "age": ''+age+'',
                "gender": ''+gender+'',
                "is_purchased": true,
                "instance_id": ''+return_instance_id+''
            }
        },
        success: (response) => {
            console.log('success submitting returning ticket!');
            return_ticket_success = 1;
            if(depart_ticket_success == 1 && return_ticket_success == 1){
                console.log('found both!!!!!!');
                $('#ticket_modal_body').empty()
                $('#ticket_submit_btn').remove();
                $('#ticket_modal_body').append($("<p>Congrats! You're tickets have been booked.</p>"));

            }else {
                console.log('something wrong...');
            }
        },
        error: () => {
            console.log('error submitting returning ticket');
        }
    });

};

$(document).on('click', '#go_home_btn', function(e) {
    console.log('we going home');

    //build_interface();

    go_home();

});

var go_home = function() {
    $('#bottom_stuff').empty();
    $('#go_home_btn').remove();
    $('#title_page_stuff br').remove();

    let total_body = $('.orange_background');
    let other_total_body = $('.blue_background');

    total_body.addClass('reg-body');
    total_body.removeClass('orange_background');

    other_total_body.addClass('reg-body');
    other_total_body.removeClass('blue_background');

    generate_bottom_container_stuff();

};





$(document).on('click', '#not_satisfied_btn', function(e) {
    let body = $('.reg-body');
    let other_total_body = $('.blue_background');

    body.addClass('orange_background');
    body.removeClass('reg-body');

    other_total_body.addClass('orange_background');
    other_total_body.removeClass('blue_background');


    $('#go_home_btn').remove();
    //$('br').remove();
    $('#title_page_stuff br').remove();

    $('#no_can_do_modal').modal('hide');
    $('#no_instances_modal').modal('hide');

    //console.log('worked');

    $('#bottom_stuff').empty();

    let outside_container_bottom = $('#bottom_stuff');

    outside_container_bottom.addClass('orange_background');

    let total_body = $('.reg-body');

    total_body.addClass('orange_background');
    total_body.removeClass('reg-body');

    let home_button = $("<button class='bottom-column btn' id='go_home_btn'>Home</button><br>");
    $('#title_page_stuff').append(home_button);

    // ---------

    let outside_row = $("<div class='row' id='outside_row'></div>");
    outside_container_bottom.append(outside_row);

    // create airport stuff

    let create_own_airport_div = $("<div id='create_airport_div' class='col-sm-6 col-md-6 col-lg-6'><h2 class='title'>Create Your Own Airport</h2></div>");
    outside_row.append(create_own_airport_div);

    let create_own_airport_div_information = $("<div id='create_own_airport_div_info'></div>");
    create_own_airport_div.append(create_own_airport_div_information);

    create_own_airport_div_information.append($("<p>Airport Name: </p>"));

    let coa_airport_input = $("<input class='form-control' id='coa_airport_input' placeholder='e.g. Raleigh Durham International'></input><br>");
    create_own_airport_div_information.append(coa_airport_input);

    create_own_airport_div_information.append($("<p>Airport Code: </p>"));

    let coa_code_input = $("<input class='form-control' id='coa_code_input' placeholder='e.g. RDU'></input><br>");
    create_own_airport_div_information.append(coa_code_input);

    create_own_airport_div_information.append($("<p>Airport Latitude: </p>"));

    let coa_latitude_input = $("<input class='form-control' id='coa_latitude_input' placeholder='e.g. 31.5'></input><br>");
    create_own_airport_div_information.append(coa_latitude_input);

    create_own_airport_div_information.append($("<p>Airport Longitude: </p>"));

    let coa_longitude_input = $("<input class='form-control' id='coa_longitude_input' placeholder='e.g. -100.4'></input><br>");
    create_own_airport_div_information.append(coa_longitude_input);

    create_own_airport_div_information.append($("<p>Airport City: </p>"));

    let coa_city_input = $("<input class='form-control' id='coa_city_input' placeholder='e.g. Raleigh'></input><br>");
    create_own_airport_div_information.append(coa_city_input);

    create_own_airport_div_information.append($("<p>Airport State: </p>"));

    let coa_state_input = $("<select class='form-control' id='coa_state_input' placeholder='e.g. NC'><option disabled selected>select your option</option></select><br>");
    create_own_airport_div_information.append(coa_state_input);

    let states_array = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC",
        "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA",
        "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE",
        "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC",
        "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"];

    for(let i=0; i<states_array.length; i++) {
        coa_state_input.append($('<option>'+states_array[i]+'</option>'));
    }


   // create_own_airport_div_information.append($("<p>Airport City URL</p>"));

    //let coa_city_url_input = $("<input id='coa_city_url_input' value=''</input>");
    //create_own_airport_div_information.append(coa_city_url_input);

    let create_airport_btn = $("<br><div id='create_airport'><button class='bottom-column btn' id='create_airport_btn'>Create Airport</button></div><br>");
    create_own_airport_div_information.append(create_airport_btn);

    // create flight stuff

    let create_own_flight_div = $("<div id='create_flight_div' class='col-sm-6 col-md-6 col-lg-6'><h2 class='title'>Create Your Own Flight and Instance</h2></div>");
    outside_row.append(create_own_flight_div);

    let create_own_flight_div_information = $("<div id='create_own_flight_div_info'></div>");
    create_own_flight_div.append(create_own_flight_div_information);

   // create_own_flight_div_information.append($("<p>do some stuff</p>"));

    create_own_flight_div_information.append($("<p>Departing Airport: </p>"));

    let departing_airport_dropdown = $("<select class='form-control' id='departing_airport_dropdown'><option value='' disabled selected>select your option</option></select><br>");
    create_own_flight_div_information.append(departing_airport_dropdown);

    create_own_flight_div_information.append($("<p>Arriving Airport: </p>"));

    // let cof_departing_airport_input = $("<input class='form-control' id='cof_departing_airport_input' placeholder='e.g. Raleigh Durham International'></input><br>");
    // create_own_flight_div_information.append(cof_departing_airport_input);

    let arriving_airport_dropdown = $("<select class='form-control' id='arriving_airport_dropdown'><option value='' disabled selected>select your option</option></select><br>");
    create_own_flight_div_information.append(arriving_airport_dropdown);

    create_own_flight_div_information.append($("<p>Departing Time: </p>"));

    let departing_time_dropdown = $("<select class='form-control' id='departing_time_dropdown'><option value='' disabled selected>select your option</option></select><br>");
    create_own_flight_div_information.append(departing_time_dropdown);

    create_own_flight_div_information.append($("<p>Arriving Time: </p>"));

    let arriving_time_dropdown = $("<select class='form-control' id='arriving_time_dropdown'><option value='' disabled selected>select your option</option></select><br>");
    create_own_flight_div_information.append(arriving_time_dropdown);

    let times_array = ["00:00", "00:15", "00:30", "00:45", "01:00", "01:15,", "01:30", "01:45",
                        "02:00", "02:15", "02:30", "02:45", "03:00", "03:15", "03:30", "03:45",
                        "04:00", "04:15", "04:30", "04:45", "05:00", "05:15", "05:30", "05:45",
                        "06:00", "06:15", "06:30", "06:45", "07:00", "07:15,", "07:30", "07:45",
                        "08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45",
                        "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45",
                        "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45",
                        "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45",
                        "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45",
                        "18:00", "18:15", "18:30", "18:45", "19:00", "19:15", "19:30", "19:45",
                        "20:00", "20:15", "20:30", "20:45", "21:00", "21:15", "21:30", "21:45",
                        "22:00", "22:15", "22:30", "22:45", "23:00", "23:15", "23:30", "23:45"]

    for(let i=0; i<times_array.length; i++) {
        departing_time_dropdown.append($('<option>'+times_array[i]+'</option>'));
        arriving_time_dropdown.append($('<option>'+times_array[i]+'</option>'));
    }

    create_own_flight_div_information.append($("<p>Flight Number: </p>"));

    let flight_number_input = $("<input class='form-control' id='flight_number_input' placeholder='e.g. AA 3001'></input><br>");
    create_own_flight_div_information.append(flight_number_input);

    let create_flight_btn = $("<br><div id='create_flight'><button class='bottom-column btn' id='create_flight_btn'>Create Flight</button></div><br>");
    create_own_flight_div_information.append(create_flight_btn);

    $.ajax({
        url: root_url+'/airports',
        type: 'GET',
        dataType: 'json',
        xhrFields: { withCredentials: true },
        success: (response) => {
            for (let i=0; i<response.length; i++) {
                //alert('got airlines');
                departing_airport_dropdown.append($('<option>'+response[i].name+'</option>'));
                arriving_airport_dropdown.append($('<option>'+response[i].name+'</option>'));
            }
            //console.log(response);
        },
        error: () => {
            console.log('error getting airports');
        }
    });





});

var create_airport_name, create_airport_code, create_airport_latitude, create_airport_longitude,
    create_airport_city, create_airport_state/*, create_airport_city_url*/ ="";

$(document).on('click', '#create_airport_btn', function(e) {


    create_airport_name = $('#coa_airport_input').val();
    create_airport_code = $('#coa_code_input').val();
    create_airport_latitude = $('#coa_latitude_input').val();
    create_airport_longitude = $('#coa_longitude_input').val();
    create_airport_city = $('#coa_city_input').val();
    create_airport_state = $('#coa_state_input').val();
  //  create_airport_city_url = $('#coa_city_url_input').val();

    //alert(create_airport_name);
    //alert(create_airport_code);



    if (create_airport_code == "" || create_airport_name == "" || create_airport_latitude == "" || create_airport_longitude == ""
        || create_airport_city == "" || create_airport_state == null/* || create_airport_city_url == ""*/)
    {
        alert("Please fill out all 7 fields and try again");
    }



    else
    {
        $.ajax({
            url: root_url + '/airports',
            type: 'POST',
            dataType: 'json',
            xhrFields: {withCredentials: true},
            data: {
                "airport": {
                    "name": ''+create_airport_name+'',
                    "code": ''+create_airport_code+'',
                    "latitude": ""+create_airport_latitude+"",
                    "longitude": ""+create_airport_longitude+"",
                    "city": ""+create_airport_city+"",
                    "state": ""+create_airport_state+""
                }
            },
            success: (response) => {
                alert("worked");
            },
            error: (ts) => {
                //alert('not logged in');
               // alert(ts.responseText);
                //alert("error");
                //alert(create_airport_name);
                //alert(create_airport_code);
            }
        });
    }

});





