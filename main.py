import json
import webapp2
import time

import model

def AsDictMsg(historial):
    return {'user':historial.user, 'msg':historial.msg}

def AsDictUser(user):
    return {'name':user.name, 'casa':user.casa}


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
        self.response.write('Todo Correcto')
      else:
        self.response.set_status(400)


class LoginHandler(RestHandler):

    def post(self):
      r = json.loads(self.request.body)
      checkres = model.CheckUser(r['name'],r['passw'])
      if checkres is None:
          self.response.set_status(400)
      else:
          self.SendJson({'nickname': checkres.name,'casa':checkres.casa})


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
          r = [ AsDictMsg(mensaje) for mensaje in mensajes ]
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
        checkres = model.RegistrarPersonaje(r['user'],r['nomre'],r['edad'].r['historia'])
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
            self.SendJson({'user':checkres.user,'nombre':checkres.nombre,'edad':checkres.edad,'historia':checkres.historia})



APP = webapp2.WSGIApplication([    #Router del Back-End
    ('/rest/signup', SignUpHandler), #{name:"User",email:"user@yahoo.es",passw:"contra"}
    ('/rest/login', LoginHandler), #{name:"User",passw:"contra"}
    ('/rest/seleccionar', SeleccionarHandler), #{user:"User",casa:"Casa Stark"}
    ('/rest/queryChat', QueryChatHandler), #{sala:"Desembarco"}
    ('/rest/newMessage', NewMessageHandler), #{sala:"Desembarco",user:"Usuario",msg:"Hello Work"}
    ('/rest/allUser', AllUserHandler),
    ('/rest/newPersonaje', NewPersonajeHandler),
    ('/rest/fetchPersonaje', FetchPersonajeHandler),
], debug=True)
