let data = {
  id: {
    "ui:placeholder": "Ejemplo: 123456789",
  },
  ejercicio: {
    "ui:placeholder": "Ejemplo: 2018",
  },
  nombres: {
    "ui:placeholder": "Ejemplo: Juan",
  },
  primerApellido: {
    "ui:placeholder": "Ejemplo: Rodríguez",
  },
  segundoApellido: {
    "ui:placeholder": "Ejemplo: Gomez",
  },
  empleoCargoComision: {
    "ui:options": {
      title: false,
    },
    areaAdscripcion: {
      "ui:placeholder": "Ejemplo: Departamento de recursos humanos",
    },
    nivel: {
      "ui:placeholder": "Ejemplo: KA4",
    },
    nombre: {
      "ui:placeholder": "Ejemplo: Dirección de sistemas",
    },
  },

  segundoApellido: {
    "ui:widget": "textarea",
    "ui:order": [
      "valor",
      "sinSegundoApellido",
    ],
    "ui:options": {
      title: false,
    },
    valor: {
      "ui:placeholder": "Ejemplo: Gomez",
    },
  },
  curp: {
    "ui:placeholder": "Ejemplo: PERG850101HDF",
  },
  rfc: {
    "ui:placeholder": "Ejemplo: XAXX010101000",
  },
  observaciones: {
    "ui:widget": "textarea",
    "ui:options": {
      rows: 10,
      label: "4. OBSERVACIONES",
    },
    "ui:placeholder": "..."
  },
  "ui:submitButtonOptions": {
    submitText: "Guardar",
    norender: false,
    props: {
      disabled: false,
      color: "primary",
      size: "large",
    },
  },

  entePublico: {
    nombre: {
      "ui:placeholder": "Ejemplo: Secretaría de Hacienda y Crédito Público",
    },
    siglas: {
      "ui:placeholder": "Ejemplo: SHCP",
    },
    ambitoGobierno: {
      "ui:options": { label: false },
      clave: {
        "ui:widget": "RadioWidget",
        "ui:options": {
          inline: true,
        },
      },
    },
    poderOrganoGobierno: {
      "ui:widget": "RadioWidget",
      "ui:options": {
        inline: true,
      },
    },
  },

  procedimientos: {
    tipo: {
      "ui:widget": "RadioWidget",
      /* "ui:options": {
        inline: true
      }, */
    },
    tipoArea: {
      bienesServicios: {
        claves: {
          "ui:widget": "checkboxes",
          "ui:options": {
            inline: true,
          },
        },
      },
      obraPublica: {
        claves: {
          "ui:widget": "checkboxes",
          "ui:options": {
            inline: true,
          },
        },
      },
    },
    tipoArea2: {
      tipoArea: {
        "ui:widget": "RadioWidget",
        "ui:options": {
          inline: true,
        },
      },
      areas: {
        "ui:widget": "checkboxes",
        "ui:options": {
          inline: true,
        },
      },
    },
    otorgamiento: {
      "ui:widget": "checkboxes",
      "ui:options": {
        inline: true,
      },
    },
    nivelesResponsabilidad: {
      identificadorObjeto1: {
        "ui:widget": "checkboxes",
        "ui:options": {
          inline: true,
        },
      },
      identificadorObjeto2: {
        "ui:widget": "checkboxes",
        "ui:options": {
          inline: true,
        },
      },
      identificadorObjeto3: {
        "ui:widget": "checkboxes",
        "ui:options": {
          inline: true,
        },
      },
      identificadorObjeto4: {
        "ui:widget": "checkboxes",
        "ui:options": {
          inline: true,
        },
      },
      identificadorObjeto5: {
        "ui:widget": "checkboxes",
        "ui:options": {
          inline: true,
        },
      },
      identificadorObjeto6: {
        "ui:widget": "checkboxes",
        "ui:options": {
          inline: true,
        },
      },
      identificadorObjeto7: {
        "ui:widget": "checkboxes",
        "ui:options": {
          inline: true,
        },
      },
    },
  },
};

export default data;
