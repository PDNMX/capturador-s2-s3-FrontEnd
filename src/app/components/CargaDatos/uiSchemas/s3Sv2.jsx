let data = {
  tipoDeFalta: {
    "ui:widget": "RadioWidget",
    "ui:autofocus": true,
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
  faltaGrave: {
    id: {
      props: {
        spacing: 5,
        md: 6,
        lg: 2,
      },
    },
    observaciones: {
      "ui:widget": "textarea",
      "ui:options": {
        rows: 5,
      },
    },
  },
};

export default data;
