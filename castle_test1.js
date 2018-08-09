var request = require('request');

var URLpoulpi = 'http://castles.poulpi.fr';

var full_chests = []; //coffres pleins

request('http://castles.poulpi.fr/castles/1/rooms/entry', function (error, response, body) {

  var castle_entry = JSON.parse(body);           //parcours le JSON de l'entrée du Chateau et le stock dans une variable
  var castle_entry_rooms = castle_entry.rooms;   //tableau qui correspond aux pièces accessibles depuis l'entrée du Chateau
  var castle_entry_chests = castle_entry.chests; //tableau qui correspond aux coffres accessibles depuis l'entrée du Chateau

  for (var i = 0; i < castle_entry_chests.length; i++) {  //on parcourt tous les coffres de l'entrée du Chateau

    request(`${URLpoulpi}${castle_entry_chests[i]}`, function (error, response, body) {
      var castle_entry_chests_result = JSON.parse(body);  //on stocke les JSON des tous les coffres de l'entrée dans une variable 

      console.log(castle_entry_chests_result.id);
      if (castle_entry_chests_result.status == 'This chest is empty :/ Try another one!') {
        full_chests.push(castle_entry_chests_result.id);
      }

    });
  }




});

console.log("full chests :", full_chests);