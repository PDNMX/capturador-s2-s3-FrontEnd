let data = {
  type: "object",
  properties: {
    expediente: {
      type: "string",
      description:
        "Número de expediente del procedimiento que se inicie en materia de responsabilidades administrativas.",
      example: "EXP-2023-456",
    },
    tipoPersona: {
      title: "Tipo de Persona",
      description: "Selecciona el tipo de persona a registrar",
      type: "string",
      enumNames: ["Persona Física", "Persona Moral"],
      enum: ["personaFisica", "personaMoral"],
    },
  },
  required: ["tipoPersona"],
  dependencies: {
    tipoPersona: {
      oneOf: [
        {
          properties: {
            tipoPersona: {
              enum: ["personaFisica"],
            },
            personaFisica: {
              required: [
                "autoridadSancionadora",
                "curp",
                "domicilioMexico",
                "entePublico",
                "faltaCometida",
                "nombres",
                "objetoSocial",
                "observaciones",
                "ordenJurisdiccionalSancion",
                "origenInvestigacion",
                "primerApellido",
                "resolucion",
                "rfc",
                "segundoApellido",
                "telefono",
                "tipoSancion",
              ],
              type: "object",
              properties: {
                nombres: {
                  type: "string",
                  description:
                    "Escribir el o los nombres de la persona física sancionada, sin abreviaturas, ni signos especiales.\n",
                  example: "Juan",
                },
                primerApellido: {
                  type: "string",
                  description:
                    "Escribir el primer apellido de la persona física sancionada, sin abreviaturas, ni signos especiales.\n",
                  example: "Pérez",
                },
                segundoApellido: {
                  type: "string",
                  description:
                    "Escribir el segundo apellido de la persona física sancionada, sin abreviaturas, ni signos especiales.\n",
                  example: "Gómez",
                },
                curp: {
                  type: "string",
                  description:
                    "Escribir los dieciocho caracteres alfanuméricos como la emitió la Secretaría de Gobernación.  En caso de no contar con ella, podrá consultarla en la siguiente página: https://www.gob.mx/curp/\n",
                  example: "PERG850101HDF",
                },
                rfc: {
                  type: "string",
                  description:
                    "Escribir los primeros diez caracteres básicos y los tres correspondientes a la homoclave. En caso de no contar con este dato, podrá consultarlo en la página del Servicio de Administración Tributaria: https://www.sat.gob.mx/aplicacion/operacion/31274/consulta-tu-clave-de-rfc-mediante-curp\n",
                  example: "PERG850101XXX",
                },
                telefono: {
                  type: "string",
                  description:
                    "Número teléfonico estandarizado http://www.itu.int/dms_pub/itu-t/opb/sp/T-SP-E.164D-2009-PDF-S.pdf",
                  example: "+52 55 1111 1111",
                },
                objetoSocial: {
                  type: "string",
                  description:
                    "Descripción de la actividad de la persona física",
                  example:
                    "Adquisición y enajenación de bienes inmuebles de cualquier clase.",
                },
                domicilioMexico: {
                  $ref: "#/components/schemas/fisica_domicilioMexico",
                },
                entePublico: {
                  $ref: "#/components/schemas/fisica_entePublico",
                },
                faltaCometida: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/fisica_faltaCometida",
                  },
                },
                origenInvestigacion: {
                  $ref: "#/components/schemas/fisica_origenInvestigacion",
                },
                resolucion: {
                  $ref: "#/components/schemas/fisica_resolucion",
                },
                autoridadSancionadora: {
                  type: "string",
                  description:
                    "Nombre de la Autoridad encargada de emitir la sanción.",
                  example: "Tribunal de Justicia Administrativa",
                },
                ordenJurisdiccionalSancion: {
                  type: "string",
                  description: "Orden jurisdiccional de la sanción.",
                  example: "FEDERAL",
                  enum: ["FEDERAL", "ESTATAL"],
                },
                tipoSancion: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/fisica_tipoSancion",
                  },
                },
                observaciones: {
                  type: "string",
                  description: "Cualquier observación pertinente.",
                  example:
                    "El servidor público ha sido notificado y tiene derecho a presentar recurso de      apelación dentro de los siguientes 15 días hábiles.",
                },
              },
              description: "Personas fisicas sancionadas.",
            },
          },
          required: ["personaFisica"],
        },
        {
          properties: {
            tipoPersona: {
              enum: ["personaMoral"],
            },
            personaMoral: {
              required: [
                "autoridadSancionadora",
                "directorGeneral",
                "domicilioExtranjero",
                "domicilioMexico",
                "entePublico",
                "faltaCometida",
                "objetoSocial",
                "observaciones",
                "razonSocial",
                "representanteLegal",
                "resolucion",
                "rfc",
                "telefono",
                "tipoSancion",
              ],
              type: "object",
              properties: {
                rfc: {
                  type: "string",
                  description:
                    "RFC con homoclave de la persona moral sancionada.",
                  example: "PERG850101XXX",
                },
                razonSocial: {
                  type: "string",
                },
                telefono: {
                  type: "string",
                  description:
                    "Número teléfonico estandarizado http://www.itu.int/dms_pub/itu-t/opb/sp/T-SP-E.164D-2009-PDF-S.pdf\n",
                  example: "+52 55 1111 1111",
                },
                objetoSocial: {
                  type: "string",
                },
                domicilioMexico: {
                  $ref: "#/components/schemas/moral_domicilioMexico",
                },
                domicilioExtranjero: {
                  type: "object",
                },
                directorGeneral: {
                  type: "object",
                },
                representanteLegal: {
                  type: "object",
                },
                entePublico: {
                  $ref: "#/components/schemas/moral_entePublico",
                },
                faltaCometida: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/fisica_faltaCometida",
                  },
                },
                resolucion: {
                  $ref: "#/components/schemas/fisica_resolucion",
                },
                autoridadSancionadora: {
                  type: "string",
                  description:
                    "Nombre de la Autoridad encargada de emitir la sanción.",
                  example: "Tribunal de Justicia Administrativa",
                },
                ordenJurisdiccionalSancion: {
                  type: "string",
                  description: "Orden jurisdiccional de la sanción.",
                  example: "FEDERAL",
                  enum: ["FEDERAL", "ESTATAL"],
                },
                tipoSancion: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/fisica_tipoSancion",
                  },
                },
                observaciones: {
                  type: "string",
                  description: "Cualquier observación pertinente.",
                  example:
                    "El servidor público ha sido notificado y tiene derecho a presentar recurso de      apelación dentro de los siguientes 15 días hábiles.",
                },
              },
              description: "Personas morales sancionados.",
            },
          },
          required: ["personaMoral"],
        },
      ],
    },
  },
};

export default data;
