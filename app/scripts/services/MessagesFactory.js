(function() {
  function MessagesFactory($http, $cookies) {

    const MessagesFactory = {};

    MessagesFactory.retrieveMessages = function(roomId){
      var retrieveMessages = {
        method: 'GET',
        url: 'http://localhost:8080/api/rooms/' + roomId + '/messages'
      };
      return $http(retrieveMessages).then(function successCallback(response) {
        MessagesFactory.messages = response.data;
        console.log(MessagesFactory.messages);
      });
    };

    MessagesFactory.createMessage = function(message){
      var createMessage = {
        method: 'POST',
        url: 'http://localhost:8080/api/rooms/' + $cookies.get('roomId') + '/messages',
        data: {
          name: $cookies.get('username'),
          message: message
        }
      };
      return $http(createMessage).then(function successCallback(response) {
        MessagesFactory.newMessage = response.data;
        console.log(MessagesFactory.newMessage);
      });
    };

    return MessagesFactory;
  };

  angular
    .module('doorchat')
    .factory('MessagesFactory', ['$http', '$cookies', MessagesFactory])
})();
