let data = {
  definitions: {
    responsabilidad: {
      enumNames: [
        "Elaborar",
        "Revisar",
        "Firmar, Autorizar o Dictaminar",
        "Supervisar",
        "Emitir o Suscribir",
      ],
      enum: [
        {
          name: "ELABORAR",
          lat: 40,
          lon: 74,
        },
        {
          name: "REVISAR",
          lat: 40,
          lon: 74,
        },
        {
          name: "FIRMAR_AUTORIZAR_DICTAMINAR",
          lat: 52,
          lon: 5,
        },
        {
          name: "SUPERVISAR",
          lat: 22,
          lon: 114,
        },
        {
          name: "EMITIR_SUSCRIBIR",
          lat: 22,
          lon: 114,
        },
      ],
    },
  },
  type: "object",
  description:
    "Indicar los datos generales de la persona servidora pública: nombre(s), primer y segundo apellidos, CURP, RFC y sexo.",
  title: "1. DATOS GENERALES DE LA PERSONA SERVIDORA PÚBLICA",
  required: [
    "ejercicio",
    "nombres",
    "primerApellido",
    "segundoApellido",
    "curp",
    "rfc",
    "sexo",
    "entePublico",
    "empleoCargoComision",
    "procedimientos",
  ],
  properties: {
    ejercicio: {
      type: "integer",
      title: "Ejercicio",
      description:
        "Capturar el ejercicio fiscal que corresponde al registro de la información.",
      //example: "2018",
    },
    nombres: {
      type: "string",
      title: "Nombre (s)",
      description:
        "Escribir el o los nombres de la persona servidora pública que interviene en alguno de los procedimientos citados en el objeto del sistema, sin abreviaturas, ni signos especiales.",
      //example: "Juan",
    },
    primerApellido: {
      type: "string",
      title: "Primer Apellido",
      description:
        "Escribir el primer apellido de la persona servidora pública que interviene en alguno de los procedimientos citados en el objeto del sistema, sin abreviaturas, ni signos especiales.",
      //example: "Perez",
    },

    segundoApellido: {
      title: "Segundo Apellido",
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
                valor: {
                  readOnly: true,
                  type: "string",
                  default: null,
                  const: null,
                  title: "Segundo Apellido",
                  description:
                    "Escribir el segundo apellido de la persona servidora pública que interviene en alguno de los procedimientos citados en el objeto del sistema, sin abreviaturas, ni signos especiales.",
                  //example: "Gomez",
                },
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
                    "Escribir el segundo apellido de la persona servidora pública que interviene en alguno de los procedimientos citados en el objeto del sistema, sin abreviaturas, ni signos especiales.",
                  //example: "Gomez",
                },
              },
              required: ["sinSegundoApellido", "valor"],
            },
          ],
        },
      },
    },

    curp: {
      type: "string",
      title: "CURP",
      description:
        "Escribir los dieciocho caracteres alfanuméricos como la emitió la Secretaría de Gobernación.  En caso de no contar con ella, podrá consultarla en la siguiente página: https://www.gob.mx/curp/",
      example: "PERG850101HDF",
    },
    rfc: {
      type: "string",
      title: "RFC con Homoclave",
      description:
        "Escribir los primeros diez caracteres básicos y los tres correspondientes a la homoclave. En caso de no contar con este dato, podrá consultarlo en la página del Servicio de Administración Tributaria: https://www.sat.gob.mx/aplicacion/operacion/31274/consulta-tu-clave-de-rfc-mediante-curp",
      example: "PERG850101XXX",
    },
    sexo: {
      type: "string",
      title: "Sexo",
      enum: ["FEMENINO", "MASCULINO"],
      description: "Seleccionar la opción que corresponda.",
      example: "MASCULINO",
    },
    entePublico: {
      type: "object",
      title: "2. DATOS DEL EMPLEO, CARGO O COMISIÓN",
      description:
        "Indicar los datos de empleo, cargo o comisión conforme a los catálogos de cada sección.",
      required: [
        "entidadFederativa",
        "ambitoGobierno",
        "poderOrganoGobierno",
        "nombre",
        "siglas",
      ],
      properties: {
        entidadFederativa: {
          title: "Entidad federativa",
          description:
            "Seleccionar la entidad federativa en la cual se localiza el ente público donde labora la persona servidora pública que interviene en alguno de los procedimientos citados en el objeto del sistema.",
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
            {
              clave: "01",
              valor: "Aguascalientes",
            },
            {
              clave: "02",
              valor: "Baja California",
            },
            {
              clave: "03",
              valor: "Baja California Sur",
            },
            {
              clave: "04",
              valor: "Campeche",
            },
            {
              clave: "05",
              valor: "Coahuila de Zaragoza",
            },
            {
              clave: "06",
              valor: "Colima",
            },
            {
              clave: "07",
              valor: "Chiapas",
            },
            {
              clave: "08",
              valor: "Chihuahua",
            },
            {
              clave: "09",
              valor: "Ciudad de México",
            },
            {
              clave: "10",
              valor: "Durango",
            },
            {
              clave: "11",
              valor: "Guanajuato",
            },
            {
              clave: "12",
              valor: "Guerrero",
            },
            {
              clave: "13",
              valor: "Hidalgo",
            },
            {
              clave: "14",
              valor: "Jalisco",
            },
            {
              clave: "15",
              valor: "México",
            },
            {
              clave: "16",
              valor: "Michoacán de Ocampo",
            },
            {
              clave: "17",
              valor: "Morelos",
            },
            {
              clave: "18",
              valor: "Nayarit",
            },
            {
              clave: "19",
              valor: "Nuevo León",
            },
            {
              clave: "20",
              valor: "Oaxaca",
            },
            {
              clave: "21",
              valor: "Puebla",
            },
            {
              clave: "22",
              valor: "Querétaro",
            },
            {
              clave: "23",
              valor: "Quintana Roo",
            },
            {
              clave: "24",
              valor: "San Luis Potosí",
            },
            {
              clave: "25",
              valor: "Sinaloa",
            },
            {
              clave: "26",
              valor: "Sonora",
            },
            {
              clave: "27",
              valor: "Tabasco",
            },
            {
              clave: "28",
              valor: "Tamaulipas",
            },
            {
              clave: "29",
              valor: "Tlaxcala",
            },
            {
              clave: "30",
              valor: "Veracruz de Ignacio de la Llave",
            },
            {
              clave: "31",
              valor: "Yucatán",
            },
            {
              clave: "32",
              valor: "Zacatecas",
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
                "Seleccionar el orden de gobierno al que pertenece el ente público donde labora la persona servidora pública que interviene en alguno de los procedimientos citados en el objeto del sistema: Federal, Estatal, Municipal/Alcaldía u otro (especificar).",
              type: "string",
              enum: ["ESTATAL", "FEDERAL", "MUNICIPAL_ALCALDIA", "OTRO"],
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
                      enum: ["ESTATAL", "FEDERAL", "MUNICIPAL_ALCALDIA"],
                    },
                  },
                },
              ],
            },
          },
        },
        poderOrganoGobierno: {
          type: "string",
          title: "Poder u órgano de gobierno",
          enum: ["EJECUTIVO", "LEGISLATIVO", "JUDICIAL", "ORGANO_AUTONOMO"],
          enumNames: [
            "Ejecutivo",
            "Legislativo",
            "Judicial",
            "Organo Autonomo",
          ],
          description:
            "Seleccionar el poder u órgano de gobierno del ente público donde labora la persona servidora pública que interviene en alguno de los procedimientos citados en el objeto del sistema: Ejecutivo, Legislativo, Judicial u Órgano autónomo.",
          example: "EJECUTIVO",
        },
        nombre: {
          type: "string",
          title: "Nombre del ente público",
          description:
            "Escribir el nombre completo del ente público donde labora la persona servidora pública que interviene en alguno de los procedimientos citados en el objeto del sistema, sin abreviaturas, ni signos especiales.",
          example: "Secretaría de Hacienda y Crédito Público",
        },
        siglas: {
          type: "string",
          title: "Siglas del ente público",
          description:
            "Escribir las siglas del ente público en el que labora la persona servidora pública que interviene en alguno de los procedimientos citados en el objeto del sistema.",
          example: "SHCP",
        },
      },
    },
    empleoCargoComision: {
      type: "object",
      required: ["areaAdscripcion", "nivel", "nombre"],
      properties: {
        areaAdscripcion: {
          type: "string",
          title: "Área de adscripción",
          description: "Escribir el nombre de la Unidad Administrativa a la que está adscrita la persona servidora pública que interviene en alguno de los procedimientos citados en el objeto del sistema. ",
          example: "Departamento de Recursos Humanos",
        },
        nivel: {
          type: "string",
          title: "Clave o nivel del empleo, cargo o comisión",
          description:
            "Escribir el nombre de la Unidad Administrativa a la que está adscrita la persona servidora pública que interviene en alguno de los procedimientos citados en el objeto del sistema.",
          example: "Q19",
        },
        nombre: {
          type: "string",
          title: "Denominación del empleo, cargo o comisión",
          description:
            "Escribir el nombre completo del empleo, cargo o comisión que aparece en su recibo de nómina, nombramiento, contrato u oficio de comisión.",
          example: "Jefe de Departamento",
        },
      },
    },

    procedimientos: {
      type: "object",
      title:
        "3. TIPO DE PROCEDIMIENTO EN EL QUE PARTICIPA LA PERSONA SERVIDORA PÚBLICA",
      properties: {
        tipo: {
          title:
            "Seleccionar el procedimiento administrativo en el que participa la persona servidora pública, pudiendo elegir entre las siguientes opciones:",
          type: "string",
          enum: [
            "CONTRATACION_PUBLICA",
            "CONCESIONES",
            "ENAJENACION_BIEN_MUEBLE",
            "DICTAMEN_AVALUO",
          ],
          enumNames: [
            "Contrataciones públicas",
            "Otorgamiento de concesiones, licencias, permisos, autorizaciones y sus prórrogas",
            "Enajenación de bienes muebles",
            "Emisión de dictamen valuatorio y justipreciación de rentas",
          ],
        },
      },
      required: ["tipo"],
      dependencies: {
        tipo: {
          oneOf: [
            {
              properties: {
                tipo: {
                  enum: ["CONTRATACION_PUBLICA"],
                },
                tipoArea2: {
                  type: "object",
                  title: "Tipo de área de adscripción",
                  description:
                    "Se deberá seleccionar el rol del área en la que labora, pudiendo, de ser el caso, elegir más de una opción:",
                  properties: {
                    tipoArea: {
                      title: "",
                      description: "",
                      type: "string",
                      enumNames: ["Bienes y Servicios", "Obra PÚblica"],
                      enum: ["bienesServicios", "obraPublica"],
                    },
                  },
                  dependencies: {
                    tipoArea: {
                      oneOf: [
                        {
                          properties: {
                            tipoArea: {
                              enum: ["bienesServicios"],
                            },
                            areas: {
                              title:
                                "En contratación de adquisiciones y arrendamientos de bienes muebles y servicios de cualquier naturaleza:",
                              type: "array",
                              uniqueItems: true,
                              items: {
                                type: "string",
                                enum: [
                                  "REQUIRENTE",
                                  "CONTRATANTE",
                                  "TECNICA",
                                  "OTRA",
                                ],
                              },
                            },
                          },
                          dependencies: {
                            areas: {
                              oneOf: [
                                {
                                  properties: {
                                    areas: {
                                      const: ["OTRA"],
                                    },
                                    otroValor: {
                                      type: "string",
                                      title: "Escribe el valor para otro",
                                    },
                                  },
                                },
                              ],
                            },
                          },
                        },
                        {
                          properties: {
                            tipoArea: {
                              enum: ["obraPublica"],
                            },
                            areas: {
                              title:
                                "Contratación de obra pública y los servicios relacionados con la misma:",
                              type: "array",
                              uniqueItems: true,
                              items: {
                                type: "string",
                                enum: [
                                  "REQUIRENTE",
                                  "RESPONSABLE_CONTRATACION",
                                  "TECNICA",
                                  "RESPONSABLE_EJECUCION",
                                  "OTRA",
                                ],
                              },
                            },
                          },
                          dependencies: {
                            areas: {
                              oneOf: [
                                {
                                  properties: {
                                    areas: {
                                      const: ["OTRA"],
                                    },
                                    otroValor: {
                                      type: "string",
                                      title: "Escribe el valor para otro",
                                    },
                                  },
                                },
                              ],
                            },
                          },
                        },
                      ],
                    },
                  },
                },
                /* tipoArea: {
                  type: "object",
                  title: "Tipo Área",
                  required: ["bienesServicios", "obraPublica"],
                  properties: {
                    bienesServicios: {
                      title: "Bienes y Servicios",
                      type: "object",
                      description:
                        "Tipos de área en la que se encuentra adscrito la persona servidora pública que interviene en procesos de contratación pública.",
                      properties: {
                        claves: {
                          title:
                            "Áreas que intervienen en procedimientos de contratación pública.",
                          type: "array",
                          uniqueItems: true,
                          items: {
                            type: "string",
                            enum: [
                              "REQUIRENTE",
                              "CONTRATANTE",
                              "TECNICA",
                              "OTRA",
                            ],
                          },
                        },
                      },
                      dependencies: {
                        claves: {
                          oneOf: [
                            {
                              properties: {
                                claves: { const: ["OTRA"] },
                                otroValor: {
                                  type: "string",
                                  title: "Escribe el valor para otro",
                                },
                              },
                            },
                            {
                              properties: {
                                claves: { const: ["OTRA", "REQUIRENTE"] },
                                otroValor: {
                                  type: "string",
                                  title: "Escribe el valor para otro",
                                },
                              },
                            },
                            {
                              properties: {
                                claves: { const: ["OTRA", "REQUIRENTE"] },
                                otroValor: {
                                  type: "string",
                                  title: "Escribe el valor para otro",
                                },
                              },
                            },
                            {
                              properties: {
                                claves: { const: ["OTRA", "REQUIRENTE"] },
                                otroValor: {
                                  type: "string",
                                  title: "Escribe el valor para otro",
                                },
                              },
                            },
                            {
                              properties: { claves: { const: ["REQUIRENTE"] } },
                            },
                            {
                              properties: {
                                claves: {
                                  const: ["REQUIRENTE", "CONTRATANTE"],
                                },
                              },
                            },
                            {
                              properties: {
                                claves: { const: ["REQUIRENTE", "TECNICA"] },
                              },
                            },
                            {
                              properties: {
                                claves: {
                                  const: [
                                    "REQUIRENTE",
                                    "CONTRATANTE",
                                    "TECNICA",
                                  ],
                                },
                              },
                            },
                          ],
                        },
                      },
                    },
                    obraPublica: {
                      title: "Obra Pública",
                      type: "object",
                      description:
                        "Tipos de área en la que se encuentra adscrito la persona servidora pública que interviene en procesos de contratación pública.",
                      properties: {
                        claves: {
                          title:
                            "Áreas que intervienen en procesos de contratación de obra pública.",
                          type: "array",
                          uniqueItems: true,
                          items: {
                            type: "string",
                            enum: [
                              "REQUIRENTE",
                              "RESPONSABLE_CONTRATACION",
                              "TECNICA",
                              "RESPONSABLE_EJECUCION",
                              "OTRA",
                            ],
                          },
                        },
                      },
                      dependencies: {
                        claves: {
                          oneOf: [
                            {
                              properties: {
                                claves: {
                                  const: ["OTRA"],
                                },
                                otroValor: {
                                  type: "string",
                                  title: "Escribe el valor para otro",
                                },
                              },
                            },
                          ],
                        },
                      },
                    },
                  },

                  description:
                    "Tipos de área en la que se encuentra adscrito la persona servidora pública que interviene en procesos de contratación pública.",
                },  */
                nivelesResponsabilidad: {
                  title: "Objeto y Nivel de responsabilidad",
                  type: "object",
                  properties: {
                    identificadorObjeto1: {
                      title:
                        "1. AUTORIZACIONES O DICTÁMENES PREVIOS PARA LLEVAR A CABO DETERMINADO PROCEDIMIENTO DE CONTRATACIÓN.",
                      type: "array",
                      minItems: 1,
                      uniqueItems: true,
                      items: {
                        $ref: "#/definitions/responsabilidad",
                      },
                    },
                    identificadorObjeto2: {
                      title:
                        "2. JUSTIFICACIÓN PARA EXCEPCIÓN A LA LICITACIÓN PÚBLICA",
                      type: "array",
                      minItems: 1,
                      uniqueItems: true,
                      items: {
                        $ref: "#/definitions/responsabilidad",
                      },
                    },
                    identificadorObjeto3: {
                      title:
                        "3. CONVOCATORIA, INVITACIÓN O SOLICITUD DE COTIZACIÓN Y, EN SU CASO, BASES DEL CONCURSO Y MODIFICACIONES.",
                      type: "array",
                      minItems: 1,
                      uniqueItems: true,
                      items: {
                        $ref: "#/definitions/responsabilidad",
                      },
                    },
                    identificadorObjeto4: {
                      title: "4. EVALUACIÓN DE PROPOSICIONES.",
                      type: "array",
                      minItems: 1,
                      uniqueItems: true,
                      items: {
                        $ref: "#/definitions/responsabilidad",
                      },
                    },
                    identificadorObjeto5: {
                      title: "5. ADJUDICACIÓN DEL CONTRATO.",
                      type: "array",
                      minItems: 1,
                      uniqueItems: true,
                      items: {
                        $ref: "#/definitions/responsabilidad",
                      },
                    },
                    identificadorObjeto6: {
                      title: "6. FORMALIZACIÓN DEL CONTRATO.",
                      type: "array",
                      minItems: 1,
                      uniqueItems: true,
                      items: {
                        $ref: "#/definitions/responsabilidad",
                      },
                    },
                  },
                },
              },
            },
            {
              properties: {
                tipo: {
                  enum: ["CONCESIONES"],
                },
                otorgamiento: {
                  type: "array",
                  title:
                    "Identificar el procedimiento que corresponda: Seleccionar el procedimiento que corresponda:",
                  items: {
                    type: "string",
                    enum: [
                      "Concesiones",
                      "Licencias",
                      "Permisos",
                      "Autorizaciones",
                    ],
                    enumNames: [
                      "Concesiones y sus prórrogas",
                      "Licencias y sus prórrogas",
                      "Permisos y sus prórrogas",
                      "Autorizaciones y sus prórrogas",
                    ],
                  },
                  uniqueItems: true,
                },
                nivelesResponsabilidad: {
                  title: "Objeto y Nivel de responsabilidad",
                  type: "object",
                  properties: {
                    identificadorObjeto1: {
                      title:
                        "1. CONVOCATORIA A CONCURSO O LICITACIÓN O EXCITATIVA A PRESENTAR LA SOLICITUD DE AUTORIZACIÓN.",
                      type: "array",
                      minItems: 1,
                      uniqueItems: true,
                      items: {
                        $ref: "#/definitions/responsabilidad",
                      },
                    },
                    identificadorObjeto2: {
                      title: "2. DICTÁMENES U OPINIONES PREVIOS.",
                      type: "array",
                      minItems: 1,
                      uniqueItems: true,
                      items: {
                        $ref: "#/definitions/responsabilidad",
                      },
                    },
                    identificadorObjeto3: {
                      title: "3. VISITAS DE VERIFICACIÓN.",
                      type: "array",
                      minItems: 1,
                      uniqueItems: true,
                      items: {
                        $ref: "#/definitions/responsabilidad",
                      },
                    },
                    identificadorObjeto4: {
                      title:
                        "4. EVALUACIÓN DEL CUMPLIMIENTO DE LOS REQUISITOS PARA EL OTORGAMIENTO DE LA CONCESIÓN, LICENCIA, AUTORIZACIÓN, PERMISO, O SUS PRÓRROGAS.",
                      type: "array",
                      minItems: 1,
                      uniqueItems: true,
                      items: {
                        $ref: "#/definitions/responsabilidad",
                      },
                    },
                    identificadorObjeto5: {
                      title:
                        "5. DETERMINACIÓN SOBRE EL OTORGAMIENTO DE LA CONCESIÓN, LICENCIA, AUTORIZACIÓN, PERMISO O SUS PRÓRROGAS.",
                      type: "array",
                      minItems: 1,
                      uniqueItems: true,
                      items: {
                        $ref: "#/definitions/responsabilidad",
                      },
                    },
                  },
                },
              },
            },
            {
              properties: {
                tipo: {
                  enum: ["ENAJENACION_BIEN_MUEBLE"],
                },
                nivelesResponsabilidad: {
                  title: "Objeto y Nivel de responsabilidad",
                  type: "object",
                  properties: {
                    identificadorObjeto1: {
                      title:
                        "1. AUTORIZACIONES O DICTÁMENES PREVIOS PARA LLEVAR A CABO DETERMINADO PROCEDIMIENTO DE ENAJENACIÓN DE BIENES MUEBLES.",
                      type: "array",
                      minItems: 1,
                      uniqueItems: true,
                      items: {
                        $ref: "#/definitions/responsabilidad",
                      },
                    },
                    identificadorObjeto2: {
                      title:
                        "2. ANÁLISIS O AUTORIZACIÓN PARA LLEVAR A CABO LA DONACIÓN, PERMUTA O DACIÓN EN PAGO",
                      type: "array",
                      minItems: 1,
                      uniqueItems: true,
                      items: {
                        $ref: "#/definitions/responsabilidad",
                      },
                    },
                    identificadorObjeto3: {
                      title: "3. MODIFICACIONES A LAS BASES.",
                      type: "array",
                      minItems: 1,
                      uniqueItems: true,
                      items: {
                        $ref: "#/definitions/responsabilidad",
                      },
                    },
                    identificadorObjeto4: {
                      title: "4. PRESENTACIÓN Y APERTURA DE OFERTAS.",
                      type: "array",
                      minItems: 1,
                      uniqueItems: true,
                      items: {
                        $ref: "#/definitions/responsabilidad",
                      },
                    },
                    identificadorObjeto5: {
                      title: "5. EVALUACIÓN DE OFERTAS.",
                      type: "array",
                      minItems: 1,
                      uniqueItems: true,
                      items: {
                        $ref: "#/definitions/responsabilidad",
                      },
                    },
                    identificadorObjeto6: {
                      title: "6. ADJUDICACIÓN DE LOS BIENES MUEBLES.",
                      type: "array",
                      minItems: 1,
                      uniqueItems: true,
                      items: {
                        $ref: "#/definitions/responsabilidad",
                      },
                    },
                    identificadorObjeto7: {
                      title: "7. FORMALIZACIÓN DEL CONTRATO. ",
                      type: "array",
                      minItems: 1,
                      uniqueItems: true,
                      items: {
                        $ref: "#/definitions/responsabilidad",
                      },
                    },
                  },
                },
              },
            },
            {
              properties: {
                tipo: {
                  enum: ["DICTAMEN_AVALUO"],
                },
                nivelesResponsabilidad: {
                  title: "Objeto y Nivel de responsabilidad",
                  type: "object",
                  properties: {
                    identificadorObjeto1: {
                      title:
                        "1. PROPUESTAS DE ASIGNACIONES DE AVALÚOS O JUSTIPRECIACIONES DE RENTA A PERITOS QUE FORMEN PARTE DEL PADRÓN NACIONAL DE PERITOS VALUADORES DEL INDAABIN.",
                      type: "array",
                      minItems: 1,
                      uniqueItems: true,
                      items: {
                        $ref: "#/definitions/responsabilidad",
                      },
                    },
                    identificadorObjeto2: {
                      title:
                        "2. ASIGNACIÓN DE AVALÚOS Y JUSTIPRECIACIONES DE RENTA A PERITOS QUE FORMEN PARTE DEL PADRÓN NACIONAL DE PERITOS VALUADORES DEL INDAABIN.",
                      type: "array",
                      minItems: 1,
                      uniqueItems: true,
                      items: {
                        $ref: "#/definitions/responsabilidad",
                      },
                    },
                    identificadorObjeto3: {
                      title:
                        "3. EMISIÓN DE DICTÁMENES VALUATORIOS (AVALÚOS Y JUSTIPRECIACIONES DE RENTA",
                      type: "array",
                      minItems: 1,
                      uniqueItems: true,
                      items: {
                        $ref: "#/definitions/responsabilidad",
                      },
                    },
                  },
                  required: [
                    "identificadorObjeto1",
                    "identificadorObjeto2",
                    "identificadorObjeto3",
                  ],
                },
              },
            },
          ],
        },
      },
    },

    observaciones: {
      type: "string",
      title: "4. OBSERVACIONES",
      description:
        "En este espacio se podrán realizar las observaciones que se consideren pertinentes. aclaraciones u En virtud de que las aclaraciones pueden contener información reservada y/o confidencial, esta información no será de carácter pública.",
    },
  },
};

export default data;
