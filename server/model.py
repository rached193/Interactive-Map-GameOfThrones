from google.appengine.ext import ndb
import string
import logging


##Informacion del Sistema
class Casa(ndb.Model):
    name = ndb.StringProperty()
    provincia = ndb.StringProperty()
    escudo = ndb.StringProperty()
    plot =  ndb.StringProperty()

class Provincia(ndb.Model):
    clave = ndb.StringProperty()
    nombre = ndb.StringProperty()
    colores = ndb.StringProperty()
    propietario = ndb.StringProperty()

##Informacion de los Usuarios
#Datos personales del usuario
class User(ndb.Model):
    name = ndb.StringProperty()
    email = ndb.StringProperty()
    passw = ndb.StringProperty()
    casa = ndb.StringProperty()
    api = ndb.StringProperty() #Dipositivo Vinculado


#Personaje del Usuario
class UserPj(ndb.Model):
    user = ndb.StringProperty()
    nombre = ndb.StringProperty()
    edad = ndb.IntegerProperty()
    sexo = ndb.StringProperty()
    apariencia = ndb.StringProperty()
    historia = ndb.StringProperty()
    casa = ndb.StringProperty()
    localizacion = ndb.StringProperty()
    validado = ndb.BooleanProperty()

##Informacion de los Mensajes
#Estructura Basica de Mensaje
class Mensaje(ndb.Model):
    msg = ndb.StringProperty()
    user = ndb.StringProperty()
    time = ndb.DateTimeProperty(auto_now_add=True)

class Chat(ndb.Model):
    sala = ndb.StringProperty()
    msgs = ndb.StructuredProperty(Mensaje, repeated=True)
    usuarios = ndb.StringProperty(repeated=True)

class Conversacion(ndb.Model):
    remitente = ndb.StringProperty()
    msg = ndb.StringProperty()
    time = ndb.DateTimeProperty(auto_now_add=True)

class MensajesPrivados(ndb.Model):
    destinatario = ndb.StringProperty()
    msgs = ndb.StructuredProperty(Conversacion, repeated=True)

##Funciones de acceso
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

#Region
def QuerySala(user):
    qrySala = UserPj.query(UserPj.user == user)
    sala = qrySala.get().localizacion
    if sala is None:
        return None
    else:
        qry = Chat.query(Chat.sala == sala)
        salachat = qry.get()
        if salachat is None:
            return None
        else:
            return salachat.msgs

def NuevoMensaje(user,userpj,msg):
    qrySala = UserPj.query(UserPj.user == user)
    sala = qrySala.get().localizacion
    if sala is None:
        return None
    else:
        qry = Chat.query(Chat.sala == sala)
        salachat = qry.get()
        logging.info(salachat)
        if salachat is None:
            return None
        else:
            nuevomsg = Mensaje(msg=msg,user=userpj)
            salachat.msgs.append(nuevomsg)
            salachat.put()
            return salachat

def CambiarRegion(user,region):
    qryUser = UserPj.query(UserPj.user == user)
    personaje = qryUser.get()
    logging.info(user)
    logging.info(personaje)
    if personaje is None:
        return None
    else:
        qrySala = qry = Chat.query(Chat.sala == region)
        sala = qrySala.get()
        logging.info(sala)
        if sala is None:
            return None
        else:
            personaje.localizacion = region
            personaje.put()
            qryUser = User.query(User.user == user)
            user = qryUser.get()
            sala.usuarios.append(user.api)
            sala.put()
            return sala

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
            CambiarRegion(userC.name,"Desembarco")
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
    qryG = qry.get()
    if qryG is None:
        return None
    else:
        return qryG.msgs

def NuevoPrivado(destinatario,remitente,msg):
    qry = UserPj.query(UserPj.casa == destinatario)
    personaje = qry.get()
    if personaje is None:
        return None
    else:
        qry = UserPj.query(UserPj.casa == remitente)
        personaje = qry.get()
        if personaje is None:
            return None
        else:
            qryConver = MensajesPrivados.query(MensajesPrivados.destinatario == destinatario)
            conversacion = qryConver.get()
            if conversacion is None:
                nuevaconver = Conversacion(msg=msg,remitente=remitente)
                nuevomensaje = MensajesPrivados(destinatario=destinatario)
                nuevomensaje.msgs.append(nuevaconver)
                nuevomensaje.put()
                return nuevomensaje
            else:
                nuevaconver = Conversacion(msg=msg,remitente=remitente)
                conversacion.msgs.append(nuevaconver)
                conversacion.put()
                return conversacion

#Notificaciones
def RegistrarDispositivo(user,api):
    qry = User.query(User.name == user)
    usuario = qry.get()
    if usuario is None:
        return None
    else:
        usuario.api = api
        usuario.put()
        return usuario


def FetchDispositivo(user):
    qry = UserPj.query(UserPj.casa == user)
    personaje = qry.get()
    if personaje is None:
        return None
    else:
        qry = User.query(User.name == personaje.user)
        usuario = qry.get()
        if usuario is None:
            return None
        else:
            return usuario.api


def FetchDispositivoRegion(user):
    qrySala = UserPj.query(UserPj.user == user)
    nombreSala = qrySala.get().localizacion
    logging.info(nombreSala)
    if nombreSala is None:
        return None
    else:
        qry = Chat.query(Chat.sala == nombreSala)
        region = qry.get()
        if region is None:
            return None
        else:
            return region.usuarios
