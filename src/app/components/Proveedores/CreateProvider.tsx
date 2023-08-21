import React from 'react';
import { Form } from 'react-final-form';
import { TextField,  makeValidate, Select, Switches} from 'mui-rff';
import { Grid, Button, Tooltip} from "@mui/material";
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import {requestCreationProvider, requestEditProvider} from "../../store/mutations";
//import ClipLoader from "react-spinners/ClipLoader";
import Typography from "@mui/material/Typography";
import makeStyles from '@mui/styles/makeStyles';
import { connect } from 'react-redux';

import {history} from "../../store/history";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";

const CreateProvider = ({id, provider,alert }) => {
    return <MyForm initialValues={provider}  id={id} alerta={alert}/>;
}


interface FormProvider {
    dependencia?:string;
    sistemas?:string[];
    estatus?:Boolean;
    fechaAlta?:string;
}

interface MyFormProps {
    initialValues: FormProvider;
    id: string;
    alerta: { status: boolean, message:string };
}


function MyForm(props: MyFormProps ) {
    let { initialValues , id , alerta } = props;
    const alert = alerta;
    const dispatch = useDispatch();
    const [loaderDisplay, setLoaderDisplay] = React.useState(false);

    // yes, this can even be async!
    async function onSubmit(values: FormProvider) {

        if(id != undefined){
            dispatch(requestEditProvider({...values, _id : id}));
        }else{
            dispatch(requestCreationProvider(values));
        }
        setLoaderDisplay(true);

    }

    const estatus = [
        {label: 'Vigente', value: true},
    ];

    const schema = Yup.object().shape({
        dependencia:  Yup.string().required("Nombre del proveedor es obligatorio.").matches(new RegExp('^[ñáéíóúáéíóúÁÉÍÓÚa-zA-Z ]*$'), 'Inserta solamente caracteres'),
        sistemas: Yup.array().min(1, "El campo Sistemas debe de tener al menos un ítem seleccionado").required("El campo sistemas aplicables es obligatorio."),
        //estatus: Yup.boolean(),
        fechaAlta: Yup.string(),
    });

    const validate = makeValidate(schema);
    //const required = makeRequired(schema)

    const redirectToRoute = (path) =>{
        history.push(path);
    }

    const sistemasData = [
        {label: 'Sistema de Servidores Públicos que Intervienen en Procedimientos de Contratación', value: 'S2'},
        {label: 'Sistema de los Servidores Públicos Sancionados', value: 'S3S'},
        {label: 'Sistema de los Particulares Sancionados', value: 'S3P'}
    ];


    const useStyles = makeStyles(() => ({
        root: {
            display: 'flex',
        },
        fontblack:{
            color: '#666666'
        },
        boton:{
            marginTop:'16px',
            marginLeft:'16px',
            marginRight:'16px',
            marginBottom:'16px',
            backgroundColor:'#ffe01b',
            color: '#666666'
        },
        boton2:{
            marginTop:'16px',
            marginLeft:'16px',
            marginRight:'-12px',
            marginBottom:'16px',
            backgroundColor:'#ffe01b',
            color: '#666666'
        },
        gridpadding: {
            padding: '30px',
        },
        marginright:{
            marginRight: '30px',
            backgroundColor:'#ffe01b',
            color: '#666666'
        }

    }));

    const classes = useStyles();

    return (
        <div>
            <Grid item xs={12}>
                <Typography variant={"h6"} paragraph className={classes.fontblack} align={"center"}>
                    {id===undefined ? <b>Crear proveedor</b> :<b>Editar proveedor</b> }
                </Typography>
            </Grid>
            <Form
                onSubmit={onSubmit}
                initialValues={initialValues}
                validate={validate}
                render={({ handleSubmit,values, submitting   }) => (
                    <form  onSubmit={handleSubmit} noValidate>
                        {loaderDisplay == false &&
                        <div>
                            <Grid spacing={3} container >
                                <Grid item xs={12} md={6}>
                                    <TextField label="Proveedor" name="dependencia" required={true} />
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.fontblack}>
                                    <Select  name = "sistemas" label="Selecciona los sistemas aplicables"  required={true} data={sistemasData} multiple={true}></Select>
                                </Grid>
                                {id != null &&
                                <Grid item xs={12} md={3}>
                                    <Switches label="Estatus" name="estatus" required={true} data={estatus}/>
                                </Grid>}
                            </Grid>
                            <Grid spacing={3} container justifyContent="flex-end" xs={12} md={12}>
                                <Tooltip title="Cancelar" placement="left">
                                <Button  onClick={ () => redirectToRoute("/proveedores")}  variant="contained"
                                         className={classes.boton}
                                > Cancelar
                                </Button>
                                </Tooltip>
                                <Tooltip title="Guardar" placement="right">
                                <Button  variant="contained"
                                         className={classes.boton2}
                                         type="submit"
                                         disabled={submitting}> Guardar
                                </Button>
                                </Tooltip>
                            </Grid>

                        </div>}

                        <Dialog
                            disableEscapeKeyDown
                            open={alert.status}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description">
                            <DialogTitle id="alert-dialog-title">{"Resultado"}</DialogTitle>
                            <DialogContent>
                                <DialogContent id="alert-dialog-description">
                                    <Typography  noWrap variant="h6" className={classes.fontblack}>
                                        {alert.message}
                                    </Typography>
                                </DialogContent>
                            </DialogContent>
                            <DialogActions>
                                <Button disabled={!alert.status} onClick={ () => redirectToRoute("/proveedores")} color="primary" autoFocus>
                                    Aceptar
                                </Button>
                            </DialogActions>
                        </Dialog>

                        <div className="sweet-loading">
                            {loaderDisplay == true && alert.status === undefined && <div><Grid item xs={12}>
                                <Typography variant={"h5"} paragraph color={"primary"} align={"center"}>
                                    <b>Cargando ...</b>
                                </Typography>
                            </Grid>
                            </div>}
                            {/* <ClipLoader
                                css={override}
                                size={150}
                                color={"#123abc"}
                                loading={loaderDisplay && alert.status === undefined}
                            /> */}
                        </div>

                    </form>
                )}
            />
        </div>
    );
}

function mapStateToProps(state,ownProps){
    let alert = state.alert;
    if( ownProps.match != undefined ){
        let id = ownProps.match.params.id;
        let provider = state.providers.find(provider=>provider._id === id);
        return {
            id,
            provider,
            alert
        }
    }else{
        return {alert};
    }
}


function mapDispatchToProps(){
    return {};
}

export const ConnectedCreateProvider = connect(mapStateToProps,mapDispatchToProps)(CreateProvider);
