fetch(`https://geocoding-api.open-meteo.com/v1/search?name=hanoi`)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    data = data.results;
    console.log(data);
    let latitude = data[1].latitude;
    let longitude = data[1].longitude;
    console.log(latitude, longitude);
  });
