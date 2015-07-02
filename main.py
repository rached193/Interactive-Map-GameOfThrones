import json
import webapp2
import time

import model

def AsDictMsg(historial):
    return {'user':historial.user, 'msg':historial.msg}

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
        self.response.set_status(500)


class LoginHandler(RestHandler):

    def post(self):
      r = json.loads(self.request.body)
      checkres = model.CheckUser(r['name'],r['passw'])
      if checkres is None:
          self.response.set_status(500)
      else:
          self.SendJson({'nickname': checkres.name,'casa':checkres.casa})


class SeleccionarHandler(RestHandler):

    def post(self):
      r = json.loads(self.request.body)
      checkres = model.RegistrarCasa(r['user'],r['casa'])
      if checkres is None:
          self.response.set_status(500)
      else:
          self.response.set_status(200)

class ChatHandler(RestHandler):

    def post(self):
      r = json.loads(self.request.body)
      mensajes = model.QuerySala(r['sala'])
      if mensajes is None:
          self.response.set_status(500)
      else:
          r = [ AsDictMsg(mensaje) for mensaje in mensajes ]
          self.SendJson(r)


class newMessageHandler(RestHandler):

    def post(self):
      r = json.loads(self.request.body)
      checkres = model.NuevoMensaje(r['sala'],r['user'],r['msg'])
      if checkres is None:
          self.response.set_status(500)
      else:
          self.response.set_status(200)




APP = webapp2.WSGIApplication([    #Router del Back-End
    ('/rest/signup', SignUpHandler),
    ('/rest/login', LoginHandler),
    ('/rest/seleccionar', SeleccionarHandler),
    ('/rest/queryChat', ChatHandler),
    ('/rest/newMessage', newMessageHandler),
], debug=True)
