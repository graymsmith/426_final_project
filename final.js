var root_url = "http://comp426.cs.unc.edu:3001";

$(document).ready(() => {
    $('#login_btn').on('click', () => {
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
                $('#message_div').html("Username or password incorrect. Try again.");
            }
        });


    });

});


var build_interface = function () {
    let body = $('body');

    body.removeClass('login-body');
    body.addClass('reg-body');

    let outside_container = $('div.container-fluid');

    outside_container.empty();

    let page_title = $("<h1 class='title'>Trip Planner</h1>");
    outside_container.append(page_title);

    let outside_row = $("<div class='row'></div>");
    outside_container.append(outside_row);

    let airlines = $("<div id='airlines' class='col-md-2'><h2 class='title'>Airlines</h2></div>");
    outside_row.append(airlines);

    $.ajax({
        url: root_url+'/airlines',
        type: 'GET',
        dataType: 'json',
        xhrFields: { withCredentials: true },
        success: (response) => {
            for (let i=0; i<response.length; i++) {
                //alert('got airlines');
                airlines.append($('<p>'+response[i].name+'</p>'));
            }
        },
        error: () => {
            console.log('error getting airlines');
        }
    });

    let airports = $("<div id='airports' class='col-md-4'><h2 class='title'>Airports</h2></div>");
    outside_row.append(airports);

    $.ajax({
        url: root_url+'/airports',
        type: 'GET',
        dataType: 'json',
        xhrFields: { withCredentials: true },
        success: (response) => {
            for (let i=0; i<response.length; i++) {
                //alert('got airlines');
                airports.append($('<p>'+response[i].name+'</p>'));
            }
            //console.log(response);
        },
        error: () => {
            console.log('error getting airports');
        }
    });

};
