import urllib

from google.appengine.api import urlfetch
import json



def Notificar():
    header = {"Content-Type": "application/json",
              "Authorization": "Basic OWNhMmFjMzgtNjQ5Zi0xMWU1LWFiY2ItMDdmMjUyNDg2ZjBm"}

    payload = {"app_id": "9ca2ab98-649f-11e5-abca-9f7581033bb2",
               "included_segments": ["All"],
               "contents": {"en": "English Message"}
               }

    #req = requests.post("https://onesignal.com/api/v1/notifications", headers=header, data=json.dumps(payload))
    result = urlfetch.fetch(url="https://onesignal.com/api/v1/notifications",
        payload=json.dumps(payload),
        method=urlfetch.POST,
        headers=header)
