const searchCity = async(city, department) => {

    let cities = [{
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "001",
            "ciudad": "MEDELLIN"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "002",
            "ciudad": "ABEJORRAL"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "004",
            "ciudad": "ABRIAQUI"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "021",
            "ciudad": "ALEJANDRIA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "030",
            "ciudad": "AMAGA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "031",
            "ciudad": "AMALFI"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "034",
            "ciudad": "ANDES"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "036",
            "ciudad": "ANGELOPOLIS"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "038",
            "ciudad": "ANGOSTURA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "040",
            "ciudad": "ANORI"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "042",
            "ciudad": "SANTAFE DE ANTIOQUIA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "044",
            "ciudad": "ANZA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "045",
            "ciudad": "APARTADO"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "051",
            "ciudad": "ARBOLETES"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "055",
            "ciudad": "ARGELIA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "059",
            "ciudad": "ARMENIA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "079",
            "ciudad": "BARBOSA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "086",
            "ciudad": "BELMIRA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "088",
            "ciudad": "BELLO"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "091",
            "ciudad": "BETANIA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "093",
            "ciudad": "BETULIA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "101",
            "ciudad": "CIUDAD BOLIVAR"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "107",
            "ciudad": "BRICEÑO"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "113",
            "ciudad": "BURITICA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "120",
            "ciudad": "CACERES"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "125",
            "ciudad": "CAICEDO"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "129",
            "ciudad": "CALDAS"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "134",
            "ciudad": "CAMPAMENTO"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "138",
            "ciudad": "CAÑASGORDAS"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "142",
            "ciudad": "CARACOLI"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "145",
            "ciudad": "CARAMANTA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "147",
            "ciudad": "CAREPA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "148",
            "ciudad": "EL CARMEN DE VIBORAL"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "150",
            "ciudad": "CAROLINA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "154",
            "ciudad": "CAUCASIA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "172",
            "ciudad": "CHIGORODO"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "190",
            "ciudad": "CISNEROS"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "197",
            "ciudad": "COCORNA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "206",
            "ciudad": "CONCEPCION"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "209",
            "ciudad": "CONCORDIA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "212",
            "ciudad": "COPACABANA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "234",
            "ciudad": "DABEIBA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "237",
            "ciudad": "DON MATIAS"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "240",
            "ciudad": "EBEJICO"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "250",
            "ciudad": "EL BAGRE"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "264",
            "ciudad": "ENTRERRIOS"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "266",
            "ciudad": "ENVIGADO"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "282",
            "ciudad": "FREDONIA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "284",
            "ciudad": "FRONTINO"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "306",
            "ciudad": "GIRALDO"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "308",
            "ciudad": "GIRARDOTA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "310",
            "ciudad": "GOMEZ PLATA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "313",
            "ciudad": "GRANADA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "315",
            "ciudad": "GUADALUPE"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "318",
            "ciudad": "GUARNE"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "321",
            "ciudad": "GUATAPE"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "347",
            "ciudad": "HELICONIA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "353",
            "ciudad": "HISPANIA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "360",
            "ciudad": "ITAGUI"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "361",
            "ciudad": "ITUANGO"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "364",
            "ciudad": "JARDIN"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "368",
            "ciudad": "JERICO"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "376",
            "ciudad": "LA CEJA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "380",
            "ciudad": "LA ESTRELLA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "390",
            "ciudad": "LA PINTADA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "400",
            "ciudad": "LA UNION"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "411",
            "ciudad": "LIBORINA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "425",
            "ciudad": "MACEO"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "440",
            "ciudad": "MARINILLA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "467",
            "ciudad": "MONTEBELLO"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "475",
            "ciudad": "MURINDO"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "480",
            "ciudad": "MUTATA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "483",
            "ciudad": "NARIÑO"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "490",
            "ciudad": "NECOCLI"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "495",
            "ciudad": "NECHI"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "501",
            "ciudad": "OLAYA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "541",
            "ciudad": "PEÑOL"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "543",
            "ciudad": "PEQUE"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "576",
            "ciudad": "PUEBLORRICO"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "579",
            "ciudad": "PUERTO BERRIO"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "585",
            "ciudad": "PUERTO NARE"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "591",
            "ciudad": "PUERTO TRIUNFO"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "604",
            "ciudad": "REMEDIOS"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "607",
            "ciudad": "RETIRO"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "615",
            "ciudad": "RIONEGRO"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "628",
            "ciudad": "SABANALARGA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "631",
            "ciudad": "SABANETA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "642",
            "ciudad": "SALGAR"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "647",
            "ciudad": "SAN ANDRES DE CUERQUIA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "649",
            "ciudad": "SAN CARLOS"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "652",
            "ciudad": "SAN FRANCISCO"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "656",
            "ciudad": "SAN JERONIMO"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "658",
            "ciudad": "SAN JOSE DE LA MONTAÑA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "659",
            "ciudad": "SAN JUAN DE URABA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "660",
            "ciudad": "SAN LUIS"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "664",
            "ciudad": "SAN PEDRO"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "665",
            "ciudad": "SAN PEDRO DE URABA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "667",
            "ciudad": "SAN RAFAEL"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "670",
            "ciudad": "SAN ROQUE"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "674",
            "ciudad": "SAN VICENTE"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "679",
            "ciudad": "SANTA BARBARA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "686",
            "ciudad": "SANTA ROSA DE OSOS"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "690",
            "ciudad": "SANTO DOMINGO"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "697",
            "ciudad": "EL SANTUARIO"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "736",
            "ciudad": "SEGOVIA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "756",
            "ciudad": "SONSON"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "761",
            "ciudad": "SOPETRAN"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "789",
            "ciudad": "TAMESIS"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "790",
            "ciudad": "TARAZA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "792",
            "ciudad": "TARSO"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "809",
            "ciudad": "TITIRIBI"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "819",
            "ciudad": "TOLEDO"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "837",
            "ciudad": "TURBO"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "842",
            "ciudad": "URAMITA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "847",
            "ciudad": "URRAO"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "854",
            "ciudad": "VALDIVIA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "856",
            "ciudad": "VALPARAISO"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "858",
            "ciudad": "VEGACHI"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "861",
            "ciudad": "VENECIA"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "873",
            "ciudad": "VIGIA DEL FUERTE"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "885",
            "ciudad": "YALI"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "887",
            "ciudad": "YARUMAL"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "890",
            "ciudad": "YOLOMBO"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "893",
            "ciudad": "YONDO"
        },
        {
            "codigo departamento": "05",
            "departamento": "ANTIOQUIA",
            "codigo": "895",
            "ciudad": "ZARAGOZA"
        },
        {
            "codigo departamento": "08",
            "departamento": "ATLANTICO",
            "codigo": "001",
            "ciudad": "BARRANQUILLA"
        },
        {
            "codigo departamento": "08",
            "departamento": "ATLANTICO",
            "codigo": "078",
            "ciudad": "BARANOA"
        },
        {
            "codigo departamento": "08",
            "departamento": "ATLANTICO",
            "codigo": "137",
            "ciudad": "CAMPO DE LA CRUZ"
        },
        {
            "codigo departamento": "08",
            "departamento": "ATLANTICO",
            "codigo": "141",
            "ciudad": "CANDELARIA"
        },
        {
            "codigo departamento": "08",
            "departamento": "ATLANTICO",
            "codigo": "296",
            "ciudad": "GALAPA"
        },
        {
            "codigo departamento": "08",
            "departamento": "ATLANTICO",
            "codigo": "372",
            "ciudad": "JUAN DE ACOSTA"
        },
        {
            "codigo departamento": "08",
            "departamento": "ATLANTICO",
            "codigo": "421",
            "ciudad": "LURUACO"
        },
        {
            "codigo departamento": "08",
            "departamento": "ATLANTICO",
            "codigo": "433",
            "ciudad": "MALAMBO"
        },
        {
            "codigo departamento": "08",
            "departamento": "ATLANTICO",
            "codigo": "436",
            "ciudad": "MANATI"
        },
        {
            "codigo departamento": "08",
            "departamento": "ATLANTICO",
            "codigo": "520",
            "ciudad": "PALMAR DE VARELA"
        },
        {
            "codigo departamento": "08",
            "departamento": "ATLANTICO",
            "codigo": "549",
            "ciudad": "PIOJO"
        },
        {
            "codigo departamento": "08",
            "departamento": "ATLANTICO",
            "codigo": "558",
            "ciudad": "POLONUEVO"
        },
        {
            "codigo departamento": "08",
            "departamento": "ATLANTICO",
            "codigo": "560",
            "ciudad": "PONEDERA"
        },
        {
            "codigo departamento": "08",
            "departamento": "ATLANTICO",
            "codigo": "573",
            "ciudad": "PUERTO COLOMBIA"
        },
        {
            "codigo departamento": "08",
            "departamento": "ATLANTICO",
            "codigo": "606",
            "ciudad": "REPELON"
        },
        {
            "codigo departamento": "08",
            "departamento": "ATLANTICO",
            "codigo": "634",
            "ciudad": "SABANAGRANDE"
        },
        {
            "codigo departamento": "08",
            "departamento": "ATLANTICO",
            "codigo": "638",
            "ciudad": "SABANALARGA"
        },
        {
            "codigo departamento": "08",
            "departamento": "ATLANTICO",
            "codigo": "675",
            "ciudad": "SANTA LUCIA"
        },
        {
            "codigo departamento": "08",
            "departamento": "ATLANTICO",
            "codigo": "685",
            "ciudad": "SANTO TOMAS"
        },
        {
            "codigo departamento": "08",
            "departamento": "ATLANTICO",
            "codigo": "758",
            "ciudad": "SOLEDAD"
        },
        {
            "codigo departamento": "08",
            "departamento": "ATLANTICO",
            "codigo": "770",
            "ciudad": "SUAN"
        },
        {
            "codigo departamento": "08",
            "departamento": "ATLANTICO",
            "codigo": "832",
            "ciudad": "TUBARA"
        },
        {
            "codigo departamento": "08",
            "departamento": "ATLANTICO",
            "codigo": "849",
            "ciudad": "USIACURI"
        },
        {
            "codigo departamento": "11",
            "departamento": "BOGOTA",
            "codigo": "001",
            "ciudad": "BOGOTA, D.C."
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "001",
            "ciudad": "CARTAGENA"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "006",
            "ciudad": "ACHI"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "030",
            "ciudad": "ALTOS DEL ROSARIO"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "042",
            "ciudad": "ARENAL"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "052",
            "ciudad": "ARJONA"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "062",
            "ciudad": "ARROYOHONDO"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "074",
            "ciudad": "BARRANCO DE LOBA"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "140",
            "ciudad": "CALAMAR"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "160",
            "ciudad": "CANTAGALLO"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "188",
            "ciudad": "CICUCO"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "212",
            "ciudad": "CORDOBA"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "222",
            "ciudad": "CLEMENCIA"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "244",
            "ciudad": "EL CARMEN DE BOLIVAR"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "248",
            "ciudad": "EL GUAMO"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "268",
            "ciudad": "EL PEÑON"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "300",
            "ciudad": "HATILLO DE LOBA"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "430",
            "ciudad": "MAGANGUE"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "433",
            "ciudad": "MAHATES"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "440",
            "ciudad": "MARGARITA"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "442",
            "ciudad": "MARIA LA BAJA"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "458",
            "ciudad": "MONTECRISTO"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "468",
            "ciudad": "MOMPOS"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "490",
            "ciudad": "NOROSI"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "473",
            "ciudad": "MORALES"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "549",
            "ciudad": "PINILLOS"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "580",
            "ciudad": "REGIDOR"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "600",
            "ciudad": "RIO VIEJO"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "620",
            "ciudad": "SAN CRISTOBAL"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "647",
            "ciudad": "SAN ESTANISLAO"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "650",
            "ciudad": "SAN FERNANDO"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "654",
            "ciudad": "SAN JACINTO"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "655",
            "ciudad": "SAN JACINTO DEL CAUCA"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "657",
            "ciudad": "SAN JUAN NEPOMUCENO"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "667",
            "ciudad": "SAN MARTIN DE LOBA"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "670",
            "ciudad": "SAN PABLO"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "673",
            "ciudad": "SANTA CATALINA"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "683",
            "ciudad": "SANTA ROSA"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "688",
            "ciudad": "SANTA ROSA DEL SUR"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "744",
            "ciudad": "SIMITI"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "760",
            "ciudad": "SOPLAVIENTO"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "780",
            "ciudad": "TALAIGUA NUEVO"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "810",
            "ciudad": "TIQUISIO"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "836",
            "ciudad": "TURBACO"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "838",
            "ciudad": "TURBANA"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "873",
            "ciudad": "VILLANUEVA"
        },
        {
            "codigo departamento": "13",
            "departamento": "BOLIVAR",
            "codigo": "894",
            "ciudad": "ZAMBRANO"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "001",
            "ciudad": "TUNJA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "022",
            "ciudad": "ALMEIDA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "047",
            "ciudad": "AQUITANIA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "051",
            "ciudad": "ARCABUCO"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "087",
            "ciudad": "BELEN"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "090",
            "ciudad": "BERBEO"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "092",
            "ciudad": "BETEITIVA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "097",
            "ciudad": "BOAVITA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "104",
            "ciudad": "BOYACA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "106",
            "ciudad": "BRICEÑO"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "109",
            "ciudad": "BUENAVISTA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "114",
            "ciudad": "BUSBANZA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "131",
            "ciudad": "CALDAS"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "135",
            "ciudad": "CAMPOHERMOSO"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "162",
            "ciudad": "CERINZA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "172",
            "ciudad": "CHINAVITA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "176",
            "ciudad": "CHIQUINQUIRA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "180",
            "ciudad": "CHISCAS"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "183",
            "ciudad": "CHITA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "185",
            "ciudad": "CHITARAQUE"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "187",
            "ciudad": "CHIVATA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "189",
            "ciudad": "CIENEGA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "204",
            "ciudad": "COMBITA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "212",
            "ciudad": "COPER"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "215",
            "ciudad": "CORRALES"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "218",
            "ciudad": "COVARACHIA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "223",
            "ciudad": "CUBARA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "224",
            "ciudad": "CUCAITA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "226",
            "ciudad": "CUITIVA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "232",
            "ciudad": "CHIQUIZA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "236",
            "ciudad": "CHIVOR"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "238",
            "ciudad": "DUITAMA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "244",
            "ciudad": "EL COCUY"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "248",
            "ciudad": "EL ESPINO"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "272",
            "ciudad": "FIRAVITOBA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "276",
            "ciudad": "FLORESTA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "293",
            "ciudad": "GACHANTIVA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "296",
            "ciudad": "GAMEZA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "299",
            "ciudad": "GARAGOA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "317",
            "ciudad": "GUACAMAYAS"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "322",
            "ciudad": "GUATEQUE"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "325",
            "ciudad": "GUAYATA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "332",
            "ciudad": "GsICAN"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "362",
            "ciudad": "IZA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "367",
            "ciudad": "JENESANO"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "368",
            "ciudad": "JERICO"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "377",
            "ciudad": "LABRANZAGRANDE"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "380",
            "ciudad": "LA CAPILLA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "401",
            "ciudad": "LA VICTORIA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "403",
            "ciudad": "LA UVITA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "407",
            "ciudad": "VILLA DE LEYVA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "425",
            "ciudad": "MACANAL"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "442",
            "ciudad": "MARIPI"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "455",
            "ciudad": "MIRAFLORES"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "464",
            "ciudad": "MONGUA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "466",
            "ciudad": "MONGUI"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "469",
            "ciudad": "MONIQUIRA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "476",
            "ciudad": "MOTAVITA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "480",
            "ciudad": "MUZO"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "491",
            "ciudad": "NOBSA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "494",
            "ciudad": "NUEVO COLON"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "500",
            "ciudad": "OICATA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "507",
            "ciudad": "OTANCHE"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "511",
            "ciudad": "PACHAVITA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "514",
            "ciudad": "PAEZ"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "516",
            "ciudad": "PAIPA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "518",
            "ciudad": "PAJARITO"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "522",
            "ciudad": "PANQUEBA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "531",
            "ciudad": "PAUNA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "533",
            "ciudad": "PAYA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "537",
            "ciudad": "PAZ DE RIO"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "542",
            "ciudad": "PESCA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "550",
            "ciudad": "PISBA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "572",
            "ciudad": "PUERTO BOYACA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "580",
            "ciudad": "QUIPAMA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "599",
            "ciudad": "RAMIRIQUI"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "600",
            "ciudad": "RAQUIRA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "621",
            "ciudad": "RONDON"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "632",
            "ciudad": "SABOYA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "638",
            "ciudad": "SACHICA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "646",
            "ciudad": "SAMACA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "660",
            "ciudad": "SAN EDUARDO"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "664",
            "ciudad": "SAN JOSE DE PARE"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "667",
            "ciudad": "SAN LUIS DE GACENO"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "673",
            "ciudad": "SAN MATEO"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "676",
            "ciudad": "SAN MIGUEL DE SEMA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "681",
            "ciudad": "SAN PABLO DE BORBUR"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "686",
            "ciudad": "SANTANA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "690",
            "ciudad": "SANTA MARIA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "693",
            "ciudad": "SANTA ROSA DE VITERBO"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "696",
            "ciudad": "SANTA SOFIA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "720",
            "ciudad": "SATIVANORTE"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "723",
            "ciudad": "SATIVASUR"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "740",
            "ciudad": "SIACHOQUE"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "753",
            "ciudad": "SOATA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "755",
            "ciudad": "SOCOTA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "757",
            "ciudad": "SOCHA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "759",
            "ciudad": "SOGAMOSO"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "761",
            "ciudad": "SOMONDOCO"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "762",
            "ciudad": "SORA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "763",
            "ciudad": "SOTAQUIRA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "764",
            "ciudad": "SORACA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "774",
            "ciudad": "SUSACON"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "776",
            "ciudad": "SUTAMARCHAN"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "778",
            "ciudad": "SUTATENZA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "790",
            "ciudad": "TASCO"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "798",
            "ciudad": "TENZA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "804",
            "ciudad": "TIBANA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "806",
            "ciudad": "TIBASOSA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "808",
            "ciudad": "TINJACA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "810",
            "ciudad": "TIPACOQUE"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "814",
            "ciudad": "TOCA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "816",
            "ciudad": "TOGsI"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "820",
            "ciudad": "TOPAGA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "822",
            "ciudad": "TOTA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "832",
            "ciudad": "TUNUNGUA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "835",
            "ciudad": "TURMEQUE"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "837",
            "ciudad": "TUTA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "839",
            "ciudad": "TUTAZA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "842",
            "ciudad": "UMBITA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "861",
            "ciudad": "VENTAQUEMADA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "879",
            "ciudad": "VIRACACHA"
        },
        {
            "codigo departamento": "15",
            "departamento": "BOYACA",
            "codigo": "897",
            "ciudad": "ZETAQUIRA"
        },
        {
            "codigo departamento": "17",
            "departamento": "CALDAS",
            "codigo": "001",
            "ciudad": "MANIZALES"
        },
        {
            "codigo departamento": "17",
            "departamento": "CALDAS",
            "codigo": "013",
            "ciudad": "AGUADAS"
        },
        {
            "codigo departamento": "17",
            "departamento": "CALDAS",
            "codigo": "042",
            "ciudad": "ANSERMA"
        },
        {
            "codigo departamento": "17",
            "departamento": "CALDAS",
            "codigo": "050",
            "ciudad": "ARANZAZU"
        },
        {
            "codigo departamento": "17",
            "departamento": "CALDAS",
            "codigo": "088",
            "ciudad": "BELALCAZAR"
        },
        {
            "codigo departamento": "17",
            "departamento": "CALDAS",
            "codigo": "174",
            "ciudad": "CHINCHINA"
        },
        {
            "codigo departamento": "17",
            "departamento": "CALDAS",
            "codigo": "272",
            "ciudad": "FILADELFIA"
        },
        {
            "codigo departamento": "17",
            "departamento": "CALDAS",
            "codigo": "380",
            "ciudad": "LA DORADA"
        },
        {
            "codigo departamento": "17",
            "departamento": "CALDAS",
            "codigo": "388",
            "ciudad": "LA MERCED"
        },
        {
            "codigo departamento": "17",
            "departamento": "CALDAS",
            "codigo": "433",
            "ciudad": "MANZANARES"
        },
        {
            "codigo departamento": "17",
            "departamento": "CALDAS",
            "codigo": "442",
            "ciudad": "MARMATO"
        },
        {
            "codigo departamento": "17",
            "departamento": "CALDAS",
            "codigo": "444",
            "ciudad": "MARQUETALIA"
        },
        {
            "codigo departamento": "17",
            "departamento": "CALDAS",
            "codigo": "446",
            "ciudad": "MARULANDA"
        },
        {
            "codigo departamento": "17",
            "departamento": "CALDAS",
            "codigo": "486",
            "ciudad": "NEIRA"
        },
        {
            "codigo departamento": "17",
            "departamento": "CALDAS",
            "codigo": "495",
            "ciudad": "NORCASIA"
        },
        {
            "codigo departamento": "17",
            "departamento": "CALDAS",
            "codigo": "513",
            "ciudad": "PACORA"
        },
        {
            "codigo departamento": "17",
            "departamento": "CALDAS",
            "codigo": "524",
            "ciudad": "PALESTINA"
        },
        {
            "codigo departamento": "17",
            "departamento": "CALDAS",
            "codigo": "541",
            "ciudad": "PENSILVANIA"
        },
        {
            "codigo departamento": "17",
            "departamento": "CALDAS",
            "codigo": "614",
            "ciudad": "RIOSUCIO"
        },
        {
            "codigo departamento": "17",
            "departamento": "CALDAS",
            "codigo": "616",
            "ciudad": "RISARALDA"
        },
        {
            "codigo departamento": "17",
            "departamento": "CALDAS",
            "codigo": "653",
            "ciudad": "SALAMINA"
        },
        {
            "codigo departamento": "17",
            "departamento": "CALDAS",
            "codigo": "662",
            "ciudad": "SAMANA"
        },
        {
            "codigo departamento": "17",
            "departamento": "CALDAS",
            "codigo": "665",
            "ciudad": "SAN JOSE"
        },
        {
            "codigo departamento": "17",
            "departamento": "CALDAS",
            "codigo": "777",
            "ciudad": "SUPIA"
        },
        {
            "codigo departamento": "17",
            "departamento": "CALDAS",
            "codigo": "867",
            "ciudad": "VICTORIA"
        },
        {
            "codigo departamento": "17",
            "departamento": "CALDAS",
            "codigo": "873",
            "ciudad": "VILLAMARIA"
        },
        {
            "codigo departamento": "17",
            "departamento": "CALDAS",
            "codigo": "877",
            "ciudad": "VITERBO"
        },
        {
            "codigo departamento": "18",
            "departamento": "CAQUETA",
            "codigo": "001",
            "ciudad": "FLORENCIA"
        },
        {
            "codigo departamento": "18",
            "departamento": "CAQUETA",
            "codigo": "029",
            "ciudad": "ALBANIA"
        },
        {
            "codigo departamento": "18",
            "departamento": "CAQUETA",
            "codigo": "094",
            "ciudad": "BELEN DE LOS ANDAQUIES"
        },
        {
            "codigo departamento": "18",
            "departamento": "CAQUETA",
            "codigo": "150",
            "ciudad": "CARTAGENA DEL CHAIRA"
        },
        {
            "codigo departamento": "18",
            "departamento": "CAQUETA",
            "codigo": "205",
            "ciudad": "CURILLO"
        },
        {
            "codigo departamento": "18",
            "departamento": "CAQUETA",
            "codigo": "247",
            "ciudad": "EL DONCELLO"
        },
        {
            "codigo departamento": "18",
            "departamento": "CAQUETA",
            "codigo": "256",
            "ciudad": "EL PAUJIL"
        },
        {
            "codigo departamento": "18",
            "departamento": "CAQUETA",
            "codigo": "410",
            "ciudad": "LA MONTAÑITA"
        },
        {
            "codigo departamento": "18",
            "departamento": "CAQUETA",
            "codigo": "460",
            "ciudad": "MILAN"
        },
        {
            "codigo departamento": "18",
            "departamento": "CAQUETA",
            "codigo": "479",
            "ciudad": "MORELIA"
        },
        {
            "codigo departamento": "18",
            "departamento": "CAQUETA",
            "codigo": "592",
            "ciudad": "PUERTO RICO"
        },
        {
            "codigo departamento": "18",
            "departamento": "CAQUETA",
            "codigo": "610",
            "ciudad": "SAN JOSE DEL FRAGUA"
        },
        {
            "codigo departamento": "18",
            "departamento": "CAQUETA",
            "codigo": "753",
            "ciudad": "SAN VICENTE DEL CAGUAN"
        },
        {
            "codigo departamento": "18",
            "departamento": "CAQUETA",
            "codigo": "756",
            "ciudad": "SOLANO"
        },
        {
            "codigo departamento": "18",
            "departamento": "CAQUETA",
            "codigo": "785",
            "ciudad": "SOLITA"
        },
        {
            "codigo departamento": "18",
            "departamento": "CAQUETA",
            "codigo": "860",
            "ciudad": "VALPARAISO"
        },
        {
            "codigo departamento": "19",
            "departamento": "CAUCA",
            "codigo": "001",
            "ciudad": "POPAYAN"
        },
        {
            "codigo departamento": "19",
            "departamento": "CAUCA",
            "codigo": "022",
            "ciudad": "ALMAGUER"
        },
        {
            "codigo departamento": "19",
            "departamento": "CAUCA",
            "codigo": "050",
            "ciudad": "ARGELIA"
        },
        {
            "codigo departamento": "19",
            "departamento": "CAUCA",
            "codigo": "075",
            "ciudad": "BALBOA"
        },
        {
            "codigo departamento": "19",
            "departamento": "CAUCA",
            "codigo": "100",
            "ciudad": "BOLIVAR"
        },
        {
            "codigo departamento": "19",
            "departamento": "CAUCA",
            "codigo": "110",
            "ciudad": "BUENOS AIRES"
        },
        {
            "codigo departamento": "19",
            "departamento": "CAUCA",
            "codigo": "130",
            "ciudad": "CAJIBIO"
        },
        {
            "codigo departamento": "19",
            "departamento": "CAUCA",
            "codigo": "137",
            "ciudad": "CALDONO"
        },
        {
            "codigo departamento": "19",
            "departamento": "CAUCA",
            "codigo": "142",
            "ciudad": "CALOTO"
        },
        {
            "codigo departamento": "19",
            "departamento": "CAUCA",
            "codigo": "212",
            "ciudad": "CORINTO"
        },
        {
            "codigo departamento": "19",
            "departamento": "CAUCA",
            "codigo": "256",
            "ciudad": "EL TAMBO"
        },
        {
            "codigo departamento": "19",
            "departamento": "CAUCA",
            "codigo": "290",
            "ciudad": "FLORENCIA"
        },
        {
            "codigo departamento": "19",
            "departamento": "CAUCA",
            "codigo": "300",
            "ciudad": "GUACHENE"
        },
        {
            "codigo departamento": "19",
            "departamento": "CAUCA",
            "codigo": "318",
            "ciudad": "GUAPI"
        },
        {
            "codigo departamento": "19",
            "departamento": "CAUCA",
            "codigo": "355",
            "ciudad": "INZA"
        },
        {
            "codigo departamento": "19",
            "departamento": "CAUCA",
            "codigo": "364",
            "ciudad": "JAMBALO"
        },
        {
            "codigo departamento": "19",
            "departamento": "CAUCA",
            "codigo": "392",
            "ciudad": "LA SIERRA"
        },
        {
            "codigo departamento": "19",
            "departamento": "CAUCA",
            "codigo": "397",
            "ciudad": "LA VEGA"
        },
        {
            "codigo departamento": "19",
            "departamento": "CAUCA",
            "codigo": "418",
            "ciudad": "LOPEZ"
        },
        {
            "codigo departamento": "19",
            "departamento": "CAUCA",
            "codigo": "450",
            "ciudad": "MERCADERES"
        },
        {
            "codigo departamento": "19",
            "departamento": "CAUCA",
            "codigo": "455",
            "ciudad": "MIRANDA"
        },
        {
            "codigo departamento": "19",
            "departamento": "CAUCA",
            "codigo": "473",
            "ciudad": "MORALES"
        },
        {
            "codigo departamento": "19",
            "departamento": "CAUCA",
            "codigo": "513",
            "ciudad": "PADILLA"
        },
        {
            "codigo departamento": "19",
            "departamento": "CAUCA",
            "codigo": "517",
            "ciudad": "PAEZ"
        },
        {
            "codigo departamento": "19",
            "departamento": "CAUCA",
            "codigo": "532",
            "ciudad": "PATIA"
        },
        {
            "codigo departamento": "19",
            "departamento": "CAUCA",
            "codigo": "533",
            "ciudad": "PIAMONTE"
        },
        {
            "codigo departamento": "19",
            "departamento": "CAUCA",
            "codigo": "548",
            "ciudad": "PIENDAMO"
        },
        {
            "codigo departamento": "19",
            "departamento": "CAUCA",
            "codigo": "573",
            "ciudad": "PUERTO TEJADA"
        },
        {
            "codigo departamento": "19",
            "departamento": "CAUCA",
            "codigo": "585",
            "ciudad": "PURACE"
        },
        {
            "codigo departamento": "19",
            "departamento": "CAUCA",
            "codigo": "622",
            "ciudad": "ROSAS"
        },
        {
            "codigo departamento": "19",
            "departamento": "CAUCA",
            "codigo": "693",
            "ciudad": "SAN SEBASTIAN"
        },
        {
            "codigo departamento": "19",
            "departamento": "CAUCA",
            "codigo": "698",
            "ciudad": "SANTANDER DE QUILICHAO"
        },
        {
            "codigo departamento": "19",
            "departamento": "CAUCA",
            "codigo": "701",
            "ciudad": "SANTA ROSA"
        },
        {
            "codigo departamento": "19",
            "departamento": "CAUCA",
            "codigo": "743",
            "ciudad": "SILVIA"
        },
        {
            "codigo departamento": "19",
            "departamento": "CAUCA",
            "codigo": "760",
            "ciudad": "SOTARA"
        },
        {
            "codigo departamento": "19",
            "departamento": "CAUCA",
            "codigo": "780",
            "ciudad": "SUAREZ"
        },
        {
            "codigo departamento": "19",
            "departamento": "CAUCA",
            "codigo": "785",
            "ciudad": "SUCRE"
        },
        {
            "codigo departamento": "19",
            "departamento": "CAUCA",
            "codigo": "807",
            "ciudad": "TIMBIO"
        },
        {
            "codigo departamento": "19",
            "departamento": "CAUCA",
            "codigo": "809",
            "ciudad": "TIMBIQUI"
        },
        {
            "codigo departamento": "19",
            "departamento": "CAUCA",
            "codigo": "821",
            "ciudad": "TORIBIO"
        },
        {
            "codigo departamento": "19",
            "departamento": "CAUCA",
            "codigo": "824",
            "ciudad": "TOTORO"
        },
        {
            "codigo departamento": "19",
            "departamento": "CAUCA",
            "codigo": "845",
            "ciudad": "VILLA RICA"
        },
        {
            "codigo departamento": "20",
            "departamento": "CESAR",
            "codigo": "001",
            "ciudad": "VALLEDUPAR"
        },
        {
            "codigo departamento": "20",
            "departamento": "CESAR",
            "codigo": "011",
            "ciudad": "AGUACHICA"
        },
        {
            "codigo departamento": "20",
            "departamento": "CESAR",
            "codigo": "013",
            "ciudad": "AGUSTIN CODAZZI"
        },
        {
            "codigo departamento": "20",
            "departamento": "CESAR",
            "codigo": "032",
            "ciudad": "ASTREA"
        },
        {
            "codigo departamento": "20",
            "departamento": "CESAR",
            "codigo": "045",
            "ciudad": "BECERRIL"
        },
        {
            "codigo departamento": "20",
            "departamento": "CESAR",
            "codigo": "060",
            "ciudad": "BOSCONIA"
        },
        {
            "codigo departamento": "20",
            "departamento": "CESAR",
            "codigo": "175",
            "ciudad": "CHIMICHAGUA"
        },
        {
            "codigo departamento": "20",
            "departamento": "CESAR",
            "codigo": "178",
            "ciudad": "CHIRIGUANA"
        },
        {
            "codigo departamento": "20",
            "departamento": "CESAR",
            "codigo": "228",
            "ciudad": "CURUMANI"
        },
        {
            "codigo departamento": "20",
            "departamento": "CESAR",
            "codigo": "238",
            "ciudad": "EL COPEY"
        },
        {
            "codigo departamento": "20",
            "departamento": "CESAR",
            "codigo": "250",
            "ciudad": "EL PASO"
        },
        {
            "codigo departamento": "20",
            "departamento": "CESAR",
            "codigo": "295",
            "ciudad": "GAMARRA"
        },
        {
            "codigo departamento": "20",
            "departamento": "CESAR",
            "codigo": "310",
            "ciudad": "GONZALEZ"
        },
        {
            "codigo departamento": "20",
            "departamento": "CESAR",
            "codigo": "383",
            "ciudad": "LA GLORIA"
        },
        {
            "codigo departamento": "20",
            "departamento": "CESAR",
            "codigo": "400",
            "ciudad": "LA JAGUA DE IBIRICO"
        },
        {
            "codigo departamento": "20",
            "departamento": "CESAR",
            "codigo": "443",
            "ciudad": "MANAURE"
        },
        {
            "codigo departamento": "20",
            "departamento": "CESAR",
            "codigo": "517",
            "ciudad": "PAILITAS"
        },
        {
            "codigo departamento": "20",
            "departamento": "CESAR",
            "codigo": "550",
            "ciudad": "PELAYA"
        },
        {
            "codigo departamento": "20",
            "departamento": "CESAR",
            "codigo": "570",
            "ciudad": "PUEBLO BELLO"
        },
        {
            "codigo departamento": "20",
            "departamento": "CESAR",
            "codigo": "614",
            "ciudad": "RIO DE ORO"
        },
        {
            "codigo departamento": "20",
            "departamento": "CESAR",
            "codigo": "621",
            "ciudad": "LA PAZ"
        },
        {
            "codigo departamento": "20",
            "departamento": "CESAR",
            "codigo": "710",
            "ciudad": "SAN ALBERTO"
        },
        {
            "codigo departamento": "20",
            "departamento": "CESAR",
            "codigo": "750",
            "ciudad": "SAN DIEGO"
        },
        {
            "codigo departamento": "20",
            "departamento": "CESAR",
            "codigo": "770",
            "ciudad": "SAN MARTIN"
        },
        {
            "codigo departamento": "20",
            "departamento": "CESAR",
            "codigo": "787",
            "ciudad": "TAMALAMEQUE"
        },
        {
            "codigo departamento": "23",
            "departamento": "CORDOBA",
            "codigo": "001",
            "ciudad": "MONTERIA"
        },
        {
            "codigo departamento": "23",
            "departamento": "CORDOBA",
            "codigo": "068",
            "ciudad": "AYAPEL"
        },
        {
            "codigo departamento": "23",
            "departamento": "CORDOBA",
            "codigo": "079",
            "ciudad": "BUENAVISTA"
        },
        {
            "codigo departamento": "23",
            "departamento": "CORDOBA",
            "codigo": "090",
            "ciudad": "CANALETE"
        },
        {
            "codigo departamento": "23",
            "departamento": "CORDOBA",
            "codigo": "162",
            "ciudad": "CERETE"
        },
        {
            "codigo departamento": "23",
            "departamento": "CORDOBA",
            "codigo": "168",
            "ciudad": "CHIMA"
        },
        {
            "codigo departamento": "23",
            "departamento": "CORDOBA",
            "codigo": "182",
            "ciudad": "CHINU"
        },
        {
            "codigo departamento": "23",
            "departamento": "CORDOBA",
            "codigo": "189",
            "ciudad": "CIENAGA DE ORO"
        },
        {
            "codigo departamento": "23",
            "departamento": "CORDOBA",
            "codigo": "300",
            "ciudad": "COTORRA"
        },
        {
            "codigo departamento": "23",
            "departamento": "CORDOBA",
            "codigo": "350",
            "ciudad": "LA APARTADA"
        },
        {
            "codigo departamento": "23",
            "departamento": "CORDOBA",
            "codigo": "417",
            "ciudad": "LORICA"
        },
        {
            "codigo departamento": "23",
            "departamento": "CORDOBA",
            "codigo": "419",
            "ciudad": "LOS CORDOBAS"
        },
        {
            "codigo departamento": "23",
            "departamento": "CORDOBA",
            "codigo": "464",
            "ciudad": "MOMIL"
        },
        {
            "codigo departamento": "23",
            "departamento": "CORDOBA",
            "codigo": "466",
            "ciudad": "MONTELIBANO"
        },
        {
            "codigo departamento": "23",
            "departamento": "CORDOBA",
            "codigo": "500",
            "ciudad": "MOÑITOS"
        },
        {
            "codigo departamento": "23",
            "departamento": "CORDOBA",
            "codigo": "555",
            "ciudad": "PLANETA RICA"
        },
        {
            "codigo departamento": "23",
            "departamento": "CORDOBA",
            "codigo": "570",
            "ciudad": "PUEBLO NUEVO"
        },
        {
            "codigo departamento": "23",
            "departamento": "CORDOBA",
            "codigo": "574",
            "ciudad": "PUERTO ESCONDIDO"
        },
        {
            "codigo departamento": "23",
            "departamento": "CORDOBA",
            "codigo": "580",
            "ciudad": "PUERTO LIBERTADOR"
        },
        {
            "codigo departamento": "23",
            "departamento": "CORDOBA",
            "codigo": "586",
            "ciudad": "PURISIMA"
        },
        {
            "codigo departamento": "23",
            "departamento": "CORDOBA",
            "codigo": "660",
            "ciudad": "SAHAGUN"
        },
        {
            "codigo departamento": "23",
            "departamento": "CORDOBA",
            "codigo": "670",
            "ciudad": "SAN ANDRES SOTAVENTO"
        },
        {
            "codigo departamento": "23",
            "departamento": "CORDOBA",
            "codigo": "672",
            "ciudad": "SAN ANTERO"
        },
        {
            "codigo departamento": "23",
            "departamento": "CORDOBA",
            "codigo": "675",
            "ciudad": "SAN BERNARDO DEL VIENTO"
        },
        {
            "codigo departamento": "23",
            "departamento": "CORDOBA",
            "codigo": "678",
            "ciudad": "SAN CARLOS"
        },
        {
            "codigo departamento": "23",
            "departamento": "CORDOBA",
            "codigo": "686",
            "ciudad": "SAN PELAYO"
        },
        {
            "codigo departamento": "23",
            "departamento": "CORDOBA",
            "codigo": "807",
            "ciudad": "TIERRALTA"
        },
        {
            "codigo departamento": "23",
            "departamento": "CORDOBA",
            "codigo": "855",
            "ciudad": "VALENCIA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "001",
            "ciudad": "AGUA DE DIOS"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "019",
            "ciudad": "ALBAN"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "035",
            "ciudad": "ANAPOIMA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "040",
            "ciudad": "ANOLAIMA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "053",
            "ciudad": "ARBELAEZ"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "086",
            "ciudad": "BELTRAN"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "095",
            "ciudad": "BITUIMA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "099",
            "ciudad": "BOJACA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "120",
            "ciudad": "CABRERA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "123",
            "ciudad": "CACHIPAY"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "126",
            "ciudad": "CAJICA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "148",
            "ciudad": "CAPARRAPI"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "151",
            "ciudad": "CAQUEZA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "154",
            "ciudad": "CARMEN DE CARUPA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "168",
            "ciudad": "CHAGUANI"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "175",
            "ciudad": "CHIA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "178",
            "ciudad": "CHIPAQUE"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "181",
            "ciudad": "CHOACHI"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "183",
            "ciudad": "CHOCONTA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "200",
            "ciudad": "COGUA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "214",
            "ciudad": "COTA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "224",
            "ciudad": "CUCUNUBA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "245",
            "ciudad": "EL COLEGIO"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "258",
            "ciudad": "EL PEÑON"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "260",
            "ciudad": "EL ROSAL"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "269",
            "ciudad": "FACATATIVA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "279",
            "ciudad": "FOMEQUE"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "281",
            "ciudad": "FOSCA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "286",
            "ciudad": "FUNZA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "288",
            "ciudad": "FUQUENE"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "290",
            "ciudad": "FUSAGASUGA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "293",
            "ciudad": "GACHALA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "295",
            "ciudad": "GACHANCIPA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "297",
            "ciudad": "GACHETA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "299",
            "ciudad": "GAMA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "307",
            "ciudad": "GIRARDOT"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "312",
            "ciudad": "GRANADA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "317",
            "ciudad": "GUACHETA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "320",
            "ciudad": "GUADUAS"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "322",
            "ciudad": "GUASCA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "324",
            "ciudad": "GUATAQUI"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "326",
            "ciudad": "GUATAVITA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "328",
            "ciudad": "GUAYABAL DE SIQUIMA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "335",
            "ciudad": "GUAYABETAL"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "339",
            "ciudad": "GUTIERREZ"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "368",
            "ciudad": "JERUSALEN"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "372",
            "ciudad": "JUNIN"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "377",
            "ciudad": "LA CALERA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "386",
            "ciudad": "LA MESA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "394",
            "ciudad": "LA PALMA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "398",
            "ciudad": "LA PEÑA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "402",
            "ciudad": "LA VEGA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "407",
            "ciudad": "LENGUAZAQUE"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "426",
            "ciudad": "MACHETA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "430",
            "ciudad": "MADRID"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "436",
            "ciudad": "MANTA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "438",
            "ciudad": "MEDINA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "473",
            "ciudad": "MOSQUERA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "483",
            "ciudad": "NARIÑO"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "486",
            "ciudad": "NEMOCON"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "488",
            "ciudad": "NILO"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "489",
            "ciudad": "NIMAIMA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "491",
            "ciudad": "NOCAIMA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "506",
            "ciudad": "VENECIA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "513",
            "ciudad": "PACHO"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "518",
            "ciudad": "PAIME"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "524",
            "ciudad": "PANDI"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "530",
            "ciudad": "PARATEBUENO"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "535",
            "ciudad": "PASCA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "572",
            "ciudad": "PUERTO SALGAR"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "580",
            "ciudad": "PULI"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "592",
            "ciudad": "QUEBRADANEGRA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "594",
            "ciudad": "QUETAME"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "596",
            "ciudad": "QUIPILE"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "599",
            "ciudad": "APULO"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "612",
            "ciudad": "RICAURTE"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "645",
            "ciudad": "SAN ANTONIO DEL TEQUENDAMA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "649",
            "ciudad": "SAN BERNARDO"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "653",
            "ciudad": "SAN CAYETANO"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "658",
            "ciudad": "SAN FRANCISCO"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "662",
            "ciudad": "SAN JUAN DE RIO SECO"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "718",
            "ciudad": "SASAIMA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "736",
            "ciudad": "SESQUILE"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "740",
            "ciudad": "SIBATE"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "743",
            "ciudad": "SILVANIA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "745",
            "ciudad": "SIMIJACA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "754",
            "ciudad": "SOACHA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "758",
            "ciudad": "SOPO"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "769",
            "ciudad": "SUBACHOQUE"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "772",
            "ciudad": "SUESCA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "777",
            "ciudad": "SUPATA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "779",
            "ciudad": "SUSA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "781",
            "ciudad": "SUTATAUSA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "785",
            "ciudad": "TABIO"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "793",
            "ciudad": "TAUSA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "797",
            "ciudad": "TENA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "799",
            "ciudad": "TENJO"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "805",
            "ciudad": "TIBACUY"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "807",
            "ciudad": "TIBIRITA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "815",
            "ciudad": "TOCAIMA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "817",
            "ciudad": "TOCANCIPA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "823",
            "ciudad": "TOPAIPI"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "839",
            "ciudad": "UBALA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "841",
            "ciudad": "UBAQUE"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "843",
            "ciudad": "VILLA DE SAN DIEGO DE UBATE"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "845",
            "ciudad": "UNE"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "851",
            "ciudad": "UTICA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "862",
            "ciudad": "VERGARA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "867",
            "ciudad": "VIANI"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "871",
            "ciudad": "VILLAGOMEZ"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "873",
            "ciudad": "VILLAPINZON"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "875",
            "ciudad": "VILLETA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "878",
            "ciudad": "VIOTA"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "885",
            "ciudad": "YACOPI"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "898",
            "ciudad": "ZIPACON"
        },
        {
            "codigo departamento": "25",
            "departamento": "CUNDINAMARCA",
            "codigo": "899",
            "ciudad": "ZIPAQUIRA"
        },
        {
            "codigo departamento": "27",
            "departamento": "CHOCO",
            "codigo": "001",
            "ciudad": "QUIBDO"
        },
        {
            "codigo departamento": "27",
            "departamento": "CHOCO",
            "codigo": "006",
            "ciudad": "ACANDI"
        },
        {
            "codigo departamento": "27",
            "departamento": "CHOCO",
            "codigo": "025",
            "ciudad": "ALTO BAUDO"
        },
        {
            "codigo departamento": "27",
            "departamento": "CHOCO",
            "codigo": "050",
            "ciudad": "ATRATO"
        },
        {
            "codigo departamento": "27",
            "departamento": "CHOCO",
            "codigo": "073",
            "ciudad": "BAGADO"
        },
        {
            "codigo departamento": "27",
            "departamento": "CHOCO",
            "codigo": "075",
            "ciudad": "BAHIA SOLANO"
        },
        {
            "codigo departamento": "27",
            "departamento": "CHOCO",
            "codigo": "077",
            "ciudad": "BAJO BAUDO"
        },
        {
            "codigo departamento": "27",
            "departamento": "CHOCO",
            "codigo": "099",
            "ciudad": "BOJAYA"
        },
        {
            "codigo departamento": "27",
            "departamento": "CHOCO",
            "codigo": "135",
            "ciudad": "EL CANTON DEL SAN PABLO"
        },
        {
            "codigo departamento": "27",
            "departamento": "CHOCO",
            "codigo": "150",
            "ciudad": "CARMEN DEL DARIEN"
        },
        {
            "codigo departamento": "27",
            "departamento": "CHOCO",
            "codigo": "160",
            "ciudad": "CERTEGUI"
        },
        {
            "codigo departamento": "27",
            "departamento": "CHOCO",
            "codigo": "205",
            "ciudad": "CONDOTO"
        },
        {
            "codigo departamento": "27",
            "departamento": "CHOCO",
            "codigo": "245",
            "ciudad": "EL CARMEN DE ATRATO"
        },
        {
            "codigo departamento": "27",
            "departamento": "CHOCO",
            "codigo": "250",
            "ciudad": "EL LITORAL DEL SAN JUAN"
        },
        {
            "codigo departamento": "27",
            "departamento": "CHOCO",
            "codigo": "361",
            "ciudad": "ISTMINA"
        },
        {
            "codigo departamento": "27",
            "departamento": "CHOCO",
            "codigo": "372",
            "ciudad": "JURADO"
        },
        {
            "codigo departamento": "27",
            "departamento": "CHOCO",
            "codigo": "413",
            "ciudad": "LLORO"
        },
        {
            "codigo departamento": "27",
            "departamento": "CHOCO",
            "codigo": "425",
            "ciudad": "MEDIO ATRATO"
        },
        {
            "codigo departamento": "27",
            "departamento": "CHOCO",
            "codigo": "430",
            "ciudad": "MEDIO BAUDO"
        },
        {
            "codigo departamento": "27",
            "departamento": "CHOCO",
            "codigo": "450",
            "ciudad": "MEDIO SAN JUAN"
        },
        {
            "codigo departamento": "27",
            "departamento": "CHOCO",
            "codigo": "491",
            "ciudad": "NOVITA"
        },
        {
            "codigo departamento": "27",
            "departamento": "CHOCO",
            "codigo": "495",
            "ciudad": "NUQUI"
        },
        {
            "codigo departamento": "27",
            "departamento": "CHOCO",
            "codigo": "580",
            "ciudad": "RIO IRO"
        },
        {
            "codigo departamento": "27",
            "departamento": "CHOCO",
            "codigo": "600",
            "ciudad": "RIO QUITO"
        },
        {
            "codigo departamento": "27",
            "departamento": "CHOCO",
            "codigo": "615",
            "ciudad": "RIOSUCIO"
        },
        {
            "codigo departamento": "27",
            "departamento": "CHOCO",
            "codigo": "660",
            "ciudad": "SAN JOSE DEL PALMAR"
        },
        {
            "codigo departamento": "27",
            "departamento": "CHOCO",
            "codigo": "745",
            "ciudad": "SIPI"
        },
        {
            "codigo departamento": "27",
            "departamento": "CHOCO",
            "codigo": "787",
            "ciudad": "TADO"
        },
        {
            "codigo departamento": "27",
            "departamento": "CHOCO",
            "codigo": "800",
            "ciudad": "UNGUIA"
        },
        {
            "codigo departamento": "27",
            "departamento": "CHOCO",
            "codigo": "810",
            "ciudad": "UNION PANAMERICANA"
        },
        {
            "codigo departamento": "41",
            "departamento": "HUILA",
            "codigo": "001",
            "ciudad": "NEIVA"
        },
        {
            "codigo departamento": "41",
            "departamento": "HUILA",
            "codigo": "006",
            "ciudad": "ACEVEDO"
        },
        {
            "codigo departamento": "41",
            "departamento": "HUILA",
            "codigo": "013",
            "ciudad": "AGRADO"
        },
        {
            "codigo departamento": "41",
            "departamento": "HUILA",
            "codigo": "016",
            "ciudad": "AIPE"
        },
        {
            "codigo departamento": "41",
            "departamento": "HUILA",
            "codigo": "020",
            "ciudad": "ALGECIRAS"
        },
        {
            "codigo departamento": "41",
            "departamento": "HUILA",
            "codigo": "026",
            "ciudad": "ALTAMIRA"
        },
        {
            "codigo departamento": "41",
            "departamento": "HUILA",
            "codigo": "078",
            "ciudad": "BARAYA"
        },
        {
            "codigo departamento": "41",
            "departamento": "HUILA",
            "codigo": "132",
            "ciudad": "CAMPOALEGRE"
        },
        {
            "codigo departamento": "41",
            "departamento": "HUILA",
            "codigo": "206",
            "ciudad": "COLOMBIA"
        },
        {
            "codigo departamento": "41",
            "departamento": "HUILA",
            "codigo": "244",
            "ciudad": "ELIAS"
        },
        {
            "codigo departamento": "41",
            "departamento": "HUILA",
            "codigo": "298",
            "ciudad": "GARZON"
        },
        {
            "codigo departamento": "41",
            "departamento": "HUILA",
            "codigo": "306",
            "ciudad": "GIGANTE"
        },
        {
            "codigo departamento": "41",
            "departamento": "HUILA",
            "codigo": "319",
            "ciudad": "GUADALUPE"
        },
        {
            "codigo departamento": "41",
            "departamento": "HUILA",
            "codigo": "349",
            "ciudad": "HOBO"
        },
        {
            "codigo departamento": "41",
            "departamento": "HUILA",
            "codigo": "357",
            "ciudad": "IQUIRA"
        },
        {
            "codigo departamento": "41",
            "departamento": "HUILA",
            "codigo": "359",
            "ciudad": "ISNOS"
        },
        {
            "codigo departamento": "41",
            "departamento": "HUILA",
            "codigo": "378",
            "ciudad": "LA ARGENTINA"
        },
        {
            "codigo departamento": "41",
            "departamento": "HUILA",
            "codigo": "396",
            "ciudad": "LA PLATA"
        },
        {
            "codigo departamento": "41",
            "departamento": "HUILA",
            "codigo": "483",
            "ciudad": "NATAGA"
        },
        {
            "codigo departamento": "41",
            "departamento": "HUILA",
            "codigo": "503",
            "ciudad": "OPORAPA"
        },
        {
            "codigo departamento": "41",
            "departamento": "HUILA",
            "codigo": "518",
            "ciudad": "PAICOL"
        },
        {
            "codigo departamento": "41",
            "departamento": "HUILA",
            "codigo": "524",
            "ciudad": "PALERMO"
        },
        {
            "codigo departamento": "41",
            "departamento": "HUILA",
            "codigo": "530",
            "ciudad": "PALESTINA"
        },
        {
            "codigo departamento": "41",
            "departamento": "HUILA",
            "codigo": "548",
            "ciudad": "PITAL"
        },
        {
            "codigo departamento": "41",
            "departamento": "HUILA",
            "codigo": "551",
            "ciudad": "PITALITO"
        },
        {
            "codigo departamento": "41",
            "departamento": "HUILA",
            "codigo": "615",
            "ciudad": "RIVERA"
        },
        {
            "codigo departamento": "41",
            "departamento": "HUILA",
            "codigo": "660",
            "ciudad": "SALADOBLANCO"
        },
        {
            "codigo departamento": "41",
            "departamento": "HUILA",
            "codigo": "668",
            "ciudad": "SAN AGUSTIN"
        },
        {
            "codigo departamento": "41",
            "departamento": "HUILA",
            "codigo": "676",
            "ciudad": "SANTA MARIA"
        },
        {
            "codigo departamento": "41",
            "departamento": "HUILA",
            "codigo": "770",
            "ciudad": "SUAZA"
        },
        {
            "codigo departamento": "41",
            "departamento": "HUILA",
            "codigo": "791",
            "ciudad": "TARQUI"
        },
        {
            "codigo departamento": "41",
            "departamento": "HUILA",
            "codigo": "797",
            "ciudad": "TESALIA"
        },
        {
            "codigo departamento": "41",
            "departamento": "HUILA",
            "codigo": "799",
            "ciudad": "TELLO"
        },
        {
            "codigo departamento": "41",
            "departamento": "HUILA",
            "codigo": "801",
            "ciudad": "TERUEL"
        },
        {
            "codigo departamento": "41",
            "departamento": "HUILA",
            "codigo": "807",
            "ciudad": "TIMANA"
        },
        {
            "codigo departamento": "41",
            "departamento": "HUILA",
            "codigo": "872",
            "ciudad": "VILLAVIEJA"
        },
        {
            "codigo departamento": "41",
            "departamento": "HUILA",
            "codigo": "885",
            "ciudad": "YAGUARA"
        },
        {
            "codigo departamento": "44",
            "departamento": "LA GUAJIRA",
            "codigo": "001",
            "ciudad": "RIOHACHA"
        },
        {
            "codigo departamento": "44",
            "departamento": "LA GUAJIRA",
            "codigo": "035",
            "ciudad": "ALBANIA"
        },
        {
            "codigo departamento": "44",
            "departamento": "LA GUAJIRA",
            "codigo": "078",
            "ciudad": "BARRANCAS"
        },
        {
            "codigo departamento": "44",
            "departamento": "LA GUAJIRA",
            "codigo": "090",
            "ciudad": "DIBULLA"
        },
        {
            "codigo departamento": "44",
            "departamento": "LA GUAJIRA",
            "codigo": "098",
            "ciudad": "DISTRACCION"
        },
        {
            "codigo departamento": "44",
            "departamento": "LA GUAJIRA",
            "codigo": "110",
            "ciudad": "EL MOLINO"
        },
        {
            "codigo departamento": "44",
            "departamento": "LA GUAJIRA",
            "codigo": "279",
            "ciudad": "FONSECA"
        },
        {
            "codigo departamento": "44",
            "departamento": "LA GUAJIRA",
            "codigo": "378",
            "ciudad": "HATONUEVO"
        },
        {
            "codigo departamento": "44",
            "departamento": "LA GUAJIRA",
            "codigo": "420",
            "ciudad": "LA JAGUA DEL PILAR"
        },
        {
            "codigo departamento": "44",
            "departamento": "LA GUAJIRA",
            "codigo": "430",
            "ciudad": "MAICAO"
        },
        {
            "codigo departamento": "44",
            "departamento": "LA GUAJIRA",
            "codigo": "560",
            "ciudad": "MANAURE"
        },
        {
            "codigo departamento": "44",
            "departamento": "LA GUAJIRA",
            "codigo": "650",
            "ciudad": "SAN JUAN DEL CESAR"
        },
        {
            "codigo departamento": "44",
            "departamento": "LA GUAJIRA",
            "codigo": "847",
            "ciudad": "URIBIA"
        },
        {
            "codigo departamento": "44",
            "departamento": "LA GUAJIRA",
            "codigo": "855",
            "ciudad": "URUMITA"
        },
        {
            "codigo departamento": "44",
            "departamento": "LA GUAJIRA",
            "codigo": "874",
            "ciudad": "VILLANUEVA"
        },
        {
            "codigo departamento": "47",
            "departamento": "MAGDALENA",
            "codigo": "001",
            "ciudad": "SANTA MARTA"
        },
        {
            "codigo departamento": "47",
            "departamento": "MAGDALENA",
            "codigo": "030",
            "ciudad": "ALGARROBO"
        },
        {
            "codigo departamento": "47",
            "departamento": "MAGDALENA",
            "codigo": "053",
            "ciudad": "ARACATACA"
        },
        {
            "codigo departamento": "47",
            "departamento": "MAGDALENA",
            "codigo": "058",
            "ciudad": "ARIGUANI"
        },
        {
            "codigo departamento": "47",
            "departamento": "MAGDALENA",
            "codigo": "161",
            "ciudad": "CERRO SAN ANTONIO"
        },
        {
            "codigo departamento": "47",
            "departamento": "MAGDALENA",
            "codigo": "170",
            "ciudad": "CHIBOLO"
        },
        {
            "codigo departamento": "47",
            "departamento": "MAGDALENA",
            "codigo": "189",
            "ciudad": "CIENAGA"
        },
        {
            "codigo departamento": "47",
            "departamento": "MAGDALENA",
            "codigo": "205",
            "ciudad": "CONCORDIA"
        },
        {
            "codigo departamento": "47",
            "departamento": "MAGDALENA",
            "codigo": "245",
            "ciudad": "EL BANCO"
        },
        {
            "codigo departamento": "47",
            "departamento": "MAGDALENA",
            "codigo": "258",
            "ciudad": "EL PIÑON"
        },
        {
            "codigo departamento": "47",
            "departamento": "MAGDALENA",
            "codigo": "268",
            "ciudad": "EL RETEN"
        },
        {
            "codigo departamento": "47",
            "departamento": "MAGDALENA",
            "codigo": "288",
            "ciudad": "FUNDACION"
        },
        {
            "codigo departamento": "47",
            "departamento": "MAGDALENA",
            "codigo": "318",
            "ciudad": "GUAMAL"
        },
        {
            "codigo departamento": "47",
            "departamento": "MAGDALENA",
            "codigo": "460",
            "ciudad": "NUEVA GRANADA"
        },
        {
            "codigo departamento": "47",
            "departamento": "MAGDALENA",
            "codigo": "541",
            "ciudad": "PEDRAZA"
        },
        {
            "codigo departamento": "47",
            "departamento": "MAGDALENA",
            "codigo": "545",
            "ciudad": "PIJIÑO DEL CARMEN"
        },
        {
            "codigo departamento": "47",
            "departamento": "MAGDALENA",
            "codigo": "551",
            "ciudad": "PIVIJAY"
        },
        {
            "codigo departamento": "47",
            "departamento": "MAGDALENA",
            "codigo": "555",
            "ciudad": "PLATO"
        },
        {
            "codigo departamento": "47",
            "departamento": "MAGDALENA",
            "codigo": "570",
            "ciudad": "PUEBLOVIEJO"
        },
        {
            "codigo departamento": "47",
            "departamento": "MAGDALENA",
            "codigo": "605",
            "ciudad": "REMOLINO"
        },
        {
            "codigo departamento": "47",
            "departamento": "MAGDALENA",
            "codigo": "660",
            "ciudad": "SABANAS DE SAN ANGEL"
        },
        {
            "codigo departamento": "47",
            "departamento": "MAGDALENA",
            "codigo": "675",
            "ciudad": "SALAMINA"
        },
        {
            "codigo departamento": "47",
            "departamento": "MAGDALENA",
            "codigo": "692",
            "ciudad": "SAN SEBASTIAN DE BUENAVISTA"
        },
        {
            "codigo departamento": "47",
            "departamento": "MAGDALENA",
            "codigo": "703",
            "ciudad": "SAN ZENON"
        },
        {
            "codigo departamento": "47",
            "departamento": "MAGDALENA",
            "codigo": "707",
            "ciudad": "SANTA ANA"
        },
        {
            "codigo departamento": "47",
            "departamento": "MAGDALENA",
            "codigo": "720",
            "ciudad": "SANTA BARBARA DE PINTO"
        },
        {
            "codigo departamento": "47",
            "departamento": "MAGDALENA",
            "codigo": "745",
            "ciudad": "SITIONUEVO"
        },
        {
            "codigo departamento": "47",
            "departamento": "MAGDALENA",
            "codigo": "798",
            "ciudad": "TENERIFE"
        },
        {
            "codigo departamento": "47",
            "departamento": "MAGDALENA",
            "codigo": "960",
            "ciudad": "ZAPAYAN"
        },
        {
            "codigo departamento": "47",
            "departamento": "MAGDALENA",
            "codigo": "980",
            "ciudad": "ZONA BANANERA"
        },
        {
            "codigo departamento": "50",
            "departamento": "META",
            "codigo": "001",
            "ciudad": "VILLAVICENCIO"
        },
        {
            "codigo departamento": "50",
            "departamento": "META",
            "codigo": "006",
            "ciudad": "ACACIAS"
        },
        {
            "codigo departamento": "50",
            "departamento": "META",
            "codigo": "110",
            "ciudad": "BARRANCA DE UPIA"
        },
        {
            "codigo departamento": "50",
            "departamento": "META",
            "codigo": "124",
            "ciudad": "CABUYARO"
        },
        {
            "codigo departamento": "50",
            "departamento": "META",
            "codigo": "150",
            "ciudad": "CASTILLA LA NUEVA"
        },
        {
            "codigo departamento": "50",
            "departamento": "META",
            "codigo": "223",
            "ciudad": "CUBARRAL"
        },
        {
            "codigo departamento": "50",
            "departamento": "META",
            "codigo": "226",
            "ciudad": "CUMARAL"
        },
        {
            "codigo departamento": "50",
            "departamento": "META",
            "codigo": "245",
            "ciudad": "EL CALVARIO"
        },
        {
            "codigo departamento": "50",
            "departamento": "META",
            "codigo": "251",
            "ciudad": "EL CASTILLO"
        },
        {
            "codigo departamento": "50",
            "departamento": "META",
            "codigo": "270",
            "ciudad": "EL DORADO"
        },
        {
            "codigo departamento": "50",
            "departamento": "META",
            "codigo": "287",
            "ciudad": "FUENTE DE ORO"
        },
        {
            "codigo departamento": "50",
            "departamento": "META",
            "codigo": "313",
            "ciudad": "GRANADA"
        },
        {
            "codigo departamento": "50",
            "departamento": "META",
            "codigo": "318",
            "ciudad": "GUAMAL"
        },
        {
            "codigo departamento": "50",
            "departamento": "META",
            "codigo": "325",
            "ciudad": "MAPIRIPAN"
        },
        {
            "codigo departamento": "50",
            "departamento": "META",
            "codigo": "330",
            "ciudad": "MESETAS"
        },
        {
            "codigo departamento": "50",
            "departamento": "META",
            "codigo": "350",
            "ciudad": "LA MACARENA"
        },
        {
            "codigo departamento": "50",
            "departamento": "META",
            "codigo": "370",
            "ciudad": "URIBE"
        },
        {
            "codigo departamento": "50",
            "departamento": "META",
            "codigo": "400",
            "ciudad": "LEJANIAS"
        },
        {
            "codigo departamento": "50",
            "departamento": "META",
            "codigo": "450",
            "ciudad": "PUERTO CONCORDIA"
        },
        {
            "codigo departamento": "50",
            "departamento": "META",
            "codigo": "568",
            "ciudad": "PUERTO GAITAN"
        },
        {
            "codigo departamento": "50",
            "departamento": "META",
            "codigo": "573",
            "ciudad": "PUERTO LOPEZ"
        },
        {
            "codigo departamento": "50",
            "departamento": "META",
            "codigo": "577",
            "ciudad": "PUERTO LLERAS"
        },
        {
            "codigo departamento": "50",
            "departamento": "META",
            "codigo": "590",
            "ciudad": "PUERTO RICO"
        },
        {
            "codigo departamento": "50",
            "departamento": "META",
            "codigo": "606",
            "ciudad": "RESTREPO"
        },
        {
            "codigo departamento": "50",
            "departamento": "META",
            "codigo": "680",
            "ciudad": "SAN CARLOS DE GUAROA"
        },
        {
            "codigo departamento": "50",
            "departamento": "META",
            "codigo": "683",
            "ciudad": "SAN JUAN DE ARAMA"
        },
        {
            "codigo departamento": "50",
            "departamento": "META",
            "codigo": "686",
            "ciudad": "SAN JUANITO"
        },
        {
            "codigo departamento": "50",
            "departamento": "META",
            "codigo": "689",
            "ciudad": "SAN MARTIN"
        },
        {
            "codigo departamento": "50",
            "departamento": "META",
            "codigo": "711",
            "ciudad": "VISTAHERMOSA"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "001",
            "ciudad": "PASTO"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "019",
            "ciudad": "ALBAN"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "022",
            "ciudad": "ALDANA"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "036",
            "ciudad": "ANCUYA"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "051",
            "ciudad": "ARBOLEDA"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "079",
            "ciudad": "BARBACOAS"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "083",
            "ciudad": "BELEN"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "110",
            "ciudad": "BUESACO"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "203",
            "ciudad": "COLON"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "207",
            "ciudad": "CONSACA"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "210",
            "ciudad": "CONTADERO"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "215",
            "ciudad": "CORDOBA"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "224",
            "ciudad": "CUASPUD"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "227",
            "ciudad": "CUMBAL"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "233",
            "ciudad": "CUMBITARA"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "240",
            "ciudad": "CHACHAGsI"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "250",
            "ciudad": "EL CHARCO"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "254",
            "ciudad": "EL PEÑOL"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "256",
            "ciudad": "EL ROSARIO"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "258",
            "ciudad": "EL TABLON DE GOMEZ"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "260",
            "ciudad": "EL TAMBO"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "287",
            "ciudad": "FUNES"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "317",
            "ciudad": "GUACHUCAL"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "320",
            "ciudad": "GUAITARILLA"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "323",
            "ciudad": "GUALMATAN"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "352",
            "ciudad": "ILES"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "354",
            "ciudad": "IMUES"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "356",
            "ciudad": "IPIALES"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "378",
            "ciudad": "LA CRUZ"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "381",
            "ciudad": "LA FLORIDA"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "385",
            "ciudad": "LA LLANADA"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "390",
            "ciudad": "LA TOLA"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "399",
            "ciudad": "LA UNION"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "405",
            "ciudad": "LEIVA"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "411",
            "ciudad": "LINARES"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "418",
            "ciudad": "LOS ANDES"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "427",
            "ciudad": "MAGsI"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "435",
            "ciudad": "MALLAMA"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "473",
            "ciudad": "MOSQUERA"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "480",
            "ciudad": "NARIÑO"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "490",
            "ciudad": "OLAYA HERRERA"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "506",
            "ciudad": "OSPINA"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "520",
            "ciudad": "FRANCISCO PIZARRO"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "540",
            "ciudad": "POLICARPA"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "560",
            "ciudad": "POTOSI"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "565",
            "ciudad": "PROVIDENCIA"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "573",
            "ciudad": "PUERRES"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "585",
            "ciudad": "PUPIALES"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "612",
            "ciudad": "RICAURTE"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "621",
            "ciudad": "ROBERTO PAYAN"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "678",
            "ciudad": "SAMANIEGO"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "683",
            "ciudad": "SANDONA"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "685",
            "ciudad": "SAN BERNARDO"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "687",
            "ciudad": "SAN LORENZO"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "693",
            "ciudad": "SAN PABLO"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "694",
            "ciudad": "SAN PEDRO DE CARTAGO"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "696",
            "ciudad": "SANTA BARBARA"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "699",
            "ciudad": "SANTACRUZ"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "720",
            "ciudad": "SAPUYES"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "786",
            "ciudad": "TAMINANGO"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "788",
            "ciudad": "TANGUA"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "835",
            "ciudad": "SAN ANDRES DE TUMACO"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "838",
            "ciudad": "TUQUERRES"
        },
        {
            "codigo departamento": "52",
            "departamento": "NARIÑO",
            "codigo": "885",
            "ciudad": "YACUANQUER"
        },
        {
            "codigo departamento": "54",
            "departamento": "NORTE DE SANTANDER",
            "codigo": "001",
            "ciudad": "CUCUTA"
        },
        {
            "codigo departamento": "54",
            "departamento": "NORTE DE SANTANDER",
            "codigo": "003",
            "ciudad": "ABREGO"
        },
        {
            "codigo departamento": "54",
            "departamento": "NORTE DE SANTANDER",
            "codigo": "051",
            "ciudad": "ARBOLEDAS"
        },
        {
            "codigo departamento": "54",
            "departamento": "NORTE DE SANTANDER",
            "codigo": "099",
            "ciudad": "BOCHALEMA"
        },
        {
            "codigo departamento": "54",
            "departamento": "NORTE DE SANTANDER",
            "codigo": "109",
            "ciudad": "BUCARASICA"
        },
        {
            "codigo departamento": "54",
            "departamento": "NORTE DE SANTANDER",
            "codigo": "125",
            "ciudad": "CACOTA"
        },
        {
            "codigo departamento": "54",
            "departamento": "NORTE DE SANTANDER",
            "codigo": "128",
            "ciudad": "CACHIRA"
        },
        {
            "codigo departamento": "54",
            "departamento": "NORTE DE SANTANDER",
            "codigo": "172",
            "ciudad": "CHINACOTA"
        },
        {
            "codigo departamento": "54",
            "departamento": "NORTE DE SANTANDER",
            "codigo": "174",
            "ciudad": "CHITAGA"
        },
        {
            "codigo departamento": "54",
            "departamento": "NORTE DE SANTANDER",
            "codigo": "206",
            "ciudad": "CONVENCION"
        },
        {
            "codigo departamento": "54",
            "departamento": "NORTE DE SANTANDER",
            "codigo": "223",
            "ciudad": "CUCUTILLA"
        },
        {
            "codigo departamento": "54",
            "departamento": "NORTE DE SANTANDER",
            "codigo": "239",
            "ciudad": "DURANIA"
        },
        {
            "codigo departamento": "54",
            "departamento": "NORTE DE SANTANDER",
            "codigo": "245",
            "ciudad": "EL CARMEN"
        },
        {
            "codigo departamento": "54",
            "departamento": "NORTE DE SANTANDER",
            "codigo": "250",
            "ciudad": "EL TARRA"
        },
        {
            "codigo departamento": "54",
            "departamento": "NORTE DE SANTANDER",
            "codigo": "261",
            "ciudad": "EL ZULIA"
        },
        {
            "codigo departamento": "54",
            "departamento": "NORTE DE SANTANDER",
            "codigo": "313",
            "ciudad": "GRAMALOTE"
        },
        {
            "codigo departamento": "54",
            "departamento": "NORTE DE SANTANDER",
            "codigo": "344",
            "ciudad": "HACARI"
        },
        {
            "codigo departamento": "54",
            "departamento": "NORTE DE SANTANDER",
            "codigo": "347",
            "ciudad": "HERRAN"
        },
        {
            "codigo departamento": "54",
            "departamento": "NORTE DE SANTANDER",
            "codigo": "377",
            "ciudad": "LABATECA"
        },
        {
            "codigo departamento": "54",
            "departamento": "NORTE DE SANTANDER",
            "codigo": "385",
            "ciudad": "LA ESPERANZA"
        },
        {
            "codigo departamento": "54",
            "departamento": "NORTE DE SANTANDER",
            "codigo": "398",
            "ciudad": "LA PLAYA"
        },
        {
            "codigo departamento": "54",
            "departamento": "NORTE DE SANTANDER",
            "codigo": "405",
            "ciudad": "LOS PATIOS"
        },
        {
            "codigo departamento": "54",
            "departamento": "NORTE DE SANTANDER",
            "codigo": "418",
            "ciudad": "LOURDES"
        },
        {
            "codigo departamento": "54",
            "departamento": "NORTE DE SANTANDER",
            "codigo": "480",
            "ciudad": "MUTISCUA"
        },
        {
            "codigo departamento": "54",
            "departamento": "NORTE DE SANTANDER",
            "codigo": "498",
            "ciudad": "OCAÑA"
        },
        {
            "codigo departamento": "54",
            "departamento": "NORTE DE SANTANDER",
            "codigo": "518",
            "ciudad": "PAMPLONA"
        },
        {
            "codigo departamento": "54",
            "departamento": "NORTE DE SANTANDER",
            "codigo": "520",
            "ciudad": "PAMPLONITA"
        },
        {
            "codigo departamento": "54",
            "departamento": "NORTE DE SANTANDER",
            "codigo": "553",
            "ciudad": "PUERTO SANTANDER"
        },
        {
            "codigo departamento": "54",
            "departamento": "NORTE DE SANTANDER",
            "codigo": "599",
            "ciudad": "RAGONVALIA"
        },
        {
            "codigo departamento": "54",
            "departamento": "NORTE DE SANTANDER",
            "codigo": "660",
            "ciudad": "SALAZAR"
        },
        {
            "codigo departamento": "54",
            "departamento": "NORTE DE SANTANDER",
            "codigo": "670",
            "ciudad": "SAN CALIXTO"
        },
        {
            "codigo departamento": "54",
            "departamento": "NORTE DE SANTANDER",
            "codigo": "673",
            "ciudad": "SAN CAYETANO"
        },
        {
            "codigo departamento": "54",
            "departamento": "NORTE DE SANTANDER",
            "codigo": "680",
            "ciudad": "SANTIAGO"
        },
        {
            "codigo departamento": "54",
            "departamento": "NORTE DE SANTANDER",
            "codigo": "720",
            "ciudad": "SARDINATA"
        },
        {
            "codigo departamento": "54",
            "departamento": "NORTE DE SANTANDER",
            "codigo": "743",
            "ciudad": "SILOS"
        },
        {
            "codigo departamento": "54",
            "departamento": "NORTE DE SANTANDER",
            "codigo": "800",
            "ciudad": "TEORAMA"
        },
        {
            "codigo departamento": "54",
            "departamento": "NORTE DE SANTANDER",
            "codigo": "810",
            "ciudad": "TIBU"
        },
        {
            "codigo departamento": "54",
            "departamento": "NORTE DE SANTANDER",
            "codigo": "820",
            "ciudad": "TOLEDO"
        },
        {
            "codigo departamento": "54",
            "departamento": "NORTE DE SANTANDER",
            "codigo": "871",
            "ciudad": "VILLA CARO"
        },
        {
            "codigo departamento": "54",
            "departamento": "NORTE DE SANTANDER",
            "codigo": "874",
            "ciudad": "VILLA DEL ROSARIO"
        },
        {
            "codigo departamento": "63",
            "departamento": "QUINDIO",
            "codigo": "001",
            "ciudad": "ARMENIA"
        },
        {
            "codigo departamento": "63",
            "departamento": "QUINDIO",
            "codigo": "111",
            "ciudad": "BUENAVISTA"
        },
        {
            "codigo departamento": "63",
            "departamento": "QUINDIO",
            "codigo": "130",
            "ciudad": "CALARCA"
        },
        {
            "codigo departamento": "63",
            "departamento": "QUINDIO",
            "codigo": "190",
            "ciudad": "CIRCASIA"
        },
        {
            "codigo departamento": "63",
            "departamento": "QUINDIO",
            "codigo": "212",
            "ciudad": "CORDOBA"
        },
        {
            "codigo departamento": "63",
            "departamento": "QUINDIO",
            "codigo": "272",
            "ciudad": "FILANDIA"
        },
        {
            "codigo departamento": "63",
            "departamento": "QUINDIO",
            "codigo": "302",
            "ciudad": "GENOVA"
        },
        {
            "codigo departamento": "63",
            "departamento": "QUINDIO",
            "codigo": "401",
            "ciudad": "LA TEBAIDA"
        },
        {
            "codigo departamento": "63",
            "departamento": "QUINDIO",
            "codigo": "470",
            "ciudad": "MONTENEGRO"
        },
        {
            "codigo departamento": "63",
            "departamento": "QUINDIO",
            "codigo": "548",
            "ciudad": "PIJAO"
        },
        {
            "codigo departamento": "63",
            "departamento": "QUINDIO",
            "codigo": "594",
            "ciudad": "QUIMBAYA"
        },
        {
            "codigo departamento": "63",
            "departamento": "QUINDIO",
            "codigo": "690",
            "ciudad": "SALENTO"
        },
        {
            "codigo departamento": "66",
            "departamento": "RISARALDA",
            "codigo": "001",
            "ciudad": "PEREIRA"
        },
        {
            "codigo departamento": "66",
            "departamento": "RISARALDA",
            "codigo": "045",
            "ciudad": "APIA"
        },
        {
            "codigo departamento": "66",
            "departamento": "RISARALDA",
            "codigo": "075",
            "ciudad": "BALBOA"
        },
        {
            "codigo departamento": "66",
            "departamento": "RISARALDA",
            "codigo": "088",
            "ciudad": "BELEN DE UMBRIA"
        },
        {
            "codigo departamento": "66",
            "departamento": "RISARALDA",
            "codigo": "170",
            "ciudad": "DOSQUEBRADAS"
        },
        {
            "codigo departamento": "66",
            "departamento": "RISARALDA",
            "codigo": "318",
            "ciudad": "GUATICA"
        },
        {
            "codigo departamento": "66",
            "departamento": "RISARALDA",
            "codigo": "383",
            "ciudad": "LA CELIA"
        },
        {
            "codigo departamento": "66",
            "departamento": "RISARALDA",
            "codigo": "400",
            "ciudad": "LA VIRGINIA"
        },
        {
            "codigo departamento": "66",
            "departamento": "RISARALDA",
            "codigo": "440",
            "ciudad": "MARSELLA"
        },
        {
            "codigo departamento": "66",
            "departamento": "RISARALDA",
            "codigo": "456",
            "ciudad": "MISTRATO"
        },
        {
            "codigo departamento": "66",
            "departamento": "RISARALDA",
            "codigo": "572",
            "ciudad": "PUEBLO RICO"
        },
        {
            "codigo departamento": "66",
            "departamento": "RISARALDA",
            "codigo": "594",
            "ciudad": "QUINCHIA"
        },
        {
            "codigo departamento": "66",
            "departamento": "RISARALDA",
            "codigo": "682",
            "ciudad": "SANTA ROSA DE CABAL"
        },
        {
            "codigo departamento": "66",
            "departamento": "RISARALDA",
            "codigo": "687",
            "ciudad": "SANTUARIO"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "001",
            "ciudad": "BUCARAMANGA"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "013",
            "ciudad": "AGUADA"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "020",
            "ciudad": "ALBANIA"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "051",
            "ciudad": "ARATOCA"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "077",
            "ciudad": "BARBOSA"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "079",
            "ciudad": "BARICHARA"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "081",
            "ciudad": "BARRANCABERMEJA"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "092",
            "ciudad": "BETULIA"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "101",
            "ciudad": "BOLIVAR"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "121",
            "ciudad": "CABRERA"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "132",
            "ciudad": "CALIFORNIA"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "147",
            "ciudad": "CAPITANEJO"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "152",
            "ciudad": "CARCASI"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "160",
            "ciudad": "CEPITA"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "162",
            "ciudad": "CERRITO"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "167",
            "ciudad": "CHARALA"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "169",
            "ciudad": "CHARTA"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "176",
            "ciudad": "CHIMA"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "179",
            "ciudad": "CHIPATA"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "190",
            "ciudad": "CIMITARRA"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "207",
            "ciudad": "CONCEPCION"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "209",
            "ciudad": "CONFINES"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "211",
            "ciudad": "CONTRATACION"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "217",
            "ciudad": "COROMORO"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "229",
            "ciudad": "CURITI"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "235",
            "ciudad": "EL CARMEN DE CHUCURI"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "245",
            "ciudad": "EL GUACAMAYO"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "250",
            "ciudad": "EL PEÑON"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "255",
            "ciudad": "EL PLAYON"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "264",
            "ciudad": "ENCINO"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "266",
            "ciudad": "ENCISO"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "271",
            "ciudad": "FLORIAN"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "276",
            "ciudad": "FLORIDABLANCA"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "296",
            "ciudad": "GALAN"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "298",
            "ciudad": "GAMBITA"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "307",
            "ciudad": "GIRON"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "318",
            "ciudad": "GUACA"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "320",
            "ciudad": "GUADALUPE"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "322",
            "ciudad": "GUAPOTA"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "324",
            "ciudad": "GUAVATA"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "327",
            "ciudad": "GsEPSA"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "344",
            "ciudad": "HATO"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "368",
            "ciudad": "JESUS MARIA"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "370",
            "ciudad": "JORDAN"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "377",
            "ciudad": "LA BELLEZA"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "385",
            "ciudad": "LANDAZURI"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "397",
            "ciudad": "LA PAZ"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "406",
            "ciudad": "LEBRIJA"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "418",
            "ciudad": "LOS SANTOS"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "425",
            "ciudad": "MACARAVITA"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "432",
            "ciudad": "MALAGA"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "444",
            "ciudad": "MATANZA"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "464",
            "ciudad": "MOGOTES"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "468",
            "ciudad": "MOLAGAVITA"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "498",
            "ciudad": "OCAMONTE"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "500",
            "ciudad": "OIBA"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "502",
            "ciudad": "ONZAGA"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "522",
            "ciudad": "PALMAR"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "524",
            "ciudad": "PALMAS DEL SOCORRO"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "533",
            "ciudad": "PARAMO"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "547",
            "ciudad": "PIEDECUESTA"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "549",
            "ciudad": "PINCHOTE"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "572",
            "ciudad": "PUENTE NACIONAL"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "573",
            "ciudad": "PUERTO PARRA"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "575",
            "ciudad": "PUERTO WILCHES"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "615",
            "ciudad": "RIONEGRO"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "655",
            "ciudad": "SABANA DE TORRES"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "669",
            "ciudad": "SAN ANDRES"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "673",
            "ciudad": "SAN BENITO"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "679",
            "ciudad": "SAN GIL"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "682",
            "ciudad": "SAN JOAQUIN"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "684",
            "ciudad": "SAN JOSE DE MIRANDA"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "686",
            "ciudad": "SAN MIGUEL"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "689",
            "ciudad": "SAN VICENTE DE CHUCURI"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "705",
            "ciudad": "SANTA BARBARA"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "720",
            "ciudad": "SANTA HELENA DEL OPON"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "745",
            "ciudad": "SIMACOTA"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "755",
            "ciudad": "SOCORRO"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "770",
            "ciudad": "SUAITA"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "773",
            "ciudad": "SUCRE"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "780",
            "ciudad": "SURATA"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "820",
            "ciudad": "TONA"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "855",
            "ciudad": "VALLE DE SAN JOSE"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "861",
            "ciudad": "VELEZ"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "867",
            "ciudad": "VETAS"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "872",
            "ciudad": "VILLANUEVA"
        },
        {
            "codigo departamento": "68",
            "departamento": "SANTANDER",
            "codigo": "895",
            "ciudad": "ZAPATOCA"
        },
        {
            "codigo departamento": "70",
            "departamento": "SUCRE",
            "codigo": "001",
            "ciudad": "SINCELEJO"
        },
        {
            "codigo departamento": "70",
            "departamento": "SUCRE",
            "codigo": "110",
            "ciudad": "BUENAVISTA"
        },
        {
            "codigo departamento": "70",
            "departamento": "SUCRE",
            "codigo": "124",
            "ciudad": "CAIMITO"
        },
        {
            "codigo departamento": "70",
            "departamento": "SUCRE",
            "codigo": "204",
            "ciudad": "COLOSO"
        },
        {
            "codigo departamento": "70",
            "departamento": "SUCRE",
            "codigo": "215",
            "ciudad": "COROZAL"
        },
        {
            "codigo departamento": "70",
            "departamento": "SUCRE",
            "codigo": "221",
            "ciudad": "COVEÑAS"
        },
        {
            "codigo departamento": "70",
            "departamento": "SUCRE",
            "codigo": "230",
            "ciudad": "CHALAN"
        },
        {
            "codigo departamento": "70",
            "departamento": "SUCRE",
            "codigo": "233",
            "ciudad": "EL ROBLE"
        },
        {
            "codigo departamento": "70",
            "departamento": "SUCRE",
            "codigo": "235",
            "ciudad": "GALERAS"
        },
        {
            "codigo departamento": "70",
            "departamento": "SUCRE",
            "codigo": "265",
            "ciudad": "GUARANDA"
        },
        {
            "codigo departamento": "70",
            "departamento": "SUCRE",
            "codigo": "400",
            "ciudad": "LA UNION"
        },
        {
            "codigo departamento": "70",
            "departamento": "SUCRE",
            "codigo": "418",
            "ciudad": "LOS PALMITOS"
        },
        {
            "codigo departamento": "70",
            "departamento": "SUCRE",
            "codigo": "429",
            "ciudad": "MAJAGUAL"
        },
        {
            "codigo departamento": "70",
            "departamento": "SUCRE",
            "codigo": "473",
            "ciudad": "MORROA"
        },
        {
            "codigo departamento": "70",
            "departamento": "SUCRE",
            "codigo": "508",
            "ciudad": "OVEJAS"
        },
        {
            "codigo departamento": "70",
            "departamento": "SUCRE",
            "codigo": "523",
            "ciudad": "PALMITO"
        },
        {
            "codigo departamento": "70",
            "departamento": "SUCRE",
            "codigo": "670",
            "ciudad": "SAMPUES"
        },
        {
            "codigo departamento": "70",
            "departamento": "SUCRE",
            "codigo": "678",
            "ciudad": "SAN BENITO ABAD"
        },
        {
            "codigo departamento": "70",
            "departamento": "SUCRE",
            "codigo": "702",
            "ciudad": "SAN JUAN DE BETULIA"
        },
        {
            "codigo departamento": "70",
            "departamento": "SUCRE",
            "codigo": "708",
            "ciudad": "SAN MARCOS"
        },
        {
            "codigo departamento": "70",
            "departamento": "SUCRE",
            "codigo": "713",
            "ciudad": "SAN ONOFRE"
        },
        {
            "codigo departamento": "70",
            "departamento": "SUCRE",
            "codigo": "717",
            "ciudad": "SAN PEDRO"
        },
        {
            "codigo departamento": "70",
            "departamento": "SUCRE",
            "codigo": "742",
            "ciudad": "SAN LUIS DE SINCE"
        },
        {
            "codigo departamento": "70",
            "departamento": "SUCRE",
            "codigo": "771",
            "ciudad": "SUCRE"
        },
        {
            "codigo departamento": "70",
            "departamento": "SUCRE",
            "codigo": "820",
            "ciudad": "SANTIAGO DE TOLU"
        },
        {
            "codigo departamento": "70",
            "departamento": "SUCRE",
            "codigo": "823",
            "ciudad": "TOLU VIEJO"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "001",
            "ciudad": "IBAGUE"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "024",
            "ciudad": "ALPUJARRA"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "026",
            "ciudad": "ALVARADO"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "030",
            "ciudad": "AMBALEMA"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "043",
            "ciudad": "ANZOATEGUI"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "055",
            "ciudad": "ARMERO"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "067",
            "ciudad": "ATACO"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "124",
            "ciudad": "CAJAMARCA"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "148",
            "ciudad": "CARMEN DE APICALA"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "152",
            "ciudad": "CASABIANCA"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "168",
            "ciudad": "CHAPARRAL"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "200",
            "ciudad": "COELLO"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "217",
            "ciudad": "COYAIMA"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "226",
            "ciudad": "CUNDAY"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "236",
            "ciudad": "DOLORES"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "268",
            "ciudad": "ESPINAL"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "270",
            "ciudad": "FALAN"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "275",
            "ciudad": "FLANDES"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "283",
            "ciudad": "FRESNO"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "319",
            "ciudad": "GUAMO"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "347",
            "ciudad": "HERVEO"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "349",
            "ciudad": "HONDA"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "352",
            "ciudad": "ICONONZO"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "408",
            "ciudad": "LERIDA"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "411",
            "ciudad": "LIBANO"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "443",
            "ciudad": "MARIQUITA"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "449",
            "ciudad": "MELGAR"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "461",
            "ciudad": "MURILLO"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "483",
            "ciudad": "NATAGAIMA"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "504",
            "ciudad": "ORTEGA"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "520",
            "ciudad": "PALOCABILDO"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "547",
            "ciudad": "PIEDRAS"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "555",
            "ciudad": "PLANADAS"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "563",
            "ciudad": "PRADO"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "585",
            "ciudad": "PURIFICACION"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "616",
            "ciudad": "RIOBLANCO"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "622",
            "ciudad": "RONCESVALLES"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "624",
            "ciudad": "ROVIRA"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "671",
            "ciudad": "SALDAÑA"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "675",
            "ciudad": "SAN ANTONIO"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "678",
            "ciudad": "SAN LUIS"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "686",
            "ciudad": "SANTA ISABEL"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "770",
            "ciudad": "SUAREZ"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "854",
            "ciudad": "VALLE DE SAN JUAN"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "861",
            "ciudad": "VENADILLO"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "870",
            "ciudad": "VILLAHERMOSA"
        },
        {
            "codigo departamento": "73",
            "departamento": "TOLIMA",
            "codigo": "873",
            "ciudad": "VILLARRICA"
        },
        {
            "codigo departamento": "76",
            "departamento": "VALLE DEL CAUCA",
            "codigo": "001",
            "ciudad": "CALI"
        },
        {
            "codigo departamento": "76",
            "departamento": "VALLE DEL CAUCA",
            "codigo": "020",
            "ciudad": "ALCALA"
        },
        {
            "codigo departamento": "76",
            "departamento": "VALLE DEL CAUCA",
            "codigo": "036",
            "ciudad": "ANDALUCIA"
        },
        {
            "codigo departamento": "76",
            "departamento": "VALLE DEL CAUCA",
            "codigo": "041",
            "ciudad": "ANSERMANUEVO"
        },
        {
            "codigo departamento": "76",
            "departamento": "VALLE DEL CAUCA",
            "codigo": "054",
            "ciudad": "ARGELIA"
        },
        {
            "codigo departamento": "76",
            "departamento": "VALLE DEL CAUCA",
            "codigo": "100",
            "ciudad": "BOLIVAR"
        },
        {
            "codigo departamento": "76",
            "departamento": "VALLE DEL CAUCA",
            "codigo": "109",
            "ciudad": "BUENAVENTURA"
        },
        {
            "codigo departamento": "76",
            "departamento": "VALLE DEL CAUCA",
            "codigo": "111",
            "ciudad": "GUADALAJARA DE BUGA"
        },
        {
            "codigo departamento": "76",
            "departamento": "VALLE DEL CAUCA",
            "codigo": "113",
            "ciudad": "BUGALAGRANDE"
        },
        {
            "codigo departamento": "76",
            "departamento": "VALLE DEL CAUCA",
            "codigo": "122",
            "ciudad": "CAICEDONIA"
        },
        {
            "codigo departamento": "76",
            "departamento": "VALLE DEL CAUCA",
            "codigo": "126",
            "ciudad": "CALIMA"
        },
        {
            "codigo departamento": "76",
            "departamento": "VALLE DEL CAUCA",
            "codigo": "130",
            "ciudad": "CANDELARIA"
        },
        {
            "codigo departamento": "76",
            "departamento": "VALLE DEL CAUCA",
            "codigo": "147",
            "ciudad": "CARTAGO"
        },
        {
            "codigo departamento": "76",
            "departamento": "VALLE DEL CAUCA",
            "codigo": "233",
            "ciudad": "DAGUA"
        },
        {
            "codigo departamento": "76",
            "departamento": "VALLE DEL CAUCA",
            "codigo": "243",
            "ciudad": "EL AGUILA"
        },
        {
            "codigo departamento": "76",
            "departamento": "VALLE DEL CAUCA",
            "codigo": "246",
            "ciudad": "EL CAIRO"
        },
        {
            "codigo departamento": "76",
            "departamento": "VALLE DEL CAUCA",
            "codigo": "248",
            "ciudad": "EL CERRITO"
        },
        {
            "codigo departamento": "76",
            "departamento": "VALLE DEL CAUCA",
            "codigo": "250",
            "ciudad": "EL DOVIO"
        },
        {
            "codigo departamento": "76",
            "departamento": "VALLE DEL CAUCA",
            "codigo": "275",
            "ciudad": "FLORIDA"
        },
        {
            "codigo departamento": "76",
            "departamento": "VALLE DEL CAUCA",
            "codigo": "306",
            "ciudad": "GINEBRA"
        },
        {
            "codigo departamento": "76",
            "departamento": "VALLE DEL CAUCA",
            "codigo": "318",
            "ciudad": "GUACARI"
        },
        {
            "codigo departamento": "76",
            "departamento": "VALLE DEL CAUCA",
            "codigo": "364",
            "ciudad": "JAMUNDI"
        },
        {
            "codigo departamento": "76",
            "departamento": "VALLE DEL CAUCA",
            "codigo": "377",
            "ciudad": "LA CUMBRE"
        },
        {
            "codigo departamento": "76",
            "departamento": "VALLE DEL CAUCA",
            "codigo": "400",
            "ciudad": "LA UNION"
        },
        {
            "codigo departamento": "76",
            "departamento": "VALLE DEL CAUCA",
            "codigo": "403",
            "ciudad": "LA VICTORIA"
        },
        {
            "codigo departamento": "76",
            "departamento": "VALLE DEL CAUCA",
            "codigo": "497",
            "ciudad": "OBANDO"
        },
        {
            "codigo departamento": "76",
            "departamento": "VALLE DEL CAUCA",
            "codigo": "520",
            "ciudad": "PALMIRA"
        },
        {
            "codigo departamento": "76",
            "departamento": "VALLE DEL CAUCA",
            "codigo": "563",
            "ciudad": "PRADERA"
        },
        {
            "codigo departamento": "76",
            "departamento": "VALLE DEL CAUCA",
            "codigo": "606",
            "ciudad": "RESTREPO"
        },
        {
            "codigo departamento": "76",
            "departamento": "VALLE DEL CAUCA",
            "codigo": "616",
            "ciudad": "RIOFRIO"
        },
        {
            "codigo departamento": "76",
            "departamento": "VALLE DEL CAUCA",
            "codigo": "622",
            "ciudad": "ROLDANILLO"
        },
        {
            "codigo departamento": "76",
            "departamento": "VALLE DEL CAUCA",
            "codigo": "670",
            "ciudad": "SAN PEDRO"
        },
        {
            "codigo departamento": "76",
            "departamento": "VALLE DEL CAUCA",
            "codigo": "736",
            "ciudad": "SEVILLA"
        },
        {
            "codigo departamento": "76",
            "departamento": "VALLE DEL CAUCA",
            "codigo": "823",
            "ciudad": "TORO"
        },
        {
            "codigo departamento": "76",
            "departamento": "VALLE DEL CAUCA",
            "codigo": "828",
            "ciudad": "TRUJILLO"
        },
        {
            "codigo departamento": "76",
            "departamento": "VALLE DEL CAUCA",
            "codigo": "834",
            "ciudad": "TULUA"
        },
        {
            "codigo departamento": "76",
            "departamento": "VALLE DEL CAUCA",
            "codigo": "845",
            "ciudad": "ULLOA"
        },
        {
            "codigo departamento": "76",
            "departamento": "VALLE DEL CAUCA",
            "codigo": "863",
            "ciudad": "VERSALLES"
        },
        {
            "codigo departamento": "76",
            "departamento": "VALLE DEL CAUCA",
            "codigo": "869",
            "ciudad": "VIJES"
        },
        {
            "codigo departamento": "76",
            "departamento": "VALLE DEL CAUCA",
            "codigo": "890",
            "ciudad": "YOTOCO"
        },
        {
            "codigo departamento": "76",
            "departamento": "VALLE DEL CAUCA",
            "codigo": "892",
            "ciudad": "YUMBO"
        },
        {
            "codigo departamento": "76",
            "departamento": "VALLE DEL CAUCA",
            "codigo": "895",
            "ciudad": "ZARZAL"
        },
        {
            "codigo departamento": "81",
            "departamento": "ARAUCA",
            "codigo": "001",
            "ciudad": "ARAUCA"
        },
        {
            "codigo departamento": "81",
            "departamento": "ARAUCA",
            "codigo": "065",
            "ciudad": "ARAUQUITA"
        },
        {
            "codigo departamento": "81",
            "departamento": "ARAUCA",
            "codigo": "220",
            "ciudad": "CRAVO NORTE"
        },
        {
            "codigo departamento": "81",
            "departamento": "ARAUCA",
            "codigo": "300",
            "ciudad": "FORTUL"
        },
        {
            "codigo departamento": "81",
            "departamento": "ARAUCA",
            "codigo": "591",
            "ciudad": "PUERTO RONDON"
        },
        {
            "codigo departamento": "81",
            "departamento": "ARAUCA",
            "codigo": "736",
            "ciudad": "SARAVENA"
        },
        {
            "codigo departamento": "81",
            "departamento": "ARAUCA",
            "codigo": "794",
            "ciudad": "TAME"
        },
        {
            "codigo departamento": "85",
            "departamento": "CASANARE",
            "codigo": "001",
            "ciudad": "YOPAL"
        },
        {
            "codigo departamento": "85",
            "departamento": "CASANARE",
            "codigo": "010",
            "ciudad": "AGUAZUL"
        },
        {
            "codigo departamento": "85",
            "departamento": "CASANARE",
            "codigo": "015",
            "ciudad": "CHAMEZA"
        },
        {
            "codigo departamento": "85",
            "departamento": "CASANARE",
            "codigo": "125",
            "ciudad": "HATO COROZAL"
        },
        {
            "codigo departamento": "85",
            "departamento": "CASANARE",
            "codigo": "136",
            "ciudad": "LA SALINA"
        },
        {
            "codigo departamento": "85",
            "departamento": "CASANARE",
            "codigo": "139",
            "ciudad": "MANI"
        },
        {
            "codigo departamento": "85",
            "departamento": "CASANARE",
            "codigo": "162",
            "ciudad": "MONTERREY"
        },
        {
            "codigo departamento": "85",
            "departamento": "CASANARE",
            "codigo": "225",
            "ciudad": "NUNCHIA"
        },
        {
            "codigo departamento": "85",
            "departamento": "CASANARE",
            "codigo": "230",
            "ciudad": "OROCUE"
        },
        {
            "codigo departamento": "85",
            "departamento": "CASANARE",
            "codigo": "250",
            "ciudad": "PAZ DE ARIPORO"
        },
        {
            "codigo departamento": "85",
            "departamento": "CASANARE",
            "codigo": "263",
            "ciudad": "PORE"
        },
        {
            "codigo departamento": "85",
            "departamento": "CASANARE",
            "codigo": "279",
            "ciudad": "RECETOR"
        },
        {
            "codigo departamento": "85",
            "departamento": "CASANARE",
            "codigo": "300",
            "ciudad": "SABANALARGA"
        },
        {
            "codigo departamento": "85",
            "departamento": "CASANARE",
            "codigo": "315",
            "ciudad": "SACAMA"
        },
        {
            "codigo departamento": "85",
            "departamento": "CASANARE",
            "codigo": "325",
            "ciudad": "SAN LUIS DE PALENQUE"
        },
        {
            "codigo departamento": "85",
            "departamento": "CASANARE",
            "codigo": "400",
            "ciudad": "TAMARA"
        },
        {
            "codigo departamento": "85",
            "departamento": "CASANARE",
            "codigo": "410",
            "ciudad": "TAURAMENA"
        },
        {
            "codigo departamento": "85",
            "departamento": "CASANARE",
            "codigo": "430",
            "ciudad": "TRINIDAD"
        },
        {
            "codigo departamento": "85",
            "departamento": "CASANARE",
            "codigo": "440",
            "ciudad": "VILLANUEVA"
        },
        {
            "codigo departamento": "86",
            "departamento": "PUTUMAYO",
            "codigo": "001",
            "ciudad": "MOCOA"
        },
        {
            "codigo departamento": "86",
            "departamento": "PUTUMAYO",
            "codigo": "219",
            "ciudad": "COLON"
        },
        {
            "codigo departamento": "86",
            "departamento": "PUTUMAYO",
            "codigo": "320",
            "ciudad": "ORITO"
        },
        {
            "codigo departamento": "86",
            "departamento": "PUTUMAYO",
            "codigo": "568",
            "ciudad": "PUERTO ASIS"
        },
        {
            "codigo departamento": "86",
            "departamento": "PUTUMAYO",
            "codigo": "569",
            "ciudad": "PUERTO CAICEDO"
        },
        {
            "codigo departamento": "86",
            "departamento": "PUTUMAYO",
            "codigo": "571",
            "ciudad": "PUERTO GUZMAN"
        },
        {
            "codigo departamento": "86",
            "departamento": "PUTUMAYO",
            "codigo": "573",
            "ciudad": "LEGUIZAMO"
        },
        {
            "codigo departamento": "86",
            "departamento": "PUTUMAYO",
            "codigo": "749",
            "ciudad": "SIBUNDOY"
        },
        {
            "codigo departamento": "86",
            "departamento": "PUTUMAYO",
            "codigo": "755",
            "ciudad": "SAN FRANCISCO"
        },
        {
            "codigo departamento": "86",
            "departamento": "PUTUMAYO",
            "codigo": "757",
            "ciudad": "SAN MIGUEL"
        },
        {
            "codigo departamento": "86",
            "departamento": "PUTUMAYO",
            "codigo": "760",
            "ciudad": "SANTIAGO"
        },
        {
            "codigo departamento": "86",
            "departamento": "PUTUMAYO",
            "codigo": "865",
            "ciudad": "VALLE DEL GUAMUEZ"
        },
        {
            "codigo departamento": "86",
            "departamento": "PUTUMAYO",
            "codigo": "885",
            "ciudad": "VILLAGARZON"
        },
        {
            "codigo departamento": "88",
            "departamento": "SAN ANDRES",
            "codigo": "001",
            "ciudad": "SAN ANDRES"
        },
        {
            "codigo departamento": "88",
            "departamento": "SAN ANDRES",
            "codigo": "564",
            "ciudad": "PROVIDENCIA"
        },
        {
            "codigo departamento": "91",
            "departamento": "AMAZONAS",
            "codigo": "001",
            "ciudad": "LETICIA"
        },
        {
            "codigo departamento": "91",
            "departamento": "AMAZONAS",
            "codigo": "263",
            "ciudad": "EL ENCANTO"
        },
        {
            "codigo departamento": "91",
            "departamento": "AMAZONAS",
            "codigo": "405",
            "ciudad": "LA CHORRERA"
        },
        {
            "codigo departamento": "91",
            "departamento": "AMAZONAS",
            "codigo": "407",
            "ciudad": "LA PEDRERA"
        },
        {
            "codigo departamento": "91",
            "departamento": "AMAZONAS",
            "codigo": "430",
            "ciudad": "LA VICTORIA"
        },
        {
            "codigo departamento": "91",
            "departamento": "AMAZONAS",
            "codigo": "460",
            "ciudad": "MIRITI - PARANA"
        },
        {
            "codigo departamento": "91",
            "departamento": "AMAZONAS",
            "codigo": "530",
            "ciudad": "PUERTO ALEGRIA"
        },
        {
            "codigo departamento": "91",
            "departamento": "AMAZONAS",
            "codigo": "536",
            "ciudad": "PUERTO ARICA"
        },
        {
            "codigo departamento": "91",
            "departamento": "AMAZONAS",
            "codigo": "540",
            "ciudad": "PUERTO NARIÑO"
        },
        {
            "codigo departamento": "91",
            "departamento": "AMAZONAS",
            "codigo": "669",
            "ciudad": "PUERTO SANTANDER"
        },
        {
            "codigo departamento": "91",
            "departamento": "AMAZONAS",
            "codigo": "798",
            "ciudad": "TARAPACA"
        },
        {
            "codigo departamento": "94",
            "departamento": "GUAINIA",
            "codigo": "001",
            "ciudad": "INIRIDA"
        },
        {
            "codigo departamento": "94",
            "departamento": "GUAINIA",
            "codigo": "343",
            "ciudad": "BARRANCO MINAS"
        },
        {
            "codigo departamento": "94",
            "departamento": "GUAINIA",
            "codigo": "663",
            "ciudad": "MAPIRIPANA"
        },
        {
            "codigo departamento": "94",
            "departamento": "GUAINIA",
            "codigo": "883",
            "ciudad": "SAN FELIPE"
        },
        {
            "codigo departamento": "94",
            "departamento": "GUAINIA",
            "codigo": "884",
            "ciudad": "PUERTO COLOMBIA"
        },
        {
            "codigo departamento": "94",
            "departamento": "GUAINIA",
            "codigo": "885",
            "ciudad": "LA GUADALUPE"
        },
        {
            "codigo departamento": "94",
            "departamento": "GUAINIA",
            "codigo": "886",
            "ciudad": "CACAHUAL"
        },
        {
            "codigo departamento": "94",
            "departamento": "GUAINIA",
            "codigo": "887",
            "ciudad": "PANA PANA"
        },
        {
            "codigo departamento": "94",
            "departamento": "GUAINIA",
            "codigo": "888",
            "ciudad": "MORICHAL"
        },
        {
            "codigo departamento": "95",
            "departamento": "GUAVIARE",
            "codigo": "001",
            "ciudad": "SAN JOSE DEL GUAVIARE"
        },
        {
            "codigo departamento": "95",
            "departamento": "GUAVIARE",
            "codigo": "015",
            "ciudad": "CALAMAR"
        },
        {
            "codigo departamento": "95",
            "departamento": "GUAVIARE",
            "codigo": "025",
            "ciudad": "EL RETORNO"
        },
        {
            "codigo departamento": "95",
            "departamento": "GUAVIARE",
            "codigo": "200",
            "ciudad": "MIRAFLORES"
        },
        {
            "codigo departamento": "97",
            "departamento": "VAUPES",
            "codigo": "001",
            "ciudad": "MITU"
        },
        {
            "codigo departamento": "97",
            "departamento": "VAUPES",
            "codigo": "161",
            "ciudad": "CARURU"
        },
        {
            "codigo departamento": "97",
            "departamento": "VAUPES",
            "codigo": "511",
            "ciudad": "PACOA"
        },
        {
            "codigo departamento": "97",
            "departamento": "VAUPES",
            "codigo": "666",
            "ciudad": "TARAIRA"
        },
        {
            "codigo departamento": "97",
            "departamento": "VAUPES",
            "codigo": "777",
            "ciudad": "PAPUNAUA"
        },
        {
            "codigo departamento": "97",
            "departamento": "VAUPES",
            "codigo": "889",
            "ciudad": "YAVARATE"
        },
        {
            "codigo departamento": "99",
            "departamento": "VICHADA",
            "codigo": "001",
            "ciudad": "PUERTO CARREÑO"
        },
        {
            "codigo departamento": "99",
            "departamento": "VICHADA",
            "codigo": "524",
            "ciudad": "LA PRIMAVERA"
        },
        {
            "codigo departamento": "99",
            "departamento": "VICHADA",
            "codigo": "624",
            "ciudad": "SANTA ROSALIA"
        },
        {
            "codigo departamento": "99",
            "departamento": "VICHADA",
            "codigo": "773",
            "ciudad": "CUMARIBO"
        }
    ];


    let { ciudad, departamento } = cities.filter(ciudad => department === ciudad['codigo departamento'] && city === ciudad['codigo'])[0];

    return { ciudad, departamento };

}

// EXPORT
module.exports = {
    searchCity
};