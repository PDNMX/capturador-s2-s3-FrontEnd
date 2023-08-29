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
    const data = { ...registry, tipoSancionArray: [], documents: [] };
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
    fechaCaptura?: string;
    expediente?: string;
    idnombre?: string;
    idsiglas?: string;
    idclave?: string;
    SPSnombres?: string;
    SPSprimerApellido?: string;
    SPSsegundoApellido?: string;
    SPSgenero?: object;
    SPSpuesto?: string;
    SPSnivel?: string;
    autoridadSancionadora?: string;
    tipoFalta?: { clave: string; valor: string; descripcion?: string };
    tpfdescripcion?: string;
    tipoSancionArray?: [{ clave: string; valor: string; descripcion?: string }];
    tipoSancionElement?: { clave: string; valor: string; descripcion?: string };
    tsdescripcion?: string;
    causaMotivoHechos?: string;
    resolucionURL?: string;
    resolucionFecha?: string;
    multa?: {
        monto: number;
        moneda?: {
            clave: string;
            valor: string;
        };
    };
    inhabilitacionPlazo?: string;
    inhabilitacionFechaInicial?: string;
    inhabilitacionFechaFinal?: string;
    observaciones?: string;
    documents?: [{ id: string; titulo: string; descripcion: string; url: string; fecha: string; tipo: object }];
    documentElement?: { id: string; titulo: string; descripcion: string; url: string; fecha: string; tipo: object };
}

interface MyFormProps {
    initialValues: FormDataEsquemaS3S;
    alerta: { status: boolean; message: '' };
    catalogos: { genero: []; tipoFalta: []; tipoSancion: []; moneda: []; tipoDoc: [] };
    id: string;
}


function MyForm(props: MyFormProps) {
    const { initialValues, alerta: alert, catalogos, id } = props;
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
    const alert = state.alert;
    const catalogos = state.catalogs;
    if (ownProps.match != undefined) {
        const id = ownProps.match.params.id;
        const registry = state.S3S.find((reg: any) => reg._id === id);
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
