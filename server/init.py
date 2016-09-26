import model
import json

provinces = ["ah", "arb", "bg", "bi", "bit", "bla", "blu", "boc", "boi", "bos", "bwb", "bwk", "bzb", "cas", "ccp",
             "cid", "cks", "cra", "crk",
             "cw", "dm", "dra", "drm", "dus", "ess", "eyr", "ff", "fgs", "fin", "fmi", "frozen_short", "gde", "gol",
             "gul", "gwk", "gww",
             "har", "hh", "hig", "hrl", "ib", "kar", "kl", "lan", "mc", "mns", "mom", "nns", "north_of_wall",
             "old", "ork", "pyk", "rea", "rfk", "rr", "rws", "san", "sbb", "sea", "sha", "shivering_sea", "si", "sil",
             "ska", "sns", "sod", "sp", "ss",
             "sta", "sto", "sun", "sus", "tar", "tor", "tri", "ts", "twi", "voa", "vr", "wal", "wh", "win", "wss", "yro"
             ]

nombresProvincia = ["Marcaceniza", "El Rejo", "Puerta de la sangre", "Isla del Oso", "El Mordisco", "Refugionegro",
                    "Piedrasviejas",
                    "Bahia de los Cangrejos", "Bahia del Hielo", "Bahia de las focas", "Bahia de Aguasnegras",
                    "Aguasclaras", "Bahia Aguasresplandecientes",
                    "Roca Casterly", "Vallepardo", "La Sidra", "Mar del Ocaso norte", "El Risco", "Altojardin",
                    "La Selva", "Bosquespeso", "Rocadragon", "Marcas de Dorne",
                    "Valleoscuro", "Mar del Verano este", "Nido de aguilas", "Dedo de Pedernal", "Mar de los Dedos",
                    "Comezon de Aguasfrias", "Aguasdulces", "Costa helada",
                    "Torreon Bellota", "Fuerte Desolacion", "Puerto Gaviota", "Gran Wyk", "Atalaya de Aguasgrises",
                    "Harrenhal", "Colina Cuerno", "Tierras Altas",
                    "Harlaw", "Bahia de los hombres del hierro", "Bastion Kar", "Desembarco del Rey", "Roble Viejo",
                    "Foso Cailin", "Mar Angosto central", "Soto Gris",
                    "Mar Angosto norte", "Norte de el Muro", "Antigua", "Viejo Wyk", "Pyke", "Puenteamargo",
                    "Colmillo Dorado", "Arbol de los Cuervos", "Estrecho del Rejo",
                    "Asperon", "Bahia de los naufragios", "Varamar", "Punta Aguda", "Mar de los Escalofrios",
                    "Islas Escudo", "Refugio de Plata", "Skagos",
                    "Mar Angosto sur", "Mar de Dorne", "Salinas", "Nuevo Barril", "Campoestrella",
                    "Bastion de Tromentas", "Lanza del Sol", "Mar del Ocaso sur", "Tarth",
                    "Tor", "Darry", "Ciudadela de Torrhen", "Los Gemelos", "Arcolargo", "Dominio del Cielo", "El Muro",
                    "Puerto Blanco", "Invernalia", "Mar del Verano oeste", "Palosanto"
                    ]

coloresProvincia = ["rgba(255,0,0,1)", "rgba(0,255,9,1)", "rgba(0,239,255,1)", "rgba(222,222,222,1)", "rgba(0,0,0,1)",
                    "rgba(255,255,70  ,1)",
                    "rgba(3,20,255,1)", "rgba(0,0,0,1)", "rgba(0,0,0,1),", "rgba(0,0,0,1)", "rgba(0,0,0,1)",
                    "rgba(51,253,57,1)", "rgba(0,0,0,1)",
                    "rgba(255,28,28,1)", "rgba(183,3,169,1)", "rgba(51,253,57,1)", "rgba(0,0,0,1)", "rgba(230,3,3,1)",
                    "rgba(0,219,7,1)", "rgba(255,255,46,1)", "rgba(212,210,210,1)",
                    "rgba(161,2,150,1)", "rgba(193,193,0,1)", "rgba(155,40,147,1)", "rgba(0,0,0,1)",
                    "rgba(122,247,255,1)", "rgba(201,198,198,1)", "rgba(0,0,0,1)", "rgba(181,251,255,1)",
                    "rgba(94,99,252,1)",
                    "rgba(0,0,0,1)", "rgba(21,36,246,1)", "rgba(210,1,1,1)", "rgba(0,223,239,1)", "rgba(21,111,3,1)",
                    "rgba(183,181,181,1)", "rgba(47,61,255,1)", "rgba(1,201,8,1)", "rgba(20,196,26,1)",
                    "rgba(18,95,2,1)", "rgba(0,0,0,1)", "rgba(169,168,168,1)", "rgba(137,2,128,1)", "rgba(0,255,51,1)",
                    "rgba(155,155,155,1)", "rgba(0,0,0,1)", "rgba(2,202,216,1)", "rgba(0,0,0,1)",
                    "rgba(0,0,0,1)", "rgba(0,169,6,1)", "rgba(14,78,2,1)", "rgba(45,104,33,1)", "rgba(0,154,5,1)",
                    "rgba(255,51,51,1)", "rgba(61,74,255,1)", "rgba(0,0,0,1)", "rgba(255,154,0,1)", "rgba(0,0,0,1)",
                    "rgba(4,17,192,1)", "rgba(226,226,1,1)", "rgba(0,0,0,1)", "rgba(26,151,30,1)", "rgba(255,84,84,1)",
                    "rgba(144,143,143,1)", "rgba(0,0,0,1)", "rgba(0,0,0,1)", "rgba(0,186,199,1)",
                    "rgba(23,198,29,1)", "rgba(255,94,0,1)", "rgba(165,165,1,1)", "rgba(255,133,1,1)", "rgba(0,0,0,1)",
                    "rgba(144,144,0,1)", "rgba(253,117,38,1)", "rgba(22,31,169,1)",
                    "rgba(135,134,134,1)", "rgba(71,76,198,1)", "rgba(1,166,178,1)", "rgba(218,112,6,1)",
                    "rgba(255,255,255,1)", "rgba(111,110,110,1)", "rgba(101,100,100,1)", "rgba(0,0,0,1)",
                    "rgba(255,128,0,1)",
                    ]


def initMap():
    validar = model.Provincia.query()
    if validar.get() is None:
        for index in range(len(provinces)):
            model.NuevaProvincia(provinces[index], coloresProvincia[index], nombresProvincia[index])
            model.NuevaSala(provinces[index])
    return


def initCasas():
    validar = model.Provincia.query()
    if validar.get() is None:
        with open('server/data/casa_info.json') as json_data:
            listado_casas = json.load(json_data)
            for item in listado_casas:
                model.NuevaCasa(item['nombre'], item['provincia'], item['escudo'], item['plot'])
    return
