$(document).ready(function() {

  var URL = 'https://api.openweathermap.org/data/2.5/weather?APPID=3624a999311439f9e0c6ee8e6d7bb77f&units=metric',
      celsius,
      fahrenheit;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeather);
  } else {
    $('.name').innerHTML = "Geolocation is not supported by this browser.";
  }

  function getWeather(position) {
    
    var latitude = position.coords.latitude,
        longitude = position.coords.longitude;
    
    $.ajax({
      url: URL,
      data: {
        lat: latitude,
        lon: longitude
      }
    })
    .done(function(data) {
      $('.name').text(data.name + ', ' + data.sys.country);
      $('.icon').html('<img src="http://openweathermap.org/img/w/' + data.weather[0].icon + '.png">');
      $('.temp').text(Math.round(data.main.temp));
      
      celsius = Math.round(data.main.temp);
      fahrenheit = Math.round(celsius * 9 / 5 + 32);
      
      $('.main').text(data.weather[0].main);
      $('.description').text(data.weather[0].description);
      $('.pressure').text(data.main.pressure);
      $('.humidity').text(data.main.humidity);
      $('.wind').text(data.wind.speed);
      $('.arrow').css('transform', 'rotate(' + data.wind.deg + 'deg)');
    })
    .error(function(err) {
      $('.name').text(err);
    });
    
  }
 
  $('.btn:first-child').on('click', function() {
    $('.temp').text(celsius);
    $('.btn:first-child').addClass('active').siblings().removeClass('active');
  });
  
  $('.btn:last-child').on('click', function() {
    $('.temp').text(fahrenheit);
    $('.btn:last-child').addClass('active').siblings().removeClass('active');
  });
  
  function selectImg(images, temperature) {
    if (temperature <= -20) return images['freeze'];
    else if (-20 < temperature <= 10) return images['cold'];
    else if (10 < temperature <= 20) return images['norm'];
    else if (20 < temperature <= 30) return images['warm'];
    else if  (temperature > 30) return images['hot'];
  }
  
});