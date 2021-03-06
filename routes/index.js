var express = require('express');
var router = express.Router();
var global =  {state1: {}, state2: {}, year:{}, month:{}};
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', data);
});

router.get('/rangeSlider', function(req, res, next) {
  res.render('rangeSlider',{ title: 'Express' });
});

router.get('/table', function(req, res, next) {
  res.render('table', { state1 : global.state1 ,  state2 : global.state2, year : global.year, month :global.month });
});

router.get('/map', function(req, res, next) {
  res.render('googlemap', { state1 : global.state1 ,  state2 : global.state2, year : global.year, month :global.month });
});

router.post('/submit',  function(req, res, next){
  global.state1 = req.body.state1;
  global.state2 = req.body.state2;
  global.month = req.body.month;
  global.year = req.body.year;
  res.render('googlemap',  { state1 : req.body.state1 ,  state2 : req.body.state2, year : req.body.year, month :req.body.month });
});

module.exports = router;

var data = {
  "Month": [
      { "Number": "01", "Name": "January" },
      { "Number": "02", "Name": "February" },
      { "Number": "03", "Name": "March" },
      { "Number": "04", "Name": "April" },
      { "Number": "05", "Name": "May" },
      { "Number": "06", "Name": "June" },
      { "Number": "07", "Name": "July" },
      { "Number": "08", "Name": "August" },
      { "Number": "09", "Name": "September" },
      { "Number": "10", "Name": "October" },
      { "Number": "11", "Name": "November" },
      { "Number": "12", "Name": "December" }
  ],
  "states": [
    {
        "name": "Alaska",
        "abbreviation": "AK"
    },
    {
        "name": "Arizona",
        "abbreviation": "AZ"
    },
    {
        "name": "Arkansas",
        "abbreviation": "AR"
    },
    {
        "name": "California",
        "abbreviation": "CA"
    },
    {
        "name": "Colorado",
        "abbreviation": "CO"
    },
    {
        "name": "Connecticut",
        "abbreviation": "CT"
    },
    {
        "name": "Delaware",
        "abbreviation": "DE"
    },
    {
        "name": "Florida",
        "abbreviation": "FL"
    },
    {
        "name": "Georgia",
        "abbreviation": "GA"
    },
    {
        "name": "Hawaii",
        "abbreviation": "HI"
    },
    {
        "name": "Idaho",
        "abbreviation": "ID"
    },
    {
        "name": "Illinois",
        "abbreviation": "IL"
    },
    {
        "name": "Indiana",
        "abbreviation": "IN"
    },
    {
        "name": "Iowa",
        "abbreviation": "IA"
    },
    {
        "name": "Kansas",
        "abbreviation": "KS"
    },
    {
        "name": "Kentucky",
        "abbreviation": "KY"
    },
    {
        "name": "Louisiana",
        "abbreviation": "LA"
    },
    {
        "name": "Maine",
        "abbreviation": "ME"
    },
    {
        "name": "Maryland",
        "abbreviation": "MD"
    },
    {
        "name": "Massachusetts",
        "abbreviation": "MA"
    },
    {
        "name": "Michigan",
        "abbreviation": "MI"
    },
    {
        "name": "Minnesota",
        "abbreviation": "MN"
    },
    {
        "name": "Mississippi",
        "abbreviation": "MS"
    },
    {
        "name": "Missouri",
        "abbreviation": "MO"
    },
    {
        "name": "Montana",
        "abbreviation": "MT"
    },
    {
        "name": "Nebraska",
        "abbreviation": "NE"
    },
    {
        "name": "Nevada",
        "abbreviation": "NV"
    },
    {
        "name": "New Hampshire",
        "abbreviation": "NH"
    },
    {
        "name": "New Jersey",
        "abbreviation": "NJ"
    },
    {
        "name": "New Mexico",
        "abbreviation": "NM"
    },
    {
        "name": "New York",
        "abbreviation": "NY"
    },
    {
        "name": "North Carolina",
        "abbreviation": "NC"
    },
    {
        "name": "North Dakota",
        "abbreviation": "ND"
    },
    {
        "name": "Ohio",
        "abbreviation": "OH"
    },
    {
        "name": "Oklahoma",
        "abbreviation": "OK"
    },
    {
        "name": "Oregon",
        "abbreviation": "OR"
    },
    {
        "name": "Pennsylvania",
        "abbreviation": "PA"
    },
    {
        "name": "Rhode Island",
        "abbreviation": "RI"
    },
    {
        "name": "South Carolina",
        "abbreviation": "SC"
    },
    {
        "name": "South Dakota",
        "abbreviation": "SD"
    },
    {
        "name": "Tennessee",
        "abbreviation": "TN"
    },
    {
        "name": "Texas",
        "abbreviation": "TX"
    },
    {
        "name": "Utah",
        "abbreviation": "UT"
    },
    {
        "name": "Vermont",
        "abbreviation": "VT"
    },
    {
        "name": "Virgin Islands",
        "abbreviation": "VI"
    },
    {
        "name": "Virginia",
        "abbreviation": "VA"
    },
    {
        "name": "Washington",
        "abbreviation": "WA"
    },
    {
        "name": "West Virginia",
        "abbreviation": "WV"
    },
    {
        "name": "Wisconsin",
        "abbreviation": "WI"
    },
    {
        "name": "Wyoming",
        "abbreviation": "WY"
    }
]
}
