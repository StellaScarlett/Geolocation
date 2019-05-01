var x = document.getElementById("demo");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred."
      break;
  }
}

var numOrientationChanges = 0,
    lastOrientation,
    startTime = + new Date(),
    timer;
                    
function readDeviceOrientation() {

    var orientationLabel,
      curTime = + new Date() - startTime;
                    
    if (Math.abs(window.orientation) === 90) {
        // Landscape
        orientationLabel = "LANDSCAPE " + window.orientation;
    } else {
      // Portrait
      orientationLabel = "PORTRAIT " + window.orientation;
    }
    
    if (lastOrientation !== window.orientation) {
        
        if (numOrientationChanges === 0) {
            document.getElementById("first").innerHTML = 
                orientationLabel + " (" + curTime + " ms)";
        } else if (numOrientationChanges === 1) {
            document.getElementById("second").innerHTML = 
                orientationLabel + " (" + curTime + " ms)";
            clearInterval(timer);
        }
        lastOrientation = window.orientation;
        numOrientationChanges += 2;
    }
}

window.onorientationchange = readDeviceOrientation;

window.onload = function () {
  readDeviceOrientation();
  document.getElementById("onLoad").innerHTML = 
    (+ new Date() - startTime) + " ms";
};

readDeviceOrientation();
timer = setInterval(readDeviceOrientation, 1/60);