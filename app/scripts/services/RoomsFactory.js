(function() {
  function RoomsFactory($http) {

    const RoomsFactory = {};

    RoomsFactory.retrieveAllRooms = function(){
      var retrieveAllRooms = {
        method: 'GET',
        url: 'http://localhost:8080/api/rooms'
      };
      return $http(retrieveAllRooms).then(function successCallback(response) {
        RoomsFactory.rooms = response.data;
      });
    };

    RoomsFactory.retrieveRoomInfo = function(roomId){
      var retrieveRoomInfo = {
        method: 'GET',
        url: 'http://localhost:8080/api/rooms/' + roomId
      };
      return $http(retrieveRoomInfo).then(function successCallback(response) {
        RoomsFactory.roomInfo = response.data;
      });
    };

    return RoomsFactory;
  };

  angular
    .module('doorchat')
    .factory('RoomsFactory', ['$http', RoomsFactory])
})();
