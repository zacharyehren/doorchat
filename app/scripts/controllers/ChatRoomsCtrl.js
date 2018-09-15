(function() {
  function ChatRoomsCtrl(RoomsFactory, MessagesFactory, $cookies) {

    ctrl = this;
    ctrl.RoomsFactory = RoomsFactory;
    ctrl.MessagesFactory = MessagesFactory;

    const listRooms = function(){
      RoomsFactory.retrieveAllRooms();
    }

    ctrl.roomSelected = function(room) {
      RoomsFactory.retrieveRoomInfo(room.id);
      MessagesFactory.retrieveMessages(room.id);
      $cookies.put('roomId', room.id);
    }

    ctrl.createMessage = function(){
      if(ctrl.newMessage == undefined || ctrl.newMessage.length < 1){
        return;
      } else {
        MessagesFactory.createMessage(ctrl.newMessage).then(function(){
          MessagesFactory.retrieveMessages($cookies.get('roomId'));
        });
        ctrl.newMessage = "";
      }
    }

    listRooms();

}
  angular
    .module('doorchat')
    .controller('ChatRoomsCtrl', ['RoomsFactory', 'MessagesFactory', '$cookies', ChatRoomsCtrl]);
})();
