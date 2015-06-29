import json
import webapp2
import time

import model

class RestHandler(webapp2.RequestHandler):

  def dispatch(self):
    #time.sleep(1)
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
          self.SendJson({'nickname': checkres})


APP = webapp2.WSGIApplication([    #Router del Back-End
    ('/rest/signup', SignUpHandler),
    ('/rest/login', LoginHandler),
], debug=True)
