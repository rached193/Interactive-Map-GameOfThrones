from google.appengine.ext import ndb
import string
import logging


##Informacion del Sistema
class Casa(ndb.Model):
    name = ndb.StringProperty()
    provincia = ndb.StringProperty()
    escudo = ndb.StringProperty()
    plot = ndb.StringProperty()


class Provincia(ndb.Model):
    clave = ndb.StringProperty()
    nombre = ndb.StringProperty()
    color = ndb.StringProperty()
    propietario = ndb.StringProperty()
    personajes = ndb.StringProperty(repeated=True)


##Informacion de los Usuarios
# Datos personales del usuario
class User(ndb.Model):
    name = ndb.StringProperty()
    email = ndb.StringProperty()
    passw = ndb.StringProperty()
    casa = ndb.StringProperty()
    api = ndb.StringProperty()  # Dipositivo Vinculado


# Personaje del Usuario
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
# Estructura Basica de Mensaje
class Mensaje(ndb.Model):
    msg = ndb.StringProperty()
    user = ndb.StringProperty()
    time = ndb.DateTimeProperty(auto_now_add=True)


class Chat(ndb.Model):
    sala = ndb.StringProperty()
    msgs = ndb.StructuredProperty(Mensaje, repeated=True)


class Conversacion(ndb.Model):
    remitente = ndb.StringProperty()
    msg = ndb.StringProperty()
    time = ndb.DateTimeProperty(auto_now_add=True)


class MensajesPrivados(ndb.Model):
    destinatario = ndb.StringProperty()
    msgs = ndb.StructuredProperty(Conversacion, repeated=True)


##Funciones de acceso
# USUARIOS
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
        if usuario.passw == passw:
            return usuario
        else:
            return None


def RegistrarCasa(name, casa):
    qry = User.query(User.name == name)
    usuario = qry.get()
    if usuario is None:
        return None
    else:
        qryC = User.query(User.casa == casa)
        existe = qryC.get()
        if existe is None:
            if usuario.casa is None:
                usuario.casa = casa
                usuario.put()
                return usuario
            else:
                return None
        else:
            return None


def AllUsers():
    return User.query()


# Region
def NuevaSala(id):
    sala = Chat(sala=id)
    sala.put()
    return sala


def QuerySala(user):
    qryUser = UserPj.query(UserPj.user == user)
    user = qryUser.get()
    if user is None:
        return None
    else:
        qry = Chat.query(Chat.sala == user.localizacion)
        salachat = qry.get()
        if salachat is None:
            return None
        else:
            return salachat.msgs


def NuevoMensaje(user, userpj, msg):
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
            nuevomsg = Mensaje(msg=msg, user=userpj)
            salachat.msgs.append(nuevomsg)
            salachat.put()
            return salachat


def MoverPersonaje(user, region):
    qryUser = UserPj.query(UserPj.user == user)
    personaje = qryUser.get()
    print personaje
    if personaje is None:
        return None
    else:
        qryProvinciaOrigen = Provincia.query(Provincia.clave == personaje.localizacion)
        provinciaOrigen = qryProvinciaOrigen.get()
        listado = provinciaOrigen.personajes
        listado.remove(user)
        provinciaOrigen.personajes = listado
        provinciaOrigen.put()

        qryProvinciaDestino = Provincia.query(Provincia.clave == region)
        provinciaDestino = qryProvinciaDestino.get()
        provinciaDestino.personajes.append(user)
        provinciaDestino.put()

        personaje.localizacion = region
        personaje.put()
        return personaje


# PERSONAJES
def RegistrarPersonaje(user, nombre, edad, gender, apariencia, historia):
    region = "win"
    qry = UserPj.query(UserPj.user == user)
    personaje = qry.get()
    if personaje is None:
        qryC = User.query(User.name == user)
        userC = qryC.get()
        if userC is None:
            return None
        else:
            nuevoPersonaje = UserPj(user=user, nombre=nombre, edad=int(edad), sexo=gender, historia=historia,
                                    apariencia=apariencia, casa=userC.casa, localizacion=region, validado=False)
            nuevoPersonaje.put()
            qryProvincia = Provincia.query(Provincia.clave == region)
            provincia = qryProvincia.get()
            provincia.personajes.append(user)
            provincia.put()
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


def NuevoPrivado(destinatario, remitente, msg):
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
                nuevaconver = Conversacion(msg=msg, remitente=remitente)
                nuevomensaje = MensajesPrivados(destinatario=destinatario)
                nuevomensaje.msgs.append(nuevaconver)
                nuevomensaje.put()
                return nuevomensaje
            else:
                nuevaconver = Conversacion(msg=msg, remitente=remitente)
                conversacion.msgs.append(nuevaconver)
                conversacion.put()
                return conversacion


# Notificaciones
def RegistrarDispositivo(user, api):
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
    qryUser = UserPj.query(UserPj.user == user)
    provincia = qryUser.get().localizacion
    qry = Provincia.query(Provincia.clave == provincia)
    region = qry.get()
    if region is None:
        return None
    else:
        return region.personajes


# Mapa
def FetchLocalizacion(user):
    qryLocalizacion = UserPj.query(UserPj.user == user)
    nombreProvincia = qryLocalizacion.get().localizacion

    if nombreProvincia is None:
        return None
    else:
        return nombreProvincia


def NuevaProvincia(id, color, nombre):
    qryProvincia = Provincia.query(Provincia.clave == id)
    existeProvincia = qryProvincia.get()
    if existeProvincia is None:
        provincia = Provincia(clave=id, nombre=nombre, color=color)
        provincia.put()
        return provincia
    else:
        return None


def NuevaCasa(nombre, provincia, escudo, plot):
    qryCasa = Casa.query(Casa.name == nombre)
    existeCasa = qryCasa.get()
    if existeCasa is None:
        casa = Casa(name=nombre, provincia=provincia, escudo=escudo, plot=plot)
        casa.put()
        return casa
    else:
        return None


def CargarMapa():
    return Provincia.query()


def CargarCasas():
    return Casa.query()
