var app = angular.module('app-web', [
'ngRoute','ngCookies','ngAnimate','ngGrid',
]);



//Constantes
var partial = "view/"

app.config(['$routeProvider',
function($routeProvider){
  $routeProvider
  .when("/mapa", {
    templateUrl: partial + "partialmain.html",
    controller: "ControladorMapa"
  })
  .when("/index", {
    templateUrl: partial + "partialHistoria.html",
    controller: "ControladorHistoria"
  })
  .when("/chat", {
    templateUrl: partial + "partialChat.html",
    controller: "ControladorChat"
  })
  .when("/mensajes", {
    templateUrl: partial + "partialPrivados.html",
    controller: "ControladorPrivados"
  })
  .when("/login", {
    templateUrl: partial + "partiallogin.html",
    controller: "ControladorLogin"
  })
  .when("/casas", {
    templateUrl: partial + "partialSeleccionarCasa.html",
    controller: "ControladorSelecionarCasa"
  })
  .when("/signup", {
    templateUrl: partial + "partialsignupsimple.html",
    controller: "ControladorSignUp"
  })
  .when("/usuarios", {
    templateUrl: partial + "partialusuarios.html",
    controller: "ControladorListado"
  })
  .when("/personaje", {
    templateUrl: partial + "partialformPersonaje.html",
    controller: "ControladorPersonaje"
  })
  .when("/perritos/:userID", {
    templateUrl: partial + "partialListadoFichas.html",
    controller: "ControladorFichaUsuario"
  })
  .otherwise({ redirectTo: "/index" });
}]);


app.controller("ControladorPortada",['$scope','$cookies','$rootScope',function($scope,$cookies,$rootScope){
  $scope.isLogged = function() {
    $scope.Usuario = $cookies.user;
    $scope.Casa = $cookies.casa;
    return !angular.isUndefined($cookies.user);
  };

  $scope.isRegister = function() {
    return  !angular.isUndefined($cookies.user) && $cookies.personaje!="null";
  };

  $scope.isSelected = function(checkTab){
    return $rootScope.tab === checkTab;
  };

  $scope.logOut = function(){
    delete $cookies["user"];
    delete $cookies["casa"];
    delete $cookies["personaje"];
    delete $cookies["sexo"];
  };
}]);


app.controller("ControladorMapa",['$scope','$rootScope',function($scope,$rootScope){

  $rootScope.tab = 7;

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

var coloresProvincia = ["rgba(255,0,0,1)","rgba(0,255,9,1)","rgba(0,239,255,1)","rgba(222,222,222,1)","rgba(0,0,0,1)","rgba(255,255,70  ,1)",
"rgba(3,20,255,1)","rgba(0,0,0,1)","rgba(0,0,0,1),","rgba(0,0,0,1)","rgba(0,0,0,1)","rgba(51,253,57,1)","rgba(0,0,0,1)",
"rgba(255,28,28,1)","rgba(183,3,169,1)","rgba(51,253,57,1)","rgba(0,0,0,1)","rgba(230,3,3,1)","rgba(0,219,7,1)","rgba(255,255,46,1)","rgba(212,210,210,1)",
"rgba(161,2,150,1)","rgba(193,193,0,1)","rgba(155,40,147,1)","rgba(0,0,0,1)","rgba(122,247,255,1)","rgba(201,198,198,1)","rgba(0,0,0,1)","rgba(181,251,255,1)","rgba(94,99,252,1)",
"rgba(0,0,0,1)","rgba(21,36,246,1)","rgba(210,1,1,1)","rgba(0,223,239,1)","rgba(21,111,3,1)","rgba(183,181,181,1)","rgba(47,61,255,1)","rgba(1,201,8,1)","rgba(20,196,26,1)",
"rgba(18,95,2,1)","rgba(0,0,0,1)","rgba(169,168,168,1)","rgba(137,2,128,1)","rgba(0,255,51,1)","rgba(155,155,155,1)","rgba(0,0,0,1)","rgba(2,202,216,1)","rgba(0,0,0,1)",
"rgba(0,0,0,1)","rgba(0,169,6,1)","rgba(14,78,2,1)","rgba(45,104,33,1)","rgba(0,154,5,1)","rgba(255,51,51,1)","rgba(61,74,255,1)","rgba(0,0,0,1)","rgba(255,154,0,1)","rgba(0,0,0,1)",
"rgba(4,17,192,1)","rgba(226,226,1,1)","rgba(0,0,0,1)","rgba(26,151,30,1)","rgba(255,84,84,1)","rgba(144,143,143,1)","rgba(0,0,0,1)","rgba(0,0,0,1)","rgba(0,186,199,1)",
"rgba(23,198,29,1)","rgba(255,94,0,1)","rgba(165,165,1,1)","rgba(255,133,1,1)","rgba(0,0,0,1)","rgba(144,144,0,1)","rgba(253,117,38,1)","rgba(22,31,169,1)",
"rgba(135,134,134,1)","rgba(71,76,198,1)","rgba(1,166,178,1)","rgba(218,112,6,1)","rgba(255,255,255,1)","rgba(111,110,110,1)","rgba(101,100,100,1)","rgba(0,0,0,1)","rgba(255,128,0,1)",
];


$scope.sitio = "Fuera";

$scope.ciudadinicial = "svg_1";


$scope.createDummyData = function () {
  var dataTemp = {};
  angular.forEach(provinces, function (province, key) {
    dataTemp[province] = {value: Math.random(), name: nombresProvincia[key], color:coloresProvincia[key]}
  });
  $scope.dummyData = dataTemp;
};
//$scope.createDummyData();
}]);

app.controller("ControladorSignUp", ['$scope','$http', '$location','$cookies','$rootScope', function($scope, $http, $location,$cookies,$rootScope){

  $rootScope.tab = 3;
  $scope.update = function(user){
    if (user.pass == user.repass){
      var checkuser = {
        name: $scope.user.name,
        email: $scope.user.email,
        passw: $scope.user.pass,
      };
      $http.post("/api/v1/signup",checkuser)
      .success(function (user){
        $cookies.user= $scope.user.name;
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


app.controller("ControladorLogin", ['$scope','$http', '$location','$cookies','$rootScope', function($scope, $http, $location,	$cookies,$rootScope){
  $rootScope.tab = 4;

  $scope.submitLogin = function() {
    var user = {
      name: $scope.nombre,
      passw : $scope.pass,
    };
    $http.post('/api/v1/login', user)
    .success(function(data, status, headers, config) {
      $cookies.user = data.nickname;
      $cookies.casa = data.casa;
      $cookies.personaje = data.personaje;
      if (data.sexo == "hombre"){
        $cookies.sexo = "Lord";
      }else if (data.sexo == "mujer"){
        $cookies.sexo = "Lady";
      }
      $location.path("/index");
    })
    .error(function (){
      alert("Usuario o contraseña Incorrectas");
    })
  };

}]);


app.controller("ControladorSelecionarCasa",['$scope','$cookies','$http','$location','$rootScope',function($scope,$cookies,$http,$location,$rootScope){
  $rootScope.tab = 4;

  $scope.slides = [{nombre:"Marbrand",provincia:"Marcaceniza",escudo:"marbrand.png",plot:"Es una casa noble de las Tierras del Oeste y vasalla de la Casa Lannister de Roca Casterly. Su asentamiento es Marcaceniza. Su lema es: 'Ardiendo con intensidad'."},
  {nombre:"Redwyne",provincia:"El Rejo",escudo:"redwyne.png",plot:"noble del Dominio y vasalla de la Casa Tyrell, con quien tiene fuertes lazos. Es la principal administradora de barcos de todo Poniente. Su asentamiento es la isla de El Rejo situada al sur del canal de los susurros."},
  {nombre:"Waynwood",provincia:"La Puerta de Sangre",escudo:"waynwood.png",plot:"La Casa Waynwood, vasalla de la Casa Arryn, y su asentamiento original es Roble de Hierro. Sus integrantes tienen fama de tener gran apego a las viejas tradiciones y ceremonias."},
  {nombre:"Mormont",provincia:"Isla del Oso",escudo:"mormont.png",plot:"La Casa Mormont es vasalla de la Casa Stark. Según la leyenda, su isla fue ganada en una competición por Rodrick Stark, que se la entregó en regencia a los Mormont, familia noble pero pobre. Su lema es: 'Aquí aguantamos'."},
  {nombre:"Dondarrion",provincia:"Refugionegro",escudo:"dondarrion.png",plot:"noble de las Tierras de la Tormenta, bajo la Casa Baratheon. Según la leyenda, proceden de un mensajero de los Baratheon que fue atacado por dos dornienses en el camino durante una noche tormentosa. Un rayo violeta fulminó a sus atacantes y dio lugar a su escudo."},
  {nombre:"Tully",provincia:"Aguasdulces",escudo:"tully.png",plot:"La Casa Tully ha sido la regente de Aguasdulces durante más de mil años. Es una de las principales casa de Poniente. Su linage se extien dedesde la Edad de los Héroes como 'señores de Aguasdulces', nunca como reyes. Su lema es: 'Familia, deber, honor'."},
  {nombre:"Florent",provincia:"Aguasclaras",escudo:"florent.png",plot:"La Casa Florent de Aguasclaras es una casa noble del Dominio y vasalla de los Tyrell. Según la leyenda, la casa fuefundada porlos descendientes de Florys la Raposa, una de las legendarias hijas de Garth Manoverde, por ello reclaman la superioridad de su linaje frente a los Tyrell."},
  {nombre:"Lannister",provincia:"Roca Casterly",escudo:"lannister.png",plot:"La Casa Lannister de Roca Casterly es una de las principales casas de Poniente conocida por ser una de las más ricas por le existencia de minas de oro en sus tierras. Este hecho les ha valido el dicho de 'Un Lannister siempre paga sus deudas' más conocido que su lema original: 'Oye mi rugido'."},
  {nombre:"Brune de Vallepardo",provincia:"Vallepardo",escudo:"brune.png",plot:"La Casa Brune es una casa de caballería de las Tierras de la Corona y vasalla de la Casa Targaryen."},
  {nombre:"Fossoway",provincia:"La Sidra",escudo:"fossway.png",plot:"La Casa Fossoway de La Sidra es vasalla de la casa Tyrell y se encuentra en el Dominio. Según la leyenda, la casa fue fundada por Foss en Arquero, uno de los legendarios hijos de Garth Manoverde. Su lema es: 'El sabor de la gloria'."},
  {nombre:"Stark",provincia:"Invernalia",escudo:"stark.png",plot:"Es la casa noble del Norte, asentada en Invernalia y descendientes de los Primeros Hombres. Según la leyenda, Bran el Constructor, primer Stark, es quién edificó Invernalia y ayudó en la construcción del Muro (la mayor estructura defensiva de Poniente, para contener a los salvajes). Su lema es: 'Se acerca el Invierno'."},
  {nombre:"Nymerios Martell",provincia:"Lanza del Sol",escudo:"martell.png",plot:"La casa Martell es la regente del territorio de Dorne, con asentamiento en Lanza del Sol. Este territorio fue de los últimos anexionados a Poniente y mediante una unión matrimonial, de ahí el lema de la casa: 'Nunca doblegado, nunca roto'."},
  {nombre:"Baratheon",provincia:"Bastión de Tormentas",escudo:"baratheon.png",plot:"Es la casa noble de Tierra de la Tormenta. El origen de esta casa se remonta a la conquista de Aegon Targaryen, siendo una familia que ascendió al asesinar al anterior Rey de la Tormenta (antes pertenecientes a la Casa Durrandon). Desde entonces ostentan puestos de relevancia como hábiles consejeros y carismáticos comandantes. Su lema es: 'Nuestra es la furia'."},
  {nombre:"Tyrell",provincia:"Altojardín",escudo:"tyrell.png",plot:"Se trata de la casa gobernante del territorio del Dominio, con asentamiento en Altojardín. Alegan descender también de Garth Manoverde, no obstante llegaron a regir el Dominio tras jurar fidelidad a Aegon Targaryen, tras la muerte del anterior regidor (de la Casa Gardener). Su lema es: 'Crece fuerte'."},
  {nombre:"Arryn",provincia:"Nido de Águilas",escudo:"arryn.png",plot:"gobernante del Valle de Arryn y las Montañas de la Luna. Se estirpe proviene de los Ándalos que conquistaron Poniente (respetando esta línea mediante matrimonios con otras familias de origen ándalo) . Su lema es: 'Tan alto como el honor'."},
  {nombre:"Clan Magnar",  provincia:"Skagos", escudo:"magnar.png",plot:" Skagos es una isla en la Bahía de las Focas, teóricamente bajo el mandato del Señor del Norte. No obstante, al tener poco contacto con las tierras continentales, son prácticamente independientes y mantienen costumbres de tribus salvajes. Sin embargo, destaca la importancia y preponderancia del Clan Magnar como gobernantes de la isla."},
  {nombre:"Karstark",  provincia:"Bastion Kar", escudo:"karstark.png",plot:" Los Karstark son una casa noble del Norte, vasallos de los Stark y rama cadete de dicha familia (fundada por Karlon Stark como recompensa por ayudar a terminar la rebelión de los Bolton). Su lema es: ‘El Sol de invierno’."},
  {nombre:"Glover",  provincia:"Bosquespeso", escudo:"glover.png",plot:" Se trata de una casa noble del Norte, vasalla de los Stark. Antes de que los Stark los sometieran, ellos eran los reyes en el norte."},
  {nombre:"Manderly",  provincia:"Puerto Blanco", escudo:"manderly.png",plot:" La Casa Manderly es una casa vasalla del Norte, bajo el dominio de la Casa Stark. Gobiernan Puerto Blanco, la menor de las cinco ciudades más importantes de Poniente, siendo el principal puerto del Norte y sede del comercio fluvial de la zona con el Sur. "},
  {nombre:"Tallhart",  provincia:"Ciedadela de Torrhen", escudo:"tallhart.png",plot:" Casa noble del Norte, vasalla de los Stark. Sigue a los Antiguos Dioses y posee un asentamiento fuerte, pero no inexpugnable. Su lema es: ‘Orgullosos y libres’."},
  {nombre:"Fenn",  provincia:"Foso Cailin", escudo:"fenn.png",plot:" La Casa Fenn está al cargo de la fortaleza ubicada en el límite Norte de la gran ciénaga (El Cuello), uno de los bastiones más importantes del Norte pese a encontrarse en ruinas. Su importancia radica en que es la única ruta segura para que los ejércitos pasen por la ciénaga (punto defensivo natural muy eficaz). La única forma de evitar pasar es ganándose la lealtad de los lacustres, quienes conocen pasos alternativos por el pantano."},
  {nombre:"Flint",  provincia:"Dedo de Perdernal", escudo:"flint.png",plot:" La Casa Flint pertenece al territorio del Norte, y por ende es vasalla de la Casa Stark. Defensores de la tradición, siguen el culto a los Dioses Antiguos."},
  {nombre:"Reed",  provincia:"Atalaya de Aguasdulces", escudo:"reed.png",plot:" Casa vasalla de los Stark, a la cual juraron lealtad hace más de mil años cuando se alzaron como Reyes del Norte. Situada en los pantanos del Cuello (se trata de una serie de islas flotantes, por lo cual su ubicación precisa es inexacta)."},
  {nombre:"Mallister",  provincia:"Varamar", escudo:"mallister.png",plot:" Casa vasalla de los Tully, situada en la costa oeste de las Tierras de los Ríos. Por las amenazas de pillaje de los Hombre del Hierro, han desarrollado una fortaleza para proteger a su gente. Su lema es: ‘Por encima del resto’."},
  {nombre:"Frey",  provincia:"Huescas", escudo:"frey.png",plot:" La Casa Frey pertenece al territorio de la Casa Tully. El nombre de sus tierras viene dado por dos castillos idénticos y el cruce fortificado del río que hay entre ellos (siendo el principal punto de acceso al Norte). Por ello es una de las casas más poderosas de las Tierras de los Ríos, enriquecida al cobrar peaje por permitir el paso (aunque de poco prestigio)."},
  {nombre:"Tollett",  provincia:"Soto Gris", escudo:"tollett.png",plot:" La Casa Tollett se encuentra en los dominios del Valle de Arryn. Siguen la Fe de los Siete y su lema es: ‘Cuando todo es más oscuro’."},
  {nombre:"Coldwater",  provincia:"Comezón de Aguasfrías", escudo:"coldwater.png",plot:" Vasallos de la Casa Arryn, situados cerca de la desembocadura del río de Los Dedos. Son descendientes de los primeros hombres a diferencia de la mayor parte del valle, de ascendencia de los Ándalos."},
  {nombre:"Mudd",  provincia:"Piedrasviejas", escudo:"mudd.png",plot:" Casa de las Tierras de los Ríos, por tanto vasalla de los Tully. Antes, gobernaron como Reyes de los Ríos y las Colinas. La fortaleza fue construida durante la invasión ándala para los reyes Mudd (derrotados en dicha contienda)."},
  {nombre:"Hawick",  provincia:"Salinas", escudo:"hawick.png",plot:" Es una pequeña ciudad portuaria dentro de las Tierras de los Ríos, en la desembocadura del Tridente, por lo cual tienen un  importante flujo comercial.  Cuenta con un pequeño castillo amurallado que domina el pueblo y el puerto."},
  {nombre:"Whent",  provincia:"Harrenhal", escudo:"whent.png",plot:" Es el castillo más grande de los Siete Reinos, ubicado en las Tierras de los Ríos (en la orilla norte del Lago Ojo de los Dioses). La Casa Whent es la séptima en asentarse en el castillo."},
  {nombre:"Blackwood",  provincia:"Árbol de los Cuervos", escudo:"blackwood.png",plot:" Vasalla de los Tully y asentada en las Tierras de los Ríos. Poseen una gran extensión de tierras que, según la leyenda, antaño pertenecieron a Seto de Piedra. Anteriormente también gobernaban el bosque de los lobos, hasta que los Reyes del Invierno les expulsaron, pero en lugar de arrodillarse huyeron al sur y desde entonces gobiernan en Árbol de los Cuervos como reyes menores."},
  {nombre:"Banefort",  provincia:"Fuerte Desolación", escudo:"banefort.png",plot:" Localizada en las Tierras del Oeste, bajo el mando de la Casa Lannister. Su localización en la costa convierten sus tierras en el punto más cercano a Pyke (a dos días de viaje en barco). Su casa desciende de un héroe, llamado el Encapuchado, que vivió en la época de los Primeros Hombres."},
  {nombre:"Harlaw",  provincia:"Harlaw", escudo:"harlaw.png",plot:" Domina la isla homónima, y la segunda más grande, dentro del territorio de la Casa Greyjoy. Es una de las casas más poderosas de las Islas del Hierro, rivalizado con la Casa Greyjoy en influencia y poder al ser la isla más poblada y rica en recursos."},
  {nombre:"Stonehouse",  provincia:"Viejo Wyk", escudo:"stonehouse.png",plot:" Es una de las casas nobles de las Islas del Hierro y vasalla de los Greyjoy. Su asentamiento en la isla de Viejo Wyk, donde desembarcaron los Primeros Hombres venidos del continente y dónde el Rey Gris asesinó al legendario dragón marino Nagga (donde se encuentra el trono ancestral de las Islas del Hierro)."},
  {nombre:"Merlyn",  provincia:"Gran Wyk", escudo:"merlyn.png",plot:" La Casa Merlyn es una casa noble de la isla más grande de las Islas del Hierro, lo cual le ha permitido ser la única que tiene fortalezas tierra adentro, alejadas del mar. Son vasallos de la Casa Greyjoy."},
  {nombre:"Greyjoy",  provincia:"Pyke", escudo:"greyjoy.png",plot:" Es una de las grandes casas de Poniente y casa principal de las Islas del Hierro, situadas en la costa oeste del continente. Su lema es: 'Nosotros no sembramos', haciendo alarde a la práctica ancestral de la piratería. Su fortaleza es Pyke, situado en la isla homónima."},
  {nombre:"Westerling",  provincia:"El Risco", escudo:"westerling.png",plot:" Casa situada en las Tierras del Oeste, bajo el dominio Lannister. Pese a ser una familia orgullosa carecieron de fondos para mantenerla la fortaleza familiar en El Risco,  que ha sido sumida en la ruina. Su lema es: 'Honor, no Honores'."},
  {nombre:"Lefford",  provincia:"Colmillo Dorado", escudo:"lefford.png",plot:""},
  {nombre:"Smallwood",  provincia:"Torreón  Bellota", escudo:"smallwood.png",plot:" El asentamiento de la Casa Smallwood es un castillo de roble rodeado de murallas de piedra en territorio de las Tierras de los Ríos. Su lema es: 'Desde estos Comienzos'. Son muy fieles a la Casa Targaryen."},
  {nombre:"Rykker",  provincia:"Valle Oscuro", escudo:"rykker.png",plot:" El dominio de la Casa Rykker es un valle donde destaca una ciudad portuaria en la costa oriental de la Bahía del Aguasnegras, cerca de Rocadragón. Al estar en las Tierras de las Coronas, es vasalla directa de la casa regente de los Siete Reinos, los Targaryen. Gobiernan todo el Valle desde su asentamiento en Fuerte Pardo."},
  {nombre:"Fossoway de la Manzana Verde",  provincia:"Nuevo Barril", escudo:"fossoway.png",plot:" Casa noble del territorio del Dominio y vasalla de la Casa Tyrell. Descienden de la familia Fossoway de la manzana roja, escindidos a raíz de un combate entre primos."},
  {nombre:"Barr Emmon",  provincia:"Punta Aguda", escudo:"barremmon.png",plot:" Es una casa noble de las Tierras de la Corona y vasalla de los Targaryen y fieles a ésta. Su asentamiento, Punta Aguda, está situada al final de Garfio de Massey, se trata de una gran torre similar a un faro con un gran fuego en la cima."},
  {nombre:"Tarth",  provincia:"Tarth", escudo:"thart.png",plot:" Es una casa vasalla de los Baratheon, situada en las Tierras de la Tormenta. Gobiernan en la Isla de Tarth, situada al norte de la Bahía de los Naufragios, en el Castillo del Atardecer. Aseguran estar emparentados con numerosas casas más poderosas, como los Baratheons y los Targaryen."},
  {nombre:"Caswell",  provincia:"Puenteamargo", escudo:"caswell.png",plot:" Su asentamiento, Puenteamargo, se encuentra en las tierras del Dominio, bajo la regencia de los Tyrell. Toma su nombre de un antiguo puente que cruza el cercano río Mander."},
  {nombre:"Hewett",  provincia:"Islas Escudo", escudo:"hewett.png",plot:" Las Islas Escudo es un archipiélago formado por cuatro islas: Escudo de Roble, Escudo Gris, Escudo del Sur y Escudo Verde. Es archipiélago está bajo el mandato de la Casa Hewett de Isla Escudo de Roble, a su vez bajo la regencia de la casa Tyrell del Dominio. Su asentamiento es la primera línea defensiva contra incursiones piratas de las Islas del Hierro y sirve de protección al Dominio."},
  {nombre:"Mullendore",  provincia:"Tierras Altas", escudo:"mullendore.png",plot:" Es una casa noble del dominio y vasalla de los Tyrell, fieles al gobierno de los Targaryen. Su asentamiento, Tierras Altas, está situado al noroeste de Antigua."},
  {nombre:"Tarly",  provincia:"Colina Cuerno", escudo:"tarly.png",plot:" Casa vasalla de la familia Tyrell y ubicada en el Dominio, situada entre las colinas bajo las Montañas Rojas de Dorne. Es una casa antigua y honorable, con tierras ricas y una fortaleza fuerte. Su lema es: ‘Primeros en Batalla’ y poseen una espada de acero valyrio, ‘Veneno de Corazón’."},
  {nombre:"Hightower",  provincia:"Antigua", escudo:"hightower.png",plot:" Los Hightower tienen sus tierras en territorio del Dominio, bajo regencia de los Tyrell. Su asentamiento es Antigua, la ciudad antigua más importante de Poniente, la segunda más poblada y tiene uno de los principales puertos comerciales de los Siete Reinos. En sus dominios también se encuentra la Ciudadela, lugar de formación de los maestres. Su lema es: ‘Iluminamos el camino’."},
  {nombre:"Fowler",  provincia:"Dominio del Cielo", escudo:"fowler.png",plot:" El territorio de la casa está situado en Dorne, bajo dominio de la Casa Martell, al inicio del Paso del Príncipe (por lo cual ostentan el título de ‘Guardianes del Paso del Príncipe’). Su asentamiento tiene el nombre de Dominio del Cielo por su posición elevada  y sus altas torres de piedra, desde donde se ve todo el Camino Ancho. Su lema es: ‘Déjame ascender’."},
  {nombre:"Caron de Nocturnia",  provincia:"Marcas de Dorne", escudo:"caron.png",plot:" Casa noble vasalla de la Casa Baratheon, quién le legó la regencia de las Marcas de Dorne (cadena montañosa que separa los territorios de las Tierras de la Tormenta y Dorne). Ostenta por ello el título de ‘Señorde las Marcas’. Su lema es: ‘Ninguna canción más dulce’."},
  {nombre:"Yronwood",  provincia:"Palosanto", escudo:"yronwood.png",plot:" El territorio de los vasallos de los Martell está situado al comienzo de Sendahueso y protege a Dorne de los intrusos que quieran acceder a la región cruzando el paso. Debido a la importancia de su función como protectores tienen diversos títulos como ‘Guardián de Sendahueso’, ‘Señor de Palosanto’, ‘Sangre Regia’… Su lema es: ‘Nosotros protegemos el camino’."},
  {nombre:"Seaworth",  provincia:"La Selva", escudo:"seaworth.png",plot:" El territorio de la Casa Seaworth es un gran bosque en las Tierras de la Corona, lo que les subordina al mando directo de los Targaryen."},
  {nombre:"Jordayne",  provincia:"Tor", escudo:"jordayne.png",plot:" Su asentamiento está situado en la costa sur del Mar de Dorne, lo que les coloca bajo el mando de la Casa Martell.  Su lema es: ‘Deja que sea escrito’."},
  {nombre:"Qorgyle",  provincia:"Asperon", escudo:"qorgyle.png",plot:" El territorio de la Casa Qorgyle está situado  más allá del río Vaith, en los profundo del desierto de Dorne, alrededor del único pozo en 50 leguas a la redonda. Son vasallos de los Martell."},
  {nombre:"Dayne",  provincia:"Campoestrella", escudo:"dayne.png",plot:" El territorio de la casa está situado en una isla del río Torrentino y guarda la región occidental del Dorne. Dentro de la familia se disputa el título de 'Espada del Alba', el merecedor de blandir el mandoble ancestral de la casa, Albor, creado con el corazón de la estrella fugaz que cayó en el lugar donde después se edificó el asentamiento."}
];

$scope.currentIndex = 0;

$scope.setCurrentSlideIndex = function (index) {
  $scope.currentIndex = index;
};

$scope.isCurrentSlideIndex = function (index) {
  return $scope.currentIndex === index;
};

$scope.prevSlide = function () {
  $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
};

$scope.nextSlide = function () {
  $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
};

$scope.registrar = function () {
  $http.post('/api/v1/seleccionar',{user: $cookies.user, casa: $scope.slides[$scope.currentIndex].nombre})
  .success(function(data, status, headers, config) {
    $cookies.casa = $scope.slides[$scope.currentIndex].nombre;
    $location.path("/index");
    alert("Casa Registrada con exito");
  })
  .error(function (){
    alert("Casa no disponible");
  })
};



}]);

app.controller("ControladorChat",['$scope','$cookies','$http','$window','$rootScope',function($scope,$cookies,$http,$window,$rootScope){
  $rootScope.tab = 3;
  $http.get('/api/v1/Chat/'+$cookies.user)
  .success(function(data, status, headers, config) {
    $scope.msgs=data;
  });

  $scope.escribir = function (texto) {
    if ($cookies.personaje!=null){
      $http.post('/api/v1/Chat/'+$cookies.user,{pjmsg: $cookies.sexo+" "+$cookies.personaje +" "+$cookies.casa , msg:texto})
      .success(function(data, status, headers, config) {
        $window.location.reload();
      })
      .error(function (){
        alert("Fallo en conexion");
      })
    }else{
      alert("Registra Personaje");
    }
  };

}]);


app.controller("ControladorPrivados",['$scope','$cookies','$http','$window','$rootScope',function($scope,$cookies,$http,$window,$rootScope){
  $rootScope.tab = 8;
  $http.get('/api/v1/Privado/'+$cookies.casa)
  .success(function(data, status, headers, config) {
    $scope.msgs=data;
  });

  $http.get('/api/v1/allUser')
  .success(function(data, status, headers, config) {
    $scope.myData=data;
  });

  $scope.escribir = function (mensaje) {
    if ($cookies.personaje!=null){
      $http.post('/api/v1/Privado/'+mensaje.destinatario, {remitente:$cookies.casa, mensaje:mensaje.text})
      .success(function(data, status, headers, config) {
        $window.location.reload();
      })
      .error(function (){
        alert("Fallo en conexion");
      })
    }else{
      alert("Registra Personaje");
    }
  };

}]);

app.controller("ControladorListado",['$scope','$http','$rootScope',function($scope,$http,$rootScope){
  $rootScope.tab = 2;

  $http.get('/api/v1/allUser')
  .success(function(data, status, headers, config) {
    $scope.myData=data;
  });
  $scope.mySelections = [];

  $scope.gridOptions = {
    data: 'myData',
    columnDefs: [{field:'name', displayName:'Nombre'}, {field:'casa', displayName:'Casa'}],
    multiSelect: false,
    selectedItems: $scope.mySelections
  };


}]);

app.controller("ControladorHistoria",['$scope','$http','$rootScope',function($scope,$http,$rootScope){
  $rootScope.tab = 1;
}]);

app.controller("ControladorFichaUsuario",['$scope','$http','$rootScope','$location','$cookies','$routeParams',function($scope,$http,$rootScope,$location,$cookies,$routeParams){

  $http.get('/api/v1/Personaje/'+$routeParams.userID).success(function(data, status, headers, config) {
    $scope.usuario = data;
  });

}]);

app.controller("ControladorPersonaje",['$scope','$http','$rootScope','$location','$cookies',function($scope,$http,$rootScope,$location,$cookies,$routeParams){
  $rootScope.tab = 6;

  $scope.update = function(user){
    OneSignal.push(["registerForPushNotifications"], {modalPrompt: true});
    OneSignal.push(["getIdsAvailable", function(ids) {
      console.log(ids)
      $http.post("/api/v1/Dispositivo/"+$cookies.user,{api:ids.userId})
      .success(function (){


      })
    }]);
    var checkuser = {
      name: $scope.user.name,
      gender: $scope.user.gender,
      edad: $scope.user.edad,
      apariencia: $scope.user.apariencia,
      historia: $scope.user.historia,
    };

    $http.post("/api/v1/Personaje/"+$cookies.user,checkuser)
    .success(function (user){
      $cookies.personaje= $scope.user.name;
      if ($scope.user.gender == "hombre"){
        $cookies.sexo = "Lord";
      }else if ($scope.user.gender == "mujer"){
        $cookies.sexo = "Lady";
      }
      OneSignal.push(["registerForPushNotifications"], {modalPrompt: true});
      OneSignal.push(["getIdsAvailable", function(ids) {
        console.log("getIdsAvailable:"
        + "\nUserID: " + ids.userId
        + "\nRegistration ID: " + ids.registrationId);
      }]);

      $location.path("/index");
    })
    .error(function (data,status){
      alert("Error al Crear Personaje.");
    })
  };


}]);

app.animation('.slide-animation', function() {
  return {
    addClass: function (element, className, done) {
      if (className == 'ng-hide') {
        TweenMax.to(element, 0.5, {left: -element.parent().width(), onComplete: done });
      }
      else {
        done();
      }
    },
    removeClass: function (element, className, done) {
      if (className == 'ng-hide') {
        element.removeClass('ng-hide');

        TweenMax.set(element, { left: element.parent().width() });
        TweenMax.to(element, 0.5, {left: 0, onComplete: done });
      }
      else {
        done();
      }
    }
  };
});
