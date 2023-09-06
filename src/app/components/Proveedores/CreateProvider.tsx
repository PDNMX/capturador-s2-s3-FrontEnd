import React from "react";
import { RJSFSchema, UiSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import Form from "@rjsf/mui";
import { useDispatch, connect } from "react-redux";

import { requestCreationProvider, requestEditProvider, } from "../../store/mutations";
import { history } from "../../store/history";
import {
  DialogContent,
  DialogActions,
  Dialog,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";

const CreateProvider = ({ id, provider, alert, }: {
  id: string;
  provider: object;
  alert: any;
}) => {
  return <Proveedor initialValues={provider} id={id} alerta={alert} />;
};

interface FormProvider {
  dependencia?: string;
  sistemas?: string[];
  estatus?: Boolean;
  fechaAlta?: string;
}

interface MyFormProps {
  initialValues: FormProvider;
  id: string;
  alerta: { status: boolean; message: string };
}

function Proveedor(props: MyFormProps) {
  let { initialValues, id, alerta } = props;
  const alert = alerta;
  const [loaderDisplay, setLoaderDisplay] = React.useState(false);
  const schema: RJSFSchema = {
    type: "object",
    required: ["dependencia", "sistemas"],
    properties: {
      dependencia: {
        type: "string",
        title: "Nombre del proveedor",
      },
      sistemas: {
        type: "array",
        title: "Selecciona el sistema",
        uniqueItems: true,
        items: {
          type: "string",
          enum: ["S2", "S3S", "S3P"],
          enumNames: [
            "Sistema de Servidores Públicos que Intervienen en Procedimientos de Contratación",
            "Sistema de los Servidores Públicos Sancionados",
            "Sistema de los Particulares Sancionados",
          ],
        },
      },
    },
  };

  const uiSchema: UiSchema = {
    "ui:submitButtonOptions": {
      submitText: "Guardar",
      props: {
        className: "btn btn-info",
        size: "large"
      },
    },
    dependencia: {
      "ui:autofocus": true,
      props: {
        fullWidth: true,
      }
    },
    sistemas: {
      "ui:widget": "checkboxes",
    },
  };

  const dispatch = useDispatch();
  const redirectToRoute = (path: any) => {
    history.push(path);
  };

  const handleSubmit = ({ formData }: any) => {
    if (id != undefined) {
      dispatch(requestEditProvider({ ...formData, _id: id }));
    } else {
      dispatch(requestCreationProvider(formData));
    }
    setLoaderDisplay(true);
  };

  return (
    <>
      <Grid item xs={12} >
        <Card>
          <CardHeader
            title="PROVEEDOR DE DATOS"
            subheader={id != undefined ? "Edición" : "Nuevo registro"}
          />
          <Divider />
          <CardContent>
            <Grid container>
              {loaderDisplay == false && (
                <Form
                  schema={schema}
                  validator={validator}
                  /* onChange={log('changed')} */
                  onSubmit={handleSubmit}
                  /* onError={log("errors")} */
                  uiSchema={uiSchema}
                  formData={initialValues}
                  liveOmit={true}
                  showErrorList={false}
                />
              )}
            </Grid>
          </CardContent>
        </Card>
        <Dialog
          disableEscapeKeyDown
          open={alert.status}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
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
              onClick={() => redirectToRoute("/proveedores")}
              color="primary"
              autoFocus>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </>
  );
}

function mapStateToProps(state: any, ownProps: any) {
  let alert = state.alert;
  if (ownProps.match != undefined) {
    let id = ownProps.match.params.id;
    let provider = state.providers.find((provider: any) => provider._id === id);
    return {
      id,
      provider,
      alert,
    };
  } else {
    return { alert };
  }
}

function mapDispatchToProps() {
  return {};
}

export const ConnectedCreateProvider = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateProvider);
