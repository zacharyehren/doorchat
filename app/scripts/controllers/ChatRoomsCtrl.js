(function() {
  function ChatRoomsCtrl(RoomsFactory, MessagesFactory, $cookies, $location, $anchorScroll, $timeout, $scope) {

    ctrl = this;
    ctrl.RoomsFactory = RoomsFactory;
    ctrl.MessagesFactory = MessagesFactory;
    ctrl.username = $cookies.get('username');
    ctrl.roomOpened = false;

    const initialize = function(){
      ctrl.online = findMinutes();
      setTimer();
      listRooms();
    }

    const findMinutes = function() {
      // Subtracts the current time by the time the username was created
      // Divide by 60,000 to convert milliseconds to minutes
      return Math.floor((Date.now() - localStorage.getItem("timeLoggedIn")) / 60000);
    }

    const setTimer = function() {
     $timeout(function(){
       ctrl.online = findMinutes();
       return setTimer();
     }, 60000);
   }

    const listRooms = function() {
      RoomsFactory.retrieveAllRooms();
    }

    ctrl.roomSelected = function(room) {
      ctrl.roomId = room.id;
      ctrl.roomOpened = true;
      RoomsFactory.retrieveRoomInfo(room.id);
      MessagesFactory.retrieveMessages(room.id);
    }

    ctrl.createMessage = function() {
      if (ctrl.newMessage == undefined || ctrl.newMessage.length < 1) {
        return;
      } else {
        MessagesFactory.createMessage(ctrl.newMessage, ctrl.roomId).then(function() {
          MessagesFactory.retrieveMessages(ctrl.roomId).then(function() {
            $timeout(function() {
              $scope.$apply();
            });
          });
        });
        ctrl.newMessage = "";
      }
    }

    initialize();

  }
  angular
    .module('doorchat')
    .controller('ChatRoomsCtrl', ['RoomsFactory', 'MessagesFactory', '$cookies', '$location', '$anchorScroll', '$timeout', '$scope', ChatRoomsCtrl]);
})();
