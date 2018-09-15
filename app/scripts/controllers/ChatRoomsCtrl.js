(function() {
  function ChatRoomsCtrl(RoomsFactory, MessagesFactory, $cookies) {

    ctrl = this;
    ctrl.RoomsFactory = RoomsFactory;
    ctrl.MessagesFactory = MessagesFactory;
    ctrl.username = $cookies.get('username');

    const findMinutes = function() {
      // Subtracts the current time by the time the username was created
      // Multiply by 60,000 to convert milliseconds to minutes
      // Round down to whole number
      return Math.floor((Date.now() - localStorage.getItem("timeLoggedIn")) / 60000);
    }

    const listRooms = function(){
      RoomsFactory.retrieveAllRooms();
      ctrl.online = findMinutes();
    }

    ctrl.roomSelected = function(room) {
      RoomsFactory.retrieveRoomInfo(room.id);
      MessagesFactory.retrieveMessages(room.id);
      $cookies.put('roomId', room.id);
      ctrl.online = findMinutes();
    }

    ctrl.createMessage = function(){
      if(ctrl.newMessage == undefined || ctrl.newMessage.length < 1){
        return;
      } else {
        MessagesFactory.createMessage(ctrl.newMessage).then(function(){
          MessagesFactory.retrieveMessages($cookies.get('roomId'));
        });
        ctrl.newMessage = "";
        ctrl.online = findMinutes();
      }
    }

    listRooms();

    // delete username cookie and local storage on window close
    // if cookie == null, redirect to signInPage

}
  angular
    .module('doorchat')
    .controller('ChatRoomsCtrl', ['RoomsFactory', 'MessagesFactory', '$cookies', ChatRoomsCtrl]);
})();
