import urllib
from google.appengine.api import urlfetch
import json
import model



def Notificar(user):
    header = {"Content-Type": "application/json",
              "Authorization": "Basic OWNhMmFjMzgtNjQ5Zi0xMWU1LWFiY2ItMDdmMjUyNDg2ZjBm"}
    usuario = model.FetchDispositivo(user)
    print "Hola", usuario,user
    payload = {"app_id": "9ca2ab98-649f-11e5-abca-9f7581033bb2",
               "include_player_ids": [usuario],
               "contents": {"en": "Have a new message","es":"Tienes un mensaje nuevo"},
               "url": "http://desembarcodeltemplario.appspot.com/#/casas"
               }

    #req = requests.post("https://onesignal.com/api/v1/notifications", headers=header, data=json.dumps(payload))
    result = urlfetch.fetch(url="https://onesignal.com/api/v1/notifications",
        payload=json.dumps(payload),
        method=urlfetch.POST,
        headers=header)
