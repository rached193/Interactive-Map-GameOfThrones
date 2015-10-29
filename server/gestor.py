import urllib
from google.appengine.api import urlfetch
import json
import model
import logging



def NotificarPrivado(user):
    header = {"Content-Type": "application/json",
              "Authorization": "Basic OWNhMmFjMzgtNjQ5Zi0xMWU1LWFiY2ItMDdmMjUyNDg2ZjBm"}
    usuario = model.FetchDispositivo(user)
    payload = {"app_id": "9ca2ab98-649f-11e5-abca-9f7581033bb2",
               "include_player_ids": [usuario],
               "contents": {"en": "You have one new message","es":"Tienes un mensaje nuevo"},
               "url": "http://desembarcodeltemplario.appspot.com/#/mensajes"
               }

    #req = requests.post("https://onesignal.com/api/v1/notifications", headers=header, data=json.dumps(payload))
    result = urlfetch.fetch(url="https://onesignal.com/api/v1/notifications",
        payload=json.dumps(payload),
        method=urlfetch.POST,
        headers=header)


    logging.info(result.content)
    logging.info(usuario)



def NotificarChat(sala):
    header = {"Content-Type": "application/json",
              "Authorization": "Basic OWNhMmFjMzgtNjQ5Zi0xMWU1LWFiY2ItMDdmMjUyNDg2ZjBm"}
    usuarios = model.FetchDispositivoRegion(sala)

    usuariosDecode = json.dumps(usuarios)
    r =[ mensaje for mensaje in usuarios ]
    #usuariosDecode=  ["ff61df96-7e54-11e5-a54d-a0369f2d9328","ce185fe0-7e69-11e5-a7f3-a0369f2d9328"]

    logging.info(r)

    payload = {"app_id": "9ca2ab98-649f-11e5-abca-9f7581033bb2",
               "include_player_ids": r,
               "contents": {"en": "News in the region","es":"Hay novedades en la region"},
               "url": "http://desembarcodeltemplario.appspot.com/#/chat"
               }

    #req = requests.post("https://onesignal.com/api/v1/notifications", headers=header, data=json.dumps(payload))
    result = urlfetch.fetch(url="https://onesignal.com/api/v1/notifications",
        payload=json.dumps(payload),
        method=urlfetch.POST,
        headers=header)

    logging.info(result.content)
    logging.info(json.dumps(usuarios))
