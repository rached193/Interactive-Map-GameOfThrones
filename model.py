from google.appengine.ext import ndb
import string

class User(ndb.Model):
  name = ndb.StringProperty()
  email = ndb.StringProperty()
  passw = ndb.StringProperty()

def InsertUser(name, email, passw):
    qry = User.query(User.name == name)
    if qry.get() is None:
        user = User(name=name, email=email, passw=passw)
        user.put()
        return 1
    else:
        return 0

def CheckUser(name, passw):
    qry = User.query(User.name == name)
    usuario = qry.get()
    if usuario is None:
        return None
    else:
        if usuario.passw==passw:
            return usuario.nickname
        else:
            return None
