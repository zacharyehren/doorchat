(function() {
  function ChatRoomsCtrl(RoomsFactory, MessagesFactory, $cookies, $location, $anchorScroll) {

    ctrl = this;
    ctrl.RoomsFactory = RoomsFactory;
    ctrl.MessagesFactory = MessagesFactory;
    ctrl.username = $cookies.get('username');
    ctrl.roomOpened = false;

    const findMinutes = function() {
      // Subtracts the current time by the time the username was created
      // Multiply by 60,000 to convert milliseconds to minutes
      // Round down to whole number
      return Math.floor((Date.now() - localStorage.getItem("timeLoggedIn")) / 60000);
    }

    const listRooms = function() {
      RoomsFactory.retrieveAllRooms();
      ctrl.online = findMinutes();
    }

    ctrl.roomSelected = function(room) {
      RoomsFactory.retrieveRoomInfo(room.id);
      MessagesFactory.retrieveMessages(room.id);
      ctrl.roomId = room.id;
      ctrl.online = findMinutes();
      ctrl.roomOpened = true;
    }

    ctrl.createMessage = function() {
      if (ctrl.newMessage == undefined || ctrl.newMessage.length < 1) {
        return;
      } else {
        MessagesFactory.createMessage(ctrl.newMessage).then(function() {
          MessagesFactory.retrieveMessages(ctrl.roomId);
        });
        ctrl.newMessage = "";
        ctrl.online = findMinutes();
      }
    }

    listRooms();

  }
  angular
    .module('doorchat')
    .controller('ChatRoomsCtrl', ['RoomsFactory', 'MessagesFactory', '$cookies', '$location', '$anchorScroll', ChatRoomsCtrl]);
})();
