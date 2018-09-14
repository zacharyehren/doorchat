(function() {
  function SignInPageCtrl($cookies) {

    ctrl = this;

}
  angular
    .module('doorchat')
    .controller('SignInPageCtrl', ['$cookies', SignInPageCtrl]);
})();
