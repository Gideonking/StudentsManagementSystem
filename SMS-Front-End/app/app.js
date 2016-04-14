// app.js
function googleOnLoadCallback(){
  console.log('googleOnLoadCallback is calling');
    var apisToLoad = 1; // must match number of calls to gapi.client.load()
    var gCallback = function() {
        if (--apisToLoad == 0) {
            //Manual bootstraping of the application
            var $injector = angular.bootstrap(document, ['routerApp']);
            console.log('Angular bootstrap complete ');
            console.log('Librería gAPI cargada: ');
            console.log(gapi);
        };
    };
    //gapi.client.load('helloWorld', 'v1', gCallback, '//' + window.location.host + '/_ah/api');
    //Cargamos la gAPI de nuestro backend solo una vez para toda la aplicación.
    var ROOT = 'http://localhost:8001/_ah/api';
    gapi.client.load('helloworld', 'v1', gCallback, ROOT);
}


var routerApp = angular.module('routerApp', ['ui.router' ,'flow']);

// ############# ENRUTADOR #################################### //

routerApp.config(function($stateProvider, $urlRouterProvider) {
/*

Configura el enrutamiento de todas las vistas de la web. Implementa a que URLs
responden que vistas y mediante que controladores. Estos controladores son las FUNCIONES
que piden los datos donde proceda y los cargan en las vistas donde serán usados y vicesversa (se cargan
de la vista y se usan).
*/

    $urlRouterProvider.otherwise('/home');

    $stateProvider

       //Configura la URL principal
       .state('#',{
         url:'/home',
         templateUrl:'main.html'
       })

        /*Definición de VISTAS ANIDADAS, dentro de una vista general que es la de estudiantes se incrustan
        a su derecha todas las subsecciones distintas. Así estudiantes.html define la plantilla general y dentro de
        ella está una sección en la que se cargarán las subpartes estudiantes.<subpartes>
        Ver estudiantes.html.
        En este caso esta vista no tiene controlador porque no la necesita.
        */
        .state('estudiantes', {
            url: '/estudiantes',
            templateUrl: 'estudiantes/estudiantes.html'
        })

        /*
        Vista "main" anidada dentro de la vista estudiantes, con su propio controlador.
        Asi la vista estudiantes-main.html está anidada dentro de estudiantes.html que se incrusta en la sección <div ui-view></div>
        */
        .state('estudiantes.main', {
            url: '/main',
            templateUrl: 'estudiantes/estudiantes-main.html',
        })

        // nested list with custom controller
         .state('estudiantes.list', {
             url: '/list',
             templateUrl: 'estudiantes/estudiantes-lista.html',
             controller: 'ControladorListaEstudiantes'
             /*
             controller: function($scope) {
                 $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
             }
             */
         })

         //Vista detalles estudiantes anidada dentro de estudiantes.
         .state('estudiantes.detalles-estudiante',{
           url: '/detalle/:estudianteID',
           templateUrl: 'estudiantes/estudiantes-detalle.html',
           controller: 'ControladorDetallesEstudiante'
         })

         //Vista detalles estudiantes anidada dentro de estudiantes.
         .state('estudiantes.modificacion-estudiante',{
           url: '/modificacion/:estudianteID',
           templateUrl: 'estudiantes/estudiantes-modificacion.html',
           controller: 'ControladorModificacionEstudiante'
         })

         /* El anidamiento de una tercera vista que no usarmos
         //Vista de datos académicos anidada dentro de detalles de estudiantes.
         .state('estudiantes.detalles-estudiante.datos-academicos',{
           url:'/datos-academicos',
           templateUrl: 'estudiantes-detalle-datos-academicos.html',
           coontroller: 'ControladorDetallesEstudiante-DatosAcademicos'
         })*/

         // nested list with just some random string data
         .state('estudiantes.nuevo', {
             url: '/nuevo',
             //Podemos meter directamente texto desde aquí
             //template: 'I could sure use a drink right now.'
             templateUrl: 'estudiantes/estudiantes-nuevo.html',
             controller: 'ControladorNuevoEstudiante'
         })

         .state('profesores', {
             url: '/profesores',
             templateUrl: 'profesores/profesores.html'
         })
         .state('profesores.main', {
             url: '/main',
             templateUrl: 'profesores/profesores-main.html',
         })
         .state('profesores.list', {
              url: '/list',
              templateUrl: 'profesores/profesores-lista.html',
              controller: 'ControladorListaProfesores'
          })
          .state('profesores.detalles-profesor',{
            url: '/detalle/:profesorID',
            templateUrl: 'profesores/profesores-detalle.html',
            controller: 'ControladorDetallesProfesor'
          })
          .state('profesores.nuevo', {
              url: '/nuevo',
              //Podemos meter directamente texto desde aquí
              //template: 'I could sure use a drink right now.'
              templateUrl: 'profesores/profesores-nuevo.html',
              controller: 'ControladorNuevoProfesor'
          })



          //CONTROLADORES DE ASIGNATURAS

           .state('asignaturas', {
               url: '/asignaturas',
               templateUrl: 'asignaturas/asignaturas.html'
           })
           .state('asignaturas.main', {
               url: '/main',
               templateUrl: 'asignaturas/asignaturas-main.html',
           })
           .state('asignaturas.list', {
                url: '/list',
                templateUrl: 'asignaturas/asignaturas-lista.html',
                controller: 'ControladorListaAsignaturas'
            })
            .state('asignaturas.detalles-asignatura',{
              url: '/detalle/:asignaturaID',
              templateUrl: 'asignaturas/asignaturas-detalle.html',
              controller: 'ControladorDetallesAsignatura'
            })
            .state('asignaturas.modificacion-asignatura',{
              url: '/modificacion/:asignaturaID',
              templateUrl: 'asignaturas/asignaturas-modificacion.html',
              controller: 'ControladorModificacionAsignatura'
            })
            .state('asignaturas.nuevo', {
                url: '/nuevo',
                //Podemos meter directamente texto desde aquí
                //template: 'I could sure use a drink right now.'
                templateUrl: 'asignaturas/asignaturas-nuevo.html',
                controller: 'ControladorNuevaAsignatura'
            })


            //CONTROLADORES DE CLASES

             .state('clases', {
                 url: '/clases',
                 templateUrl: 'clases/clases.html'
             })
             .state('clases.main', {
                 url: '/main',
                 templateUrl: 'clases/clases-main.html',
             })
             .state('clases.list', {
                  url: '/list',
                  templateUrl: 'clases/clases-lista.html',
                  controller: 'ControladorListaClases'
              })
              .state('clases.detalles-clase',{
                url: '/detalle/:claseID',
                templateUrl: 'clases/clases-detalle.html',
                controller: 'ControladorDetallesClase'
              })
              .state('clases.modificacion-clase',{
                url: '/modificacion/:asignaturaID',
                templateUrl: 'clases/clases-modificacion.html',
                controller: 'ControladorModificacionClase'
              })
              .state('clases.nueva', {
                  url: '/nuevo',
                  //Podemos meter directamente texto desde aquí
                  //template: 'I could sure use a drink right now.'
                  templateUrl: 'clases/clases-nuevo.html',
                  controller: 'ControladorNuevaClase'
              })







        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            // we'll get to this in a bit
            url:'/about',
            template: 'This is an another page'
        });

});

  routerApp.controller('UploadCtrl2', function ($scope) {


    /*
    $scope.processFiles = function(files){
      console.log('processFiles:');
      console.log(files);

    };
    */

    $scope.uploadFiles = function(e)
  	{
      console.log('HOla uploadFile')
      console.log(e)
      console.log(e.files)
      //Llamamos a la función que sube la imagen:
      //subirImagen($scope.file, 'caca');

      var urlImagenSubida="";

      angular.forEach(e.files, function(flowFile, i){
         var fileReader = new FileReader();
            var nombre = flowFile.file.name;

            fileReader.onload = function (event) {
              var uri = event.target.result;
                //$scope.imageStrings[i] = uri;

                var res = uri.slice(23);
                //console.log('Sending2 : ' + res);

                //Estamos usando como nombre de la imagen el nombrel del fichero.
                gapi.client.helloworld.imagenes.subirImagen({'name':nombre, 'image':res}).execute(function(resp) {
                  //console.log("calling subirImagen with image: "+res);
                  console.log(resp);
                  urlImagenSubida=resp;
                });



            };
            fileReader.readAsDataURL(flowFile.file);
      });



      return urlImagenSubida;
  	}
  });



// #################################
// # Controladores de asignaturas  #
// #################################

routerApp.controller('ControladorNuevoEstudiante', function ($location, $scope) {
  /*
  Controlador que manejará los datos del formulario enviándolos al servidor.
  */
  function uploadFiles2(e, datos)
  {
    console.log('HOla uploadFile')
    console.log(e)
    console.log(e.files)
    //Llamamos a la función que sube la imagen:
    //subirImagen($scope.file, 'caca');

    var urlImagenSubida="";

    angular.forEach(e.files, function(flowFile, i){
       var fileReader = new FileReader();
          var nombre = flowFile.file.name;

          fileReader.onload = function (event) {
            var uri = event.target.result;
              //$scope.imageStrings[i] = uri;

              var res = uri.slice(23);
              //console.log('Sending2 : ' + res);

              var urlImagenSubida;
              //Estamos usando como nombre de la imagen el nombrel del fichero.

              gapi.client.helloworld.imagenes.subirImagen({'name':nombre, 'image':res}).execute(function(resp) {
                //console.log("calling subirImagen with image: "+res);
                //console.log(resp);
                urlImagenSubida=resp.message;
                console.log('Respuesta del servidor imagen: ');
                console.log(urlImagenSubida);

                datos.imagen=urlImagenSubida;

                console.log('Datos después de añadir imagen');
                console.log(datos);

                gapi.client.helloworld.alumnos.insertarAlumno(datos).execute(function(resp){
                  //Mostramos por consola la respuesta del servidor
                  salidaEjecucion=resp.message;
                  console.log("Respuesta servidor: "+salidaEjecucion);
                  console.log(salidaEjecucion);

                   if (salidaEjecucion == 'OK'){

                     $.UIkit.notify("Alumno guardado con muchísimo éxito.", {status:'success'});
                     insertado=1;
                     console.log("Valor insertar DENTRO DE FUNCION: "+insertado);
                     $location.path("/estudiantes/main");
                   }else{
                     $.UIkit.notify("\""+salidaEjecucion+"\"", {status:'warning'});
                     insertado=0;
                     console.log("Valor insertar DENTRO DE FUNCION: "+insertado);
                   }

                  $scope.$apply();
                });




              });


              console.log('salida¡')
              console.log(urlImagenSubida)

          };



          fileReader.readAsDataURL(flowFile.file);
    });

    //setTimeout(this, 5000);
    console.log('return urlImagenSubida: '+urlImagenSubida)
    return urlImagenSubida;
  }
  var insertado = 0;
  $scope.submitForm = function(imagen){




    //Lógica del formulario.

    //Cuando el formulario es válido porque cumple con todas las especificaciones:
    if ($scope.formNuevoAlumno.$valid) {
       console.log('Formulario válido');
       console.log('Se progecede a guardar al alumno en la base de datos.')


       //Creamos un array con los elementos a enviar:
       var datos={
         //Aquí especificamos todos los datods del form que queremos que se envíen:
         'nombre':$scope.formNuevoAlumno.nombre.$modelValue,
         'apellidos':$scope.formNuevoAlumno.apellidos.$modelValue,
         'direccion':$scope.formNuevoAlumno.direccion.$modelValue,
         'localidad':$scope.formNuevoAlumno.localidad.$modelValue,
         'provincia':$scope.formNuevoAlumno.provincia.$modelValue,
         'fecha_nacimiento':$scope.formNuevoAlumno.fecha_nacimiento.$modelValue,
         'telefono':$scope.formNuevoAlumno.telefono.$modelValue,
         'dni':$scope.formNuevoAlumno.dni.$modelValue
       };
       console.log('Imprimiendo datos');
       console.log(datos);


       //Primero cargamos la imagen del usuario:
       console.log('Procesamiento de la imagen:');

       if (imagen.files.length!=0){ //Si existe una imagen cargada
         console.log('Añadiendo imagen!!!!: ');
         //Subimos la imagen al sistema.
         //console.log('salida: '+urlImagen);

         //Añadimos la url de la imagen a los datos a enviar:
         var urlImagen="";
         urlImagen = uploadFiles2(imagen, datos);
         //while (urlImagen==""){
           console.log(urlImagen);
           console.log('while');

         //};


         console.log(datos.imagen);
         console.log('Fin añadiendo imagen!!!');

         //Vamos a esperar un poco a que se suba la imagen :)


       }else{

                //llamamos al APIG con los datos creados antes.
                console.log("llamada a insertarAlumno()")
                
                gapi.client.helloworld.alumnos.insertarAlumno(datos).execute(function(resp){
                  //Mostramos por consola la respuesta del servidor
                  salidaEjecucion=resp.message;
                  console.log("Respuesta servidor: "+salidaEjecucion);
                  console.log(salidaEjecucion);

                   if (salidaEjecucion == 'OK'){

                     $.UIkit.notify("Alumno guardado con muchísimo éxito.", {status:'success'});
                     insertado=1;
                     console.log("Valor insertar DENTRO DE FUNCION: "+insertado);
                     $location.path("/estudiantes/main");
                   }else{
                     $.UIkit.notify("\""+salidaEjecucion+"\"", {status:'warning'});
                     insertado=0;
                     console.log("Valor insertar DENTRO DE FUNCION: "+insertado);
                   }

                  $scope.$apply();
                });

       }



       console.log('Imprimiendo datos 2');
       console.log(datos);

       console.log('IMAGEEEEENENNNN');
       console.log(imagen);
       console.log('Num Images');
       console.log(imagen.files.length);




       var salidaEjecucion;



    //   console.log('Formulario: ');
    //   console.log($scope.formNuevoAlumno);







     }
     else {
         //if form is not valid set $scope.addContact.submitted to true
         console.log('Formulario inválido');
         clase="uk-class-danger"
         $scope.formNuevoAlumno.submitted=true;
     };



  };
  /*
  console.log("Valor insertar: "+insertado);
  if(insertado == 1 ){
   $location.path("/estudiantes/main");
 }
 */




});

routerApp.controller('ControladorModificacionEstudiante', function($location, $scope, $stateParams){

  //Rescatamos el id de la url y la enviamos con el scope a la vista
  //$scope.id = $stateParams.estudianteID;
  $scope.id=$stateParams.estudianteID;





  //Pedimos al Gateway toda la informaicón del Alumno.
  gapi.client.helloworld.alumnos.getAlumno({'id':$stateParams.estudianteID}).execute(function(resp) {

    console.log("calling getAlumno with id: "+$stateParams.estudianteID);
    console.log(resp);
    $scope.alumno = resp;
    console.log(resp.nombre);
    $scope.$apply();
    /*
    $scope.es=resp.alumno;
    //Tenemos que hacer esto para que se aplique scope ya que la llamada a la API está fuera de Angular
    $scope.$apply();
    */
  });


  $scope.submitForm = function(formData){


    //Lógica del formulario.

    //Cuando el formulario es válido porque cumple con todas las especificaciones:
    if ($scope.formNuevoAlumno.$valid) {
       console.log('Formulario válido');
       console.log('Se progecede a guardar la modificación del alumno en la base de datos.')

       var salidaEjecucion;

       console.log("llamada a modAlumnoCompleto()")
       console.log($scope.alumno);



       gapi.client.helloworld.alumnos.modAlumnoCompleto({
         //Aquí especificamos todos los datods del form que queremos que se envíen:
         'id':$stateParams.estudianteID,
         'nombre':$scope.alumno.nombre,
         'apellidos':$scope.alumno.apellidos,
         'direccion':$scope.alumno.direccion,
         'localidad':$scope.alumno.localidad,
         'provincia':$scope.alumno.provincia,
         'fecha_nacimiento':$scope.alumno.fecha_nacimiento,
         'telefono':$scope.alumno.telefono,
         'dni':$scope.alumno.dni}
       ).execute(function(resp){
         //Mostramos por consola la respuesta del servidor
         salidaEjecucion=resp.message;
         console.log("Respuesta servidor: "+salidaEjecucion);
         console.log(salidaEjecucion);

          if (salidaEjecucion == 'OK'){
            /*
            Para que los notify de UIkit funcionen deben estar cargdos tanto el fichero de estilo como el javascript
            de este componente, esto lo hcemos en la plantilla (html)
            */
            $.UIkit.notify("Alumno guardado con muchísimo éxito.", {status:'success'});
          }else{
            $.UIkit.notify("\""+salidaEjecucion+"\"", {status:'warning'});
          }

         $scope.$apply();
       });



     }
     else {
         //if form is not valid set $scope.addContact.submitted to true
         console.log('Formulario inválido');
         clase="uk-class-danger"
         $scope.formNuevoAlumno.submitted=true;
     };



  };




});

routerApp.controller('ControladorDetallesEstudiante', function($location, $scope, $stateParams){

  //Implementación de las acciones que se producen cuando el BOTÓN ELIMINAR se pulsa.
  $scope.delAlumno = function(){
    console.log("Pulsada confirmación eliminación alumno id: "+$stateParams.estudianteID)



    gapi.client.helloworld.alumnos.delAlumno({'id':$stateParams.estudianteID}).execute(function(resp){
      //Mostramos por consola la respuesta del servidor
      console.log(resp.message);
      $scope.respuesta=resp.message;


      //El mensje no sale debido (en principio) a que cambiamos de pantall
      if (resp.message == 'OK'){
        /*
        Para que los notify de UIkit funcionen deben estar cargdos tanto el fichero de estilo como el javascript
        de este componente, esto lo hcemos en la plantilla (html)
        */
        $.UIkit.notify("Alumno eliminado con éxito.", {status:'success'});
      }else{
        $.UIkit.notify("\""+resp.message+"\"", {status:'warning'});
      }


      $scope.$apply();
    });

    //Después volvemos a la página principal de estudiantes, ahora desbloqueado porque se pierde el mensaje al cambiar,
    // al menos que le pasásemos los datos al controlador de esa página y fuese esa quien cargase el mensaje flotante.
    //$location.path("/estudiantes/main");

  };

  //Rescatamos el id de la url y la enviamos con el scope a la vista
  //$scope.id = $stateParams.estudianteID;
  $scope.id=$stateParams.estudianteID;

  console.log("ID estudiante: "+$stateParams.estudianteID);




  //Pedimos al Gateway toda la información del Alumno.
  gapi.client.helloworld.alumnos.getAlumno({'id':$stateParams.estudianteID}).execute(function(resp) {

    console.log("calling getAlumno with id: "+$stateParams.estudianteID);
    console.log(resp);
    $scope.alumno = resp;
    console.log(resp.nombre);
    $scope.$apply();
    /*
    $scope.es=resp.alumno;
    //Tenemos que hacer esto para que se aplique scope ya que la llamada a la API está fuera de Angular
    $scope.$apply();
    */
  });

  /*
  ### Información extra del estudiante para el apartado de DATOS ACADÉMICOS ###
  */

  //Pedimos al gateway que nos diga todos los profesores que imparten clase a ese alumno.
  gapi.client.helloworld.alumnos.getProfesoresAlumno({'id':$stateParams.estudianteID}).execute(function(resp){
    console.log("Profesores del alumno: ");
    console.log(resp.profesores);
    //Enviamos al scope no toda la respuesta sino la lista de profesores que se espeara que contenga esta.
    $scope.profesores = resp.profesores;
    $scope.$apply();
  });

  //Pedimos al gateway que nos diga todos las asignaturas a las que está matriculado ese alumno.
  gapi.client.helloworld.alumnos.getAsignaturasAlumno({'id':$stateParams.estudianteID}).execute(function(resp){
    console.log("Asignaturas del alumno: ");
    console.log(resp.asignaturas);
    $scope.asignaturas = resp.asignaturas;
    $scope.$apply();
  });

  //Pedimos al gateway que nos diga todos las clases en las que está matriculado ese alumno.
  gapi.client.helloworld.alumnos.getClasesAlumno({'id':$stateParams.estudianteID}).execute(function(resp){
    console.log("Clases del alumno: ");
    console.log(resp.clases);
    $scope.clases = resp.clases;
    $scope.$apply();
  });

});

routerApp.controller('ControladorDetallesEstudiante-DatosAcademicos', function($scope, $stateParams){
  $scope.id=$stateParams.estudianteID;


});

routerApp.controller('ControladorListaEstudiantes', function ($scope) {
  /*
  Controlador que maneja los datos que se muestran en la vista estudiantes-lista.html y que
  realiza la petición de la lista de Estudiantes y que la carga en el $scope bajo la variable "alumnos".
  */


 //service.greetings().listGreeting().execute()
        // Get the list of previous scores

    gapi.client.helloworld.alumnos.getAlumnos().execute(function(resp) {
      //console.log(resp);
      //console.log("after");
      console.log(resp.alumnos);

      /*Usar los datos que nos proporciona nuestra API es muy sencillo, sólo tenemos que extraer del JSON que se
      encuentra en "resp" los datos que nos interesan. En este caso es un array de alumnos, por tanto
      solo tenemos que hacer resp.alumnos. ¡Ya está! Ya tenemos cargado el array y dentro de este todos los
      items a los que podemos acceder a sus atributos fácilmente.
      */

      $scope.alumnos=resp.alumnos;
      //Tenemos que hacer esto para que se aplique scope ya que la llamada a la API está fuera de Angular
      $scope.$apply();
    });

    var empleados = ['Empleado 1', 'Empleado 2', 'Empleado 3', 'Empleado4'];
    $scope.nuestrosEmpleados = empleados;
    //$scope.salidaAPI="adios";
    }
);


// #################################
// # Controladores de profesores.  #
// #################################
routerApp.controller('ControladorListaProfesores', function ($scope) {
    /*
    Controlador que provee a la plantilla profesores-lista.html la lista simplificada de todos los profesores
    a trabés del API Gateway usando el método getProfesores()
    */


    gapi.client.helloworld.profesores.getProfesores().execute(function(resp) {
      console.log(resp.profesores);
      $scope.profesores=resp.profesores;
      $scope.$apply();
    });
    }
);

routerApp.controller('ControladorDetallesProfesor', function($location, $scope, $stateParams){

  //Implementación de las acciones que se producen cuando el BOTÓN ELIMINAR se pulsa.
  $scope.delProfesor = function(){
    console.log("Pulsada confirmación eliminación profesor id: "+$stateParams.profesorID)



    gapi.client.helloworld.profesores.delProfesor({'id':$stateParams.profesorID}).execute(function(resp){
      //Mostramos por consola la respuesta del servidor
      console.log(resp.message);
      $scope.respuesta=resp.message;


      //El mensje no sale debido (en principio) a que cambiamos de pantall
      if (resp.message == 'OK'){
        /*
        Para que los notify de UIkit funcionen deben estar cargdos tanto el fichero de estilo como el javascript
        de este componente, esto lo hcemos en la plantilla (html)
        */
        $.UIkit.notify("Profesor eliminado con éxito.", {status:'success'});
      }else{
        $.UIkit.notify("\""+resp.message+"\"", {status:'warning'});
      }


      $scope.$apply();
    });

    //Después volvemos a la página principal de profesores, ahora desbloqueado porque se pierde el mensaje al cambiar,
    // al menos que le pasásemos los datos al controlador de esa página y fuese esa quien cargase el mensaje flotante.
    $location.path("/profesores/main");

  };

  //Rescatamos el id de la url y la enviamos con el scope a la vista
  //$scope.id = $stateParams.estudianteID;
  $scope.id=$stateParams.profesorID;
  console.log("ID profesor: "+$stateParams.profesorID);



  //Pedimos al Gateway toda la información del profesor.
  gapi.client.helloworld.profesores.getProfesor({'id':$stateParams.profesorID}).execute(function(resp) {
    console.log("calling getProfesor with id: "+$stateParams.profesorID);
    console.log(resp);
    $scope.profesor = resp;
    $scope.$apply();
  });

  /*
  ### Información extra del profesor para el apartado de DATOS ACADÉMICOS ###
  */

  //Pedimos al gateway que nos diga todos los alumnos a los que imparte clase es profesor.
  gapi.client.helloworld.profesores.getAlumnosProfesor({'id':$stateParams.profesorID}).execute(function(resp){
    console.log("Aumnos del profesor: ");
    console.log(resp.alumnos);
    //Enviamos al scope no toda la respuesta sino la lista de profesores que se espeara que contenga esta.
    $scope.estudiantes = resp.alumnos;
    $scope.$apply();
  });

  //Pedimos al gateway que nos diga todos las asignaturas que imparte el profesor.
  gapi.client.helloworld.profesores.getAsignaturasProfesor({'id':$stateParams.profesorID}).execute(function(resp){
    console.log("Asignaturas del profesor: ");
    console.log(resp.asignaturas);
    $scope.asignaturas = resp.asignaturas;
    $scope.$apply();
  });

  //Pedimos al gateway que nos diga todos las clases en las que imparte el profesor.
  gapi.client.helloworld.profesores.getClasesProfesor({'id':$stateParams.profesorID}).execute(function(resp){
    console.log("Clases del profesor: ");
    console.log(resp.clases);
    $scope.clases = resp.clases;
    $scope.$apply();
  });

});

routerApp.controller('ControladorNuevoProfesor', function ($scope) {
  /*
  Controlador que manejará los datos del formulario enviándolos al servidor.
  */
  $scope.submitForm = function(formData){


    //Lógica del formulario.

    //Cuando el formulario es válido porque cumple con todas las especificaciones:
    if ($scope.formNuevoAlumno.$valid) {
       console.log('Formulario válido');
       console.log('Se progecede a guardar al alumno en la base de datos.')

       var salidaEjecucion;

       console.log("llamada a addAlumno()")
       console.log($scope.alumno);



       gapi.client.helloworld.alumnos.insertarAlumno({
         //Aquí especificamos todos los datods del form que queremos que se envíen:
         'nombre':$scope.alumno.nombre,
         'apellidos':$scope.alumno.apellidos,
         'direccion':$scope.alumno.direccion,
         'localidad':$scope.alumno.localidad,
         'provincia':$scope.alumno.provincia,
         'fecha_nacimiento':$scope.alumno.fecha_nacimiento,
         'telefono':$scope.alumno.telefono,
         'dni':$scope.alumno.dni}
       ).execute(function(resp){
         //Mostramos por consola la respuesta del servidor
         salidaEjecucion=resp.message;
         console.log("Respuesta servidor: "+salidaEjecucion);
         console.log(salidaEjecucion);

          if (salidaEjecucion == 'OK'){
            /*
            Para que los notify de UIkit funcionen deben estar cargdos tanto el fichero de estilo como el javascript
            de este componente, esto lo hcemos en la plantilla (html)
            */
            $.UIkit.notify("Alumno guardado con muchísimo éxito.", {status:'success'});
          }else{
            $.UIkit.notify("\""+salidaEjecucion+"\"", {status:'warning'});
          }

         $scope.$apply();
       });



     }
     else {
         //if form is not valid set $scope.addContact.submitted to true
         console.log('Formulario inválido');
         clase="uk-class-danger"
         $scope.formNuevoAlumno.submitted=true;
     };



  };


});

// #################################
// # Controladores de asignaturas  #
// #################################
routerApp.controller('ControladorListaAsignaturas', function ($scope) {
    /*
    Controlador que provee a la plantilla profesores-lista.html la lista simplificada de todos los profesores
    a trabés del API Gateway usando el método getProfesores()
    */


    gapi.client.helloworld.asignaturas.getAsignaturas().execute(function(resp) {
      console.log("recibido desde APIGATEWAY asignaturas.getAsignaturas(): ")
      console.log(resp.asignaturas);
      $scope.asignaturas=resp.asignaturas;
      $scope.$apply();
    });

});

routerApp.controller('ControladorNuevaAsignatura', function ($scope){
  $scope.submitForm = function(formData){
    //Cuando el formulario es válido porque cumple con todas las especificaciones:
    if ($scope.formNuevaAsignatura.$valid) {
       console.log('Formulario válido');
       console.log('Se progecede a guardar la asignatura en la base de datos.')

       var salidaEjecucion;

       console.log("llamada a asginaturas.insertarAsignatura()")
       console.log($scope.alumno);



       gapi.client.helloworld.asignaturas.insertarAsignatura({
         //Aquí especificamos todos los datods del form que queremos que se envíen:
         'nombre':$scope.alumno.nombre,
       }
       ).execute(function(resp){
         //Mostramos por consola la respuesta del servidor
         salidaEjecucion=resp.message;
         console.log("Respuesta servidor: "+salidaEjecucion);
         console.log(salidaEjecucion);

          if (salidaEjecucion == 'OK'){
            /*
            Para que los notify de UIkit funcionen deben estar cargdos tanto el fichero de estilo como el javascript
            de este componente, esto lo hcemos en la plantilla (html)
            */
            $.UIkit.notify("Asignatura guardado con muchísimo éxito.", {status:'success'});
          }else{
            $.UIkit.notify("\""+salidaEjecucion+"\"", {status:'warning'});
          }

         $scope.$apply();
       });



     }
     else {
         //if form is not valid set $scope.addContact.submitted to true
         console.log('Formulario inválido');
         clase="uk-class-danger"
         $scope.formNuevoAlumno.submitted=true;
     };



  };
});

routerApp.controller('ControladorDetallesAsignatura', function($location, $scope, $stateParams){

  //Implementación de la acción del botón delAsignatura
  $scope.delAsignatura = function(){
    console.log("Pulsada confirmación asignatura alumno id: "+$stateParams.asignaturaID)



    gapi.client.helloworld.asignaturas.delAsignatura({'id':$stateParams.asignaturaID}).execute(function(resp){
      //Mostramos por consola la respuesta del servidor
      console.log("llamando a delAsignatura");
      console.log(resp.message);
      $scope.respuesta=resp.message;


      //El mensje no sale debido (en principio) a que cambiamos de pantall
      if (resp.message == 'OK'){
        /*
        Para que los notify de UIkit funcionen deben estar cargdos tanto el fichero de estilo como el javascript
        de este componente, esto lo hcemos en la plantilla (html)
        */
        $.UIkit.notify("Asignatura eliminado con éxito.", {status:'success'});
      }else{
        $.UIkit.notify("\""+resp.message+"\"", {status:'warning'});
      }

      $scope.$apply();
    });

    //Después volvemos a la página principal de estudiantes, ahora desbloqueado porque se pierde el mensaje al cambiar,
    // al menos que le pasásemos los datos al controlador de esa página y fuese esa quien cargase el mensaje flotante.
    //$location.path("/estudiantes/main");

  };

  //Rescatamos el id de la url y la enviamos con el scope a la vista
  //$scope.id = $stateParams.estudianteID;
  $scope.id=$stateParams.estudianteID;

  console.log("ID asignatura: "+$stateParams.asignaturaID);



  //Pedimos al Gateway toda la informaicón de la asignatura.
  gapi.client.helloworld.asignaturas.getAsignatura({'id':$stateParams.asignaturaID}).execute(function(resp) {
    console.log("calling getAsignatura with id: "+$stateParams.asignaturaID);
    console.log(resp);
    $scope.asignatura = resp;
    console.log(resp.nombre);
    $scope.$apply();
  });

  /*
  ### Información extra de la asginatura ###
  */

  //Pedimos al gateway todos los alumnos matriculados en esa asignatura.
  gapi.client.helloworld.asignaturas.getAlumnosAsignatura({'id':$stateParams.asignaturaID}).execute(function(resp){
    console.log("Petición al API Gateway de alumnos matriculados en la asignatura "+$stateParams.asignaturaID);
    console.log(resp.alumnos);
    $scope.estudiantes = resp.alumnos;
    $scope.$apply();
  });

  //Pedimos al gateway todos los profesores que imparten esa asisnatura.
  gapi.client.helloworld.asignaturas.getProfesoresAsignatura({'id':$stateParams.asignaturaID}).execute(function(resp){
    console.log("Petición al APIG de los profesores que imparten la asignatura "+$stateParams.asignaturaID);
    console.log(resp.profesores);
    $scope.profesores = resp.profesores;
    $scope.$apply();
  });

  //Pedimos al gateway todos los clases en las que se imparte esa asisnatura.
  gapi.client.helloworld.asignaturas.getClasesAsignatura({'id':$stateParams.asignaturaID}).execute(function(resp){
    console.log("Petición al APIG de las clases en las que se imparten la asignatura "+$stateParams.asignaturaID);
    console.log(resp.clases);
    $scope.clases = resp.clases;
    $scope.$apply();
  });


}); //Fin controlador detalles asignatura

routerApp.controller('ControladorModificacionAsignatura', function($location, $scope, $stateParams){

  //Rescatamos el id de la url y la enviamos con el scope a la vista
  //$scope.id = $stateParams.estudianteID;
  $scope.id=$stateParams.asignaturaID;



  //Pedimos al Gateway toda la informaicón del Alumno.
  gapi.client.helloworld.asignaturas.getAsignatura({'id':$stateParams.asignaturaID}).execute(function(resp) {

    console.log("calling getAsignatura with id: "+$stateParams.asignaturaID);
    console.log(resp);
    $scope.asignatura = resp;
    console.log(resp.nombre);
    $scope.$apply();
    /*
    $scope.es=resp.alumno;
    //Tenemos que hacer esto para que se aplique scope ya que la llamada a la API está fuera de Angular
    $scope.$apply();
    */
  });


  $scope.submitForm = function(formData){

    console.log("Solicitud de formulario")

    //Cuando el formulario es válido porque cumple con todas las especificaciones:
    if ($scope.formModificacionAsignatura.$valid) {
       console.log('Formulario válido');
       console.log('Se progecede a guardar la modificación del alumno en la base de datos.')

       var salidaEjecucion;

       console.log("llamada a modAlumnoCompleto()")
       console.log($scope.alumno);


       gapi.client.helloworld.asignaturas.modAsignaturaCompleta({
         'id':$stateParams.asignaturaID,
         //asignatura.nombre se coge de la plantilla con la directiva ng-model así: ng-model="asignatura.nombre"
         'nombre':$scope.asignatura.nombre
       }).execute(function(resp){
         //Mostramos por consola la respuesta del servidor
         salidaEjecucion=resp.message;
         console.log("Respuesta servidor: "+salidaEjecucion);
         console.log(salidaEjecucion);

          if (salidaEjecucion == 'OK'){
            /*
            Para que los notify de UIkit funcionen deben estar cargdos tanto el fichero de estilo como el javascript
            de este componente, esto lo hcemos en la plantilla (html)
            */
            $.UIkit.notify("Asignatura guardada con muchísimo éxito.", {status:'success'});
          }else{
            $.UIkit.notify("\""+salidaEjecucion+"\"", {status:'warning'});
          }

         $scope.$apply();
       });



     }
     else {
         //if form is not valid set $scope.addContact.submitted to true
         console.log('Formulario inválido');
         clase="uk-class-danger"
         $scope.formNuevoAlumno.submitted=true;
     };



  };




});

// #################################
// # Controladores de clases       #
// #################################
routerApp.controller('ControladorListaClases', function ($scope) {
    /*
    Controlador que provee a la plantilla clases-lista.html la lista simplificada de todos las clases
    a trabés del API Gateway usando el método getClases()
    */


    gapi.client.helloworld.clases.getClases().execute(function(resp) {
      console.log("recibido desde APIGATEWAY clases.getClases(): ")
      var clases = resp.clases;
      console.log(resp.clases);

      //Vamos a crear una estructura a partir del resultado de la api para una mejor visualización en la interfaz.

      //Vamos a crear un vector por cada nivel de estudios, bach, eso, etc.. que venga en la lista.
      var niveles = new Array();

      //Cada nivel tiene cursos

      //Cada curso tiene grupos
      function Nivel(nivel){
        this.nivel=nivel;
      }

      nuevoNivel = new Nivel('Bachillerato');
      console.log(nuevoNivel.nivel);

      for(var i=0; i<clases.length; i++){

        console.log(clases[i].nivel);

/*
        if niveles.indexOf()

        //SEGUIR AQUÍIIIIIIIIIIASDFASDF
        ASDFASFDS
        DSFADSF
        Puede que sea mejor idea que sea el Gateway quien nos prepare la información como
        la queremos para no tenga que hacer ese procesamiento el cliente.
*/

      }

      console.log(niveles);

      $scope.clases=resp.clases;
      $scope.$apply();
    });

});

routerApp.controller('ControladorNuevaClase', function ($scope){
  $scope.submitForm = function(formData){
    //Cuando el formulario es válido porque cumple con todas las especificaciones:
    if ($scope.formNuevaClase.$valid) {
       console.log('Formulario válido');
       console.log('Se progecede a guardar la clase en la base de datos.')

       var salidaEjecucion;

       console.log("llamada a asginaturas.insertarAsignatura()")
       console.log($scope.alumno);


       gapi.client.helloworld.clases.insertarClase({
         'curso':$scope.clase.curso,
         'grupo':$scope.clase.grupo,
         'nivel':$scope.clase.nivel,
       }
       ).execute(function(resp){
         //Mostramos por consola la respuesta del servidor
         salidaEjecucion=resp.message;
         console.log("Respuesta servidor: "+salidaEjecucion);
         console.log(salidaEjecucion);

          if (salidaEjecucion == 'OK'){
            /*
            Para que los notify de UIkit funcionen deben estar cargdos tanto el fichero de estilo como el javascript
            de este componente, esto lo hcemos en la plantilla (html)
            */
            $.UIkit.notify("Asignatura guardado con muchísimo éxito.", {status:'success'});
          }else{
            $.UIkit.notify("\""+salidaEjecucion+"\"", {status:'warning'});
          }

         $scope.$apply();
       });



     }
     else {
         //if form is not valid set $scope.addContact.submitted to true
         console.log('Formulario inválido');
         clase="uk-class-danger"
         $scope.formNuevoAlumno.submitted=true;
     };



  };
});

routerApp.controller('ControladorDetallesClase', function($location, $scope, $stateParams, $window){

  //Función que pide al gateway la lista de todas la asignaturas del sistema.
  $scope.cargarAsignaturas = function(){
    console.log("llamada a cargarAsignaturas");
    gapi.client.helloworld.asignaturas.getAsignaturas().execute(function(resp){
      console.log("Petición al API Gateway la lista de todas las asignaturas: ");
      console.log(resp.asignaturas);
      $scope.asignaturas = resp.asignaturas;
      $scope.$apply();
    });
  };

  //Función que asocia una o varias asignaturas a una clase concreta ( como Francés e Inglés a 1AESO)
  $scope.asociar = function(){
    console.log('Llamada a asociar()');
    asignaturasSeleccionadas = [];
    //Recogemos las selecciones y las introducimos en un vector.
    angular.forEach($scope.asignaturas, function(asignatura){
      if (!!asignatura.selected) asignaturasSeleccionadas.push(asignatura.id);
    })
    //Mostramos las asignaturas que han sido seleccionadas
    console.log('Asignaturas seleccionadas');
    console.log(asignaturasSeleccionadas);
    console.log('Para la clase con id: '+$scope.clase.id);

    var salidaEjecucionCorrecta = true;

    //Recorremos todas las asignaturas seleccionadas y las asociamos a esta clase como una especificación de cada asignatura.
    for(var i=0; i<asignaturasSeleccionadas.length; i++){
      gapi.client.helloworld.asociaciones.insertaAsociacion({'id_clase':$scope.clase.id, 'id_asignatura':asignaturasSeleccionadas[i]}).execute(function(resp){
        console.log('llamando a insertarAsociacion');
        console.log(resp.message);
        if (resp.message!= 'OK'){
          salidaEjecucionCorrecta = false;
        }
        console.log('Var de control salidaEjecucionCorrecta: '+salidaEjecucionCorrecta);
      });
    }

    if (salidaEjecucionCorrecta){
      /*
      Para que los notify de UIkit funcionen deben estar cargdos tanto el fichero de estilo como el javascript
      de este componente, esto lo hcemos en la plantilla (html)
      */
      $.UIkit.notify("Asignatura añadida con éxito.", {status:'success'});
    }else{
      $.UIkit.notify("\""+salidaEjecucion+"\"", {status:'warning'});
    }
  };


  $scope.delImparte = function(idImparte){
    console.log('Calling delImparte with params: idImparte '+idImparte);
    gapi.client.helloworld.impartes.delImparte({'id':idImparte} ).execute(function(resp){
      console.log('Peticion al API Gateway de la eliminacion de una tupla en la tabla Imparte');
      console.log(resp.message);
      var respuesta=resp.message;
      if (respuesta == 'OK'){
        $.UIkit.notify("Relacion eliminada con muchísimo éxito.", {status:'success'});
      }else{
        $.UIkit.notify("\""+respuesta+"\"", {status:'warning'});
      }
    });
  }

  $scope.delMatricula = function(idMatricula){
    console.log('Calling delMatricula with params: idMatricula '+idMatricula);
    gapi.client.helloworld.matriculas.delMatricula({'id':idMatricula} ).execute(function(resp){
      console.log('Peticion al API Gateway de la eliminacion de una tupla en la tabla Matricula');
      console.log(resp.message);
      var respuesta=resp.message;
      if (respuesta == 'OK'){
        $.UIkit.notify("Alumno desmatriculado con muchísimo éxito.", {status:'success'});
      }else{
        $.UIkit.notify("\""+respuesta+"\"", {status:'warning'});
      }
    });
  }

  //Función que pide al gateway la lista de todos los profesores del sistema.
  $scope.cargarProfesores = function(param){
    console.log('llamada a cargarProfesores y seteo del param idAsociacion: '+param);
    $scope.idAsociacion=param;
    gapi.client.helloworld.profesores.getProfesores().execute(function(resp){
      console.log('Petición al API Gateway de la lista de todos los profesores');
      console.log(resp.profesores);
      $scope.profesores = resp.profesores;
      $scope.$apply();
    });
  };

  $scope.cargarAlumnos = function(param){
    console.log('llamada a cargarAlumnos');
    //Hacemos lo mismo que con los profesores
    $scope.idAsociacion=param;
    gapi.client.helloworld.alumnos.getAlumnos().execute(function(resp){
        console.log('Petición al API Gateway de la lista de todos los alumnos');
        console.log(resp.alumnos);
        $scope.alumnos = resp.alumnos;
        $scope.$apply();
    });
  };


  /*Función que asigna un profesor a una asociación (asignatura-clase). para que imparta una especificación de una asignatura en concreto en una clase concreta
  como Literatura a 3ºB-ESO */
  $scope.asignar = function(){
    console.log('Llamada a asignar()');

    console.log('Obtención valor idAsociacion: '+$scope.idAsociacion);

    profesoresSeleccionados = [];
    //Recogemos las selecciones y las introducimos en un vector.
    angular.forEach($scope.profesores, function(profesor){
      if (!!profesor.selected) profesoresSeleccionados.push(profesor.id);
    })
    //Mostramos las profesor que han sido seleccionadas
    console.log('Profesores seleccionados');
    console.log(profesoresSeleccionados);
    console.log('Para la asociacion con id: '+$scope.idAsociacion);

    var salidaEjecucionCorrecta = true;

    //Recorremos todas las profesor seleccionadas y las asociamos a esta clase como una especificación de cada asignatura.
    for(var i=0; i<profesoresSeleccionados.length; i++){
      gapi.client.helloworld.impartes.insertarImparte({'id_asociacion':$scope.idAsociacion, 'id_profesor':profesoresSeleccionados[i]}).execute(function(resp){
        console.log('llamando a insertarImparte');
        console.log(resp.message);
        if (resp.message!= 'OK'){
          salidaEjecucionCorrecta = false;
        }
        console.log('Var de control salidaEjecucionCorrecta: '+salidaEjecucionCorrecta);

      });
    }



    if (salidaEjecucionCorrecta){
      /*
      Para que los notify de UIkit funcionen deben estar cargdos tanto el fichero de estilo como el javascript
      de este componente, esto lo hcemos en la plantilla (html)
      */
      $.UIkit.notify("Asignación realizada con éxito.", {status:'success'});
    }else{
      $.UIkit.notify("\""+salidaEjecucion+"\"", {status:'warning'});
    }


    //Antes de terminar recargamos la página:
    /*
    Ahora mismo lo que hace es recargar toda la aplicación, pero lo que queremos es que recarge solo la página en la que estamos con este
    controlador.
    */
    $window.location.reload();



  };


  $scope.matricular = function(){
    console.log('Llamada a matricular()');

    console.log('Asociacion: '+$scope.idAsociacion);

    /*El procedimiento es el mismo que se hace con los profesores en asignar, recorrer la lista de los seleccionados y
    llamar a la api tantas veces como profesores tengamos.
    */

    alumnosSeleccionados = [];
    //Recogemos las selecciones y las introducimos en un vector.
    angular.forEach($scope.alumnos, function(alumno){
      if (!!alumno.selected) alumnosSeleccionados.push(alumno.id);
    })
    //Mostramos las profesor que han sido seleccionadas
    console.log('Alumnos seleccionados');
    console.log(alumnosSeleccionados);
    console.log('Para la asociacion con id: '+$scope.idAsociacion);


    //Recorremos todas las profesor seleccionadas y las asociamos a esta clase como una especificación de cada asignatura.
    for(var i=0; i<alumnosSeleccionados.length; i++){
      gapi.client.helloworld.matriculas.insertarMatricula({'id_asociacion':$scope.idAsociacion, 'id_alumno':alumnosSeleccionados[i]}).execute(function(resp){
        console.log('llamando a insertarMatricula');
        console.log(resp.message);
      });
    }

  }


  //Implementación de la acción del botón delAsignatura
  $scope.delClase = function(clase){
    console.log("Pulsada confirmación eliminación clase con id: "+clase.id)


    gapi.client.helloworld.clases.delClase({'id':$stateParams.claseID}).execute(function(resp){
      //Mostramos por consola la respuesta del servidor
      console.log("llamando a delClase");
      console.log(resp.message);
      $scope.respuesta=resp.message;


      //El mensje no sale debido (en principio) a que cambiamos de pantall
      if (resp.message == 'OK'){
        /*
        Para que los notify de UIkit funcionen deben estar cargdos tanto el fichero de estilo como el javascript
        de este componente, esto lo hcemos en la plantilla (html)
        */
        $.UIkit.notify("Clase eliminado con éxito.", {status:'success'});
      }else{
        $.UIkit.notify("\""+resp.message+"\"", {status:'warning'});
      }

      $scope.$apply();
    });

    //Después volvemos a la página principal de estudiantes, ahora desbloqueado porque se pierde el mensaje al cambiar,
    // al menos que le pasásemos los datos al controlador de esa página y fuese esa quien cargase el mensaje flotante.
    //$location.path("/estudiantes/main");

  };

  //Rescatamos el id de la url y la enviamos con el scope a la vista
  //$scope.id = $stateParams.estudianteID;
  $scope.id=$stateParams.claseID;

  console.log("ID clase: "+$stateParams.claseID);



  //Pedimos al Gateway toda la informaicón de la clase.
  gapi.client.helloworld.clases.getClase({'id':$stateParams.claseID}).execute(function(resp) {
    console.log("Petición al API Gateway de información de la clase con ID:  "+$stateParams.claseID);
    console.log(resp);
    $scope.clase = resp;
    console.log(resp.clase);
    $scope.$apply();
  });

  /*
  ### Información extra de la asginatura ###
  */


  //Pedimos al gateway todos los alumnos matriculados en esa clase (de cualquier asignatura)
  gapi.client.helloworld.clases.getAlumnosClase({'id':$stateParams.claseID}).execute(function(resp){
    console.log("Petición al API Gateway de alumnos matriculados en la clase con ID:  "+$stateParams.claseID);
    console.log(resp.alumnos);
    $scope.estudiantes = resp.alumnos;
    $scope.$apply();
  });

  //Pedimos al gateway todos los profesores que imparten a esa clase (de cualquier asignatura)
  gapi.client.helloworld.clases.getProfesoresClase({'id':$stateParams.claseID}).execute(function(resp){
    console.log("Petición al API Gateway de profesores que imparten en la clase con ID:  "+$stateParams.claseID);
    console.log(resp.profesores);
    $scope.profesores = resp.profesores;
    $scope.$apply();
  });

  //Pedimos al gateway todas las asignaturas que se imparten en esa clase.
  gapi.client.helloworld.clases.getAsignaturasClase({'id':$stateParams.claseID}).execute(function(resp){
    console.log("Petición al API Gateway de los asignaturas que se imparten en la clase con ID:  "+$stateParams.claseID);
    console.log(resp.asignaturas);
    $scope.asignaturas = resp.asignaturas;
    $scope.$apply();
  });

  /*
  ### Información extra MÁS específica ###
  */

  /*Pedimos al gateway todas las asociaciones que se imparten en esa clase, es decir todas las asignaturas que se imparten en
  esa clase pero no para saber la información general, como Francés que nos llevará a la información de la asignatura sino
  para saber por ejemplo en esa clase de 1AESO en la asginatura de Matematicas (eso es una asociación entre asignatura y clase)
  quiés es el profesor y quienes los alumnos, ya que pueden exisitir alumnos matriculados en 1AESO que den Métodos de la Ciencia
  y otros que den Religión. Ámbos grupos pertenecen a 1AESO pero cada uno está matriculado auna especificación de esas asignaturas
  en esta clase en concreto que además imparte un profesor en concreto.
  */


  //Creamos un array donde guardamos todos los bloques de información que nos vengan
  var listaAsociacionesCompleta = new Array();

  //Pedimos todas las asociaciones (especificaciones de asignaturas) que se dan para  la clase y toda la información de cada una.
  gapi.client.helloworld.clases.getAsociacionesClase({'id':$stateParams.claseID}).execute(function(resp){
    console.log("Petición al API Gateway de las asociaciones (especificaciones) de la asignaturas que se imparten en esta clase");

    //Guardamos la respuesta.
    listaAsociaciones = resp.asociaciones;

    //Una asociación es asignatura en clase. (inglés en 1ºABach)

    //Ahora por cada asociación que tenga esta clase vamos a pedir todos sus datos:
    for(var i=0; i<listaAsociaciones.length; i++){
      console.log(listaAsociaciones[i].nombreAsignatura);

      gapi.client.helloworld.asociaciones.getAsociacionCompleta({'id':listaAsociaciones[i].id_asociacion}).execute(function(resp){
        console.log('Info asociación completa: ');
        console.log(resp);
        //Añadimos cada bloque de info al array:
        console.log('AsociacionCompletaObtenida: ')
        listaAsociacionesCompleta.push(resp);
        console.log(listaAsociacionesCompleta);
        $scope.$apply();
      });

    }

    //Metemos la info obtenida en el scope para poder usarla
    console.log('listaAsociacionesCompleta:');
    console.log(listaAsociacionesCompleta);
    $scope.asociaciones=listaAsociacionesCompleta;

    $scope.$apply();



  });












}); //Fin controlador detalles asignatura
