from google.appengine.ext import ndb
import string

class User(ndb.Model):
    name = ndb.StringProperty()
    email = ndb.StringProperty()
    passw = ndb.StringProperty()
    casa = ndb.StringProperty()

class Mensaje(ndb.Model):
    msg = ndb.StringProperty()
    user = ndb.StringProperty()
    time = ndb.StringProperty()

class Chat(ndb.Model):
    sala = ndb.StringProperty()
    msgs = ndb.StructuredProperty(Mensaje, repeated=True)


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
            return usuario
        else:
            return None

def RegistrarCasa(name,casa):
    qry = User.query(User.name == name)
    usuario = qry.get()
    if usuario is None:
        return None
    else:
        qryC = User.query(User.casa == casa)
        existe = qryC.get()
        if existe is None:
            if usuario.casa is None:
                usuario.casa=casa
                usuario.put()
                return usuario
            else:
                return None
        else:
            return None

def QuerySala(sala):
    qry = Chat.query(Chat.sala == sala)
    salachat = qry.get()
    if salachat is None:
        salaN = Chat(sala=sala)
        salaN.put();
        return salaN.msgs
    else:
        return salachat.msgs

def NuevoMensaje(sala,user,msg):
    qry = Chat.query(Chat.sala == sala)
    salachat = qry.get()
    if salachat is None:
        return None
    else:
        nuevomsg = Mensaje(msg=msg,user=user)
        salachat.msgs.append(nuevomsg)
        salachat.put()
        return salachat
