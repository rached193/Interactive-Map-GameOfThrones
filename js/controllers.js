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
  var provinces = ["ah","arb","bg","bi","bit","bla","blu","boc","boi","bos","bwb","bwk","bzb","cas","ccp","cid","cks","cra","crk",
  "cw","dm","dra","drm","dus","ess","eyr","ff","fgs","fin","fmi","frozen_short","gde","gol","gul","gwk","gww",
  "har","hh","hig","hrl","ib","kar","kl","lan","mc","mns","mom","nns","north_of_wall",
  "old","ork","pyk","rea","rfk","rr","rws","san","sbb","sea","sha","shivering_sea","si","sil","ska","sns","sod","sp","ss",
  "sta","sto","sun","sus","tar","tor","tri","ts","twi","voa","vr","wal","wh","win","wss","yro"
];

var nombresProvincia = ["Marcaceniza","El Rejo","Puerta de la sangre","Isla del Oso","El Mordisco","Refugionegro","Piedrasviejas",
"Bahia de los Cangrejos","Bahia del Hielo","Bahia de las focas","Bahia de Aguasnegras","Aguasclaras","Bahia Aguasresplandecientes",
"Roca Casterly","Vallepardo","La Sidra","Mar del Ocaso norte","El Risco","Altojardin","La Selva","Bosquespeso","Rocadragon","Marcas de Dorne",
"Valleoscuro","Mar del Verano este","Nido de aguilas","Dedo de Pedernal","Mar de los Dedos","Comezon de Aguasfrias","Aguasdulces","Costa helada",
"Torreon Bellota","Fuerte Desolacion","Puerto Gaviota","Gran Wyk","Atalaya de Aguasgrises","Harrenhal","Colina Cuerno","Tierras Altas",
"Harlaw","Bahia de los hombres del hierro","Bastion Kar","Desembarco del Rey","Roble Viejo","Foso Cailin","Mar Angosto central","Soto Gris",
"Mar Angosto norte","Norte de el Muro","Antigua","Viejo Wyk","Pyke","Puenteamargo","Colmillo Dorado","Arbol de los Cuervos","Estrecho del Rejo",
"Asperon","Bahia de los naufragios","Varamar","Punta Aguda","Mar de los Escalofrios","Islas Escudo","Refugio de Plata","Skagos",
"Mar Angosto sur","Mar de Dorne","Salinas","Nuevo Barril","Campoestrella","Bastion de Tromentas","Lanza del Sol","Mar del Ocaso sur","Tarth",
"Tor","Darry","Ciudadela de Torrhen","Los Gemelos","Arcolargo","Dominio del Cielo","El Muro","Puerto Blanco","Invernalia","Mar del Verano oeste","Palosanto"
];
$scope.createDummyData = function () {
    var dataTemp = {};
    angular.forEach(provinces, function (province, key) {
        dataTemp[province] = {value: Math.random(), name: nombresProvincia[key]}
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


app.controller("ControladorSelecionarCasa",['$scope','$cookies',function($scope,$cookies){
  var Casas = [{nombre:"Casa Marbarand",provincia:"Marcaceniza",escudo:"marbarand.jpg",plot:"Es una casa noble de las Tierras del Oeste y vasalla de la Casa Lannister de Roca Casterly. Su asentamiento es Marcaceniza. Su lema es: 'Ardiendo con intensidad'."},
{nombre:"Casa Redwyne",provincia:"El Rejo",escudo:"redwyne.jpg",plot:"Casa noble del Dominio y vasalla de la Casa Tyrell, con quien tiene fuertes lazos. Es la principal administradora de barcos de todo Poniente. Su asentamiento es la isla de El Rejo situada al sur del canal de los susurros."},
{nombre:"Casa Waynwood",provincia:"La Puerta de Sangre",escudo:"waynwood.jpg",plot:"La Casa Waynwood, vasalla de la Casa Arryn, y su asentamiento original es Roble de Hierro. Sus integrantes tienen fama de tener gran apego a las viejas tradiciones y ceremonias."},
{nombre:"Casa Mormont",provincia:"Isla del Oso",escudo:"mormont.jpg",plot:"La Casa Mormont es vasalla de la Casa Stark. Según la leyenda, su isla fue ganada en una competición por Rodrick Stark, que se la entregó en regencia a los Mormont, familia noble pero pobre. Su lema es: 'Aquí aguantamos'."},
{nombre:"Casa Dondarrion",provincia:"Refugionegro",escudo:"dondarrion.jpg",plot:"Casa noble de las Tierras de la Tormenta, bajo la Casa Baratheon. Según la leyenda, proceden de un mensajero de los Baratheon que fue atacado por dos dornienses en el camino durante una noche tormentosa. Un rayo violeta fulminó a sus atacantes y dio lugar a su escudo."},
{nombre:"Casa Tully",provincia:"Aguasdulces",escudo:"tully.jpg",plot:"La Casa Tully ha sido la regente de Aguasdulces durante más de mil años. Es una de las principales casa de Poniente. Su linage se extien dedesde la Edad de los Héroes como 'señores de Aguasdulces', nunca como reyes. Su lema es: 'Familia, deber, honor'."},
{nombre:"Casa Florent",provincia:"Aguasclaras",escudo:"florent.jpg",plot:"La Casa Florent de Aguasclaras es una casa noble del Dominio y vasalla de los Tyrell. Según la leyenda, la casa fuefundada porlos descendientes de Florys la Raposa, una de las legendarias hijas de Garth Manoverde, por ello reclaman la superioridad de su linaje frente a los Tyrell."},
{nombre:"Casa Lannister",provincia:"Roca Casterly",escudo:"lannister.jpg",plot:"La Casa Lannister de Roca Casterly es una de las principales casas de Poniente conocida por ser una de las más ricas por le existencia de minas de oro en sus tierras. Este hecho les ha valido el dicho de 'Un Lannister siempre paga sus deudas' más conocido que su lema original: 'Oye mi rugido'."},
{nombre:"Casa Brune de Vallepardo",provincia:"Vallepardo",escudo:"brune.jpg",plot:"La Casa Brune es una casa de caballería de las Tierras de la Corona y vasalla de la Casa Targaryen."},
{nombre:"Casa Fossoway",provincia:"La Sidra",escudo:"fossway.jpg",plot:"La Casa Fossoway de La Sidra es vasalla de la casa Tyrell y se encuentra en el Dominio. Según la leyenda, la casa fue fundada por Foss en Arquero, uno de los legendarios hijos de Garth Manoverde. Su lema es: 'El sabor de la gloria'."},
{nombre:"Casa Stark",provincia:"Invernalia",escudo:"stark.jpg",plot:"Es la casa noble del Norte, asentada en Invernalia y descendientes de los Primeros Hombres. Según la leyenda, Bran el Constructor, primer Stark, es quién edificó Invernalia y ayudó en la construcción del Muro (la mayor estructura defensiva de Poniente, para contener a los salvajes). Su lema es: 'Se acerca el Invierno'."},
{nombre:"Casa Nymerios Martell",provincia:"Lanza del Sol",escudo:"martell.jpg",plot:"La casa Martell es la regente del territorio de Dorne, con asentamiento en Lanza del Sol. Este territorio fue de los últimos anexionados a Poniente y mediante una unión matrimonial, de ahí el lema de la casa: 'Nunca doblegado, nunca roto'."},
{nombre:"Casa Baratheon",provincia:"Bastión de Tormentas",escudo:"baratheon.jpg",plot:"Es la casa noble de Tierra de la Tormenta. El origen de esta casa se remonta a la conquista de Aegon Targaryen, siendo una familia que ascendió al asesinar al anterior Rey de la Tormenta (antes pertenecientes a la Casa Durrandon). Desde entonces ostentan puestos de relevancia como hábiles consejeros y carismáticos comandantes. Su lema es: 'Nuestra es la furia'."},
{nombre:"Casa Tyrell",provincia:"Altojardín",escudo:"tyrel.jpg",plot:"Se trata de la casa gobernante del territorio del Dominio, con asentamiento en Altojardín. Alegan descender también de Garth Manoverde, no obstante llegaron a regir el Dominio tras jurar fidelidad a Aegon Targaryen, tras la muerte del anterior regidor (de la Casa Gardener). Su lema es: 'Crece fuerte'."},
{nombre:"Casa Arryn",provincia:"Nido de Águilas",escudo:"arryn.jpg",plot:"Casa gobernante del Valle de Arryn y las Montañas de la Luna. Se estirpe proviene de los Ándalos que conquistaron Poniente (respetando esta línea mediante matrimonios con otras familias de origen ándalo) . Su lema es: 'Tan alto como el honor'."},
];
}]);
