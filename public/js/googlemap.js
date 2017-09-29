$(function(){
var map;
function initMap() {
  var myCenter = {lat: 46.413, lng: -94.504};
  map = new google.maps.Map(document.getElementById('map'), {
    center: myCenter,
    zoom: 6,
    styles: mapStyle
  });
  map.data.setStyle(styleFeature);

  var script = document.createElement('script');
  var snowUrl = "https://www.ncdc.noaa.gov/snow-and-ice/daily-snow/MN-snowfall-201612.json";
  $.ajax({
      type: "get",
      url: snowUrl,
      dataType: "json",
      jsonp:"callback",
      success: function (data) {
          dataSource = data.data;
          dataDesc = data.description;
          snowDisp = parseSnowData(dataSource);
          var testSnow = snowDisp;
          var test = '{"type":"FeatureCollection","features":[{"type":"Feature","properties":{"mag":1.3}, "geometry":{"type":"Point","coordinates":[-140.8051,61.5171]}},{"type":"Feature","properties":{"mag":1.3}, "geometry":{"type":"Point","coordinates":[-140.8051,63]}}]}';
          var testJson = JSON.parse(testSnow);
          var jData = eqfeed_callback(testJson);
          console.log(testJson["features"]);
          script.setAttribute('src',jData);
          document.getElementsByTagName('head')[0].appendChild(script);
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
          alert(errorThrown);
      }
  });
}

// function for parsing snowdata to geo map format
function parseSnowData(dataSource) {
  var maxSnowF = 0;
  $.each(dataSource, function(i, n){
      $.each(n["values"], function(j, m){
          // console.log("maxsnowf: " + m);
          maxSnowF = parseFloat(m)>maxSnowF ? parseFloat(m) : maxSnowF;
      });
  });

  console.log("maxsnowf: " + maxSnowF);
  var snowMapJson = '{"type":"FeatureCollection","features":[';
  var day = 9;
  var ii = 0;
  var i1 = 0, i2 = 0, i3 = 0;
  $.each(dataSource, function(i, n){
      var magVal = parseFloat(n["values"][day]);
      if(isNaN(magVal)){
          magVal = 0.0;
      }
      if(magVal<1) i1++;
      else if(magVal>=1 && magVal<5) i2++;
      else if(magVal>5) i3++;
      magVal = magVal*3 + 2;
      snowMapJson += '{"type":"Feature","properties":{"mag":' + magVal + '}, "geometry":{"type":"Point","coordinates":[' + n["lon"] + "," + n["lat"] + ']}},';
      ii++;
      if(ii==2000) return false;
  });
  console.log(i1 + "---" + i2 + '----' + i3);

  snowMapJson = snowMapJson.substring(0, snowMapJson.length-1);
  snowMapJson += ']}';
  return snowMapJson;
}

// Defines the callback function referenced in the jsonp file.
function eqfeed_callback(data) {
  map.data.addGeoJson(data);
}

function styleFeature(feature) {
  var low = [151, 83, 34];   // color of mag 1.0
  var high = [5, 69, 54];  // color of mag 6.0 and above
  var minMag = 1.0;
  var maxMag = 6.0;

  // fraction represents where the value sits between the min and max
  var fraction = (Math.min(feature.getProperty('mag'), maxMag) - minMag) /
      (maxMag - minMag);
  var color = interpolateHsl(low, high, fraction);
  return {
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      strokeWeight: 0.5,
      strokeColor: '#fff',
      fillColor: color,
      fillOpacity: 2 / feature.getProperty('mag'),
      // while an exponent would technically be correct, quadratic looks nicer
      scale: Math.pow(feature.getProperty('mag'), 2)
    },
    zIndex: Math.floor(feature.getProperty('mag'))
  };
}

function interpolateHsl(lowHsl, highHsl, fraction) {
  var color = [];
  for (var i = 0; i < 3; i++) {
    // Calculate color based on the fraction.
    color[i] = (highHsl[i] - lowHsl[i]) * fraction + lowHsl[i];
  }

  return 'hsl(' + color[0] + ',' + color[1] + '%,' + color[2] + '%)';
}

var mapStyle = [{
  'featureType': 'all',
  'elementType': 'all',
  'stylers': [{'visibility': 'off'}]
}, {
  'featureType': 'landscape',
  'elementType': 'geometry',
  'stylers': [{'visibility': 'on'}, {'color': '#fcfcfc'}]
}, {
  'featureType': 'water',
  'elementType': 'labels',
  'stylers': [{'visibility': 'off'}]
}, {
  'featureType': 'water',
  'elementType': 'geometry',
  'stylers': [{'visibility': 'on'}, {'hue': '#5f94ff'}, {'lightness': 60}]
}];
