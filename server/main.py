#Recursos Aplicacion
import json
import webapp2
import logging

#Modulos Aplicacion
import model
import gestor

##Funciones auxuiliares para enviar datos
def AsDictMsg(historial):
    return {'user':historial.user, 'msg':historial.msg}

def AsDictUser(user):
    return {'name':user.name, 'casa':user.casa}

def AsDictPrivado(listados):
    return {'remitente':listados.remitente,'msgs':listados.msg}

#Declaracion de la Handler Global
class RestHandler(webapp2.RequestHandler):

  def dispatch(self):
    super(RestHandler, self).dispatch()


  def SendJson(self, r):
    self.response.headers['content-type'] = 'text/plain'
    self.response.write(json.dumps(r))


#Handler del Registro de Usuario
class Registrar(RestHandler):

    def post(self):
      r = json.loads(self.request.body)
      checkres = model.InsertUser(r['name'],r['email'],r['passw'])
      if checkres:
        self.response.set_status(200)
      else:
        self.response.set_status(400)


#Handler del Logun de Usuario
class Loguear(RestHandler):

    def post(self):
      r = json.loads(self.request.body)
      checkres = model.CheckUser(r['name'],r['passw'])
      if checkres is None:
          self.response.set_status(400)
      else:
          perso = model.FechtPersonaje(checkres.name)
          if perso is None:
              self.SendJson({'nickname': checkres.name,'casa':checkres.casa,'personaje':"null",'sexo':"null"})
          else:
              self.SendJson({'nickname': checkres.name,'casa':checkres.casa,'personaje':perso.nombre,'sexo':perso.sexo})


#Handler para Asignar una casa a un Usuario
class SelecionarCasa(RestHandler):

    def post(self):
      r = json.loads(self.request.body)
      checkres = model.RegistrarCasa(r['user'],r['casa'])
      if checkres is None:
          self.response.set_status(400)
      else:
          self.response.set_status(200)

#Handler de Chat Regional
class Chat(RestHandler):

    def get(self,usuario):
      mensajes = model.QuerySala(usuario)
      if mensajes is None:
          self.response.set_status(400)
      else:
          r = [ AsDictMsg(mensajes[mensaje]) for mensaje in range(len(mensajes)-1, -1, -1) ]
          self.SendJson(r)

    def post(self,usuario):
        r = json.loads(self.request.body)
        checkres = model.NuevoMensaje(usuario,r['pjmsg'],r['msg'])
        if checkres is None:
            self.response.set_status(400)
        else:
            gestor.NotificarChat(usuario)
            self.response.set_status(200)


class AllUsers(RestHandler):

    def get(self):
        usuarios = model.AllUsers()
        if usuarios is None:
            self.response.set_status(400)
        else:
            r = [ AsDictUser(user) for user in usuarios ]
            self.SendJson(r)

#Handler de Personaje
class Personaje(RestHandler):

    def get(self,user):
        checkres = model.FechtPersonaje(user)
        if checkres is None:
            self.response.set_status(400)
        else:
            self.SendJson({'user':checkres.user,'nombre':checkres.nombre,'edad':checkres.edad,'historia':checkres.historia,'apariencia':checkres.apariencia})

    def post(self,user):
        r = json.loads(self.request.body)
        checkres = model.RegistrarPersonaje(user,r['name'],r['edad'],r['gender'],r['apariencia'],r['historia'])
        if checkres is None:
            self.response.set_status(400)
        else:
            self.response.set_status(200)

#Handler de Mensajes Privados
class Privado(RestHandler):

    def get(self,destinatario):
        checkres = model.FechtPrivados(destinatario)
        if checkres is None:
            self.response.set_status(400)
        else:
            r =[ AsDictPrivado(mensaje) for mensaje in checkres ]
            self.SendJson(r)


    def post(self,destinatario):
        r = json.loads(self.request.body)
        checkres = model.NuevoPrivado(destinatario,r['remitente'],r['mensaje'])
        if checkres is None:
            self.response.set_status(400)
        else:
            gestor.NotificarPrivado(destinatario)
            self.response.set_status(200)

class Dispositivo(RestHandler):

    def post(self,user):
        r = json.loads(self.request.body)
        checkres = model.RegistrarDispositivo(user,r['api'])
        if checkres is None:
            self.response.set_status(400)
        else:
            self.response.set_status(200)


class Mapa(RestHandler):

    def get(self,user):
        checkres = model.FetchLocalizacion(user)
        if checkres is None:
            self.response.set_status(400)
        else:
            self.SendJson({'localizacion': checkres})

    def post(self,user):
        r = json.loads(self.request.body)
        checkres = model.MoverPersonaje(user,r['movimiento'])
        if checkres is None:
            self.response.set_status(400)
        else:
            self.response.set_status(200)


APP = webapp2.WSGIApplication([    #Router del Back-End
    ('/api/v1/signup', Registrar),
    ('/api/v1/login', Loguear),
    ('/api/v1/seleccionar', SelecionarCasa),
    ('/api/v1/Chat/(\w+)', Chat),
    ('/api/v1/allUser', AllUsers),
    ('/api/v1/Personaje/(\w+)', Personaje),
    ('/api/v1/Privado/(\w+)', Privado),
    ('/api/v1/Dispositivo/(\w+)', Dispositivo),
    ('/api/v1/Mapa/(\w+)', Mapa),

], debug=True)
