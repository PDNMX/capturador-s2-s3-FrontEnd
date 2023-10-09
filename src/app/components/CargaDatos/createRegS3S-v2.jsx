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

function MyForm(props) {
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
    const handleSubmit = ({ formData }) => {
        /* console.log(formData); */
        if (id != undefined) {
            dispatch(S3SActions.requestCreationS3S({ ...formData, _id: id }));
        } else {
            dispatch(S3SActions.requestCreationS3S(formData));
        }
        setOpen(true);
    }

    const schema = esquemaS3Sv2;
    const uiSchema = uiS3v2;
    //console.log(initialValues);
    const log = (type) => console.log.bind(console, type);
    const handleChange = ({ formData}) => console.log(formData);

    return (
        <Grid item xs={12}>
            <Card>
                <CardHeader
                    title="Servidores públicos de la Administración Pública Federal que intervienen en procedimientos de contrataciones públicas"
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
                    onSubmit={handleSubmit}
                    /* onError={log('errors')} */
                    uiSchema={uiSchema}
                    formData={initialValues}
                    omitExtraData={true}
                    liveOmit={false}
                    liveValidate={false}
                    noHtml5Validate={true}
                    showErrorList={false}
                />
                </Grid>
                </Grid>
            </CardContent>       
            </Card>
            
        </Grid>
    );
}

function mapStateToProps(state, ownProps) {
    const alert = state.alert;
    const catalogos = state.catalogs;
    if (ownProps.match != undefined) {
        const id = ownProps.match.params.id;
        const registry = state.S3S.find((reg) => reg._id === id);
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
