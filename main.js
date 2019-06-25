$(document).ready(function() {

  var URL = 'https://api.openweathermap.org/data/2.5/weather?APPID=3624a999311439f9e0c6ee8e6d7bb77f&units=metric',
      celsius,
      fahrenheit;

  function getWeather(arg) {
    let options;
    
    if (typeof arg === 'string') {
      options = {
        q: arg
      }
    } else {
      options = {
        lat: arg.coords.latitude,
        lon: arg.coords.longitude
      }
    }
    
    $.ajax({
      url: URL,
      data: options
    })
    .done(renderWeatherData)
    .error(function(err) {
      $('.name').text(err.responseJSON.message);
      emptyFields();
    });
  
  }
 
  function renderWeatherData(data) {
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
  }

  function emptyFields() {
    $('.icon').html('');
    $('.temp').text('');    
    $('.main').text('');
    $('.description').text('');
    $('.pressure').text('');
    $('.humidity').text('');
    $('.wind').text('');
  }
  
  function selectImg(images, temperature) {
    if (temperature <= -20) return images['freeze'];
    else if (-20 < temperature <= 10) return images['cold'];
    else if (10 < temperature <= 20) return images['norm'];
    else if (20 < temperature <= 30) return images['warm'];
    else if  (temperature > 30) return images['hot'];
  }

  $('form#cityName').on('submit', e => {
    e.preventDefault();

    getWeather(document.getElementById('city').value);
  });

  $('form#currentLocation').on('submit', e => {
    e.preventDefault();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getWeather);
    } else {
      $('.name').innerHTML = "Geolocation is not supported by this browser.";
    }
  });

  $('.btn:first-child').on('click', function() {
    $('.temp').text(celsius);
    $('.btn:first-child').addClass('active').siblings().removeClass('active');
  });
  
  $('.btn:last-child').on('click', function() {
    $('.temp').text(fahrenheit);
    $('.btn:last-child').addClass('active').siblings().removeClass('active');
  });
  
});