from google.appengine.ext import ndb
import string

class Casa(ndb.Model):
    name = ndb.StringProperty()
    provincia = ndb.StringProperty()
    escudo = ndb.StringProperty()
    plot =  ndb.StringProperty()

class User(ndb.Model):
    name = ndb.StringProperty()
    email = ndb.StringProperty()
    passw = ndb.StringProperty()
    casa = ndb.StringProperty()

class Mensaje(ndb.Model):
    msg = ndb.StringProperty()
    user = ndb.StringProperty()
    time = ndb.DateTimeProperty(auto_now_add=True)

class Chat(ndb.Model):
    sala = ndb.StringProperty()
    msgs = ndb.StructuredProperty(Mensaje, repeated=True)

class Conversacion(ndb.Model):
    msg = ndb.StringProperty()
    time = ndb.DateTimeProperty(auto_now_add=True)

class MensajesPrivados(ndb.Model):
    destinatario = ndb.StringProperty()
    remitente = ndb.StringProperty()
    msgs = ndb.StructuredProperty(Conversacion, repeated=True)

class Provincia(ndb.Model):
    clave = ndb.StringProperty()
    nombre = ndb.StringProperty()
    colores = ndb.StringProperty()
    propietario = ndb.StringProperty()

class UserPj(ndb.Model):
    user = ndb.StringProperty()
    nombre = ndb.StringProperty()
    edad = ndb.IntegerProperty()
    sexo = ndb.StringProperty()
    apariencia = ndb.StringProperty()
    historia = ndb.StringProperty()
    casa = ndb.StringProperty()
    validado = ndb.BooleanProperty()

#USUARIOS
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

def AllUsers():
    return User.query()

#CHAT
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

#PERSONAJES
def RegistrarPersonaje(user,nombre,edad,gender,apariencia,historia):
    qry = UserPj.query(UserPj.user == user)
    personaje = qry.get()
    if personaje is None:
        qryC = User.query(User.name == user)
        userC = qryC.get()
        if userC is None:
            return None
        else:
            nuevoPersonaje = UserPj(user=user,nombre=nombre,edad=int(edad),sexo=gender,historia=historia,apariencia=apariencia,casa=userC.casa,validado=False)
            nuevoPersonaje.put()
            return nuevoPersonaje
    else:
        return None

def FechtPersonaje(user):
    qry = UserPj.query(UserPj.user == user)
    personaje = qry.get()
    if personaje is None:
        return None
    else:
        return personaje

def FechtPrivados(user):
    qry = MensajesPrivados.query(MensajesPrivados.destinatario == user)
    privados = qry.get()
    if privados is None:
        return None
    else:
        return privados

def NuevoPrivado(destinatario,remitente,msg):
    qry = UserPj.query(UserPj.user == destinatario)
    personaje = qry.get()
    if personaje is None:
        return None
    else:
        qry = UserPj.query(UserPj.user == remitente)
        personaje = qry.get()
        if personaje is None:
            return None
        else:
            qryConver = MensajesPrivados.query(MensajesPrivados.destinatario == destinatario,MensajesPrivados.remitente == remitente)
            conversacion = qryConver.get()
            if conversacion is None:
                nuevaconver = Conversacion(msg=msg)
                nuevomensaje = MensajesPrivados(destinatario=destinatario,remitente=remitente,msgs=nuevaconver)
                nuevomensaje.put()
                return nuevomensaje
            else:
                nuevaconver = Conversacion(msg=msg)
                conversacion.msg.append(nuevaconver)
                conversacion.put()
                return conversacion

