import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  TablePagination,
  TableFooter,
  Button,
  TableHead,
  Grid,
  IconButton,
  Typography,
  Snackbar,
  Divider,
  Tooltip,
  Toolbar,
  useTheme,
  DialogProps,
  Card,
  CardContent,
  CardHeader,
  Paper
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import makeStyles from "@mui/styles/makeStyles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert } from "@mui/material";
import { Theme } from "@mui/material/styles";
import createStyles from "@mui/styles/createStyles";
import withStyles from "@mui/styles/withStyles";
import { alertActions } from "../../_actions/alert.actions";
import { history } from "../../store/history";
import { S2Actions } from "../../_actions/s2.action";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from "@mui/icons-material/Close";
import Nota from "../Common/Nota";
import TablePaginationActions from "../Common/TablePaginationActionsProps";

//import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
//import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

interface FormDataEsquemaS2 {
  fechaCaptura?: string;
  ejercicioFiscal?: string;
  ramo?: { clave?: number; valor?: string };
  nombres?: string;
  primerApellido?: string;
  segundoApellido?: {
    valor?: string;
    sinSegundoApellido?: boolean;
  };
  rfc?: string;
  curp?: string;
  genero?: {
    clave: string;
    valor: string;
  };
  institucionDependencia?: {
    nombre: string;
    clave: string;
    siglas: string;
  };
  puesto?: {
    nombre: string;
    nivel: string;
  };
  tipoArea?: [{ clave: string; valor: string }];
  tipoProcedimiento?: [{ clave: string; valor: string }];
  nivelResponsabilidad?: [{ clave: string; valor: string }];
  superiorInmediato?: {
    nombres: string;
    primerApellido: string;
    segundoApellido: string;
    curp: string;
    rfc: string;
    puesto: {
      nombre: string;
      nivel: string;
    };
  };
  observaciones?: string;
}

export const ListS2Schemav2 = () => {
  const { S2List, alerta, paginationSuper, providerUser } = useSelector(
    (state) => ({
      S2List: state.S2,
      alerta: state.alert,
      paginationSuper: state.pagination,
      providerUser: state.providerUser,
    }),
  );

  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [RegistroId, setRegistroId] = React.useState("");
  const [nombreUsuario, setNombreUsuario] = React.useState("");
  const [selectedCheckBox, setSelectedCheckBox] = React.useState([]);
  const [query, setQuery] = React.useState({});
  const [openModalUserInfo, setOpenModalUserInfo] = React.useState(false);
  const [selectedRegistro, setSelectedRegistro] =
    React.useState<FormDataEsquemaS2>({});

  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("md");


  const handleOpenModalUserInfo = (user) => {
    setOpenModalUserInfo(true);
    setSelectedRegistro(user);
  };

  const handleCloseModalUserInfo = () => {
    setOpenModalUserInfo(false);
  };

/*   const handleClickOpen = (id, nameReg) => {
    setOpen(true);
    setRegistroId(id);
    // setNombreUsuario(name+ " "+ primerApellido+ " "+ segundoApellido);
  }; */

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnackbar = () => {
    dispatch(alertActions.clear());
  };

  const handleChangePage = (event, newPage) => {
    dispatch(
      S2Actions.requestListS2({
        query: query,
        page: newPage + 1,
        pageSize: paginationSuper.pageSize,
      }),
    );
  };

  const handleChangeRowsPerPage = (event) => {
    const newSize = parseInt(event.target.value, 10);
    if (paginationSuper.page * newSize > paginationSuper.totalRows) {
      dispatch(
        S2Actions.requestListS2({
          query: query,
          page: 1,
          pageSize: parseInt(event.target.value, 10),
        }),
      );
    } else {
      dispatch(
        S2Actions.requestListS2({
          query: query,
          page: 1,
          pageSize: parseInt(event.target.value, 10),
        }),
      );
    }
  };

  const confirmAction = (id) => {
    let disco = 1;
    if (Array.isArray(id)) {
      disco = id.length;
    }
    const sizeList = S2List.length - disco;

    dispatch(S2Actions.deleteRecordRequest(id));
    paginationSuper.totalRows = paginationSuper.totalRows - disco;

    if (sizeList < 1) {
      if (paginationSuper.page - 1 > 0) {
        dispatch(
          S2Actions.requestListS2({
            query: query,
            page: paginationSuper.page - 1,
            pageSize: paginationSuper.pageSize,
          }),
        );
      } else {
        dispatch(
          S2Actions.requestListS2({
            query: query,
            page: 1,
            pageSize: paginationSuper.pageSize,
          }),
        );
      }
    }
    setSelectedCheckBox([]);
    handleClose();
  };

  const StyledTableCell = withStyles({
    root: {
      color: "#666666",
    },
  })(TableCell);

  const redirectToRoute = (path) => {
    history.push(path);
  };

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        "&$checked": {
          color: "#ffe01b",
        },
      },
      checked: {},
      indeterminate: {
        color: "#666666",
      },
      tool: {
        color: "white",
        backgroundColor: "#7f7e7e",
      },
      spacer: {
        flex: "1 1 100%",
      },
      actions: {
        color: theme.palette.text.secondary,
      },
      title: {
        flex: "0 0 auto",
      },
      titleDialogDetail: {
        flex: 1,
        color: "#ffff",
      },
      fontblack: {
        color: "#666666",
      },
      titleModal: {
        "padding-top": "13px",
        color: "#585858",
        "font-size": "17px",
      },
      divider: {
        width: "100%",
        backgroundColor: "##b7a426",
        color: "#b7a426",
        margin: "10px",
      },
      boton: {
        marginTop: "16px",
        marginLeft: "16px",
        marginRight: "16px",
        marginBottom: "0px",
        backgroundColor: "#ffe01b",
        color: "#666666",
      },
      boton2: {
        marginTop: "16px",
        marginLeft: "16px",
        marginRight: "-10px",
        marginBottom: "0px",
        backgroundColor: "#ffe01b",
        color: "#666666",
      },
      filterContainer: {
        padding: "10px 10px 20px 10px",
      },
      gridpadding: {
        "padding-top": "10px",
      },
      gridpaddingBottom: {
        "padding-bottom": "10px",
        "padding-left": "10px",
      },
      titlegridModal: {
        color: "#666666",
      },
      body2: {
        color: "#666666",
      },
      marginright: {
        marginRight: "30px",
        marginTop: "15px",
        backgroundColor: "#ffe01b",
        color: "#666666",
        marginBottom: "30px",
      },
      paper: {
        "text-align": "center",
        margin: 0,
        marginTop: "-10px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
      },
      modal: {
        position: "absolute",
        top: "10%",
        left: "10%",
        padding: theme.spacing(2, 4, 3),
        overflow: "scroll",
        height: "100%",
        display: "block",
        backgroundColor: theme.palette.background.paper,
      },
      tableHead: {
        backgroundColor: "#34b3eb",
      },
      tableHeaderColumn: {
        color: "#ffff",
      },
      whiteStyle: {
        color: "#ffff",
      },
      titulo: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 10,
        textDecoration: "underline",
        textDecorationColor: "#34b3eb",
        color: "#34b3eb",
      },
      toolBarModal: {
        backgroundColor: "#34b3eb",
      },
      subtitulo: {
        fontSize: 15,
        fontWeight: "bold",
        textDecoration: "underline",
        textDecorationColor: "#585858",
        color: "#585858",
        paddingTop: "10px",
      },
      containerDivider: {
        paddingLeft: "15px",
        paddingRight: "15px",
      },
    }),
  );

  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={alerta.status}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={alerta.type}>
          {alerta.message}
        </Alert>
      </Snackbar>

      <Dialog
        fullWidth={true}
        maxWidth={maxWidth}
        fullScreen={fullScreen}
        onClose={handleCloseModalUserInfo}
        aria-labelledby="customized-dialog-title"
        open={openModalUserInfo}>
        <Toolbar className={classes.toolBarModal}>
          <Typography variant="h6" className={classes.titleDialogDetail}>
            <b>Detalle del registro</b>
            <Typography className={classes.whiteStyle}>
              *(DNC) = Dato No Capturado
            </Typography>
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseModalUserInfo}
            aria-label="close"
            size="large">
            <CloseIcon className={classes.whiteStyle} />
          </IconButton>
        </Toolbar>
        <DialogContent dividers>
          <Grid container item md={12} spacing={1}>
            <Grid item xs={12}>
              <Typography className={classes.titulo} align={"center"}>
                Datos generales
              </Typography>
            </Grid>
            <Grid className={classes.gridpadding} item md={3} sm={12}>
              <Typography
                className={classes.titlegridModal}
                align="left"
                variant="subtitle2">
                <b>Ejercicio Fiscal</b>
              </Typography>
              <Typography
                className={classes.body2}
                align="left"
                variant="body2">
                {selectedRegistro.ejercicio ? (
                  selectedRegistro.ejercicio
                ) : (
                  <Nota />
                )}
              </Typography>
            </Grid>
            <Grid className={classes.gridpadding} item md={3} sm={12}>
              <Typography
                className={classes.titlegridModal}
                align="left"
                variant="subtitle2">
                <b>Fecha última actualización</b>
              </Typography>
              <Typography
                className={classes.body2}
                align="left"
                variant="body2">
                {new Date(selectedRegistro.fechaCaptura).toLocaleDateString(
                  "es-MX",
                )}
              </Typography>
            </Grid>

            <Grid className={classes.gridpadding} item md={3} sm={12}>
              <Typography
                className={classes.titlegridModal}
                align="left"
                variant="subtitle2">
                <b>Nombre(s)</b>
              </Typography>
              <Typography
                className={classes.body2}
                align="left"
                variant="body2">
                {selectedRegistro.nombres}
              </Typography>
            </Grid>
            <Grid className={classes.gridpadding} item md={3} sm={12}>
              <Typography
                className={classes.titlegridModal}
                align="left"
                variant="subtitle2">
                <b>Primer apellido</b>
              </Typography>
              <Typography
                className={classes.body2}
                align="left"
                variant="body2">
                {selectedRegistro.primerApellido}
              </Typography>
            </Grid>
            <Grid className={classes.gridpadding} item md={3} sm={12}>
              <Typography
                className={classes.titlegridModal}
                align="left"
                variant="subtitle2">
                <b>Segundo apellido</b>
              </Typography>
              <Typography
                className={classes.body2}
                align="left"
                variant="body2">
                {selectedRegistro.segundoApellido &&
                selectedRegistro.segundoApellido.sinSegundoApellido === false ? (
                  selectedRegistro.segundoApellido.valor
                ) : (
                  <Nota />
                )}
              </Typography>
            </Grid>

            <Grid className={classes.gridpadding} item md={3} sm={12}>
              <Typography
                className={classes.titlegridModal}
                align="left"
                variant="subtitle2">
                <b>RFC</b>
              </Typography>
              <Typography
                className={classes.body2}
                align="left"
                variant="body2">
                {selectedRegistro.rfc ? selectedRegistro.rfc : <Nota />}
              </Typography>
            </Grid>

            <Grid className={classes.gridpadding} item md={3} sm={12}>
              <Typography
                className={classes.titlegridModal}
                align="left"
                variant="subtitle2">
                <b>CURP</b>
              </Typography>
              <Typography
                className={classes.body2}
                align="left"
                variant="body2">
                {selectedRegistro.curp ? selectedRegistro.curp : <Nota />}
              </Typography>
            </Grid>

            <Grid className={classes.gridpadding} item md={3} sm={12}>
              <Typography
                className={classes.titlegridModal}
                align="left"
                variant="subtitle2">
                <b>Género</b>
              </Typography>
              <Typography
                className={classes.body2}
                align="left"
                variant="body2">
                {selectedRegistro.genero ? (
                  selectedRegistro.genero.valor
                ) : (
                  <Nota />
                )}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.subtitulo} align={"left"}>
                Institución / Dependencia
              </Typography>
            </Grid>
            <Grid className={classes.gridpadding} item md={3} sm={12}>
              <Typography
                className={classes.titlegridModal}
                align="left"
                variant="subtitle2">
                <b>Clave</b>
              </Typography>
              <Typography
                className={classes.body2}
                align="left"
                variant="body2">
                {selectedRegistro.institucionDependencia?.clave ? (
                  selectedRegistro.institucionDependencia.clave
                ) : (
                  <Nota />
                )}
              </Typography>
            </Grid>
            <Grid className={classes.gridpadding} item md={3} sm={12}>
              <Typography
                className={classes.titlegridModal}
                align="left"
                variant="subtitle2">
                <b>Siglas</b>
              </Typography>
              <Typography
                className={classes.body2}
                align="left"
                variant="body2">
                {selectedRegistro.institucionDependencia?.siglas ? (
                  selectedRegistro.institucionDependencia.siglas
                ) : (
                  <Nota />
                )}
              </Typography>
            </Grid>
            <Grid className={classes.gridpadding} item md={6} sm={12}>
              <Typography
                className={classes.titlegridModal}
                align="left"
                variant="subtitle2">
                <b>Nombre</b>
              </Typography>
              <Typography
                className={classes.body2}
                align="left"
                variant="body2">
                {selectedRegistro.institucionDependencia?.nombre}
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.containerDivider}>
              <Divider
                orientation="horizontal"
                className={classes.divider}
                variant={"inset"}
                light={true}
              />
            </Grid>
            <Grid className={classes.gridpadding} item md={6} sm={12}>
              <Typography
                className={classes.titlegridModal}
                align="left"
                variant="subtitle2">
                <b>Puesto</b>
              </Typography>
              <Typography
                className={classes.body2}
                align="left"
                variant="body2">
                {selectedRegistro.puesto?.nombre ? (
                  selectedRegistro.puesto.nombre
                ) : (
                  <Nota />
                )}
              </Typography>
            </Grid>
            <Grid className={classes.gridpadding} item md={3} sm={12}>
              <Typography
                className={classes.titlegridModal}
                align="left"
                variant="subtitle2">
                <b>Nivel</b>
              </Typography>
              <Typography
                className={classes.body2}
                align="left"
                variant="body2">
                {selectedRegistro.puesto?.nivel ? (
                  selectedRegistro.puesto.nivel
                ) : (
                  <Nota />
                )}
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.containerDivider}>
              <Divider
                orientation="horizontal"
                className={classes.divider}
                variant={"inset"}
                light={true}
              />
            </Grid>
            <Grid className={classes.gridpadding} item md={12} sm={12}>
              <Typography
                className={classes.titlegridModal}
                align="left"
                variant="subtitle2">
                <b>Observaciones</b>
              </Typography>
              <Typography
                className={classes.body2}
                align="left"
                variant="body2">
                {selectedRegistro.observaciones ? (
                  selectedRegistro.observaciones
                ) : (
                  <Nota />
                )}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.titulo} align={"center"}>
                Procedimientos
              </Typography>
            </Grid>
            <Grid item md={6} sm={12}>
              <Typography
                className={classes.titlegridModal}
                variant="subtitle2"
                align="left">
                <b>Tipo de área</b>
              </Typography>
              <Typography
                className={classes.body2}
                align="left"
                variant="body2">
                {selectedRegistro.tipoArea ? (
                  selectedRegistro.tipoArea.map((e) => <li>{e.valor}</li>)
                ) : (
                  <Nota />
                )}
              </Typography>
            </Grid>
            <Grid item md={6} sm={12}>
              <Typography
                className={classes.titlegridModal}
                variant="subtitle2"
                align="left">
                <b>Tipo de procedimiento</b>
              </Typography>
              <Typography
                className={classes.body2}
                align="left"
                variant="body2">
                {selectedRegistro.tipoProcedimiento ? (
                  selectedRegistro.tipoProcedimiento.map((e) => (
                    <li>{e.valor}</li>
                  ))
                ) : (
                  <Nota />
                )}
              </Typography>
            </Grid>

            <Grid item md={6} sm={12}>
              <Typography
                className={classes.titlegridModal}
                variant="subtitle2"
                align="left">
                <b>Nivel de responsabilidad</b>
              </Typography>
              <Typography
                className={classes.body2}
                align="left"
                variant="body2">
                {selectedRegistro.nivelResponsabilidad ? (
                  selectedRegistro.nivelResponsabilidad.map((e) => (
                    <li>{e.valor}</li>
                  ))
                ) : (
                  <Nota />
                )}
              </Typography>
            </Grid>
            <Grid className={classes.gridpadding} item md={6} sm={12}>
              <Typography
                className={classes.titlegridModal}
                align="left"
                variant="subtitle2">
                <b>Ramo</b>
              </Typography>
              <Typography
                className={classes.body2}
                align="left"
                variant="body2">
                {selectedRegistro.ramo ? (
                  selectedRegistro.ramo.valor +
                  "(" +
                  selectedRegistro.ramo.clave +
                  ")"
                ) : (
                  <Nota />
                )}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.titulo} align={"center"}>
                Superior inmediato
              </Typography>
            </Grid>
            <Grid className={classes.gridpadding} item md={3} sm={12}>
              <Typography
                className={classes.titlegridModal}
                align="left"
                variant="subtitle2">
                <b>Nombre(s)</b>
              </Typography>
              <Typography
                className={classes.body2}
                align="left"
                variant="body2">
                {selectedRegistro.superiorInmediato?.nombres ? (
                  selectedRegistro.superiorInmediato.nombres
                ) : (
                  <Nota />
                )}
              </Typography>
            </Grid>

            <Grid className={classes.gridpadding} item md={3} sm={12}>
              <Typography
                className={classes.titlegridModal}
                align="left"
                variant="subtitle2">
                <b>Primer Apellido</b>
              </Typography>
              <Typography
                className={classes.body2}
                align="left"
                variant="body2">
                {selectedRegistro.superiorInmediato?.primerApellido ? (
                  selectedRegistro.superiorInmediato.primerApellido
                ) : (
                  <Nota />
                )}
              </Typography>
            </Grid>
            <Grid className={classes.gridpadding} item md={3} sm={12}>
              <Typography
                className={classes.titlegridModal}
                align="left"
                variant="subtitle2">
                <b>Segundo apellido</b>
              </Typography>
              <Typography
                className={classes.body2}
                align="left"
                variant="body2">
                {selectedRegistro.superiorInmediato?.segundoApellido ? (
                  selectedRegistro.superiorInmediato.segundoApellido
                ) : (
                  <Nota />
                )}
              </Typography>
            </Grid>

            <Grid className={classes.gridpadding} item md={3} sm={12}>
              <Typography
                className={classes.titlegridModal}
                align="left"
                variant="subtitle2">
                <b>RFC</b>
              </Typography>
              <Typography
                className={classes.body2}
                align="left"
                variant="body2">
                {selectedRegistro.superiorInmediato?.rfc ? (
                  selectedRegistro.superiorInmediato.rfc
                ) : (
                  <Nota />
                )}
              </Typography>
            </Grid>

            <Grid className={classes.gridpadding} item md={3} sm={12}>
              <Typography
                className={classes.titlegridModal}
                align="left"
                variant="subtitle2">
                <b>CURP</b>
              </Typography>
              <Typography
                className={classes.body2}
                align="left"
                variant="body2">
                {selectedRegistro.superiorInmediato?.curp ? (
                  selectedRegistro.superiorInmediato.curp
                ) : (
                  <Nota />
                )}
              </Typography>
            </Grid>
            <Grid className={classes.gridpadding} item md={3} sm={12}>
              <Typography
                className={classes.titlegridModal}
                align="left"
                variant="subtitle2">
                <b>Puesto</b>
              </Typography>
              <Typography
                className={classes.body2}
                align="left"
                variant="body2">
                {selectedRegistro.superiorInmediato?.puesto?.nombre ? (
                  selectedRegistro.superiorInmediato.puesto.nombre
                ) : (
                  <Nota />
                )}
              </Typography>
            </Grid>
            <Grid className={classes.gridpadding} item md={3} sm={12}>
              <Typography
                className={classes.titlegridModal}
                align="left"
                variant="subtitle2">
                <b>Nivel</b>
              </Typography>
              <Typography
                className={classes.body2}
                align="left"
                variant="body2">
                {selectedRegistro.superiorInmediato?.puesto?.nivel ? (
                  selectedRegistro.superiorInmediato.puesto.nivel
                ) : (
                  <Nota />
                )}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {"¿Seguro que desea eliminar el registro " + nombreUsuario + "?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Los cambios no serán reversibles
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              confirmAction(RegistroId);
            }}
            color="primary"
            autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>

      <Grid item xs={12}>
        <Card>
          <CardHeader title="Sistema de Servidores Públicos que Intervienen en Procedimientos de Contratación" />
          <Divider />
          <CardContent>
            <TableContainer component={Paper}>
              <Table aria-label="custom pagination table">
                <TableHead className={classes.tableHead}>
                  <TableRow>
                    <TableCell
                      align="left"
                      className={classes.tableHeaderColumn}>
                      <b>Ejercicio fiscal</b>
                    </TableCell>
                    <StyledTableCell
                      align="left"
                      className={classes.tableHeaderColumn}>
                      <b>Servidor público</b>
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      className={classes.tableHeaderColumn}>
                      <b>Institución</b>
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      className={classes.tableHeaderColumn}>
                      <b>Puesto</b>
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      className={classes.tableHeaderColumn}>
                      <b>Acciones</b>
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                {S2List.map((schema: any) => (
                  <TableBody>
                    <TableRow key={schema._id}>
                      <StyledTableCell style={{ width: "15%" }} align="left">
                        {schema.ejercicio}
                      </StyledTableCell>
                      <StyledTableCell style={{ width: "25%" }} align="left">
                        {schema.nombres && schema.nombres + " "}
                        {schema.primerApellido && schema.primerApellido + " "}
                        {schema.segundoApellido &&
                        schema.segundoApellido.sinSegundoApellido === true
                          ? ""
                          : schema.segundoApellido.valor}
                        {/* {schema.segundoApellido && schema.segundoApellido} */}
                      </StyledTableCell>
                      {schema.entePublico && (
                        <StyledTableCell style={{ width: "25%" }} align="left">
                          {schema.entePublico.nombre}
                        </StyledTableCell>
                      )}
                      {schema.empleoCargoComision && (
                        <StyledTableCell style={{ width: "20%" }} align="left">
                          {schema.empleoCargoComision.nombre}
                        </StyledTableCell>
                      )}

                      <StyledTableCell style={{ width: "15%" }} align="center">
                        <Tooltip title="Más información" placement="top">
                          <Button
                            style={{ padding: "0px" }}
                            onClick={() => handleOpenModalUserInfo(schema)}>
                            <IconButton
                              style={{ color: "#34b3eb" }}
                              aria-label="expand row"
                              size="small">
                              <VisibilityIcon />
                            </IconButton>
                          </Button>
                        </Tooltip>
                        <Tooltip title="Editar registro" placement="top">
                          <Button
                            style={{ padding: "0px" }}
                            onClick={() =>
                              redirectToRoute(`/editar/S2v2/${schema._id}`)
                            }>
                            <Button style={{ color: "#ffe01b" }}>
                              <EditOutlinedIcon />
                            </Button>
                          </Button>
                        </Tooltip>
                      </StyledTableCell>
                    </TableRow>
                  </TableBody>
                ))}

                <TableFooter>
                  <TableRow>
                    {paginationSuper.pageSize != undefined &&
                      paginationSuper.page != undefined && (
                        <TablePagination
                          rowsPerPageOptions={[
                            3,
                            5,
                            10,
                            25,
                            {
                              label: "Todos",
                              value: paginationSuper.totalRows,
                            },
                          ]}
                          colSpan={6}
                          count={paginationSuper.totalRows}
                          rowsPerPage={paginationSuper.pageSize}
                          page={paginationSuper.page - 1}
                          SelectProps={{
                            inputProps: {
                              "aria-label": "Registros por página",
                            },
                            native: true,
                          }}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                          ActionsComponent={TablePaginationActions}
                        />
                      )}
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};
