let data = {
  type: "object",
  properties: {
    tipoDeFalta: {
      title: "Tipo de Falta",
      description: "Selecciona el tipo de falta a registrar",
      type: "string",
      enumNames: ["No Grave", "Grave"],
      enum: ["NO_GRAVE", "GRAVE"],
    },
  },
  required: ["tipoDeFalta"],
  dependencies: {
    tipoDeFalta: {
      oneOf: [
        {
          properties: {
            tipoDeFalta: {
              enum: ["NO_GRAVE"],
            },
            faltaNoGrave: {
              title: "No Grave",
              description:
                "Faltas no graves de servidores publicos sancionados",
              type: "object",
              required: [
                "id",
                "fechaCaptura",
                "expediente",
                "nombres",
                "primerApellido",
                "segundoApellido",
                "curp",
                "rfc",
                "sexo",
                "entePublico",
                "empleoCargoComision",
                "origenInvestigacion",
                "faltaCometida",
                "resolucion",
                "autoridadSancionadora",
                "ordenJurisdiccionalSancion",
                "tipoSancion",
                "observaciones",
              ],
              properties: {
                id: {
                  type: "string",
                  description:
                    "Dato que permite identificar de manera unívoca el registro.",
                  example: "12345",
                },
                fechaCaptura: {
                  type: "string",
                  format: "date-time",
                  description:
                    "Fecha y hora en la que se agrega o modifica el registro en formato ISO 8601.",
                  example: "2023-07-19T12:00:00.000Z",
                },
                expediente: {
                  type: "string",
                  description:
                    "Número de expediente del procedimiento que se inicie en materia de responsabilidades administrativas.",
                  example: "EXP-2023-456",
                },
                nombres: {
                  type: "string",
                  description:
                    "Nombre(s) de la persona servidora pública que interviene en alguno de los procedimientos citados en el objeto del sistema.\n",
                  example: "Juan",
                },
                primerApellido: {
                  type: "string",
                  description:
                    "Primer apellido de la persona servidora pública que interviene en alguno de los procedimientos citados en el objeto del sistema.",
                  example: "Pérez",
                },
                segundoApellido: {
                  type: "string",
                  description:
                    "Segundo apellido de la persona servidora pública que interviene en alguno de los procedimientos citados en el objeto del sistema.",
                  example: "Gómez",
                },
                curp: {
                  type: "string",
                  description:
                    "CURP de la persona servidora pública que interviene en alguno de los procedimientos citados en el objeto del sistema.",
                  example: "PERG850101HDF",
                },
                rfc: {
                  type: "string",
                  description:
                    "RFC con homoclave de la persona servidora pública que interviene en alguno de los procedimientos citados en el objeto del sistema.",
                  example: "PERG850101XXX",
                },
                sexo: {
                  type: "string",
                  enum: ["FEMENINO", "MASCULINO"],
                  description:
                    "Conjunto de características biológicas y fisiológicas que distinguen a los hombres y mujeres.",
                  example: "MASCULINO",
                },
                entePublico: {
                  type: "object",
                  description:
                    "Datos del ente público donde labora la persona servidora pública que interviene en alguno de los procedimientos citados en el objeto del sistema.",
                  required: [
                    "entidadFederativa",
                    "ambitoGobierno",
                    "poderOrganoGobierno",
                    "nombre",
                    "siglas",
                  ],
                  properties: {
                    entidadFederativa: {
                      type: "object",
                      description:
                        "Entidad federativa donde se encuentra el ente público.",
                      required: ["clave", "valor"],
                      properties: {
                        clave: {
                          type: "string",
                          description:
                            "cve_agee del Marco Geoestadístico de INEGI.",
                          example: "09",
                        },
                        valor: {
                          type: "string",
                          description:
                            "nom_agee del Marco Geoestadístico de INEGI.",
                          example: "Ciudad de México",
                        },
                      },
                    },
                    ambitoGobierno: {
                      type: "object",
                      description:
                        "Información referente al ámbito del ente público donde labora la persona servidora pública.",
                      required: ["clave", "valor"],
                      properties: {
                        clave: {
                          type: "string",
                          enum: [
                            "FEDERAL",
                            "ESTATAL",
                            "MUNICIPAL_ALCALDIA",
                            "OTRO",
                          ],
                          description:
                            "Ámbito al que pertenece el ente público.",
                          example: "FEDERAL",
                        },
                        valor: {
                          type: "string",
                          description: "Valor del ámbito de gobierno.",
                          example: "FEDERAL",
                        },
                      },
                    },
                    poderOrganoGobierno: {
                      type: "string",
                      enum: [
                        "EJECUTIVO",
                        "LEGISLATIVO",
                        "JUDICIAL",
                        "ORGANO_AUTONOMO",
                      ],
                      description:
                        "Poder u órgano de gobierno al que pertenece el ente público.",
                      example: "EJECUTIVO",
                    },
                    nombre: {
                      type: "string",
                      description:
                        "Nombre del ente público donde labora la persona servidora pública.",
                      example: "Secretaría de Hacienda y Crédito Público",
                    },
                    siglas: {
                      type: "string",
                      description:
                        "Siglas del ente público donde labora la persona servidora pública.",
                      example: "SHCP",
                    },
                  },
                },
                empleoCargoComision: {
                  type: "object",
                  description:
                    "Datos del empleo, cargo o comisión que desempeña la persona servidora pública.",
                  required: ["nombre", "nivel", "areaAdscripcion"],
                  properties: {
                    nombre: {
                      type: "object",
                      description: "Denominación del empleo, cargo o comisión.",
                      required: ["clave", "valor"],
                      properties: {
                        clave: {
                          type: "string",
                          enum: [
                            "OPERATIVO_U_HOMOLOGO",
                            "ENLACE_U_HOMOLOGO",
                            "JEFATURA_DE_DEPARTAMENTO_U_HOMOLOGO",
                            "SUBDIRECCION_DE_AREA_U_HOMOLOGO",
                            "COORDINACION_DIRECCIÓN_DE_AREA_U_HOMOLOGO",
                            "DIRECCION_GENERAL_ADJUNTA_U_HOMÓLOGO",
                            "DIRECCION_GENERAL_U_HOMOLOGO",
                            "JEFATURA_DE_UNIDAD_U_HOMOLOGO",
                            "SUBSECRETARIA_DE_ESTADO_OFICIALIA_MAYOR_U_HOMOLOGO",
                            "SECRETARIA_DE_ESTADO_U_HOMÓLOGO",
                            "OTRO",
                          ],
                          description:
                            "Clave del valor del empleo, cargo o comisión de la persona Servidora Pública Sancionada.",
                          example: "OPERATIVO_U_HOMOLOGO",
                        },
                        valor: {
                          type: "string",
                          description:
                            "Valor del empleo, cargo o comisión de la persona Servidora Pública Sancionada.",
                          example: "OPERATIVO_U_HOMOLOGO",
                        },
                      },
                    },
                    nivel: {
                      type: "string",
                      description:
                        "Clave o nivel del empleo, cargo o comisión.",
                      example: "Q19",
                    },
                    areaAdscripcion: {
                      type: "string",
                      description:
                        "Área de adscripción de la persona servidora pública.",
                      example: "Departamento de Recursos Humanos",
                    },
                  },
                },
                origenInvestigacion: {
                  type: "object",
                  required: ["clave", "valor"],
                  properties: {
                    clave: {
                      type: "string",
                      enum: [
                        "AUDITORIO_SUPERIOR",
                        "AUDITORIA_OIC",
                        "QUEJA",
                        "DENUNCIA_CIUDADADA",
                        "DENUNCIA_SP",
                        "OFICIO",
                        "OTRO",
                      ],
                      description: "Origen de la falta administrativa.",
                      example: "DENUNCIA_CIUDADADA",
                    },
                    valor: {
                      type: "string",
                      description: "Valor del origen de la falta cometida.",
                      example: "DENUNCIA_CIUDADADA",
                    },
                  },
                },
                faltaCometida: {
                  type: "array",
                  items: {
                    type: "object",
                    required: [
                      "clave",
                      "valor",
                      "nombreNormatividadInfringida",
                      "articuloNormatividadInfringida",
                      "fraccionNormatividadInfringida",
                    ],
                    properties: {
                      clave: {
                        type: "string",
                        enum: [
                          "CAUSAR_DAÑOS",
                          "COHECHO",
                          "PECULADO",
                          "DESVIO_RECURSOS",
                          "UTILIZACION_INF",
                          "CONFLICTO_INTERES",
                          "CONTRATACION_INDEBIDA",
                          "ENRIQUECIMIENTO",
                          "SIMULACION",
                          "TRAFICO_INFLUENCIAS",
                          "ENCUBRIMIENTO",
                          "DESACATO",
                          "NEPOTISMO",
                          "OBSTRUCCION",
                          "OTRO",
                        ],
                        description:
                          "Tipo de falta cometida por la persona servidora pública.",
                        example: "PECULADO",
                      },
                      valor: {
                        type: "string",
                        description:
                          "Valor de falta cometida por la persona servidora pública.",
                        example: "PECULADO",
                      },
                      nombreNormatividadInfringida: {
                        type: "string",
                        description:
                          "Nombre de la ley y/o normatividad infringida (e.g. Ley General de Responsabilidades Administrativas o Ley de General de Responsabilidades Administrativas del estado de Guanajuato).",
                        example:
                          "Ley General de Responsabilidades Administrativas",
                      },
                      articuloNormatividadInfringida: {
                        type: "array",
                        items: {
                          type: "number",
                          description:
                            "Artículo(s) de la normatividad infringida.",
                          example: 12,
                        },
                      },
                      fraccionNormatividadInfringida: {
                        type: "array",
                        items: {
                          type: "number",
                          description:
                            "Fracción(es) de la normatividad infringida.",
                          example: 3,
                        },
                      },
                    },
                  },
                },
                resolucion: {
                  type: "object",
                  required: [
                    "documentoResolución",
                    "fechaResolucion",
                    "fechaNotificación",
                    "fechaResoluciónFirme",
                    "url",
                  ],
                  properties: {
                    documentoResolución: {
                      type: "string",
                      description:
                        "Título del documento. Se refiere a la sentencia definitiva que resuelve el fondo del procedimiento de responsabilidad administrativa y que ha quedado firme.",
                      example: "Sentencia Definitiva",
                    },
                    fechaResolucion: {
                      type: "string",
                      format: "date-time",
                      description:
                        "Fecha en que se emite la resolución sancionatoria (sentencia).",
                      example: "2023-07-19T12:00:00.000Z",
                    },
                    fechaNotificación: {
                      type: "string",
                      format: "date-time",
                      description:
                        "Fecha en la que se notifica a la persona servidora pública la sentencia.",
                      example: "2023-07-20T08:00:00.000Z",
                    },
                    fechaResoluciónFirme: {
                      type: "string",
                      format: "date-time",
                      description: "Fecha en que quedó firme la sentencia.",
                      example: "2023-08-01T00:00:00.000Z",
                    },
                    url: {
                      type: "string",
                      description:
                        "URL que apunta al documento en formato digital de la versión pública de la sentencia emitida por la autoridad competente.",
                      example: "https://example.com/sentencia.pdf",
                    },
                  },
                },
                autoridadSancionadora: {
                  type: "string",
                  description:
                    "Nombre de la Autoridad encargada de emitir la sanción.",
                  example: "Tribunal de Justicia Administrativa",
                },
                tipoSancion: {
                  type: "array",
                  items: {
                    type: "object",
                    required: [
                      "clave",
                      "valor",
                      "descripcion",
                      "suspensionEmpleoCargoComisión",
                      "destituciónEmpleoCargoComisión",
                      "sanciónEconómica",
                      "inhabilitacion",
                      "otro",
                    ],
                    properties: {
                      clave: {
                        type: "string",
                        enum: [
                          "SUSPENSION",
                          "DESTITUCION",
                          "SANCION_ECONOMICA",
                          "INHABILITACION",
                          "OTRO",
                        ],
                        description: "Tipo de sanción de la falta cometida.",
                        example: "SANCION_ECONOMICA",
                      },
                      valor: {
                        type: "string",
                        description: "Valor del tipo de sanción.",
                        example: "SANCION_ECONOMICA",
                      },
                      descripcion: {
                        type: "string",
                        description:
                          "Descripción o nota aclaratoria del tipo de sanción infringida.",
                        example: "Multa de $10,000 MXN",
                      },
                      suspensionEmpleoCargoComisión: {
                        type: "object",
                        required: ["plazo", "constancia"],
                        properties: {
                          plazo: {
                            type: "object",
                            description: "Plazo de la suspensión del empleo.",
                            required: [
                              "año",
                              "mes",
                              "dia",
                              "fechaInicial",
                              "fechaFinal",
                            ],
                            properties: {
                              año: {
                                type: "integer",
                                example: 1,
                              },
                              mes: {
                                type: "integer",
                                example: 6,
                              },
                              día: {
                                type: "integer",
                                example: 0,
                              },
                              fechaInicial: {
                                type: "string",
                                format: "date-time",
                                description:
                                  "Fecha en que inicia la suspensión del empleo, cargo o comisión.",
                                example: "2023-07-20T08:00:00.000Z",
                              },
                              fechaFinal: {
                                type: "string",
                                format: "date-time",
                                description:
                                  "Fecha en que concluye la suspensión del empleo, cargo o comisión.",
                                example: "2023-07-26T08:00:00.000Z",
                              },
                            },
                          },
                          constancia: {
                            type: "object",
                            required: ["titulo", "fecha", "url"],
                            properties: {
                              titulo: {
                                type: "string",
                                description:
                                  "Título del documento de la constancia.",
                                example: "Constancia de Suspensión",
                              },
                              fecha: {
                                type: "string",
                                format: "date-time",
                                description:
                                  "Fecha de la constancia de la suspensión.",
                                example: "2023-07-26T12:00:00.000Z",
                              },
                              url: {
                                type: "string",
                                format: "url",
                                description:
                                  "URL que apunta al documento en formato digital de la versión pública de la constancia emitida por la autoridad competente.",
                                example:
                                  "https://example.com/constancia_suspension.pdf",
                              },
                            },
                          },
                        },
                      },
                      destituciónEmpleoCargoComisión: {
                        type: "object",
                        required: ["fechaDestitución", "constancia"],
                        properties: {
                          fechaDestitución: {
                            type: "string",
                            format: "date-time",
                            description:
                              "Fecha a partir de la cual el servidor público queda destituido de su empleo, cargo o comisión.",
                            example: "2023-07-20T08:00:00.000Z",
                          },
                          constancia: {
                            type: "object",
                            required: ["titulo", "fecha", "url"],
                            properties: {
                              titulo: {
                                type: "string",
                                description:
                                  "Título del documento de la constancia.",
                                example: "Constancia de Destitución",
                              },
                              fecha: {
                                type: "string",
                                format: "date-time",
                                description:
                                  "Fecha de la constancia de la destitución.",
                                example: "2023-07-20T12:00:00.000Z",
                              },
                              url: {
                                type: "string",
                                format: "url",
                                description:
                                  "URL que apunta al documento en formato digital de la versión pública de la constancia emitida por la autoridad competente.",
                                example:
                                  "https://example.com/constancia_destitucion.pdf",
                              },
                            },
                          },
                        },
                      },
                      sanciónEconómica: {
                        type: "object",
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
                            description:
                              "Monto de la sanción económica expresado en la moneda origen.",
                            example: 10000,
                          },
                          moneda: {
                            type: "object",
                            description:
                              "Moneda del monto efectivamente cobrado, apegado al formato ISO 4217.",
                            required: ["clave", "valor"],
                            properties: {
                              clave: {
                                type: "string",
                                description: "formato ISO 4217.",
                                example: "MXN",
                              },
                              valor: {
                                type: "string",
                                description: "formato ISO 4217.",
                                example: "Peso Mexicano",
                              },
                            },
                          },
                          plazo: {
                            type: "object",
                            description: "Plazo de la suspensión del empleo.",
                            required: ["año", "mes", "dia"],
                            properties: {
                              año: {
                                type: "integer",
                                example: 9,
                              },
                              mes: {
                                type: "integer",
                                example: 6,
                              },
                              día: {
                                type: "integer",
                                example: 10,
                              },
                            },
                          },
                          cobrado: {
                            type: "object",
                            required: [
                              "monto",
                              "moneda",
                              "fecha",
                              "fechaPagoSancion",
                            ],
                            properties: {
                              monto: {
                                type: "number",
                                example: 200,
                              },
                              moneda: {
                                type: "object",
                                description:
                                  "Moneda del monto efectivamente cobrado, apegado al formato ISO 4217.",
                                required: ["clave", "valor"],
                                properties: {
                                  clave: {
                                    type: "string",
                                    description: "Formato ISO 4217.",
                                    example: "MXN",
                                  },
                                  valor: {
                                    type: "string",
                                    description: "Formato ISO 4217.",
                                    example: "Peso Mexicano",
                                  },
                                },
                              },
                              fecha: {
                                type: "string",
                                format: "date-time",
                                description:
                                  "Fecha del monto efectivamente cobrado.",
                                example: "2023-08-01T00:00:00.000Z",
                              },
                              fechaPagoSancion: {
                                type: "string",
                                format: "date-time",
                                description:
                                  "Fecha que se realiza el cobro de la sanción.",
                                example: "2023-08-01T08:00:00.000Z",
                              },
                            },
                          },
                          constancia: {
                            type: "object",
                            required: ["titulo", "fecha", "url"],
                            properties: {
                              titulo: {
                                type: "string",
                                description:
                                  "Título del documento de la constancia.",
                                example: "Constancia de Pago",
                              },
                              fecha: {
                                type: "string",
                                format: "date-time",
                                description:
                                  "Fecha de la constancia de la sanción.",
                                example: "2023-08-01T12:00:00.000Z",
                              },
                              url: {
                                type: "string",
                                format: "url",
                                description:
                                  "URL que apunta al documento en formato digital de la versión pública de la constancia emitida por la autoridad competente.",
                                example:
                                  "https://example.com/constancia_pago.pdf",
                              },
                            },
                          },
                        },
                      },
                      inhabilitacion: {
                        type: "object",
                        required: ["plazo", "constancia"],
                        properties: {
                          plazo: {
                            type: "object",
                            description: "Plazo de la suspensión del empleo.",
                            required: [
                              "año",
                              "mes",
                              "dia",
                              "fechaInicial",
                              "fechaFinal",
                            ],
                            properties: {
                              año: {
                                type: "integer",
                                example: 2,
                              },
                              mes: {
                                type: "integer",
                                example: 3,
                              },
                              día: {
                                type: "integer",
                                example: 5,
                              },
                              fechaInicial: {
                                type: "string",
                                format: "date-time",
                                description:
                                  "Fecha inicial de la inhabilitación.",
                                example: "2023-07-20T08:00:00Z",
                              },
                              fechaFinal: {
                                type: "string",
                                format: "date-time",
                                description:
                                  "Fecha final de la inhabilitación.",
                                example: "2025-07-20T08:00:00Z",
                              },
                            },
                          },
                          constancia: {
                            type: "object",
                            required: ["titulo", "fecha", "url"],
                            properties: {
                              titulo: {
                                type: "string",
                                description:
                                  "Título del documento de la constancia de la inhabilitación.",
                                example: "Constancia de Inhabilitación",
                              },
                              fecha: {
                                type: "string",
                                format: "date-time",
                                description:
                                  "Fecha de la constancia de la inhabilitación.",
                                example: "2023-07-27T12:00:00Z",
                              },
                              url: {
                                type: "string",
                                description:
                                  "URL que apunta al documento en formato digital de la versión pública de la constancia emitida por la autoridad competente.",
                                example:
                                  "https://example.com/constancia_inhabilitacion.pdf",
                              },
                            },
                          },
                        },
                      },
                      otro: {
                        type: "object",
                        required: ["nombre", "urlDocumento"],
                        properties: {
                          nombre: {
                            type: "string",
                            description: "Nombre de la sanción.",
                            example: "Otra sanción",
                          },
                          urlDocumento: {
                            type: "string",
                            description:
                              "URL que apunta al documento en formato digital de la versión pública de la constancia emitida por la autoridad competente.",
                            example: "https://example.com/otra_sancion.pdf",
                          },
                        },
                      },
                    },
                  },
                },
                observaciones: {
                  type: "string",
                  description: "Cualquier observación pertinente.",
                  example:
                    "El servidor público ha sido notificado y tiene derecho a presentar recurso de      apelación dentro de los siguientes 15 días hábiles.",
                },
              },
            },
          },
          required: ["faltaNoGrave"],
        },
        {
          properties: {
            tipoDeFalta: {
              enum: ["GRAVE"],
            },
            faltaGrave: {
              title: "Grave",
              description: "Faltas graves a servidores publicos sancionados",
              required: [
                "id",
                "expediente",
                "nombres",
                "primerApellido",
                "segundoApellido",
                "curp",
                "rfc",
                "sexo",
                "entePublico",
                "empleoCargoComision",
                "origenInvestigacion",
                "faltaCometida",
                "resolucion",
                "autoridadSancionadora",
                "ordenJurisdiccionalSancion",
                "tipoSancion",
                "observaciones",
              ],
              properties: {
                id: {
                  type: "string",
                  title: "ID",
                  description:
                    "Dato que permite identificar de manera unívoca el registro.",
                  example: "12345",
                },
                expediente: {
                  type: "string",
                  description:
                    "Número de expediente del procedimiento que se inicie en materia de responsabilidades administrativas.",
                  example: "EXP-2023-456",
                },
                nombres: {
                  type: "string",
                  description:
                    "Nombre(s) de la persona servidora pública que interviene en alguno de los procedimientos citados en el objeto del sistema.\n",
                  example: "Juan",
                },
                primerApellido: {
                  type: "string",
                  description:
                    "Primer apellido de la persona servidora pública que interviene en alguno de los procedimientos citados en el objeto del sistema.",
                  example: "Pérez",
                },
                segundoApellido: {
                  type: "string",
                  description:
                    "Segundo apellido de la persona servidora pública que interviene en alguno de los procedimientos citados en el objeto del sistema.",
                  example: "Gómez",
                },
                curp: {
                  type: "string",
                  description:
                    "CURP de la persona servidora pública que interviene en alguno de los procedimientos citados en el objeto del sistema.",
                  example: "PERG850101HDF",
                },
                rfc: {
                  type: "string",
                  description:
                    "RFC con homoclave de la persona servidora pública que interviene en alguno de los procedimientos citados en el objeto del sistema.",
                  example: "PERG850101XXX",
                },
                sexo: {
                  type: "string",
                  enum: ["FEMENINO", "MASCULINO"],
                  description:
                    "Conjunto de características biológicas y fisiológicas que distinguen a los hombres y mujeres.",
                  example: "MASCULINO",
                },
                entePublico: {
                  type: "object",
                  title: "Ente público",
                  description:
                    "Datos del ente público donde labora la persona servidora pública que interviene en alguno de los procedimientos citados en el objeto del sistema.",
                  required: [
                    "entidadFederativa",
                    "ambitoGobierno",
                    "poderOrganoGobierno",
                    "nombre",
                    "siglas",
                  ],
                  properties: {
                    entidadFederativa: {
                      title: "Selecciona una entidad:",
                      type: "string",
                      oneOf: [
                        {
                          const: {
                            clave: "01",
                            valor: "Aguascalientes",
                          },
                          title: "Aguascalientes",
                        },
                        {
                          const: {
                            clave: "02",
                            valor: "Baja California",
                          },
                          title: "Baja California",
                        },
                        {
                          const: {
                            clave: "03",
                            valor: "Baja California Sur",
                          },
                          title: "Baja California Sur",
                        },
                        {
                          const: {
                            clave: "04",
                            valor: "Campeche",
                          },
                          title: "Campeche",
                        },
                        {
                          const: {
                            clave: "05",
                            valor: "Coahuila de Zaragoza",
                          },
                          title: "Coahuila de Zaragoza",
                        },
                        {
                          const: {
                            clave: "06",
                            valor: "Colima",
                          },
                          title: "Colima",
                        },
                        {
                          const: {
                            clave: "07",
                            valor: "Chiapas",
                          },
                          title: "Chiapas",
                        },
                        {
                          const: {
                            clave: "08",
                            valor: "Chihuahua",
                          },
                          title: "Chihuahua",
                        },
                        {
                          const: {
                            clave: "09",
                            valor: "Ciudad de México",
                          },
                          title: "Ciudad de México",
                        },
                        {
                          const: {
                            clave: "10",
                            valor: "Durango",
                          },
                          title: "Durango",
                        },
                        {
                          const: {
                            clave: "11",
                            valor: "Guanajuato",
                          },
                          title: "Guanajuato",
                        },
                        {
                          const: {
                            clave: "12",
                            valor: "Guerrero",
                          },
                          title: "Guerrero",
                        },
                        {
                          const: {
                            clave: "13",
                            valor: "Hidalgo",
                          },
                          title: "Hidalgo",
                        },
                        {
                          const: {
                            clave: "14",
                            valor: "Jalisco",
                          },
                          title: "Jalisco",
                        },
                        {
                          const: {
                            clave: "15",
                            valor: "México",
                          },
                          title: "México",
                        },
                        {
                          const: {
                            clave: "16",
                            valor: "Michoacán de Ocampo",
                          },
                          title: "Michoacán de Ocampo",
                        },
                        {
                          const: {
                            clave: "17",
                            valor: "Morelos",
                          },
                          title: "Morelos",
                        },
                        {
                          const: {
                            clave: "18",
                            valor: "Nayarit",
                          },
                          title: "Nayarit",
                        },
                        {
                          const: {
                            clave: "19",
                            valor: "Nuevo León",
                          },
                          title: "Nuevo León",
                        },
                        {
                          const: {
                            clave: "20",
                            valor: "Oaxaca",
                          },
                          title: "Oaxaca",
                        },
                        {
                          const: {
                            clave: "21",
                            valor: "Puebla",
                          },
                          title: "Puebla",
                        },
                        {
                          const: {
                            clave: "22",
                            valor: "Querétaro",
                          },
                          title: "Querétaro",
                        },
                        {
                          const: {
                            clave: "23",
                            valor: "Quintana Roo",
                          },
                          title: "Quintana Roo",
                        },
                        {
                          const: {
                            clave: "24",
                            valor: "San Luis Potosí",
                          },
                          title: "San Luis Potosí",
                        },
                        {
                          const: {
                            clave: "25",
                            valor: "Sinaloa",
                          },
                          title: "Sinaloa",
                        },
                        {
                          const: {
                            clave: "26",
                            valor: "Sonora",
                          },
                          title: "Sonora",
                        },
                        {
                          const: {
                            clave: "27",
                            valor: "Tabasco",
                          },
                          title: "Tabasco",
                        },
                        {
                          const: {
                            clave: "28",
                            valor: "Tamaulipas",
                          },
                          title: "Tamaulipas",
                        },
                        {
                          const: {
                            clave: "29",
                            valor: "Tlaxcala",
                          },
                          title: "Tlaxcala",
                        },
                        {
                          const: {
                            clave: "30",
                            valor: "Veracruz de Ignacio de la Llave",
                          },
                          title: "Veracruz de Ignacio de la Llave",
                        },
                        {
                          const: {
                            clave: "31",
                            valor: "Yucatán",
                          },
                          title: "Yucatán",
                        },
                        {
                          const: {
                            clave: "32",
                            valor: "Zacatecas",
                          },
                          title: "Zacatecas",
                        },
                      ],
                    },
                    ambitoGobierno: {
                      type: "object",
                      title: "Ámbito de Gobierno",
                      properties: {
                        clave: {
                          title: "Ámbito de Gobierno",
                          description:
                            "Información referente al ámbito del ente público donde labora la persona servidora pública.",
                          type: "string",
                          enum: [
                            "ESTATAL",
                            "FEDERAL",
                            "MUNICIPAL_ALCALDIA",
                            "OTRO",
                          ],
                          enumNames: [
                            "Estatal",
                            "Federal",
                            "Municipal y/o Alcadia",
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
                                  const: "OTRO",
                                },
                                valor: {
                                  title: "Otro",
                                  description:
                                    "Escribe el valor para otro tipo de Ámbito de Gobierno",
                                  type: "string",
                                  default: "",
                                },
                              },
                              required: ["valor"],
                            },
                            {
                              properties: {
                                clave: {
                                  enum: [
                                    "ESTATAL",
                                    "FEDERAL",
                                    "MUNICIPAL_ALCALDIA",
                                  ],
                                },
                              },
                            },
                          ],
                        },
                      },
                    },
                    poderOrganoGobierno: {
                      type: "string",
                      title: "Poder de Gobierno",
                      enum: [
                        "EJECUTIVO",
                        "LEGISLATIVO",
                        "JUDICIAL",
                        "ORGANO_AUTONOMO",
                      ],
                      enumNames: [
                        "Ejecutivo",
                        "Legislativo",
                        "Judicial",
                        "Organo Autonomo",
                      ],
                      description:
                        "Poder u órgano de gobierno al que pertenece el ente público.",
                      example: "EJECUTIVO",
                    },
                    nombre: {
                      type: "string",
                      title: "Nombre",
                      description:
                        "Nombre del ente público donde labora la persona servidora pública.",
                      example: "Secretaría de Hacienda y Crédito Público",
                    },
                    siglas: {
                      type: "string",
                      title: "Siglas",
                      description:
                        "Siglas del ente público donde labora la persona servidora pública.",
                      example: "SHCP",
                    },
                  },
                },
                empleoCargoComision: {
                  type: "object",
                  title: "Empleo, Cargo o Comisión",
                  description:
                    "Datos del empleo, cargo o comisión que desempeña la persona servidora pública.",
                  required: ["nombre", "nivel", "areaAdscripcion"],
                  properties: {
                    nombre: {
                      title: "Nombre",
                      type: "object",
                      properties: {
                        clave: {
                          title: "Nombre",
                          description:
                            "Denominación del empleo, cargo o comisión.",
                          type: "string",
                          enum: [
                            "OPERATIVO_U_HOMOLOGO",
                            "ENLACE_U_HOMOLOGO",
                            "JEFATURA_DE_DEPARTAMENTO_U_HOMOLOGO",
                            "SUBDIRECCION_DE_AREA_U_HOMOLOGO",
                            "COORDINACION_DIRECCIÓN_DE_AREA_U_HOMOLOGO",
                            "DIRECCION_GENERAL_ADJUNTA_U_HOMÓLOGO",
                            "DIRECCION_GENERAL_U_HOMOLOGO",
                            "JEFATURA_DE_UNIDAD_U_HOMOLOGO",
                            "SUBSECRETARIA_DE_ESTADO_OFICIALIA_MAYOR_U_HOMOLOGO",
                            "SECRETARIA_DE_ESTADO_U_HOMÓLOGO",
                            "OTRO",
                          ],
                          enumNames: [
                            "OPERATIVO_U_HOMOLOGO",
                            "ENLACE_U_HOMOLOGO",
                            "JEFATURA_DE_DEPARTAMENTO_U_HOMOLOGO",
                            "SUBDIRECCION_DE_AREA_U_HOMOLOGO",
                            "COORDINACION_DIRECCIÓN_DE_AREA_U_HOMOLOGO",
                            "DIRECCION_GENERAL_ADJUNTA_U_HOMÓLOGO",
                            "DIRECCION_GENERAL_U_HOMOLOGO",
                            "JEFATURA_DE_UNIDAD_U_HOMOLOGO",
                            "SUBSECRETARIA_DE_ESTADO_OFICIALIA_MAYOR_U_HOMOLOGO",
                            "SECRETARIA_DE_ESTADO_U_HOMÓLOGO",
                            "OTRO",
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
                                  const: "OTRO",
                                },
                                valor: {
                                  title: "Otro",
                                  description:
                                    "Valor del empleo, cargo o comisión de la persona Servidora Pública Sancionada.",
                                  type: "string",
                                  default: "",
                                },
                              },
                              required: ["valor"],
                            },
                            {
                              properties: {
                                clave: {
                                  enum: [
                                    "OPERATIVO_U_HOMOLOGO",
                                    "ENLACE_U_HOMOLOGO",
                                    "JEFATURA_DE_DEPARTAMENTO_U_HOMOLOGO",
                                    "SUBDIRECCION_DE_AREA_U_HOMOLOGO",
                                    "COORDINACION_DIRECCIÓN_DE_AREA_U_HOMOLOGO",
                                    "DIRECCION_GENERAL_ADJUNTA_U_HOMÓLOGO",
                                    "DIRECCION_GENERAL_U_HOMOLOGO",
                                    "JEFATURA_DE_UNIDAD_U_HOMOLOGO",
                                    "SUBSECRETARIA_DE_ESTADO_OFICIALIA_MAYOR_U_HOMOLOGO",
                                  ],
                                },
                              },
                            },
                          ],
                        },
                      },
                    },

                    nivel: {
                      type: "string",
                      title: "Nivel",
                      description:
                        "Clave o nivel del empleo, cargo o comisión.",
                      example: "Q19",
                    },
                    areaAdscripcion: {
                      type: "string",
                      title: "Área de adscripción",
                      description:
                        "Área de adscripción de la persona servidora pública.",
                      example: "Departamento de Recursos Humanos",
                    },
                  },
                },
                origenInvestigacion: {
                  title: "Origen de de la investigación",
                  type: "object",
                  properties: {
                    clave: {
                      title: "Origen de de la investigación",
                      type: "string",
                      enum: [
                        "AUDITORIO_SUPERIOR",
                        "AUDITORIA_OIC",
                        "QUEJA",
                        "DENUNCIA_CIUDADADA",
                        "DENUNCIA_SP",
                        "OFICIO",
                        "OTRO",
                      ],
                      enumNames: [
                        "AUDITORIO_SUPERIOR",
                        "AUDITORIA_OIC",
                        "QUEJA",
                        "DENUNCIA_CIUDADADA",
                        "DENUNCIA_SP",
                        "OFICIO",
                        "OTRO",
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
                              const: "OTRO",
                            },
                            valor: {
                              title: "Otro",
                              description:
                                "Valor del origen de la falta cometida.",
                              type: "string",
                              default: "",
                            },
                          },
                          required: ["valor"],
                        },
                        {
                          properties: {
                            clave: {
                              enum: [
                                "AUDITORIO_SUPERIOR",
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
                  title: "Falta Cometida",
                  descripcion: "Agrega el tipo de falta cometida",
                  type: "array",
                  items: {
                    type: "object",
                    descripcion: "Agrega el tipo de falta cometida",

                    properties: {
                      tipoFalta: {
                        title: "Tipo de Falta Cometida",
                        type: "object",
                        properties: {
                          clave: {
                            title: "Tipo de falta",
                            description:
                              "Tipo de falta cometida por la persona servidora pública.",
                            type: "string",
                            enum: [
                              "CAUSAR_DAÑOS",
                              "COHECHO",
                              "PECULADO",
                              "DESVIO_RECURSOS",
                              "UTILIZACION_INF",
                              "CONFLICTO_INTERES",
                              "CONTRATACION_INDEBIDA",
                              "ENRIQUECIMIENTO",
                              "SIMULACION",
                              "TRAFICO_INFLUENCIAS",
                              "ENCUBRIMIENTO",
                              "DESACATO",
                              "NEPOTISMO",
                              "OBSTRUCCION",
                              "OTRO",
                            ],
                            enumNames: [
                              "CAUSAR_DAÑOS",
                              "COHECHO",
                              "PECULADO",
                              "DESVIO_RECURSOS",
                              "UTILIZACION_INF",
                              "CONFLICTO_INTERES",
                              "CONTRATACION_INDEBIDA",
                              "ENRIQUECIMIENTO",
                              "SIMULACION",
                              "TRAFICO_INFLUENCIAS",
                              "ENCUBRIMIENTO",
                              "DESACATO",
                              "NEPOTISMO",
                              "OBSTRUCCION",
                              "OTRO",
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
                                    const: "OTRO",
                                  },
                                  valor: {
                                    title: "Otro",
                                    description:
                                      "Valor del empleo, cargo o comisión de la persona Servidora Pública Sancionada.",
                                    type: "string",
                                    default: "",
                                  },
                                },
                                required: ["valor"],
                              },
                              {
                                properties: {
                                  clave: {
                                    enum: [
                                      "CAUSAR_DAÑOS",
                                      "COHECHO",
                                      "PECULADO",
                                      "DESVIO_RECURSOS",
                                      "UTILIZACION_INF",
                                      "CONFLICTO_INTERES",
                                      "CONTRATACION_INDEBIDA",
                                      "ENRIQUECIMIENTO",
                                      "SIMULACION",
                                      "TRAFICO_INFLUENCIAS",
                                      "ENCUBRIMIENTO",
                                      "DESACATO",
                                      "NEPOTISMO",
                                      "OBSTRUCCION",
                                    ],
                                  },
                                },
                              },
                            ],
                          },
                        },
                      },
                      nombreNormatividadInfringida: {
                        type: "string",
                        description:
                          "Nombre de la ley y/o normatividad infringida (e.g. Ley General de Responsabilidades Administrativas o Ley de General de Responsabilidades Administrativas del estado de Guanajuato).",
                        example:
                          "Ley General de Responsabilidades Administrativas",
                      },
                      articuloNormatividadInfringida: {
                        type: "array",
                        items: {
                          type: "number",
                          description:
                            "Artículo(s) de la normatividad infringida.",
                          example: 12,
                        },
                      },
                      fraccionNormatividadInfringida: {
                        type: "array",
                        items: {
                          type: "number",
                          description:
                            "Fracción(es) de la normatividad infringida.",
                          example: 3,
                        },
                      },
                    },
                    required: [
                      "tipoFalta",
                      "nombreNormatividadInfringida",
                      "articuloNormatividadInfringida",
                      "fraccionNormatividadInfringida",
                    ],
                  },
                },
                resolucion: {
                  type: "object",
                  title: "Resolución",
                  required: [
                    "documentoResolución",
                    "fechaResolucion",
                    "fechaNotificación",
                    "fechaResoluciónFirme",
                    "url",
                  ],
                  properties: {
                    documentoResolución: {
                      title: "Documento",
                      type: "string",
                      description:
                        "Título del documento. Se refiere a la sentencia definitiva que resuelve el fondo del procedimiento de responsabilidad administrativa y que ha quedado firme.",
                      example: "Sentencia Definitiva",
                    },
                    fechaResolucion: {
                      title: "Fecha Resolución",
                      type: "string",
                      format: "date",
                      description:
                        "Fecha en que se emite la resolución sancionatoria (sentencia).",
                      example: "2023-07-19",
                    },
                    fechaNotificación: {
                      title: "Fecha Notificación",
                      type: "string",
                      format: "date",
                      description:
                        "Fecha en la que se notifica a la persona servidora pública la sentencia.",
                      example: "2023-07-20",
                    },
                    fechaResoluciónFirme: {
                      title: "Fecha Resolución Firme",
                      type: "string",
                      format: "date",
                      description: "Fecha en que quedó firme la sentencia.",
                      example: "2023-08-01",
                    },
                    url: {
                      type: "string",
                      title: "URL Documento",
                      description:
                        "URL que apunta al documento en formato digital de la versión pública de la sentencia emitida por la autoridad competente.",
                      example: "https://example.com/sentencia.pdf",
                    },
                  },
                },
                autoridadSancionadora: {
                  title: "Nombre de la Autoridad",
                  type: "string",
                  description:
                    "Nombre de la Autoridad encargada de emitir la sanción.",
                  example: "Tribunal de Justicia Administrativa",
                },
                ordenJurisdiccionalSancion: {
                  title: "Orden Jurisdiccional",
                  type: "string",
                  enum: ["FEDERAL", "ESTATAL"],
                  description: "Orden jurisdiccional de la sanción.",
                  example: "FEDERAL",
                },
                tipoSancion: {
                  title: "Tipo de Sanción",
                  type: "array",
                  items: {
                    title: "Sanción",
                    type: "object",
                    properties: {
                      "sancion": {
                        type: "string",
                        enum: [
                          "SUSPENSION",
                          "DESTITUCION",
                          "SANCION_ECONOMICA",
                          "INHABILITACION",
                          "OTRO",
                        ],
                        enumNames: [
                          "SUSPENSION",
                          "DESTITUCION",
                          "SANCION_ECONOMICA",
                          "INHABILITACION",
                          "OTRO",
                        ]
                      },
                    },
                    required: ["sancion"],
                    dependencies: {
                      "sancion": {
                        oneOf: [
                          {
                            properties: {
                              "sancion": {
                                enum: ["SUSPENSION"],
                              },
                              descripcion: {
                                type: "string",
                                description:
                                  "Descripción o nota aclaratoria del tipo de sanción infringida.",
                                example: "Multa de $10,000 MXN",
                              },
                              suspensionEmpleoCargoComisión: {
                                type: "object",
                                required: ["plazo", "constancia"],
                                properties: {
                                  plazo: {
                                    type: "object",
                                    description: "Plazo de la suspensión del empleo.",
                                    required: [
                                      "año",
                                      "mes",
                                      "dia",
                                      "fechaInicial",
                                      "fechaFinal",
                                    ],
                                    properties: {
                                      año: {
                                        type: "integer",
                                        example: 1,
                                      },
                                      mes: {
                                        type: "integer",
                                        example: 6,
                                      },
                                      día: {
                                        type: "integer",
                                        example: 0,
                                      },
                                      fechaInicial: {
                                        type: "string",
                                        format: "date-time",
                                        description:
                                          "Fecha en que inicia la suspensión del empleo, cargo o comisión.",
                                        example: "2023-07-20T08:00:00.000Z",
                                      },
                                      fechaFinal: {
                                        type: "string",
                                        format: "date-time",
                                        description:
                                          "Fecha en que concluye la suspensión del empleo, cargo o comisión.",
                                        example: "2023-07-26T08:00:00.000Z",
                                      },
                                    },
                                  },
                                  constancia: {
                                    type: "object",
                                    required: ["titulo", "fecha", "url"],
                                    properties: {
                                      titulo: {
                                        type: "string",
                                        description:
                                          "Título del documento de la constancia.",
                                        example: "Constancia de Suspensión",
                                      },
                                      fecha: {
                                        type: "string",
                                        format: "date-time",
                                        description:
                                          "Fecha de la constancia de la suspensión.",
                                        example: "2023-07-26T12:00:00.000Z",
                                      },
                                      url: {
                                        type: "string",
                                        format: "url",
                                        description:
                                          "URL que apunta al documento en formato digital de la versión pública de la constancia emitida por la autoridad competente.",
                                        example:
                                          "https://example.com/constancia_suspension.pdf",
                                      },
                                    },
                                  },
                                },
                              },
                            },
                            required: ["sancion", "descripcion", "suspensionEmpleoCargoComisión"],
                          },
                          {
                            properties: {
                              "sancion": {
                                enum: ["DESTITUCION"],
                              },
                              descripcion: {
                                type: "string",
                                description:
                                  "Descripción o nota aclaratoria del tipo de sanción infringida.",
                                example: "Multa de $10,000 MXN",
                              },
                              destituciónEmpleoCargoComisión: {
                                type: "object",
                                required: ["fechaDestitución", "constancia"],
                                properties: {
                                  fechaDestitución: {
                                    type: "string",
                                    format: "date-time",
                                    description:
                                      "Fecha a partir de la cual el servidor público queda destituido de su empleo, cargo o comisión.",
                                    example: "2023-07-20T08:00:00.000Z",
                                  },
                                  constancia: {
                                    type: "object",
                                    required: ["titulo", "fecha", "url"],
                                    properties: {
                                      titulo: {
                                        type: "string",
                                        description:
                                          "Título del documento de la constancia.",
                                        example: "Constancia de Destitución",
                                      },
                                      fecha: {
                                        type: "string",
                                        format: "date-time",
                                        description:
                                          "Fecha de la constancia de la destitución.",
                                        example: "2023-07-20T12:00:00.000Z",
                                      },
                                      url: {
                                        type: "string",
                                        format: "url",
                                        description:
                                          "URL que apunta al documento en formato digital de la versión pública de la constancia emitida por la autoridad competente.",
                                        example:
                                          "https://example.com/constancia_destitucion.pdf",
                                      },
                                    },
                                  },
                                },
                              },
                            },
                            required: ["sancion", "descripcion", "destituciónEmpleoCargoComisión"],
                          },
                          {
                            properties: {
                              "sancion": {
                                enum: ["SANCION_ECONOMICA"],
                              },
                              descripcion: {
                                type: "string",
                                description:
                                  "Descripción o nota aclaratoria del tipo de sanción infringida.",
                                example: "Multa de $10,000 MXN",
                              },
                              sanciónEconómica: {
                                type: "object",
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
                                    description:
                                      "Monto de la sanción económica expresado en la moneda origen.",
                                    example: 10000,
                                  },
                                  moneda: {
                                    type: "object",
                                    description:
                                      "Moneda del monto efectivamente cobrado, apegado al formato ISO 4217.",
                                    required: ["clave", "valor"],
                                    properties: {
                                      clave: {
                                        type: "string",
                                        description: "formato ISO 4217.",
                                        example: "MXN",
                                      },
                                      valor: {
                                        type: "string",
                                        description: "formato ISO 4217.",
                                        example: "Peso Mexicano",
                                      },
                                    },
                                  },
                                  plazo: {
                                    type: "object",
                                    description: "Plazo de la suspensión del empleo.",
                                    required: ["año", "mes", "dia"],
                                    properties: {
                                      año: {
                                        type: "integer",
                                        example: 9,
                                      },
                                      mes: {
                                        type: "integer",
                                        example: 6,
                                      },
                                      día: {
                                        type: "integer",
                                        example: 10,
                                      },
                                    },
                                  },
                                  cobrado: {
                                    type: "object",
                                    required: [
                                      "monto",
                                      "moneda",
                                      "fecha",
                                      "fechaPagoSancion",
                                    ],
                                    properties: {
                                      monto: {
                                        type: "number",
                                        example: 200,
                                      },
                                      moneda: {
                                        type: "object",
                                        description:
                                          "Moneda del monto efectivamente cobrado, apegado al formato ISO 4217.",
                                        required: ["clave", "valor"],
                                        properties: {
                                          clave: {
                                            type: "string",
                                            description: "Formato ISO 4217.",
                                            example: "MXN",
                                          },
                                          valor: {
                                            type: "string",
                                            description: "Formato ISO 4217.",
                                            example: "Peso Mexicano",
                                          },
                                        },
                                      },
                                      fecha: {
                                        type: "string",
                                        format: "date-time",
                                        description:
                                          "Fecha del monto efectivamente cobrado.",
                                        example: "2023-08-01T00:00:00.000Z",
                                      },
                                      fechaPagoSancion: {
                                        type: "string",
                                        format: "date-time",
                                        description:
                                          "Fecha que se realiza el cobro de la sanción.",
                                        example: "2023-08-01T08:00:00.000Z",
                                      },
                                    },
                                  },
                                  constancia: {
                                    type: "object",
                                    required: ["titulo", "fecha", "url"],
                                    properties: {
                                      titulo: {
                                        type: "string",
                                        description:
                                          "Título del documento de la constancia.",
                                        example: "Constancia de Pago",
                                      },
                                      fecha: {
                                        type: "string",
                                        format: "date-time",
                                        description:
                                          "Fecha de la constancia de la sanción.",
                                        example: "2023-08-01T12:00:00.000Z",
                                      },
                                      url: {
                                        type: "string",
                                        format: "url",
                                        description:
                                          "URL que apunta al documento en formato digital de la versión pública de la constancia emitida por la autoridad competente.",
                                        example:
                                          "https://example.com/constancia_pago.pdf",
                                      },
                                    },
                                  },
                                },
                              },
                            },
                            required: ["sancion", "descripcion", "sanciónEconómica"],
                          },
                          {
                            properties: {
                              "sancion": {
                                enum: ["INHABILITACION"],
                              },
                              descripcion: {
                                type: "string",
                                description:
                                  "Descripción o nota aclaratoria del tipo de sanción infringida.",
                                example: "Multa de $10,000 MXN",
                              },
                              inhabilitacion: {
                                type: "object",
                                required: ["plazo", "constancia"],
                                properties: {
                                  plazo: {
                                    type: "object",
                                    description: "Plazo de la suspensión del empleo.",
                                    required: [
                                      "año",
                                      "mes",
                                      "dia",
                                      "fechaInicial",
                                      "fechaFinal",
                                    ],
                                    properties: {
                                      año: {
                                        type: "integer",
                                        example: 2,
                                      },
                                      mes: {
                                        type: "integer",
                                        example: 3,
                                      },
                                      día: {
                                        type: "integer",
                                        example: 5,
                                      },
                                      fechaInicial: {
                                        type: "string",
                                        format: "date-time",
                                        description:
                                          "Fecha inicial de la inhabilitación.",
                                        example: "2023-07-20T08:00:00Z",
                                      },
                                      fechaFinal: {
                                        type: "string",
                                        format: "date-time",
                                        description:
                                          "Fecha final de la inhabilitación.",
                                        example: "2025-07-20T08:00:00Z",
                                      },
                                    },
                                  },
                                  constancia: {
                                    type: "object",
                                    required: ["titulo", "fecha", "url"],
                                    properties: {
                                      titulo: {
                                        type: "string",
                                        description:
                                          "Título del documento de la constancia de la inhabilitación.",
                                        example: "Constancia de Inhabilitación",
                                      },
                                      fecha: {
                                        type: "string",
                                        format: "date-time",
                                        description:
                                          "Fecha de la constancia de la inhabilitación.",
                                        example: "2023-07-27T12:00:00Z",
                                      },
                                      url: {
                                        type: "string",
                                        description:
                                          "URL que apunta al documento en formato digital de la versión pública de la constancia emitida por la autoridad competente.",
                                        example:
                                          "https://example.com/constancia_inhabilitacion.pdf",
                                      },
                                    },
                                  },
                                },
                              },
                            },
                            required: ["sancion", "descripcion", "inhabilitacion"],
                          },
                          {
                            properties: {
                              "sancion": {
                                enum: ["OTRO"],
                              },
                              descripcion: {
                                type: "string",
                                description:
                                  "Descripción o nota aclaratoria del tipo de sanción infringida.",
                                example: "Multa de $10,000 MXN",
                              },
                              otro: {
                                type: "object",
                                required: ["nombre", "urlDocumento"],
                                properties: {
                                  nombre: {
                                    type: "string",
                                    description: "Nombre de la sanción.",
                                    example: "Otra sanción",
                                  },
                                  urlDocumento: {
                                    type: "string",
                                    description:
                                      "URL que apunta al documento en formato digital de la versión pública de la constancia emitida por la autoridad competente.",
                                    example: "https://example.com/otra_sancion.pdf",
                                  },
                                },
                              },
                            },
                            required: ["sancion", "descripcion", "OTRO"],
                          },
                        ],
                      },
                    },
                  },
                },
                observaciones: {
                  type: "string",
                  title: "Observaciones",
                  description: "Cualquier observación pertinente.",
                  example:
                    "El servidor público ha sido notificado y tiene derecho a presentar recurso de      apelación dentro de los siguientes 15 días hábiles.",
                },
              },
            },
          },
          required: ["faltaGrave"],
        },
      ],
    },
  },
};

export default data;
