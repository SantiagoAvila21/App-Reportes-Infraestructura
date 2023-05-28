// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

contract LocationDatabase {
  struct Location {
    string name;
    string image;
    string desc;
    int lat;
    int lon;
  }

  Location[] public locations;

  function addLocation(string memory _name, string memory _image, int _lat, int _lon, string memory _desc) public {
    Location memory newLocation;
    newLocation.name = _name;
    newLocation.image = _image;
    newLocation.lat = _lat;
    newLocation.lon = _lon;
    newLocation.desc = _desc;
    locations.push(newLocation);
  } 

  function getLocationsCount() public view returns (uint256) {
    return locations.length;
  }

  function getLocation(uint index) public view returns (string memory name, string memory image, int256 lat, int256 lon, string memory desc) {
    Location storage location = locations[index];
    name = location.name;
    image = location.image;
    lat = location.lat;
    lon = location.lon;
    desc = location.desc;
  }
}

// "Pavement Cracked", "https://cdn.pixabay.com/photo/2019/10/04/10/27/pavers-4525242_960_720.jpg", 469600500, -740403550
// "Semaforo Dañado", "https://periodismopublico.com/wp-content/uploads/2021/06/Semaforo-vandalizado-Bogota-protestas.jpg",  461471300, -740692490, "Se encuentra semaforo dañado sobre el Museo nacional"