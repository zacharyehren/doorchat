(function() {
  function SignInPageCtrl($cookies) {

    ctrl = this;

    ctrl.submitUsername = function(){
      $cookies.put('username', ctrl.username);
    }

}
  angular
    .module('doorchat')
    .controller('SignInPageCtrl', ['$cookies', SignInPageCtrl]);
})();
