var request = require('request')

var setPixel = function (x, y, color) {
  var url = 'https://josephg.com/sp/edit?x=' + x + '&y=' + y + '&c=' + color
  request.post(url, function (headers, response) {
    console.log(x, y, response.statusCode)
  })
}

for (var i = 0; i < 100; i++) {
  setTimeout(setPixel.bind(null, i, i, 5), 2000 * i)
}
