var app = angular.module('app-web', [
  'ngRoute','ngCookies'
]);



//Constantes
var addr = "192.168.1.2:8090";
var partial = "view/"

app.config(['$routeProvider',
  function($routeProvider){
  $routeProvider
    .when("/index", {
      templateUrl: partial + "partialmain.html",
      controller: "ControladorMapa"
    })
    .when("/ficha/:serieID", {
      templateUrl: partial + "partialficha.html",
      controller: "ControladorResults"
    })
    .when("/opciones", {
      templateUrl: partial + "partialopciones.html"
    })
    .when("/login", {
      templateUrl: partial + "partiallogin.html",
      controller: "ControladorLogin"
    })
    .when("/noticias", {
      templateUrl: partial + "partialnoticias.html"
    })
    .when("/signup", {
      templateUrl: partial + "partialsignupsimple.html",
      controller: "ControladorSignUp"
    })
    .when("/insertar", {
      templateUrl: partial + "partialinsertar.html",
      controller: "InsertCtrl"
    })
    .otherwise({ redirectTo: "/index" });
  }]);


app.controller("ControladorPortada",['$scope','$cookies',function($scope,$cookies){
  $scope.isLogged = function() {
  $scope.Usuario = $cookies.user;
  return !angular.isUndefined($cookies.user);
};
}]);


app.controller("ControladorMapa",['$scope',function($scope){
  var provinces = ["ah","arb","bg","bi","bit","bla","blu","boc","boi","bos","bwk","bzb","cas","ccp","cid","cks","cra","crk",
  "cw","dm","dra","drm","dus","ess","eyr","ff","fgs","fin","fmi","frozen_short","gde","gol","gul","gwk","gww",
  "gww-ec","gww-wc","har","hh","hig","hrl","ib","kar","kl","lan","mc","mc-ec","mc-wc","mns","mom","nns","north_of_wall",
  "old","ork","pyk","rea","rfk","rr","rws","san","sbb","sea","sha","shivering_sea","si","sil","ska","sns","sod","sp","ss",
  "sta","sto","sun","tar","tor","tri","ts","twi","voa","vr","wal","wal-ec","wal-wc","wh","win","win-ec","win-wc","wss","yro"
];

$scope.createDummyData = function () {
    var dataTemp = {};
    angular.forEach(provinces, function (province, key) {
        dataTemp[province] = {value: Math.random()}
    });
    $scope.dummyData = dataTemp;
};
$scope.createDummyData();
}]);

app.controller("ControladorSignUp", ['$scope','$http', '$location', function($scope, $http, $location){


  $scope.update = function(user){

      if (user.pass == user.repass){
        console.log(user.pass);
        var checkuser = {
          name: $scope.user.name,
          email: $scope.user.email,
          passw: $scope.user.pass,
        };
        $http.post("/rest/signup",checkuser)
          .success(function (user){
            $location.path("/index");
          })
          .error(function (){
            alert("Nombre o email ya registrado.");
          })
      }else{
        alert("Las contraseñas no coinciden");
      }
  };
}]);


app.controller("ControladorLogin", ['$scope','$http', '$location','$cookies', function($scope, $http, $location,	$cookies){


  $scope.submitLogin = function() {
    var user = {
      name: $scope.nombre,
      passw : $scope.pass,
    };
    $http.post('/rest/login', user)
    .success(function(data, status, headers, config) {
      $cookies.user = data.nickname;
      $location.path("/index");
    })
    .error(function (){
      alert("Usuario o contraseña Incorrectas");
    })
  };

}]);
