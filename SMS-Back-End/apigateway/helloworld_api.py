# -*- coding: utf-8 -*-
"""

Hello World API implemented using Google Cloud Endpoints.


"""


import endpoints
#https://cloud.google.com/appengine/docs/python/tools/protorpc/messages/messageclass
from protorpc import messages
from protorpc import message_types
from protorpc import remote
import os

#Doc de urlfetch: https://cloud.google.com/appengine/docs/python/refdocs/google.appengine.api.urlfetch
#Librerías usadas para la llamada a las APIRest de los microservicios
from google.appengine.api import urlfetch
import urllib

#Para el descubrimiento de los módulos
import urllib2
from google.appengine.api import modules
#Para la decodificaciónd e los datos recibidos en JSON desde las APIs
import jsonpickle


from termcolor import colored

import requests

import json

from manejadorImagenes import ManejadorImagenes

#Variable habilitadora del modo verbose
v=True

nombreMicroservicio = '\n ## API Gateway ##'

#Variable del nombre del microservicio de base de datos SBD
sbd="sbd"


# TODO: Replace the following lines with client IDs obtained from the APIs
# Console or Cloud Console.
WEB_CLIENT_ID = 'replace this with your web client application ID'
ANDROID_CLIENT_ID = 'replace this with your Android client ID'
IOS_CLIENT_ID = 'replace this with your iOS client ID'
ANDROID_AUDIENCE = WEB_CLIENT_ID


package = 'Hello'
# Función que recibe una cadena como parámetro y la formatea para resolver el problema de los acentos.
def formatText(cadena):
    return cadena.encode('utf-8').decode('utf-8')

def formatTextInput(cadena):
    return cadena.encode('utf-8')


import  mensajes.mensajesSCE as mensajesSCE
import mensajes.otrosMensajes as mensajesSBD


module = modules.get_current_module_name()
instance = modules.get_current_instance_id()

#Decorador que establace nombre y versión de la api
@endpoints.api(name='helloworld', version='v1')
class HelloWorldApi(remote.Service):
    """Helloworld API v1.
    faslkfjñalksf
    laksfjlka
    laksjklj"""


    @endpoints.method(message_types.VoidMessage, mensajesSBD.MensajeRespuesta, path='holaMundo', http_method='GET', name='holaMundo')
    def pruebaHolaMundo(self, request):
        """
        Función de prueba de exposición.
        curl -X GET localhost:8001/_ah/api/helloworld/v1/prueba22
        """
        return MensajeRespuesta(message='Hola mundo! \n')

    ##################################################################
    ###   métodos microServicio Base de Datos       mSBD           ###
    ##################################################################

    ###   métodos de ENTIDADES       mSBD     ###

    @endpoints.method( mensajesSBD.Entidad,  mensajesSBD.StatusID, path='entidades', http_method='POST', name='entidades.insertarEntidad')
    def insertarEntidad(self, request):

        """
        curl -i -d "tipo=CienciasExperimentales" -X POST -G localhost:8001/_ah/api/helloworld/v1/entidades
        curl -H "Content-Type: application/json" -X POST -d '{"tipo": "Alumno", "datos": {"nombre": "María"} }'  localhost:8001/_ah/api/helloworld/v1/entidades
        curl -H "Content-Type: application/json" -X POST -d '{"tipo": "Alumno", "datos": {"nombre": "María", "apellidos": "Luzán"} }'  localhost:8001/_ah/api/helloworld/v1/entidades
        """

        if v:
            print nombreMicroservicio
            print "Petición POST a entidades.insertarEntidad"
            print "request: "+str(request)
            print '\n'


        tipo = request.tipo
        datos = {}

        if request.datos.nombre != None:
            datos['nombre'] = request.datos.nombre
        if request.datos.apellidos != None:
            datos['apellidos'] = request.datos.apellidos
        if request.datos.dni != None:
            datos['dni'] = request.datos.dni
        if request.datos.direccion != None:
            datos['direccion'] = request.datos.direccion
        if request.datos.localidad != None:
            datos['localidad'] = request.datos.localidad
        if request.datos.provincia != None:
            datos['provincia'] = request.datos.provincia
        if request.datos.fechaNacimiento != None:
            datos['fechaNacimiento'] = request.datos.fechaNacimiento
        if request.datos.telefono != None:
            datos['telefono'] = request.datos.telefono

        if request.datos.curso != None:
            datos['curso'] = request.datos.curso
        if request.datos.grupo != None:
            datos['grupo'] = request.datos.grupo
        if request.datos.nivel != None:
            datos['nivel'] = request.datos.nivel

        if request.datos.idClase != None:
            datos['idClase'] = request.datos.idClase
        if request.datos.idAsignatura != None:
            datos['idAsignatura'] = request.datos.idAsignatura
        if request.datos.idAsociacion != None:
            datos['idAsociacion'] = request.datos.idAsociacion
        if request.datos.idAlumno != None:
            datos['idAlumno'] = request.datos.idAlumno
        if request.datos.idProfesor != None:
            datos['idProfesor'] = request.datos.idProfesor



        #Le decimos al microservicio que queremos conectarnos (solo usando el nombre del mismo), GAE descubre su URL solo.
        url = "http://%s/" % modules.get_hostname(module=sbd)
        url+='entidades'
        req = urllib2.Request(url, json.dumps({'tipo': tipo, 'datos': datos}), {'Content-Type': 'application/json'})
        f = urllib2.urlopen(req)
        response = json.loads(f.read())
        f.close()


        print colored(response, 'green')

        idEntidad=response.get('idEntidad', None)
        print idEntidad

        if idEntidad != None:
            return StatusID(status=response['status'], id=int(idEntidad))
        else:
            return StatusID(status=response['status'])

    #Por no haber forma de hacer que funcionen las rutas .../Alumno para la lista completa y ../Alumno/2 para los datos del
    #alumno con id 2 se hacen dos métodos separados.
    @endpoints.method( mensajesSBD.ID_RESOURCE,  mensajesSBD.ListaEntidades ,http_method='GET',path='entidades/{tipo}',name='entidades.getEntidades')
    def getEntidades(self, request):

        """
        curl  localhost:8001/_ah/api/helloworld/v1/entidades/Alumno
        """


        print colored(request.tipo, 'red')
        print colored(request.idEntidad, 'red')
        if not request.idEntidad:
            print 'HELLO'

        url = "http://%s/" % modules.get_hostname(module=sbd)
        url += 'entidades' + '/' + str(request.tipo)
        if request.idEntidad:
            url += '/' + str(request.idEntidad)


        print colored(url, 'green')

        req = urllib2.Request(url)
        f = urllib2.urlopen(req)
        response = json.loads(f.read())
        f.close()

        if type(response) is not list:
            message = 'No existe entidad del tipo %s.' % request.tipo
            raise endpoints.NotFoundException(message)


        print colored(response, 'red')

        lista = []

        """
        Como la entidad puede ser de muchos tipos, se analizan todos los campos posibles y se construye
        el mensaje de salida conforme a este, así simplificamos el proceso. En todos los casos habrá keys
        que no estarán en el diccionario que nos devuelve el microservicio, esto no es un problema ya que
        se pondrá None (usando get) y no se enviarán por el mensaje, devolviendo así solo la información que
        el sistema tiene.
        """
        for ent in response:
            entidad = DatosEntidadGenerica()
            entidad.nombre = ent.get('nombre', None)
            entidad.apellidos = ent.get('apellidos', None)
            entidad.dni = ent.get('dni', None)
            entidad.direccion = ent.get('direccion', None)
            entidad.localidad = ent.get('localidad', None)
            entidad.provincia = ent.get('provincia', None)
            entidad.fechaNacimiento = ent.get('fechaNacimiento', None)
            entidad.telefono = ent.get('telefono', None)
            entidad.imagen = ent.get('urlImagen', None)
            entidad.curso = ent.get('curso', None)
            entidad.grupo = ent.get('grupo', None)
            entidad.nivel = ent.get('nivel', None)

            lista.append(entidad)
        return ListaEntidades(entidades=lista)

    @endpoints.method( mensajesSBD.ID_RESOURCE,  mensajesSBD.DatosEntidadGenerica ,http_method='GET',path='entidades/{tipo}/{idEntidad}',name='entidades.getEntidad')
    def getEntidad(self, request):
        """
        curl  localhost:8001/_ah/api/helloworld/v1/entidades/Alumno/1
        {
         "nombre": "nombrePrueba"
        }
        """

        url = "http://%s/" % modules.get_hostname(module=sbd)
        url += 'entidades' + '/' + str(request.tipo)
        if request.idEntidad:
            url += '/' + str(request.idEntidad)

        req = urllib2.Request(url)
        f = urllib2.urlopen(req)
        response = json.loads(f.read())
        f.close()


        #Si la respuesta del microservicio es nevativa por no haber encontrado el recurso que se le pide,
        #devolvemos el mensaje estandar NotFoundException code 404
        if response == 'Elemento no encontrado':
            message = 'No existe entidad con id %s para el tipo %s.' % (request.idEntidad, request.tipo)
            raise endpoints.NotFoundException(message)

        """
        Como la entidad puede ser de muchos tipos, se analizan todos los campos posibles y se construye
        el mensaje de salida conforme a este, así simplificamos el proceso. En todos los casos habrá keys
        que no estarán en el diccionario que nos devuelve el microservicio, esto no es un problema ya que
        se pondrá None (usando get) y no se enviarán por el mensaje, devolviendo así solo la información que
        el sistema tiene.
        """
        if request.idEntidad:
            entidad = DatosEntidadGenerica()
            entidad.nombre = response.get('nombre', None)
            entidad.apellidos = response.get('apellidos', None)
            entidad.dni = response.get('dni', None)
            entidad.direccion = response.get('direccion', None)
            entidad.localidad = response.get('localidad', None)
            entidad.provincia = response.get('provincia', None)
            entidad.fechaNacimiento = response.get('fechaNacimiento', None)
            entidad.telefono = response.get('telefono', None)
            entidad.imagen = response.get('urlImagen', None)
            entidad.curso = response.get('curso', None)
            entidad.grupo = response.get('grupo', None)
            entidad.nivel = response.get('nivel', None)


        return entidad

    @endpoints.method( mensajesSBD.MensajeModificacionEntidad,  mensajesSBD.StatusID, path='entidades', http_method='PUT', name='entidades.modificarEntidad')
    def modEntidad(self, request):
        """
        curl -H "Content-Type: application/json" -X PUT -d '{"tipo": "Alumno", "idEntidad": 1, "campoACambiar": "nombre", "nuevoValor": "Lucía" }'  localhost:8001/_ah/api/helloworld/v1/entidades
        curl -H "Content-Type: application/json" -X PUT -d '{"tipo": "Alumno", "idEntidad": 1, "campoACambiar": "dni", "nuevoValor": "16271625" }'  localhost:8001/_ah/api/helloworld/v1/entidades
        """

        #Le decimos al microservicio que queremos conectarnos (solo usando el nombre del mismo), GAE descubre su URL solo.
        url = "http://%s/" % modules.get_hostname(module=sbd)
        url+='entidades'

        #Codificamos los datos.
        dic = {'tipo': request.tipo,
               'idEntidad': request.idEntidad,
               'campoACambiar': request.campoACambiar,
               'nuevoValor': request.nuevoValor }

        #Realizamos la petición al servicio con los datos codificados al microservicio apropiado.
        result = urlfetch.fetch(url=url, payload=json.dumps(dic), method=urlfetch.PUT, headers={'Content-Type': 'application/json'})
        result = json.loads(result.content)


        return StatusID(status=result['status'])

    @endpoints.method( mensajesSBD.ID_RESOURCE,  mensajesSBD.StatusID ,http_method='DELETE',path='entidades/{tipo}/{idEntidad}',name='entidades.delEntidad')
    def delEntidad(self, request):
        """
        curl -X DELETE -G localhost:8001/_ah/api/helloworld/v1/entidades/Alumno/1
        """

        if v:
            print nombreMicroservicio
            print "Petición DELETE a entidades.delEntidad"
            print "request: "+str(request)
            print '\n'

        #Le decimos al microservicio que queremos conectarnos (solo usando el nombre del mismo), GAE descubre su URL solo.
        url = "http://%s/" % modules.get_hostname(module=sbd)
        url += 'entidades' + '/' + str(request.tipo) + '/' + str(request.idEntidad)

        #Usamos el método DELETE con la url
        result = urlfetch.fetch(url=url, method=urlfetch.DELETE)
        result = json.loads(result.content)

        return StatusID(status=result['status'])

    @endpoints.method( mensajesSBD.Recursosv2,  mensajesSBD.ListaEntidades, http_method='GET', path='entidades/{tipoBase}/{idEntidad}/{tipoBusqueda}', name='entidades.getEntidadesRelacionadas')
    def getEntidadesRelacionadas(self, request):
        """
        curl -X GET -G localhost:8001/_ah/api/helloworld/v1/entidades/{tipoBase}/{idEntidad}/{tipoBusqueda}
        curl -X GET -G localhost:8001/_ah/api/helloworld/v1/entidades/Alumno/1/Profesor
        """

        if v:
            print nombreMicroservicio
            print "Petición DELETE a entidades.delEntidad"
            print "request: "+str(request)
            print '\n'

        url = "http://%s/" % modules.get_hostname(module=sbd)
        url += 'entidades' + '/' + str(request.tipoBase) + '/' + str(request.idEntidad) + '/' + str(request.tipoBusqueda)

        #Usamos el método DELETE con la url
        result = urlfetch.fetch(url=url, method=urlfetch.GET)
        result = json.loads(result.content)
        print result

        lista = []

        """
        Como la entidad puede ser de muchos tipos, se analizan todos los campos posibles y se construye
        el mensaje de salida conforme a este, así simplificamos el proceso. En todos los casos habrá keys
        que no estarán en el diccionario que nos devuelve el microservicio, esto no es un problema ya que
        se pondrá None (usando get) y no se enviarán por el mensaje, devolviendo así solo la información que
        el sistema tiene.
        """
        for ent in result:
            entidad = DatosEntidadGenerica()
            entidad.nombre = ent.get('nombre', None)
            entidad.apellidos = ent.get('apellidos', None)
            entidad.dni = ent.get('dni', None)
            entidad.direccion = ent.get('direccion', None)
            entidad.localidad = ent.get('localidad', None)
            entidad.provincia = ent.get('provincia', None)
            entidad.fechaNacimiento = ent.get('fechaNacimiento', None)
            entidad.telefono = ent.get('telefono', None)
            entidad.imagen = ent.get('urlImagen', None)
            entidad.curso = ent.get('curso', None)
            entidad.grupo = ent.get('grupo', None)
            entidad.nivel = ent.get('nivel', None)

            lista.append(entidad)
        return ListaEntidades(entidades=lista)

    @endpoints.method(mensajesSBD.AlumnoCompletoConImagen,  mensajesSBD.StatusID, path='alumnos/insertarAlumno2', http_method='POST', name='alumnos.insertarAlumno2')
    def insertar_alumno2(self, request):
        """

        Función que inserta un alumno en el sistema con o sin imagen.

        Ejemplo de llamada SIN imagen:
        curl -i -d "nombre=Juan&apellidos=Fernandez&dni=45301218&direccion=Calle&localidad=Jerezfrontera&provincia=Granada&fecha_nacimiento=1988-2-6&telefono=699164459" -X POST -G localhost:8001/_ah/api/helloworld/v1/alumnos/insertarAlumno2

        Ejmplo de llamada CON imagen:

        curl -d "nombre=Juan&apellidos=Fernandez&dni=45301218&direccion=Calle&localidad=Jerezfrontera&provincia=Granada&fecha_nacimiento=1988-2-6&telefono=699164459" --data-urlencode 'imagen='"$( base64 profile.jpg)"''  -X POST -G localhost:8001/_ah/api/helloworld/v1/alumnos/insertarAlumno2
        """

        if v:
            print nombreMicroservicio
            print "Petición POST a alumnos.insertarAlumno2"
            print "Contenido de la petición:"
            print request
            print '\n'

        #Construimos un diccionario con los datos del alumno recibidos en la petición.
        datos = {
          "nombre": formatTextInput(request.nombre),
          "apellidos": formatTextInput(request.apellidos),
          "dni": request.dni,
          "direccion": formatTextInput(request.direccion),
          "localidad": formatTextInput(request.localidad),
          "provincia": formatTextInput(request.provincia),
          "fecha_nacimiento": request.fecha_nacimiento,
          "telefono": request.telefono
        }

        #Sea con imagen o sin imagen insertamos al alumno en el sistema:
        #Conformamos la dirección:
        url = "http://%s/" % modules.get_hostname(module=sbd)
        #Añadimos el servicio al que queremos conectarnos.
        url+="alumnos"

        #Codificamos los datos.
        form_data = urllib.urlencode(datos)
        #Realizamos la petición al servicio con los datos codificados al microservicio apropiado.
        result = urlfetch.fetch(url=url, payload=form_data, method=urlfetch.POST)
        if v:
            print nombreMicroservicio
            print "Resultado de la petición: "
            print result.content
            print "Código de estado: "
            print result.status_code
            print '\n\n'

        #Analizamos la respuesta y si todo ha ido bien habremos recibido algo así: {'idAlumno': '42', 'status': 'OK'}
        json = jsonpickle.decode(result.content)

        #Definimos el mensaje de salida:
        salida = ''

        if json['status'] == 'OK':
            #Es que el alumno se ha guardado con éxito, entonces procedemos a guardar su imagen

            #Si se detecta que no se ha enviado información en el campo imagen, es que no se está enviando una imagen:
            if request.imagen == None:
                print 'Petición a insertarAlumno2 SIN imagen en el request.\n'
                salida = json['status']

            else:
                print 'Petición a insertarAlumno2 CON imagen en el request.\n'

                #Pero antes ponemos el nombre de forma correcta, usando el id del alumno y la extensión de la imagen
                nombreImagen = 'alumnos/imagenes_perfil/' + json['idAlumno'] + '.jpg'

                urlImagenAlumno = ManejadorImagenes.CreateFile(nombreImagen, request.imagen)

                #Una vez guardada la imagen pasamos a setear el campo imagen del alumno en cuestión.
                url2 = "http://%s/" % modules.get_hostname(module=sbd)
                url2+="alumnos/"+json['idAlumno']

                #Añadimos la imagen a los datos:
                datos['imagen'] = urlImagenAlumno;

                resultadoModificacion = urlfetch.fetch(url=url2, payload=urllib.urlencode(datos), method=urlfetch.POST)

                print 'Resultado Modificacion'
                print str(resultadoModificacion.content)
                salida = resultadoModificacion.content
                #json2 = jsonpickle.decode(resultadoModificacion.content)
                #salida = json2['status']

        return StatusID(status=salida, id=int(json['idAlumno']))

    #### possibly deprecated ####
    @endpoints.method( mensajesSBD.AlumnoCompleto,  mensajesSBD.MensajeRespuesta, path='alumnos/insertarAlumno', http_method='POST', name='alumnos.insertarAlumno')
    def insertar_alumno(self, request):
        '''
        insertarAlumno()  [POST con todos los atributos de un alumno]

        Introduce un nuevo alumno en el sistema.

        Ejemplo de llamada en terminal:
        curl -i -d "nombre=Juan&dni=45301218Z&direccion=Calle&localidad=Jerezfrontera&provincia=Granada&fecha_nacimiento=1988-2-6&telefono=699164459" -X POST -G localhost:8001/_ah/api/helloworld/v1/alumnos/insertarAlumno
        (-i para ver las cabeceras)

        '''

        if v:
            print nombreMicroservicio
            print "Petición POST a alumnos.insertarAlumno"
            print "Contenido de la petición:"
            print str(request)
            print '\n'

        #Si no tenemos todos los atributos entonces enviamos un error de bad request.
        if request.nombre==None or request.apellidos==None or request.dni==None or request.direccion==None or request.localidad==None or request.provincia==None or request.fecha_nacimiento==None or request.telefono==None:
            raise endpoints.BadRequestException('Peticion erronea, faltan datos.')

        #Conformamos la dirección:
        url = "http://%s/" % modules.get_hostname(module=sbd)
        #Añadimos el servicio al que queremos conectarnos.
        url+="alumnos"

        #Extraemos lo datos de la petición al endpoints
        form_fields = {
          "nombre": formatTextInput(request.nombre),
          "apellidos": formatTextInput(request.apellidos),
          "dni": request.dni,
          "direccion": formatTextInput(request.direccion),
          "localidad": formatTextInput(request.localidad),
          "provincia": formatTextInput(request.provincia),
          "fecha_nacimiento": request.fecha_nacimiento,
          "telefono": request.telefono
        }

        if request.imagen != None:
            print 'Hay imagen recibida en insertarAlumno()'
            form_fields['imagen'] = request.imagen
            print form_fields


        if v:
            print "Llamando a: "+url
            print 'DATOS'
            print form_fields


        #Doc de urlfetch: https://cloud.google.com/appengine/docs/python/refdocs/google.appengine.api.urlfetch
        form_data = urllib.urlencode(form_fields)
        #Realizamos la petición al servicio con los datos pasados al endpoint
        result = urlfetch.fetch(url=url, payload=form_data, method=urlfetch.POST)


        #Infro después de la petición:
        if v:
            print nombreMicroservicio
            print "Resultado de la petición: "
            print result.content
            print "Código de estado: "
            print result.status_code

        if str(result.status_code) == '404':
            raise endpoints.NotFoundException('Alumno con ID %s ya existe en el sistema.' % (request.dni))

        #return MensajeRespuesta(message="Todo OK man!")
        #Mandamos la respuesta que nos devuelve la llamada al microservicio:
        return MensajeRespuesta(message=result.content)

    ###   métodos de CREDENCIALES       mSBD     ###

    @endpoints.method(mensajesSBD.Login,  mensajesSBD.salidaLogin, path='login/loginUser', http_method='POST', name='login.loginUser' )
    def loginUser(self, request):
        '''
        Comprueba si un usaurio está en elsistema y en caso de estarlo devuelve su rol y su número de identificación.
        curl -d "username=46666&password=46666" -i -X POST -G localhost:8001/_ah/api/helloworld/v1/login/loginUser
        '''

        #Info de seguimiento
        if v:
            print nombreMicroservicio
            print ' Petición POST a login.loginUser'
            print ' Request: \n '+str(request)+'\n'

        #Conformamos la dirección:
        url = "http://%s/" % modules.get_hostname(module=sbd)
        #Añadimos el metodo al que queremos conectarnos.
        url+="comprobarAccesoUsuario"


        #Extraemos lo datos de la petición al endpoints y empaquetamos un dict.
        datos = {
          "username": formatTextInput(request.username),
          "password": formatTextInput(request.password),
        }

        #Petición al microservicio:
        result = urlfetch.fetch(url=url, payload=urllib.urlencode(datos), method=urlfetch.POST)

        json = jsonpickle.decode(result.content)

        if json=='Usuario no encontrado':
            raise endpoints.NotFoundException('Usuario no encontrado')
        else:
            mensajeSalida=salidaLogin(idUser=str(json['idUsuario']), nombre=str(json['nombre']), rol=str(json['rol']))

        #Info de seguimiento
        if v:
            print nombreMicroservicio
            print ' Return: '+str(mensajeSalida)+'\n'


        return mensajeSalida

    ##############################################
    #   Manejo de imágenes                       #
    ##############################################

    @endpoints.method(mensajesSBD.Imagen, mensajesSBD.MensajeRespuesta, path='imagenes/subirImagen', http_method='POST', name='imagenes.subirImagen')
    def subirImagen(self, request):

        print 'Nombre recibido:\n'
        print request.name


        # curl -d "nombre=JuanAntonio" -i -X POST -G localhost:8001/_ah/api/helloworld/v1/imagenes/subirImagen

        '''
         (echo -n '{"image": "'; base64 profile.jpg; echo '"}') | curl -H "Content-Type: application/json"  -d @-  localhost:8001/_ah/api/helloworld/v1/imagenes/subirImagen?name=prueba
        '''

        # curl -d "nombre=prueba" -X POST localhost:8001/_ah/api/helloworld/v1/imagenes/subirImagen

        print "\n ##### IMAGEN RECIBIDA EN API ENDPOINTS: #####\n"
        print '\nImagen en CRUDO: \n'
        print str(request.image)

        import binascii
        stringBase64 = binascii.b2a_base64(request.image)
        print '\nImagen pasada a de Base64 a string: \n'
        print stringBase64

        #print request.image.decode(encoding='UTF-8')


        print 'URL \n'
        url = ManejadorImagenes.CreateFile(request.name, request.image)
        print url

        return MensajeRespuesta( message=str(url) )

    @endpoints.method(mensajesSBD.URL, mensajesSBD.MensajeRespuesta, path='imagenes/eliminarImagen', http_method='POST', name='imagenes.eliminarImagen')
    def eliminarImagen(self, request):
        '''
        curl -X POST localhost:8001/_ah/api/helloworld/v1/imagenes/eliminarImagen?url=http://localhost:8001/_ah/img/encoded_gs_file:YXBwX2RlZmF1bHRfYnVja2V0L2Zpbm4uanBlZw==
        '''
        print (request.url)
        return MensajeRespuesta( message=ManejadorImagenes.DeleteFile(request.url))


APPLICATION = endpoints.api_server([HelloWorldApi])
