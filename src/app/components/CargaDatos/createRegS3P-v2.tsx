import React from 'react';
import { Button, Grid, Card, CardContent, CardHeader, Divider} from '@mui/material';
//import { css } from "@emotion/core";
import Typography from "@mui/material/Typography";
import { connect } from 'react-redux';
import makeStyles from '@mui/styles/makeStyles';
import { history } from "../../store/history";
import { useDispatch } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { alertActions } from "../../_actions/alert.actions";

import { S3PActions } from "../../_actions/s3p.action";
import axios from "axios";

import esquemaS3Pv2 from "./jsonschemas-rjsf/s3Pv2";
import uiS3Pv2 from "./uiSchemas/s3Pv2";
import { RJSFSchema, UiSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import Form from '@rjsf/mui';
import { customizeValidator } from "@rjsf/validator-ajv8";
import spanishLocalizer from "ajv-i18n/localize/es";

const url_api= import.meta.env.VITE_URL_API;

const CreateReg = ({ id, alert, catalogos, registry, flagOnlyRead }) => {
    
    return <MyForm initialValues={
        registry != undefined ?
            (registry?.particularSancionado?.domicilioMexico ? registry : { ...registry, particularSancionado: { ...registry.particularSancionado, domicilioMexico: { pais: '{"clave":"MX","valor":"México"}' } } })
            : { ...registry, tipoSancion: [], documentos: [], particularSancionado: { domicilioMexico: { pais: '{"clave":"MX","valor":"México"}' } } }}
        catalogos={catalogos} alerta={alert} id={id} flagOnlyRead={flagOnlyRead} />;
}

interface FormDataEsquemaS3P {
    domicilio?: string,
    particularSancionado?: {
        domicilioMexico: {
            pais: {
                valor: string,
                clave: string
            },
            entidadFederativa: {
                valor: string,
                clave: string
            },
            muncipio: {
                valor: string,
                clave: string
            },
            localidad: {
                valor: string,
                clave: string
            },
            vialidad: {
                valor: string,
                clave: string
            },
            codigoPostal: string,
            numeroExterior: string,
            numeroInterior: string
        },
        domicilioExtranjero: {
            pais: {
                valor: string,
                clave: string
            },
            calle: string,
            ciudadLocalidad: string,
            estadoProvincia: string,
            codigoPostal: string,
            numeroExterior: string,
            numeroInterior: string
        },
        nombreRazonSocial: string,
        objetoSocial: string,
        rfc: string,
        tipoPersona: string,
        telefono: string
    },
    multa?: {
        monto: number,
        moneda: {
            clave: string,
            valor: string
        }
    },
    fechaCaptura?: string,
    expediente?: string,
    institucionDependencia?: {
        nombre: string,
        clave: string,
        siglas: string
    },
    directorGeneral?: {
        nombres: string,
        primerApellido: string,
        segundoApellido: string,
        curp: string
    },
    apoderadoLegal?: {
        nombres: string,
        primerApellido: string,
        segundoApellido: string,
        curp: string
    },
    objetoContrato?: string,
    autoridadSancionadora?: string,
    tipoFalta?: string,
    tipoSancion?: [{ clave: string, valor: string, descripcion: string }],
    tipoSancionElement?: { clave: string, valor: string, descripcion: string },
    causaMotivoHechos?: string,
    acto?: string,
    responsableSancion?: {
        nombres: string,
        primerApellido: string,
        segundoApellido: string,
        curp: string
    },
    resolucion?: {
        sentido: string,
        url: string,
        fechaNotificacion: string
    },
    inhabilitacion?: {
        plazo: string,
        fechaInicial: string,
        fechaFinal: string
    },
    documentos?: [{ id: string, tipo: string, titulo: string, descripcion: string, url: string, fecha: string }],
    documentElement?: { id: string, tipo: string, titulo: string, descripcion: string, url: string, fecha: string },
    observaciones?: string
}

interface MyFormProps {
    initialValues: FormDataEsquemaS3P;
    alerta: { status: boolean, message: "" };
    catalogos: { tipoPersona: [], paises: [], estados: [], municipios: [], localidades: [], vialidades: [], tipoSancion: [], moneda: [], tipoDoc: [] };
    id: string;
    flagOnlyRead: boolean;
}

function MyForm(props: MyFormProps) {
    const { initialValues, alerta, catalogos, id, flagOnlyRead } = props;
    const alert = alerta;
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [errors, setErrors] = React.useState({ tipoSancionElement: {}, documentElement: {} });
    
    //const required = makeRequired(schema)

    const styles = makeStyles({

        hideGrid: { display: 'none' },
        titleCategory: {
            color: '#666666'
        },
        invLine: {
            color: '#FFFFFF80'
        },
        boton1: {
            marginTop: '16px',
            marginLeft: '16px',
            marginRight: '16px',
            marginBottom: '5px',
            backgroundColor: '#ffe01b',
            color: '#666666'
        },
        boton2: {
            marginTop: '16px',
            marginLeft: '16px',
            marginRight: '-23px',
            marginBottom: '5px',
            backgroundColor: '#ffe01b',
            color: '#666666'
        },
        boton: {
            backgroundColor: '#ffe01b',
            color: '#666666',
        },
        overSelect: {
            'max-height': '19px',
            "white-space": "normal !important"
        },
        marginright: {
            marginRight: '30px',
            backgroundColor: '#ffe01b',
            color: '#666666'
        },
        gridpadding: {
            padding: '0px',
        },
        primary: {
            main: "#D8ACD8",
            light: "#bdffff",
            dark: "#34b3eb"
        },
        secondary: {
            main: "#ffe01b",
            light: "#ffff5c",
            dark: "#c8af00"
        },
        fontblack: {
            color: '#666666'
        },
        gridpaddingBottom: {
            'padding-bottom': '10px',
            'padding-left': '10px'
        },
        titulo: {
            fontSize: 15,
            fontWeight: "bold",
            textDecoration: "underline",
            textDecorationColor: '#34b3eb',
            color: '#34b3eb',
        },
        subtitulo: {
            fontSize: 15,
            fontWeight: "bold",
            textDecoration: "underline",
            textDecorationColor: '#585858',
            color: '#585858',
        },
        tableHead: {
            backgroundColor: '#34b3eb'
        },
        tableHeaderColumn: {
            color: '#ffff'
        },
        checked: {},
        indeterminate: {
            color: '#666666'
        },
        mensajeError: { color: "#f44336" },
        select: { boxSizing: 'border-box', maxWidth: "376px" }
    });


    const redirectToRoute = (path) => {
        history.push(path);
        dispatch(alertActions.clear());
    }

    const cla = styles();

    async function requestMunicipio(value) {
        const token = localStorage.token;
        const respuestaArray = await axios.post(url_api+ `/getCatalogsMunicipiosPorEstado`, { idEstado: value }, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (Array.isArray(respuestaArray.data.results)) {
            catalogos.municipios = respuestaArray.data.results;
        }

    }

    async function requestLocalidadByMunicipio(value, entidad) {
        const token = localStorage.token;
        const respuestaArray = await axios.post(url_api+ `/getCatalogsLocalidadesPorEstado`, {
            idMunicipio: value,
            idEntidad: entidad
        }, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (Array.isArray(respuestaArray.data.results)) {
            catalogos.localidades = respuestaArray.data.results;
        }

    }

    const schema: RJSFSchema = esquemaS3Pv2;
    const uiSchema: UiSchema = uiS3Pv2;
    const handleChange = ({ formData } : { formData: any }) => {
        console.log(formData);
    }
    // yes, this can even be async!
    async function onSubmit(values: FormDataEsquemaS3P) {

        delete values.documentElement;
        delete values.tipoSancionElement;

        if (id != undefined) {
            dispatch(S3PActions.requestCreationS3P({ ...values, _id: id }));
        } else {
            dispatch(S3PActions.requestCreationS3P(values));
        }
        setOpen(true);
    }

    return (
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="S3 Particulares"
              subheader={id != undefined ? "Edición" : "Nuevo registro"}
            />
            <Divider />
            <CardContent>
              <Grid container>
              <Grid item xs={12}>
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
        const flagOnlyRead = ownProps.match.params.flagOnlyRead;
        const registry = state.S3P.find((reg: any) => reg._id === id);
        return {
            id,
            registry,
            alert,
            catalogos,
            flagOnlyRead
        }
    } else {
        return { alert, catalogos };
    }
}


function mapDispatchToProps() { return {}; }

export const ConnectedCreateRegS3Pv2 = connect(mapStateToProps, mapDispatchToProps)(CreateReg);
