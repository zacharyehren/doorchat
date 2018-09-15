(function() {
  function ChatRoomsCtrl(RoomsFactory, MessagesFactory) {

    ctrl = this;
    ctrl.RoomsFactory = RoomsFactory;
    ctrl.MessagesFactory = MessagesFactory;

    const listRooms = function(){
      RoomsFactory.retrieveAllRooms();
    }

    ctrl.roomSelected = function(room) {
      RoomsFactory.retrieveRoomInfo(room.id);
      MessagesFactory.retrieveMessages(room.id);
    }

    listRooms();

}
  angular
    .module('doorchat')
    .controller('ChatRoomsCtrl', ['RoomsFactory', 'MessagesFactory', ChatRoomsCtrl]);
})();
