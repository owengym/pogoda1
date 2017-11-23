$(document).ready(() => {

	$('.close-button').click(()=>{
		$('#listOfCities').hide();
	});

	$('.open-button').click(()=>{
		$('#listOfCities').show();
	});


	$('#listOfCities li').click(function(){
		var city = $(this).attr('data-city');
		$('.up').css('background-image', ' linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("img/'+ city +'.jpg")');
		$('#listOfCities').hide();
		
		loadWheader(city);
	});


	count();
	loadWheader('warszawa');
});



function loadWheader(apiCity) {

	var kTemp;
	var cTemp;

	var countryCode = 'pl';
	var apiQuery = apiCity + ',' + countryCode;
	var apiSecret = '56cbe5e8b526140b3cff697246ed7e10';
	var api = "http://api.openweathermap.org/data/2.5/weather?appid="+apiSecret+"&q="+apiQuery+"";


	$.getJSON(api, function(data){

		console.log(data);
		//alert(data.coord.lon);
		kTemp = data.main.temp;
		var windSpeed = data.wind.speed;
		var city = data.name;
		var direction = degreesToDirection(data.wind.deg);
		var icon = data.weather[0].icon;

		fTemp = (kTemp)*(9/5)-459.67;
		cTemp = (kTemp-273).toFixed(0);
		windSpeed = (windSpeed * 3.6).toFixed(1);

		console.log(city);
		$('#loc').html(city);
		$('#cTemp').html(cTemp);
		$('#windSpeed').html(windSpeed + " km/h");
		$('#direction').html(direction);

		var iconSrc = "http://openweathermap.org/img/w/" + icon + ".png";
		$('#cTemp').prepend('<img src="' + iconSrc + '">');
	});
}


function degreesToDirection(degrees){
    var range = 360/8;
    var low = 360 - range/2;
    var high = (low + range) % 360;
    var angles = ["Północny", "Północno wschodni", "Wschodni", "Południowo wschodni", "Południowy", "Południowo zachodni", "Zachodni", "Północno zachodni"];
    for( i in angles ) {
			if(degrees >= low && degrees < high){
				console.log(angles[i]);
				return angles[i];
				console.log("derp");
			}
			low = (low + range) % 360;
			high = (high + range) % 360;
		}
    return "Północny";
}



function count()
{
	var today = new Date();

	var day = today.getDate();
	var month = today.getMonth()+1;
	var year = today.getFullYear();

	var hours = today.getHours();
	if (hours<10) hours = "0"+godzina;

	var min = today.getMinutes();
	if (min<10) min = "0"+min;

	var sek = today.getSeconds();
	if (sek<10) sek = "0"+sek;

	$(".time").html(hours+":"+min+":"+sek);
	//document.getElementById("time").innerHTML =
	// hours+":"+min+":"+sek;
	$(".date").html(day+"/"+month+"/"+year);
	//document.getElementById("date").innerHTML =
	//day+"/"+month+"/"+year;

	setTimeout("count()",1000);
}
