import React from "react";


import { Grid } from "@mui/material";
import { S2Actions } from "../../_actions/s2.action";
import Typography from "@mui/material/Typography";
import { connect } from "react-redux";
import makeStyles from "@mui/styles/makeStyles";
import { history } from "../../store/history";
import { useDispatch } from "react-redux";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { alertActions } from "../../_actions/alert.actions";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

import esquemaS3Sv2 from "./jsonschemas-rjsf/s2v2";
import uiS2v2 from "./uiSchemas/s2v2";

import { RJSFSchema, UiSchema } from "@rjsf/utils";
//import validator from '@rjsf/validator-ajv8';
import Form from "@rjsf/mui";
import { customizeValidator } from "@rjsf/validator-ajv8";
import spanishLocalizer from "ajv-i18n/localize/es";

const CreateReg = ({ id, alert, catalogos, registry } : any) => {
  return (
    <MyForm initialValues={registry} catalogos={catalogos} alerta={alert} id={id} />
  );
};

interface FormDataEsquemaS2 {
  id: string;
  fechaCaptura: string;
  ejercicio: number;
  nombres: string;
  primerApellido: string;
  segundoApellido: string;
  curp: string;
  rfc: string;
  sexo: string;
  entePublico: {
    entidadFederativa: {
      clave: string;
      valor: string;
    };
    ambitoGobierno: {
      clave: string;
      valor: string;
    };
    poderOrganoGobierno: string;
    nombre: string;
    siglas: string;
  };
  empleoCargoComision: {
    areaAdscripcion: string;
    nivel: string;
    nombre: string;
  };
  tipoArea: Array<{
    bienesServicios: {
      clave: string;
      valor: string;
    };
    obraPublica: {
      clave: string;
      valor: string;
    };
  }>;
  procedimientos: Array<{
    tipo: string;
    nivelesresponsabilidad: Array<{
      ambito: string;
      nivel: string;
      identificadorObjeto: number;
    }>;
  }>;
  observaciones: string;
}

interface MyFormProps {
  initialValues: FormDataEsquemaS2;
  alerta: { status: boolean; message: "" };
  catalogos: {
    estados: [];
    genero: [];
    ramo: [];
    puesto: [];
    tipoArea: [];
    nivelResponsabilidad: [];
    tipoProcedimiento: [];
  };
  id: string;
}

function MyForm(props: MyFormProps) {
  const { initialValues, alerta, catalogos, id } = props;
  const alert = alerta;
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  console.log(initialValues)

  const validator = customizeValidator({}, spanishLocalizer);
  //const validate = makeValidate(schema);
  //const required = makeRequired(schema)

  const styles = makeStyles({
    primary: {
      main: "#D8ACD8",
      light: "#bdffff",
      dark: "#34b3eb",
    },
    fontblack: {
      color: "#666666",
    },

    titulo: {
      fontWeight: "bold",
    },
  });

    const redirectToRoute = (path: any) => {
        history.push(path);
        dispatch(alertActions.clear());
    }

  //const cla = styles();

  /* const buttonSubmittProps = { // make sure all required component's inputs/Props keys&types match
        variant: "contained",
        color: "primary",
        type: "submit"
    } */

  // yes, this can even be async!
  /* async function handleSubmit({ formData, e, }: { formData: any | object; e: any; }) {
    console.log("En submit");
    console.log(formData);
    if (id != undefined) {
      dispatch(S2Actions.requestEditDo({ ...formData, _id: id }));
    } else {
      dispatch(S2Actions.requestCreationS2v2(formData));
    }
    setOpen(true);
  } */

  const onSubmit = ({ formData }: ISubmitEvent<FormData>) => {
    console.log("Data submitted: ", formData);
    if (id != undefined) {
      dispatch(S2Actions.requestEditDo({ ...formData, _id: id }));
    } else {
      dispatch(S2Actions.requestCreationS2v2(formData));
    }
    setOpen(true);
  };

  const schema: RJSFSchema = esquemaS3Sv2;
  const uiSchema: UiSchema = uiS2v2;

  const handleChange = ({ formData } : { formData: any }) => {
        console.log(formData);
  }

  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader
          title="SISTEMA DE SERVIDORES PÚBLICOS QUE INTERVENGAN EN PROCEDIMIENTOS DE CONTRATACIONES"
          subheader={id != undefined ? "Edición" : "Nuevo registro"}
        />
        <Divider />
        <CardContent>
          <Grid container>
            <Form
              schema={schema}
              validator={validator}
              onChange={handleChange}
              onSubmit={onSubmit}
              /* onError={log("errors")} */
              uiSchema={uiSchema}
              formData={initialValues}
              omitExtraData={false}
              liveOmit={true}
              liveValidate={false}
              noHtml5Validate={true}
              showErrorList={false}
            />
          </Grid>
        </CardContent>
      </Card>
      <Dialog
        disableEscapeKeyDown
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"xs"}
        >
        {/* <DialogTitle id="alert-dialog-title">{"Resultado"}</DialogTitle> */}
        <DialogContent>
          <DialogContent id="alert-dialog-description">
            <Typography noWrap variant="h6">
              {alert.message}
            </Typography>
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={!alert.status}
            onClick={() => redirectToRoute("/consulta/S2v2")}
            color="primary"
            autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

function mapStateToProps(state: any, ownProps: any) {
  const alert = state.alert;
  const catalogos = state.catalogs;
  if (ownProps.match != undefined) {
    const id = ownProps.match.params.id;
    const registry = state.S2.find((reg) => reg._id === id);
    return {
      id,
      registry,
      alert,
      catalogos,
    };
  } else {
    return { alert, catalogos };
  }
}

function mapDispatchToProps() {
  return {};
}

export const ConnectedCreateRegv2 = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateReg);
