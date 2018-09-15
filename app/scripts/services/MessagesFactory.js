(function() {
  function MessagesFactory($http) {

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

    return MessagesFactory;
  };

  angular
    .module('doorchat')
    .factory('MessagesFactory', ['$http', MessagesFactory])
})();
