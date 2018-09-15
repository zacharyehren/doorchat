(function() {
  function ChatRoomsCtrl(RoomsFactory) {

    ctrl = this;
    ctrl.RoomsFactory = RoomsFactory;

    const listRooms = function(){
      RoomsFactory.retrieveAllRooms();
    }

    ctrl.roomSelected = function(room) {
      RoomsFactory.retrieveRoomInfo(room.id);
    }

    listRooms();

}
  angular
    .module('doorchat')
    .controller('ChatRoomsCtrl', ['RoomsFactory', ChatRoomsCtrl]);
})();
