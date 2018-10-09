(function() {
  function SignInPageCtrl($cookies, $location) {

    ctrl = this;

    ctrl.submitUsername = function(){
      $cookies.put('username', ctrl.username);
      $location.path('/chatRooms')
      $cookies.put("timeLoggedIn", Date.now());
    }

}
  angular
    .module('doorchat')
    .controller('SignInPageCtrl', ['$cookies', '$location', SignInPageCtrl]);
})();
