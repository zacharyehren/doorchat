(function() {
  function SignInPageCtrl($cookies, $location) {

    ctrl = this;

    ctrl.submitUsername = function(){
      $cookies.put('username', ctrl.username);
      $location.path('/chatRooms')
    }

}
  angular
    .module('doorchat')
    .controller('SignInPageCtrl', ['$cookies', '$location', SignInPageCtrl]);
})();
