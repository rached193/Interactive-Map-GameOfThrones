#Recursos Aplicacion
import json
import webapp2
import time

import model
import gestor

def AsDictMsg(historial):
    return {'user':historial.user, 'msg':historial.msg}

def AsDictUser(user):
    return {'name':user.name, 'casa':user.casa}

def AsDictPrivado(listados):
    return {'remitente':listados.remitente,'msgs':listados.msg}

class RestHandler(webapp2.RequestHandler):

  def dispatch(self):
    super(RestHandler, self).dispatch()


  def SendJson(self, r):
    self.response.headers['content-type'] = 'text/plain'
    self.response.write(json.dumps(r))


class SignUpHandler(RestHandler):

    def post(self):
      r = json.loads(self.request.body)
      checkres = model.InsertUser(r['name'],r['email'],r['passw'])
      if checkres:
        self.response.set_status(200)
      else:
        self.response.set_status(400)


class LoginHandler(RestHandler):

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


class SeleccionarHandler(RestHandler):

    def post(self):
      r = json.loads(self.request.body)
      checkres = model.RegistrarCasa(r['user'],r['casa'])
      if checkres is None:
          self.response.set_status(400)
      else:
          self.response.set_status(200)

#Handler de Chat Regional
class Chat(RestHandler):

    def get(self,sala):
      mensajes = model.QuerySala(sala)
      if mensajes is None:
          self.response.set_status(400)
      else:
          r = [ AsDictMsg(mensajes[mensaje]) for mensaje in range(len(mensajes)-1, -1, -1) ]
          self.SendJson(r)

    def post(self,sala):
        r = json.loads(self.request.body)
        checkres = model.NuevoMensaje(sala,r['user'],r['msg'])
        if checkres is None:
            self.response.set_status(400)
        else:
            self.response.set_status(200)


class AllUserHandler(RestHandler):

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


class FetchPrivadoHandler(RestHandler):

    def post(self):
        r = json.loads(self.request.body)
        checkres = model.FechtPrivados(r['user'])
        if checkres is None:
            self.response.set_status(400)
        else:
            r =[ AsDictPrivado(mensaje) for mensaje in checkres ]
            self.SendJson(r)


class NewPrivadoHandler(RestHandler):

    def post(self):
        r = json.loads(self.request.body)
        checkres = model.NuevoPrivado(r['destinatario'],r['remitente'],r['mensaje'])
        if checkres is None:
            self.response.set_status(400)
        else:
            gestor.Notificar(r['destinatario'])
            self.response.set_status(200)


class NewNotificacionHandler(RestHandler):

    def get(self):
        r = json.loads(self.request.body)
        gestor.Notificar(r['user'])
        self.response.set_status(200)

class NewDispositivoHandler(RestHandler):

    def post(self):
        r = json.loads(self.request.body)
        checkres = model.RegistrarDispositivo(r['user'],r['api'])
        if checkres is None:
            self.response.set_status(400)
        else:
            self.response.set_status(200)


APP = webapp2.WSGIApplication([    #Router del Back-End
    ('api/v1/signup', SignUpHandler), #{name:"User",email:"user@yahoo.es",passw:"contra"}
    ('api/v1/login', LoginHandler), #{name:"User",passw:"contra"}
    ('api/v1/seleccionar', SeleccionarHandler), #{user:"User",casa:"Casa Stark"}
    ('api/v1/Chat/<:.*>', Chat), #{sala:"Desembarco"}
    ('api/v1/allUser', AllUserHandler),
    ('api/v1/Personaje/<:.*>', Personaje),
    ('api/v1/fetchPrivado', FetchPrivadoHandler),
    ('api/v1/newPrivado', NewPrivadoHandler),
    ('api/v1/newNotificacion', NewNotificacionHandler),
    ('api/v1/newDispositivo', NewDispositivoHandler),

], debug=True)
