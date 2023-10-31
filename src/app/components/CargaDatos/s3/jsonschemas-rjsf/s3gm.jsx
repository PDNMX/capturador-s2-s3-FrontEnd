let data = {
  definitions: {
    entidad: {
      enumNames: [
        "Aguascalientes",
        "Baja California",
        "Baja California Sur",
        "Campeche",
        "Coahuila de Zaragoza",
        "Colima",
        "Chiapas",
        "Chihuahua",
        "Ciudad de México",
        "Durango",
        "Guanajuato",
        "Guerrero",
        "Hidalgo",
        "Jalisco",
        "México",
        "Michoacán de Ocampo",
        "Morelos",
        "Nayarit",
        "Nuevo León",
        "Oaxaca",
        "Puebla",
        "Querétaro",
        "Quintana Roo",
        "San Luis Potosí",
        "Sinaloa",
        "Sonora",
        "Tabasco",
        "Tamaulipas",
        "Tlaxcala",
        "Veracruz de Ignacio de la Llave",
        "Yucatán",
        "Zacatecas",
      ],
      enum: [
        { clave: "01", valor: "Aguascalientes" },
        { clave: "02", valor: "Baja California" },
        { clave: "03", valor: "Baja California Sur" },
        { clave: "04", valor: "Campeche" },
        { clave: "05", valor: "Coahuila de Zaragoza" },
        { clave: "06", valor: "Colima" },
        { clave: "07", valor: "Chiapas" },
        { clave: "08", valor: "Chihuahua" },
        { clave: "09", valor: "Ciudad de México" },
        { clave: "10", valor: "Durango" },
        { clave: "11", valor: "Guanajuato" },
        { clave: "12", valor: "Guerrero" },
        { clave: "13", valor: "Hidalgo" },
        { clave: "14", valor: "Jalisco" },
        { clave: "15", valor: "México" },
        { clave: "16", valor: "Michoacán de Ocampo" },
        { clave: "17", valor: "Morelos" },
        { clave: "18", valor: "Nayarit" },
        { clave: "19", valor: "Nuevo León" },
        { clave: "20", valor: "Oaxaca" },
        { clave: "21", valor: "Puebla" },
        { clave: "22", valor: "Querétaro" },
        { clave: "23", valor: "Quintana Roo" },
        { clave: "24", valor: "San Luis Potosí" },
        { clave: "25", valor: "Sinaloa" },
        { clave: "26", valor: "Sonora" },
        { clave: "27", valor: "Tabasco" },
        { clave: "28", valor: "Tamaulipas" },
        { clave: "29", valor: "Tlaxcala" },
        { clave: "30", valor: "Veracruz de Ignacio de la Llave" },
        { clave: "31", valor: "Yucatán" },
        { clave: "32", valor: "Zacatecas" },
      ],
    },
    general: {
      type: "object",
      required: ["nombres", "primerApellido", "segundoApellido", "rfc", "curp"],
      properties: {
        nombres: {
          type: "string",
          title: "Nombre (s)",
          description:
            "Escribir el o los nombres, sin abreviaturas, ni signos especiales.",
        },
        primerApellido: {
          type: "string",
          title: "Primer Apellido",
          description:
            "Escribir el primer apellido sin abreviaturas, ni signos especiales.",
        },
        segundoApellido: {
          type: "object",
          properties: {
            sinSegundoApellido: {
              type: "boolean",
              default: false,
              title: "No tengo segundo apellido",
            },
          },
          dependencies: {
            sinSegundoApellido: {
              oneOf: [
                {
                  properties: {
                    sinSegundoApellido: { const: true },
                  },
                  required: ["sinSegundoApellido"],
                },
                {
                  properties: {
                    sinSegundoApellido: { const: false },
                    valor: {
                      type: "string",
                      title: "Segundo Apellido",
                      description:
                        "Escribir el segundo apellido , sin abreviaturas, ni signos especiales.",
                    },
                  },
                  required: ["sinSegundoApellido", "valor"],
                },
              ],
            },
          },
        },
        rfc: {
          type: "string",
          title: "RFC con homoclave",
          description:
            "Escribir los primeros diez caracteres básicos y los tres correspondientes a la homoclave. En caso de no contar con este dato, podrá consultarlo en la página del Servicio de Administración Tributaria: https://www.sat.gob.mx/aplicacion/operacion/31274/consulta-tu-clave-de-rfc-mediante-curp",
        },
        curp: {
          type: "string",
          title: "CURP",
          description:
            "Escribir los dieciocho caracteres alfanuméricos como la emitió la Secretaría de Gobernación.  En caso de no contar con ella, podrá consultarla en la siguiente página: https://www.gob.mx/curp/",
        },
      },
    },
    constancias: {
      type: "object",
      properties: {
        sinConstancia: {
          type: "boolean",
          default: false,
          title: "No existe constancia",
        },
      },
      dependencies: {
        sinConstancia: {
          oneOf: [
            {
              properties: {
                sinConstancia: { const: false },
                titulo: {
                  type: "string",
                  title: "Título de la constancia de la sanción",
                  description:
                    "Proporcionar el nombre del título de la constancia de la persona moral.",
                },
                fecha: {
                  type: "string",
                  format: "date",
                  title: "Fecha de la constancia de la sanción",
                  description:
                    "Indicar la fecha de expedición de la constancia de la persona moral en formato dd-mm-aaaa.",
                },
                url: {
                  type: "string",
                  title: "URL del documento digital",
                  description:
                    "Colocar el enlace o link del documento digital de la constancia.",
                },
              },
              required: ["sinConstancia", "titulo", "fecha", "url"],
            },
            {
              properties: {
                sinConstaancia: { const: true },
              },
              required: ["sinConstancia"],
            },
          ],
        },
      },
    },
  },
  type: "object",
  required: ["expediente", "graveMorales"],
  properties: {
    expediente: {
      type: "string",
      title: "Expediente",
      description:
        "Capturar el número que refiere al procedimiento único que da inicio en materia de responsabilidades administrativas.",
    },
    graveMorales: {
      title: "1. DATOS GENERALES DE LA PERSONA MORAL",
      description:
        "Indicar los datos generales de la persona moral sancionados.",
      type: "object",
      required: [
        "rfc",
        "razonSocial",
        "telefono",
        "objetoSocial",
        "domicilioMexico",
        "entePublico",
        "faltaCometida",
        "origenFalta",
        "resolucion",
        "tipoSancion",
        "observaciones",
      ],
      properties: {
        rfc: {
          type: "string",
          title: "RFC con homoclave",
        },
        razonSocial: {
          type: "string",
          title: "Denominación razón social",
          description:
            "Indicar la denominación o razón social de la empresa tal y como se encuentra registrada en la escritura pública.",
        },
        telefono: {
          type: "string",
          title: "Telefono",
        },
        objetoSocial: {
          type: "string",
          title: "Objeto social de la actividad",
          description:
            "Describir la o las actividades principales que lleva a cabo la persona moral.",
        },
        domicilioMexico: {
          type: "object",
          title: "Domicilio",
          properties: {
            domicilioExtranjero: {
              type: "boolean",
              default: false,
              title: "Domicilio extranjero",
            },
          },
          dependencies: {
            domicilioExtranjero: {
              oneOf: [
                {
                  properties: {
                    domicilioExtranjero: { const: false },
                    vialidad: {
                      type: "object",
                      required: ["clave", "valor", "numeroExterior", "colonia"],
                      properties: {
                        clave: {
                          type: "string",
                          title: "Tipo de vialidad",
                          description:
                            "Colocar el nombre de la vialidad correspondiente con base al catálogo de vialidades del marco Geoestadístico Nacional. https://www.inegi.org.mx/temas/mg/#Documentacion",
                        },
                        valor: {
                          type: "string",
                          title: "Nombre de la vialidad",
                          description:
                            "Escribir el nombre completo de la calle, boulevard, avenida, etc.",
                        },
                        numeroExterior: {
                          type: "string",
                          title: "Número exterior",
                          description: "Escribir el número exterior.",
                        },
                        numeroInterior: {
                          type: "string",
                          title: "Número interior",
                          description: "Escribir el número interior.",
                        },
                        colonia: {
                          type: "string",
                          title: "Colonia",
                          description:
                            "Escribir el nombre completo de la colonia.",
                        },
                      },
                    },
                    localidad: {
                      type: "string",
                      title: "Localidad",
                      description: "Nombre de la localidad.",
                    },
                    municipio: {
                      type: "string",
                      title: "Municipio",
                      description: "Nombre del municipio/alcaldia.",
                    },
                    codigoPostal: {
                      type: "integer",
                      title: "Codigo Postal",
                      description: "Escribir el número código postal.",
                    },
                    entidadFederativa: {
                      title: "Entidad federativa",
                      description:
                        "Seleccionar la entidad federativa que corresponda al domicilio completo previamente documentado.",
                      $ref: "#/definitions/entidad",
                    },
                  },
                  required: [
                    "vialidad",
                    "localidad",
                    "municipio",
                    "codigoPostal",
                    "entidadFederativa",
                  ],
                },
                {
                  properties: {
                    domicilioExtranjero: { const: true },
                    ciudadLocalidad: {
                      type: "string",
                      title: "Ciudad",
                      description:
                        "Escribir el nombre de la localidad del domicilio extranjero.",
                    },
                    estadoProvincia: {
                      type: "string",
                      title: "Provincia",
                      description:
                        "Escribir el nombre del estado/provincia del domicilio extranjero.",
                    },
                    calle: {
                      type: "string",
                      title: "Calle",
                      description:
                        "Escribir el nombre de la calle del domicilio extranjero.",
                    },
                    numeroExterior: {
                      type: "string",
                      title: "Numero Exterior",
                      description:
                        "Escribir el numero exterior del domicilio extranjero.",
                    },
                    numeroInterior: {
                      type: "string",
                      title: "Numero Interior",
                      description:
                        "Escribir el numero interior del domicilio extranjero.",
                    },
                    codigoPostal: {
                      type: "integer",
                      title: "Codigo Postal",
                      description:
                        "Escribir el codigo postal del domicilio extranjero.",
                    },
                    pais: {
                      type: "string",
                      title: "Pais",
                      description:
                        "Nombre del país especificado en estándar ISO3166.",
                    },
                  },
                  required: [
                    "domicilioExtranjero",
                    "ciudadLocalidad",
                    "estadoProvincia",
                    "calle",
                    "numeroExterior",
                    "numeroInterior",
                    "codigoPostal",
                    "pais",
                  ],
                },
              ],
            },
          },
        },
        directorApoderado: {
          type: "object",
          title:
            "2. DATOS GENERALES DEL DIRECTOR GENERAL Y APODERADO LEGAL DE LA PERSONA MORAL",
          properties: {
            directorGeneral: {
              title: "Director general de la persona moral",
              $ref: "#/definitions/general",
            },
            representanteLegal: {
              title: "Representante legal de la persona moral",
              $ref: "#/definitions/general",
            },
          },
        },
        entePublico: {
          type: "object",
          title:
            "3. DATOS DEL ENTE PÚBLICO EN DONDE SE COMETIÓ LA FALTA ADMINISTRATIVA",
          description:
            "Indicar los datos de empleo, cargo o comisión conforme a los catálogos de cada sección.",
          required: [
            "entidadFederativa",
            "nivelOdenGobierno",
            "ambitoPublico",
            "nombre",
            "siglas",
          ],
          properties: {
            entidadFederativa: {
              title: "Entidad federativa",
              description:
                "Seleccionar la entidad federativa en la cual se localiza el ente público donde labora la persona moral sancionada.",
              $ref: "#/definitions/entidad",
            },
            nivelOdenGobierno: {
              type: "object",
              properties: {
                clave: {
                  title: "Nivel/Orden de Gobierno",
                  description:
                    "Seleccionar el orden de gobierno al que pertenece el ente público donde labora la persona moral sancionada: Federal, Estatal, Municipal/Alcaldía u otro (especificar).",
                  enum: ["FEDERAL", "ESTATAL", "MUNICIPAL_ALCALDIA", "OTRO"],
                  enumNames: [
                    "Federal",
                    "Estatal",
                    "Municipal y/o Alcadía",
                    "Otro",
                  ],
                },
              },
              required: ["clave"],
              dependencies: {
                clave: {
                  oneOf: [
                    {
                      properties: {
                        clave: {
                          enum: ["OTRO"],
                        },
                        valor: {
                          title: "Otro",
                          description: "Especifique",
                          type: "string",
                        },
                      },
                      required: ["valor"],
                    },
                    {
                      properties: {
                        clave: {
                          enum: ["FEDERAL", "ESTATAL", "MUNICIPAL_ALCALDIA"],
                        },
                      },
                    },
                  ],
                },
              },
            },
            ambitoPublico: {
              type: "string",
              title: "Ambito público",
              description:
                "Seleccionar el poder u órgano de gobierno del ente público donde labora la persona moral sancionada: Ejecutivo, Legislativo, Judicial u Órgano autónomo.",
              enum: ["EJECUTIVO", "LEGISLATIVO", "JUDICIAL", "ORGANO_AUTONOMO"],
              enumNames: [
                "Ejecutivo",
                "Legislativo",
                "Judicial",
                "Órgano autónomo",
              ],
            },
            nombre: {
              type: "string",
              title: "Nombre del ente público",
              description:
                "Escribir el nombre completo del ente público donde labora la persona moral sancionada, sin abreviaturas, ni signos especiales.",
            },
            siglas: {
              type: "string",
              title: "Siglas del ente público",
              description:
                "Escribir las siglas del ente público en el que labora la persona moral sancionada.",
            },
          },
        },
        origenFalta: {
          type: "object",
          title: "4. ORIGEN DE LA FALTA ADMINISTRATIVA",
          description:
            "Indicar el origen y tipo de falta cometida conforme a los catálogos de cada sección.",
          properties: {
            clave: {
              title: "Origen de la falta administrativa",
              description:
                "Seleccionar conforme al catálogo el origen de la falta administrativa:",
              enum: [
                "AUDITORIA_SUPERIOR",
                "AUDITORIA_OIC",
                "QUEJA",
                "DENUNCIA_CIUDADADA",
                "DENUNCIA_SP",
                "OFICIO",
                "OTRO",
              ],
              enumNames: [
                "Auditoria superior de la federacion o entidades de fiscalizacion superior de la entidades federativas",
                "Auditoria del organo interno de control del ente publico",
                "Queja ciudadana",
                "Denuncia ciudadana",
                "Denuncia de servidor publico",
                "Oficio",
                "Otro",
              ],
            },
          },
          required: ["clave"],
          dependencies: {
            clave: {
              oneOf: [
                {
                  properties: {
                    clave: {
                      enum: ["OTRO"],
                    },
                    valor: {
                      title: "Otro",
                      description: "Especifique",
                      type: "string",
                    },
                  },
                  required: ["valor"],
                },
                {
                  properties: {
                    clave: {
                      enum: [
                        "AUDITORIA_SUPERIOR",
                        "AUDITORIA_OIC",
                        "QUEJA",
                        "DENUNCIA_CIUDADADA",
                        "DENUNCIA_SP",
                        "OFICIO",
                      ],
                    },
                  },
                },
              ],
            },
          },
        },
        faltaCometida: {
          type: "array",
          title: "5. FALTA COMETIDA DE LA PERSONA MORAL",
          items: {
            type: "object",
            title: "Falta cometida",
            required: [
              "clave",
              "nombreNormatividadInfringida",
              "articuloNormatividadInfringida",
              "fraccionNormatividadInfringida",
            ],
            properties: {
              clave: {
                title: "Falta cometida",
                description:
                  "Seleccionar el tipo de falta cometida por parte de la persona moral sancionada.",
                enum: [
                  "SOBORNO",
                  "PARTICIPACION_ILICITA",
                  "TRAFICO_DE_INFLUENCIAS",
                  "UTILIZACION_DE_INFORMACION_FALSA",
                  "COLUSION",
                  "OBSTRUCCION_DE_FACULTADES",
                  "CONTRATACION_INDEBIDA",
                  "USO_INDEBIDO_DE_RECURSOS_PUBLICOS",
                  "OTRO",
                ],
                enumNames: [
                  "Soborno",
                  "Participación ilícita",
                  "Tráfico de influencias",
                  "Utilización de información falsa",
                  "Colusión",
                  "Obstrucción de facultades",
                  "Contratación indebida",
                  "Uso indebido de recursos públicos",
                  "Otro",
                ],
              },
              nombreNormatividadInfringida: {
                type: "string",
                title: "Ley y/o normatividad infringida",
                description:
                  "Escribir el nombre de la ley o normatividad infringida por la persona moral.",
              },
              articuloNormatividadInfringida: {
                type: "array",
                title: "Artículo(s) de la normatividad infringida",
                items: {
                  title: "Artículo",
                  type: "string",
                  description:
                    "Escribir el artículo(s) infringido de la normatividad infringida.",
                },
              },
              fraccionNormatividadInfringida: {
                type: "array",
                title: "Fracción(es) de la normatividad infringida",
                items: {
                  title: "Fracción",
                  type: "string",
                  description:
                    "Escribir la fracción(es) infringida de la normatividad infringida.",
                },
              },
            },
            dependencies: {
              clave: {
                oneOf: [
                  {
                    properties: {
                      clave: {
                        enum: ["OTRO"],
                      },
                      valor: {
                        title: "Otro",
                        description: "Especifique",
                        type: "string",
                      },
                    },
                    required: ["valor"],
                  },
                  {
                    properties: {
                      clave: {
                        enum: [
                          "SOBORNO",
                          "PARTICIPACION_ILICITA",
                          "TRAFICO_DE_INFLUENCIAS",
                          "UTILIZACION_DE_INFORMACION_FALSA",
                          "COLUSION",
                          "OBSTRUCCION_DE_FACULTADES",
                          "CONTRATACION_INDEBIDA",
                          "USO_INDEBIDO_DE_RECURSOS_PUBLICOS",
                        ],
                      },
                    },
                  },
                ],
              },
            },
          },
        },
        resolucion: {
          type: "object",
          title: "6. RESOLUCIÓN",
          description: "Indicar la resolución de la falta cometida.",
          required: [
            "documentoResolucion",
            "fechaResolucion",
            "fechaNotificacion",
            "fechaResolucionFirme",
            "url",
          ],
          properties: {
            documentoResolucion: {
              type: "string",
              title: "Titulo del documento",
              description:
                "Escribir el nombre del documento de la sentencia definitiva que resuelve el procedimiento de responsabilidad administrativa y que ha quedado firme.",
            },
            fechaResolucion: {
              type: "string",
              format: "date",
              title: "Fecha de resolución",
              description:
                "Registrar la echa en la que se emite la resolución sancionatoria de la persona moral sancionada en formato dd-mm-aaaa.",
            },
            fechaNotificacion: {
              type: "string",
              format: "date",
              title: "Fecha de notificación",
              description:
                "Registrar la fecha en la que se le notifica al servidor público su sentencia en formato dd-mm-aaaa",
            },
            fechaResolucionFirme: {
              type: "string",
              format: "date",
              title: "Fecha de resolución firme",
              description:
                "Registrar la fecha en que quedó firme la  sentencia de la persona moral en formato dd-mm-aaaa.",
            },
            url: {
              type: "string",
              title: "URL del documento en formato digital",
              description:
                "Colocar el enlace o link de la resolución emitida por la autoridad sancionadora a la que corresponde la sanción en su versión pública.",
            },
          },
        },
        tipoSancion: {
          type: "object",
          title: "7. TIPO DE SANCIÓN APLICADA A LA PERSONA MORAL",
          description: "Indicar el tipo de sanción impuesta",
          required: [
            "ordenJurisdiccional",
            "autoridadSancionadora",
            "autoridadInvestigadora",
            "autoridadSubstanciadora",
            "sancion",
          ],
          properties: {
            ordenJurisdiccional: {
              title: "Orden jurisdiccional de la sanción.",
              description:
                "Seleccionar la opción correspondiente al nivel de la orden jurisdiccional de la sanción.",
              enum: ["FEDERAL", "ESTATAL"],
              enumNames: ["Federal", "Estatal"],
            },
            autoridadSancionadora: {
              type: "string",
              title: "Nombre de la autoridad sancionadora",
              description:
                "Indicar el nombre de la autoridad sancionadora facultada para aplicar la sanción.",
            },
            autoridadInvestigadora: {
              type: "string",
              title: "Nombre de la autoridad investigadora",
              description: "Indicar el nombre de la autoridad invetigadora.",
            },
            autoridadSubstanciadora: {
              type: "string",
              title: "Nombre de la autoridad substanciadora.",
              description: "Indicar el nombre de la autoridad substanciadora.",
            },
            sancion: {
              type: "array",
              title: "Tipo de sancion",
              items: {
                type: "object",
                title: "Tipo de sancion",
                required: ["clave"],
                properties: {
                  clave: {
                    title: "Tipo de sancion",
                    description:
                      "Elegir una o varias sanciones que fueron dictaminadas en la resolución, conforme a la o las elecciones del catálogo, es como deberá llenarse el resto del formato. Se podrán elegir de las siguientes opciones:",
                    enum: [
                      "INHABILITACION",
                      "INDEMNIZACION",
                      "SANCION_ECONOMICA",
                      "SUSPENSION_DE_ACTIVIDADES",
                      "DISOLUCION_DE_LA_SOCIEDAD",
                      "OTRO",
                    ],
                    enumNames: [
                      "Inhabilitación",
                      "Indemnización",
                      "Sanción económica",
                      "Suspensión de actividades",
                      "Disolución de la sociedad",
                      "Otro",
                    ],
                  },
                },
                dependencies: {
                  clave: {
                    oneOf: [
                      {
                        properties: {
                          clave: {
                            enum: ["INHABILITACION"],
                          },
                          descripcion: {
                            type: "string",
                            title: "Descripción",
                            description:
                              "Descripción o nota aclaratoria del tipo de sanción infringida.",
                          },
                          inhabilitacion: {
                            type: "object",
                            title: "INHABILITACIÓN",
                            required: [
                              "plazo",
                              "fechaInicial",
                              "fechaFinal",
                              "constancia",
                            ],
                            properties: {
                              plazo: {
                                type: "object",
                                title: "Plazo de la sanción",
                                description:
                                  "Colocar el plazo de pago de la inhabilitación de la persona moral, empezando por año(s), mes(es) y día(s).",
                                required: ["año", "mes", "dia"],
                                properties: {
                                  año: { title: "Año(s)", type: "string" },
                                  mes: { title: "Mes(es)", type: "string" },
                                  dia: { title: "Día(s)", type: "string" },
                                },
                              },
                              fechaInicial: {
                                type: "string",
                                format: "date",
                                title: "Fecha inicial de la inhabilitación",
                                description:
                                  "Registrar la fecha en la que inició la inhabilitación de la persona moral en formato dd-mm-aaaa.",
                              },
                              fechaFinal: {
                                type: "string",
                                format: "date",
                                title: "Fecha final de la inhabilitación",
                                description:
                                  "Indicar la fecha en la que se concluyó la inhabilitación de la persona moral en formato dd-mm-aaaa.",
                              },
                              constancia: {
                                title: "Constancia de la inhabilitación",
                                $ref: "#/definitions/constancias",
                              },
                            },
                          },
                        },
                        required: ["descripcion", "inhabilitacion"],
                      },
                      {
                        properties: {
                          clave: {
                            enum: ["INDEMNIZACION"],
                          },
                          descripcion: {
                            type: "string",
                            title: "Descripción",
                            description:
                              "Descripción o nota aclaratoria del tipo de sanción infringida.",
                          },
                          indemnizacion: {
                            type: "object",
                            title: "INDEMNIZACIÓN",
                            required: [
                              "monto",
                              "moneda",
                              "plazo",
                              "cobrado",
                              "constancia",
                            ],
                            properties: {
                              monto: {
                                type: "number",
                                title: "Monto",
                                description:
                                  "Colocar el monto total correspondiente a la indemnización.",
                              },
                              moneda: {
                                title: "Moneda",
                                description:
                                  "Seleccionar el tipo de moneda en formato de tres letras, establecidos en el ISO 4217.",
                                enum: ["MXN", "UMA"],
                              },
                              plazo: {
                                type: "object",
                                title: "Plazo de la sanción",
                                description:
                                  "Colocar el plazo de pago de la indemnización de la persona moral, empezando por año(s), mes(es) y día(s).",
                                required: ["año", "mes", "dia"],
                                properties: {
                                  año: { title: "Año", type: "string" },
                                  mes: { title: "Mes", type: "string" },
                                  dia: { title: "Día", type: "string" },
                                },
                              },
                              cobrado: {
                                type: "object",
                                title: "Indemnización efectivamente cobrada",
                                required: [
                                  "monto",
                                  "moneda",
                                  "fecha",
                                  "fechaPagoSancion",
                                ],
                                properties: {
                                  monto: {
                                    type: "number",
                                    title: "Monto",
                                    description:
                                      "Colocar el monto total correspondiente a la indemnización cobrada.",
                                  },
                                  moneda: {
                                    title: "Moneda",
                                    description:
                                      "Seleccionar el tipo de moneda en formato de tres letras, establecidos en el ISO 4217.",
                                    enum: ["MXN", "UMA"],
                                  },
                                  fecha: {
                                    type: "string",
                                    format: "date",
                                    title: "Fecha de cobreo de la sanción",
                                    description:
                                      "Registrar la fecha en que se realizó el cobro de la indemnización en formato dd-mm-aaaa.",
                                  },
                                  fechaPagoSancion: {
                                    type: "string",
                                    format: "date",
                                    title:
                                      "Fecha en la que se realizo el pago total de la sanción",
                                    description:
                                      "En caso de no pagarse en una sola exhibición la indemnización, especificar la fecha en que la persona moral cubrió el pago total de la sanción económica en formato dd-mm-aaaa.",
                                  },
                                },
                              },
                              constancia: {
                                title: "Constancia de la indemnización",
                                $ref: "#/definitions/constancias",
                              },
                            },
                          },
                        },
                        required: ["descripcion", "indemnizacion"],
                      },
                      {
                        properties: {
                          clave: {
                            enum: ["SANCION_ECONOMICA"],
                          },
                          descripcion: {
                            type: "string",
                            title: "Descripción",
                            description:
                              "Descripción o nota aclaratoria del tipo de sanción infringida.",
                          },
                          sancionEconomica: {
                            type: "object",
                            title: "SANCIÓN ECONÓMICA",
                            required: [
                              "monto",
                              "moneda",
                              "plazo",
                              "cobrado",
                              "constancia",
                            ],
                            properties: {
                              monto: {
                                type: "number",
                                title: "Monto",
                                description:
                                  "Colocar el monto total correspondiente a la sanción económica.",
                              },
                              moneda: {
                                title: "Moneda",
                                description:
                                  "Seleccionar el tipo de moneda en formato de tres letras, establecidos en el ISO 4217.",
                                enum: ["MXN", "UMA"],
                              },
                              plazo: {
                                type: "object",
                                title: "Plazo de la sanción",
                                description:
                                  "Colocar el plazo de pago de la sanción económica de la persona moral, empezando por año(s), mes(es) y día(s).",
                                required: ["año", "mes", "dia"],
                                properties: {
                                  año: { title: "Año", type: "string" },
                                  mes: { title: "Mes", type: "string" },
                                  dia: { title: "Día", type: "string" },
                                },
                              },
                              cobrado: {
                                type: "object",
                                title:
                                  "Sanción económica efectivamente cobrada",
                                required: [
                                  "monto",
                                  "moneda",
                                  "fecha",
                                  "fechaPagoSancion",
                                ],
                                properties: {
                                  monto: {
                                    type: "number",
                                    title: "Monto",
                                    description:
                                      "Colocar el monto total correspondiente a la sanción económica cobrada.",
                                  },
                                  moneda: {
                                    title: "Moneda",
                                    description:
                                      "Seleccionar el tipo de moneda en formato de tres letras, establecidos en el ISO 4217.",
                                    enum: ["MXN", "UMA"],
                                  },
                                  fecha: {
                                    type: "string",
                                    format: "date",
                                    title: "Fecha de cobreo de la sanción",
                                    description:
                                      "Registrar la fecha en que se realizó el cobro de la sanción económica en formato dd-mm-aaaa.",
                                  },
                                  fechaPagoSancion: {
                                    type: "string",
                                    format: "date",
                                    title:
                                      "Fecha en la que se realizo el pago total de la sanción",
                                    description:
                                      "En caso de no pagarse en una sola exhibición la sanción económica, especificar la fecha en que la persona moral cubrió el pago total de la sanción económica en formato dd-mm-aaaa.",
                                  },
                                },
                              },
                              constancia: {
                                title: "Constancia de la sanción",
                                $ref: "#/definitions/constancias",
                              },
                            },
                          },
                        },
                        required: ["descripcion", "sancionEconomica"],
                      },
                      {
                        properties: {
                          clave: {
                            enum: ["SUSPENSION_DE_ACTIVIDADES"],
                          },
                          descripcion: {
                            type: "string",
                            title: "Descripción",
                            description:
                              "Descripción o nota aclaratoria del tipo de sanción infringida.",
                          },
                          suspensionActividades: {
                            type: "object",
                            title: "SUSPENSIÓN DE ACTIVIDADES",
                            required: [
                              "fechaInicial",
                              "fechaFinal",
                              "constancia",
                            ],
                            properties: {
                              fechaInicial: {
                                title: "Fecha inicial",
                                type: "string",
                                format: "date",
                                description:
                                  "Registrar la fecha en la que inició la suspensión de actividades de la persona moral en formato dd-mm-aaaa.",
                              },
                              fechaFinal: {
                                title: "Fecha final",
                                type: "string",
                                format: "date",
                                description:
                                  "Indicar la fecha en la que se concluyó la suspensión de actividades de la persona moral en formato dd-mm-aaaa.",
                              },
                              constancia: {
                                title: "Constancia de la suspensión de actividades",
                                $ref: "#/definitions/constancias",
                              },
                            },
                          },
                        },
                        required: ["descripcion", "suspensionActividades"],
                      },
                      {
                        properties: {
                          clave: {
                            enum: ["DISOLUCION_DE_LA_SOCIEDAD"],
                          },
                          descripcion: {
                            type: "string",
                            title: "Descripción",
                            description:
                              "Descripción o nota aclaratoria del tipo de sanción infringida.",
                          },
                          disolucionSociedad: {
                            type: "object",
                            title: "DISOLUCIÓN DE LA SOCIEDAD",
                            required: ["fechaDisolucion", "constancia"],
                            properties: {
                              fechaDisolucion: {
                                title: "Fecha inicial",
                                type: "string",
                                format: "date",
                                description:
                                  "Indicar la fecha a partir de la cual se disuleve la sociedad en formato dd-mm-aaaa.",
                              },
                              constancia: {
                                title: "Constancia de la disolución de la sociedad",
                                $ref: "#/definitions/constancias",
                              },
                            },
                          },
                        },
                        required: ["descripcion", "disolucionSociedad"],
                      },
                      {
                        properties: {
                          clave: {
                            enum: ["OTRO"],
                          },
                          valor: {
                            title: "Otro",
                            description: "Especifique",
                            type: "string",
                          },
                          descripcion: {
                            type: "string",
                            title: "Descripción",
                            description:
                              "Descripción o nota aclaratoria del tipo de sanción infringida.",
                          },
                          otro: {
                            type: "object",
                            title: "OTRO",
                            required: ["nombre", "urlDocumento"],
                            properties: {
                              nombre: {
                                title: "Nombre de la sanción",
                                type: "string",
                                description:
                                  "Escribir el título de la constancia de la sanción impuesta.",
                              },
                              urlDocumento: {
                                type: "string",
                                title: "URL del documento digital",
                                description:
                                  "Colocar el enlace o link del documento digital de la constancia.",
                              },
                            },
                          },
                        },
                        required: ["valor", "descripcion", "otro"],
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        observaciones: {
          title: "8. OBSERVACIONES",
          type: "string",
          description:
            "En este espacio se podrán realizar las observaciones que se consideren pertinentes. aclaraciones u En virtud de que las aclaraciones pueden contener información reservada y/o confidencial, esta información no será de carácter pública.",
        },
      },
    },
  },
};

export default data;
