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

class QueryChatHandler(RestHandler):

    def post(self):
      r = json.loads(self.request.body)
      mensajes = model.QuerySala(r['sala'])
      if mensajes is None:
          self.response.set_status(400)
      else:
          r = [ AsDictMsg(mensajes[mensaje]) for mensaje in range(len(mensajes)-1, -1, -1) ]
          self.SendJson(r)


class NewMessageHandler(RestHandler):

    def post(self):
      r = json.loads(self.request.body)
      checkres = model.NuevoMensaje(r['sala'],r['user'],r['msg'])
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

class NewPersonajeHandler(RestHandler):

    def post(self):
        r = json.loads(self.request.body)
        checkres = model.RegistrarPersonaje(r['user'],r['name'],r['edad'],r['gender'],r['apariencia'],r['historia'])
        if checkres is None:
            self.response.set_status(400)
        else:
            self.response.set_status(200)

class FetchPersonajeHandler(RestHandler):

    def post(self):
        r = json.loads(self.request.body)
        checkres = model.FechtPersonaje(r['user'])
        if checkres is None:
            self.response.set_status(400)
        else:
            self.SendJson({'user':checkres.user,'nombre':checkres.nombre,'edad':checkres.edad,'historia':checkres.historia,'apariencia':checkres.apariencia})

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
            self.response.set_status(200)


class NewNotificacionHandler(RestHandler):

    def get(self):
        gestor.Notificar()
        self.response.set_status(200)



APP = webapp2.WSGIApplication([    #Router del Back-End
    ('/rest/signup', SignUpHandler), #{name:"User",email:"user@yahoo.es",passw:"contra"}
    ('/rest/login', LoginHandler), #{name:"User",passw:"contra"}
    ('/rest/seleccionar', SeleccionarHandler), #{user:"User",casa:"Casa Stark"}
    ('/rest/queryChat', QueryChatHandler), #{sala:"Desembarco"}
    ('/rest/newMessage', NewMessageHandler), #{sala:"Desembarco",user:"Usuario",msg:"Hello Work"}
    ('/rest/allUser', AllUserHandler),
    ('/rest/newPersonaje', NewPersonajeHandler),
    ('/rest/fetchPersonaje', FetchPersonajeHandler),
    ('/rest/fetchPrivado', FetchPrivadoHandler),
    ('/rest/newPrivado', NewPrivadoHandler),
    ('/rest/newNotificacion', NewNotificacionHandler),

], debug=True)
