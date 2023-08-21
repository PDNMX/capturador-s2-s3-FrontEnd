import React from 'react';

import { connect } from 'react-redux';
import { history } from '../../store/history';
import { useDispatch } from 'react-redux';
import { alertActions } from '../../_actions/alert.actions';
import { S3SActions } from '../../_actions/s3s.action';

import {Grid, Card, CardContent, CardHeader, Divider} from '@mui/material';

//import schema from './validate.s3s';
//import document from './validate.document';
import esquemaS3Sv2 from './jsonschemas-rjsf/s3Sv2';
import uiS3v2 from './uiSchemas/s3Sv2';

import { RJSFSchema, UiSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import Form from '@rjsf/mui';

const CreateReg = ({ id, alert, catalogos, registry }) => {
    let data = { ...registry, tipoSancionArray: [], documents: [] };
    return (
        <MyForm
            initialValues={registry != undefined ? registry : data}
            catalogos={catalogos}
            alerta={alert}
            id={id}
        />
    );
};

interface FormDataEsquemaS3S {
    fechaCaptura?: String;
    expediente?: String;
    idnombre?: String;
    idsiglas?: String;
    idclave?: String;
    SPSnombres?: String;
    SPSprimerApellido?: String;
    SPSsegundoApellido?: String;
    SPSgenero?: {};
    SPSpuesto?: String;
    SPSnivel?: String;
    autoridadSancionadora?: String;
    tipoFalta?: { clave: string; valor: string; descripcion?: string };
    tpfdescripcion?: String;
    tipoSancionArray?: [{ clave: string; valor: string; descripcion?: string }];
    tipoSancionElement?: { clave: string; valor: string; descripcion?: string };
    tsdescripcion?: String;
    causaMotivoHechos?: String;
    resolucionURL?: String;
    resolucionFecha?: String;
    multa?: {
        monto: Number;
        moneda?: {
            clave: String;
            valor: String;
        };
    };
    inhabilitacionPlazo?: String;
    inhabilitacionFechaInicial?: String;
    inhabilitacionFechaFinal?: String;
    observaciones?: String;
    documents?: [{ id: String; titulo: String; descripcion: String; url: String; fecha: String; tipo: {} }];
    documentElement?: { id: String; titulo: String; descripcion: String; url: String; fecha: String; tipo: {} };
}

interface MyFormProps {
    initialValues: FormDataEsquemaS3S;
    alerta: { status: boolean; message: '' };
    catalogos: { genero: []; tipoFalta: []; tipoSancion: []; moneda: []; tipoDoc: [] };
    id: string;
}


function MyForm(props: MyFormProps) {
    let { initialValues, alerta: alert, catalogos, id } = props;
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    /*const [errors, setErrors] = React.useState({ tipoSancionElement: {}, documentElement: {} });
 */
    //const validate = makeValidate(schema);
    //const required = makeRequired(schema)

    /* const redirectToRoute = (path) => {
        history.push(path);
        dispatch(alertActions.clear());
    }; */

    // yes, this can even be async!
    async function handleSubmit({ formData, e } : { formData: any | object, e: any }) {
        /* console.log(formData); */
        if (id != undefined) {
            dispatch(S3SActions.requestCreationS3S({ ...formData, _id: id }));
        } else {
            dispatch(S3SActions.requestCreationS3S(formData));
        }
        setOpen(true);
    }

    const schema: RJSFSchema = esquemaS3Sv2;
    const uiSchema: UiSchema = uiS3v2;
    //console.log(initialValues);
    const log = (type: any) => console.log.bind(console, type);
    const handleChange = ({ formData, e }: { formData: any | object, e: any  }) => console.log(formData);

    return (
        <Grid item xs={12}>
            <Card>
                <CardHeader
                    title="Servidores públicos de la Administración Pública Federal que intervienen en procedimientos de contrataciones públicas"
                    /* subheader="September 14, 2016" */
                />
                {/* <Grid item xs={12}>
                    <Typography noWrap variant="h6" className={cla.fontblack}>
                        <b>{id != undefined ? "Edición" : "Captura"}</b>
                    </Typography>
                </Grid> */}
                {/* <CardMedia
                    component="img"
                    height="194"
                    image="/static/images/cards/paella.jpg"
                    alt="Paella dish"
                /> */}
                <Divider />
            <CardContent>
                <Grid container columns={50}>
                <Form
                    schema={schema}
                    validator={validator}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    onError={log('errors')}
                    uiSchema={uiSchema}
                    formData={initialValues}
                    omitExtraData={true}
                    liveOmit={true}
                    /* liveValidate={true} */
                />
                </Grid>
            </CardContent>       
            </Card>
            
        </Grid>
    );
}

function mapStateToProps(state: any, ownProps: any) {
    let alert = state.alert;
    let catalogos = state.catalogs;
    if (ownProps.match != undefined) {
        let id = ownProps.match.params.id;
        let registry = state.S3S.find((reg: any) => reg._id === id);
        return {
            id,
            registry,
            alert,
            catalogos
        };
    } else {

        return { alert, catalogos };
    }
}

function mapDispatchToProps() {
    return {};
}

export const ConnectedCreateRegS3Sv2 = connect(mapStateToProps, mapDispatchToProps)(CreateReg);
