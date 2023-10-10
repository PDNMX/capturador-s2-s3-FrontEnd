import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import makeStyles from "@mui/styles/makeStyles";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import PeopleIcon from "@mui/icons-material/People";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MenuItem from "@mui/material/MenuItem";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import { ConnectedCreateProvider } from "../Proveedores/CreateProvider";
import { history } from "../../store/history";
import Collapse from "@mui/material/Collapse";
import Tooltip from "@mui/material/Tooltip";
/* import { LoadFileV } from "../UploadFile/LoadFileV"; */
import { connect } from "react-redux";
import { ConnectedCreateUser } from "../Usuarios/createUser";
import { ConnectedChangePassword } from "../Usuarios/changePassword";
import { ListUser } from "../Usuarios/listUser";
import { ListProvider } from "../Proveedores/ListProvider";


import { ConnectedCreateRegv2 } from "../CargaDatos/createRegS2-v2";
import { ConnectedCreateRegS3Sv2 } from "../CargaDatos/createRegS3S-v2";
import { ConnectedCreateRegS3Pv2 } from "../CargaDatos/createRegS3P-v2";

import { useLocation } from "react-router-dom";
import { userActions } from "../../_actions/user.action";

import { ListS2Schemav2 } from "../CargaDatos/listSchemaS2-v2";
import { ListS3SSchemav2 } from "../CargaDatos/listSchemaS3S-v2";
import { ListS3PSchemav2 } from "../CargaDatos/listSchemaS3P-v2";

/* import { ConnectedConsultarBitacora } from "../Bitacora/ConsultarBitacora";
import { ListBitacora } from "../Bitacora/ListBitacora"; */
/* import { ListS2Schema } from "../CargaDatos/listSchemaS2";
import { ListS3SSchema } from "../CargaDatos/listSchemaS3S";
import { ListS3PSchema } from "../CargaDatos/listSchemaS3P"; */

/* import { ConnectedCreateReg } from "../CargaDatos/createReg";
import { ConnectedCreateRegS3S } from "../CargaDatos/createRegS3S";
import { ConnectedCreateRegS3P } from "../CargaDatos/createRegS3P"; */

import { useSelector } from "react-redux";

import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import FolderIcon from "@mui/icons-material/Folder";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import PublishIcon from "@mui/icons-material/Publish";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ListIcon from "@mui/icons-material/List";
import CircleIcon from "@mui/icons-material/Circle";

const MenuV = ({ vistaRender, match, closeSession }) => {
  const { vigencia, permisos } = useSelector((state) => ({
    vigencia: state.vigencia,
    permisos: state.permisos,
  }));

  const location = useLocation();

  //MSubmenus
  const [submenuAdmonDatos, setsubmenuAdmonDatos] = useState(false);
  const [submenuUsuario, setsubMenuUsuario] = useState(false);
  const [submenuBitacora, setsubMenuBitacora] = useState(false);
  const [crearProovedor, setcrearProovedor] = useState(false);
  const [submenuAdmonDatosS2, setsubmenuAdmonDatosS2] = useState(false);

  const menuDatos = (e) => {
    setsubmenuAdmonDatos(true);
    setsubMenuUsuario(true);
    setsubMenuBitacora(false);
    setcrearProovedor(false);
    setCheckedDatos((prev) => !prev);
    setCheckedBitacora((prev) => false);
    setCheckedUser((prev) => false);
    setcrearProovedor(false);
  };

  const menuUser = (e) => {
    setsubmenuAdmonDatos(false);
    setsubMenuUsuario(true);
    setsubMenuBitacora(false);
    setcrearProovedor(false);
    setCheckedUser((prev) => !prev);
    setCheckedBitacora((prev) => false);
    setCheckedDatos((prev) => false);
    setcheckedDatos2((prev) => false);
    setcheckedDatosS3S((prev) => false);
    setcheckedDatosS3P((prev) => false);
    setcheckedAdminDatos2((prev) => false);
    setcheckedAdminDatosS3S((prev) => false);
    setcheckedAdminDatosS3P((prev) => false);
  };

  const menuProveedor = (e) => {
    setsubmenuAdmonDatos(false);
    setsubMenuUsuario(false);
    setcrearProovedor(true);
    setCheckedProveedor((prev) => !prev);
    setCheckedUser((prev) => false);
    setCheckedDatos((prev) => false);
    setCheckedBitacora((prev) => false);
    setsubMenuBitacora(false);
    setcheckedDatos2((prev) => false);
    setcheckedDatosS3S((prev) => false);
    setcheckedDatosS3P((prev) => false);
    setcheckedAdminDatos2((prev) => false);
    setcheckedAdminDatosS3S((prev) => false);
    setcheckedAdminDatosS3P((prev) => false);
  };

  const menuBitacora = (e) => {
    setsubmenuAdmonDatos(false);
    setsubMenuBitacora(true);
    setsubMenuUsuario(false);
    setcrearProovedor(false);
    setCheckedBitacora((prev) => !prev);
    setCheckedUser((prev) => false);
    setCheckedDatos((prev) => false);
    setCheckedProveedor((prev) => false);
    setcheckedDatos2((prev) => false);
    setcheckedDatosS3S((prev) => false);
    setcheckedDatosS3P((prev) => false);
    setcheckedAdminDatos2((prev) => false);
    setcheckedAdminDatosS3S((prev) => false);
    setcheckedAdminDatosS3P((prev) => false);

    history.push("/bitacora");
  };

  const menuDatos2 = (e) => {
    setsubmenuAdmonDatos(true);
    setsubMenuBitacora(false);
    setsubMenuUsuario(false);
    setcrearProovedor(false);
    setCheckedBitacora((prev) => false);
    setCheckedUser((prev) => false);
    setCheckedDatos(true);
    setCheckedProveedor((prev) => false);
    setcheckedDatos2((prev) => !prev);
    setcheckedDatosS3S((prev) => !prev);
    setcheckedDatosS3P((prev) => !prev);
    setcheckedAdminDatos2((prev) => false);
    setcheckedAdminDatosS3S((prev) => false);
    setcheckedAdminDatosS3P((prev) => false);
  };

  const menuAdminDatos2 = (e) => {
    setsubmenuAdmonDatos(true);
    setsubMenuBitacora(false);
    setsubMenuUsuario(false);
    setcrearProovedor(false);
    setCheckedBitacora((prev) => false);
    setCheckedUser((prev) => false);
    setCheckedDatos(true);
    setCheckedProveedor((prev) => false);
    setcheckedDatos2((prev) => false);
    setcheckedDatosS3S((prev) => false);
    setcheckedDatosS3P((prev) => false);
    setcheckedAdminDatos2((prev) => !prev);
    setcheckedAdminDatosS3S((prev) => !prev);
    setcheckedAdminDatosS3P((prev) => !prev);
  };

  const compCrearProovedor = (e) => {
    setcrearProovedor(true);
  };

  const rol = localStorage.getItem("rol");

  const redirectToRoute = (path) => {
    const cambiarcontrasena = localStorage.getItem("cambiarcontrasena");
    if (vigencia === true || cambiarcontrasena === true) {
      history.push("/usuario/cambiarcontrasena");
    } else {
      history.push(path);
    }
  };

  //Cerrar sesión
  const [anchorEl, setAnchorEl] = useState(null);

  //Mostrar opciones de cerrar sesión
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  //Cerrar opciones de cerrar sesión
  const handleClose = () => {
    setAnchorEl(null);
  };

  const cerrarSesion = () => {
    closeSession();
  };
  const drawerWidth = 260;

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      /* backgroundImage: `url(${LOGO})`, */
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      backgroundSize: "contain",

      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar,
      marginTop: "5px",
      marginBottom: "5px",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      background:
        "transparent linear-gradient(230deg, #1C7CBF 0%, #1C7CBF 4%, #9F58E2 49%, #6D4061 100%) 0% 0% no-repeat padding-box",
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: "none",
    },
    title: {
      flexGrow: 1,
      textAlign: "center",
    },
    drawerPaper: {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: "100vh",
      overflow: "auto",
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
    },
    paperPadding: {
      padding: theme.spacing(2),
    },
    fixedHeight: {
      height: 240,
    },
    fontblack: {
      color: "#666666",
    },

    submenuicono: {
      paddingLeft: "15px",
      backgroundColor: "#ffff",
    },
    submenuicono2: {
      backgroundColor: "#eee",
    },
    itemOne: {
      color: "#34b3eb",
    },
    itemTwo: {
      color: "#9ACA83",
    },
    itemThree: {
      color: "#67BFB7",
    },
    itemIcon: {
      minWidth: "35px",
    },
    colorico: {
      color: "#fff",
    },
  }));

  const classes = useStyles();
  const [checkedBitacora, setCheckedBitacora] = useState(false);
  const [checkedUser, setCheckedUser] = useState(false);
  const [checkedDatos, setCheckedDatos] = useState(false);
  const [checkedProveedor, setCheckedProveedor] = useState(false);
  const [checkedDatos2, setcheckedDatos2] = useState(false);
  const [checkedDatosS3S, setcheckedDatosS3S] = useState(false);
  const [checkedDatosS3P, setcheckedDatosS3P] = useState(false);
  const [checkedAdminDatos2, setcheckedAdminDatos2] = useState(false);
  const [checkedAdminDatosS3S, setcheckedAdminDatosS3S] = useState(false);
  const [checkedAdminDatosS3P, setcheckedAdminDatosS3P] = useState(false);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classes.appBar}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography component="div" variant="h6" color="#fff" noWrap>
            {"Herramienta de Captura de Información"}
            <br />
          </Typography>
          <div sx={{ justifyContent: "flex-end" }}>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}>
              <ManageAccountsIcon
                className={classes.colorico}
                fontSize="large"
              />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}>
              <MenuItem
                onClick={() => redirectToRoute("/usuario/cambiarcontrasena")}>
                Cambiar contraseña
              </MenuItem>
              <MenuItem onClick={() => cerrarSesion()}>Cerrar sesión</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={"permanent"}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}>
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {rol == "2" && (
              <ListItem
                onClick={(e) => menuAdminDatos2(e)}
                key={"m1"}
                disablePadding>
                <ListItemButton sx={{ p: 2 }}>
                  <ListItemIcon>
                    <FolderIcon className={classes.itemOne} />
                  </ListItemIcon>
                  <ListItemText primary="Administrar Información" />
                  {checkedAdminDatos2 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
            )}
            {permisos.map(
              (item) =>
                item === "S2" && (
                  <Collapse in={checkedAdminDatos2} key="S2">
                    <ListItem
                      onClick={() => redirectToRoute("/consulta/S2v2")}
                      key={"m1s2v2"}
                      disablePadding>
                      <ListItemButton sx={{ pl: 3.5 }}>
                        <ListItemIcon>
                          <CircleIcon sx={{ maxHeight: "8px" }} />
                        </ListItemIcon>
                        <ListItemText secondary="Sistema 2" />
                      </ListItemButton>
                    </ListItem>
                  </Collapse>
                ),
            )}
            {permisos.map(
              (item) =>
                item === "S3S" && (
                  <Collapse in={checkedAdminDatosS3S} key="S3S">
                    <ListItem
                      onClick={() => redirectToRoute("/consulta/S3Sv2")}
                      key={"m1s3sv2"}
                      disablePadding>
                      <ListItemButton sx={{ pl: 3.5 }}>
                        <ListItemIcon>
                          <CircleIcon sx={{ maxHeight: "8px" }} />
                        </ListItemIcon>
                        <ListItemText secondary="Sistema 3: Servidores Públicos" />
                      </ListItemButton>
                    </ListItem>
                  </Collapse>
                ),
            )}
            {permisos.map(
              (item) =>
                item === "S3P" && (
                  <Collapse in={checkedAdminDatosS3P} key="S3P">
                    <Tooltip title="Particulares Sancionados" disablePadding>
                      <ListItem
                        onClick={() => redirectToRoute("/consulta/S3Pv2")}
                        key={"m1s3pv2"}>
                        <ListItemButton sx={{ pl: 3.5 }}>
                          <ListItemIcon>
                            <CircleIcon sx={{ maxHeight: "8px" }} />
                          </ListItemIcon>
                          <ListItemText secondary="Sistema 3: Particulares" />
                        </ListItemButton>
                      </ListItem>
                    </Tooltip>
                  </Collapse>
                ),
            )}

            {(rol == 2 || rol == "") && (
              <ListItem
                onClick={(e) => menuDatos2(e)}
                key={"m3"}
                disablePadding>
                <ListItemButton sx={{ p: 2 }}>
                  <ListItemIcon>
                    <KeyboardIcon className={classes.itemThree} />
                  </ListItemIcon>
                  <ListItemText primary="Capturar Información" />
                  {checkedDatos2 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
            )}
            {permisos.map(
              (item) =>
                item === "S2" && (
                  <Collapse in={checkedDatos2} key="S2">
                    <ListItem
                      onClick={() => redirectToRoute("/captura/S2v2")}
                      key={"m3s2v2"}
                      disablePadding>
                      <ListItemButton sx={{ pl: 3.5 }}>
                        <ListItemIcon>
                          <CircleIcon sx={{ maxHeight: "8px" }} />
                        </ListItemIcon>
                        <ListItemText secondary="Sistema 2" />
                      </ListItemButton>
                    </ListItem>
                  </Collapse>
                ),
            )}
            {permisos.map(
              (item) =>
                item === "S3S" && (
                  <Collapse in={checkedDatosS3S} key="S3S">
                    <ListItem
                      onClick={() => redirectToRoute("/captura/S3Sv2")}
                      key={"m3s3sv2"}
                      disablePadding>
                      <ListItemButton sx={{ pl: 3.5 }}>
                        <ListItemIcon>
                          <CircleIcon sx={{ maxHeight: "8px" }} />
                        </ListItemIcon>
                        <ListItemText secondary="Sistema 3: Servidores Públicos" />
                      </ListItemButton>
                    </ListItem>
                  </Collapse>
                ),
            )}
            {permisos.map(
              (item) =>
                item === "S3P" && (
                  <Collapse in={checkedDatosS3P} key="S3P">
                    <ListItem
                      onClick={() => redirectToRoute("/captura/S3Pv2")}
                      key={"m3s3pv2"}
                      disablePadding>
                      <ListItemButton sx={{ pl: 3.5 }}>
                        <ListItemIcon>
                          <CircleIcon sx={{ maxHeight: "8px" }} />
                        </ListItemIcon>
                        <ListItemText secondary="Sistema 3: Particulares" />
                      </ListItemButton>
                    </ListItem>
                  </Collapse>
                ),
            )}

            {/* ADMINiSTRACIÓN */}
            {rol == 1 && (
              <ListItem onClick={(e) => menuUser(e)} key={"mu"} disablePadding>
                <ListItemButton sx={{ p: 2 }}>
                  <ListItemIcon>
                    <PeopleIcon style={{ color: "#34b3eb" }} />
                  </ListItemIcon>
                  <ListItemText primary="Usuarios" />
                  {checkedUser ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
            )}
            {submenuUsuario && (
              <Collapse in={checkedUser}>
                <ListItem
                  onClick={() => redirectToRoute("/usuario/crear")}
                  key={"mu1"}
                  disablePadding>
                  <ListItemButton sx={{ pl: 3.5 }}>
                    <ListItemIcon>
                      <ControlPointIcon />
                    </ListItemIcon>
                    <ListItemText primary="Crear" />
                  </ListItemButton>
                </ListItem>
                <ListItem
                  onClick={() => redirectToRoute("/usuarios")}
                  key={"mu2"}
                  disablePadding>
                  <ListItemButton sx={{ pl: 3.5 }}>
                    <ListItemIcon>
                      <FormatListBulletedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Listar" />
                  </ListItemButton>
                </ListItem>
              </Collapse>
            )}
            {rol == "1" && (
              <ListItem
                onClick={(e) => menuProveedor(e)}
                key={"mp"}
                disablePadding>
                <ListItemButton sx={{ p: 2 }}>
                  <ListItemIcon>
                    <AssignmentIcon className={classes.itemTwo} />
                  </ListItemIcon>
                  <ListItemText primary="Proveedores" />
                  {checkedProveedor ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
            )}
            {crearProovedor && (
              <Collapse in={checkedProveedor}>
                <ListItem
                  onClick={() => redirectToRoute("/proveedor/crear")}
                  key={"mp1"}
                  disablePadding>
                  <ListItemButton sx={{ pl: 3.5 }}>
                    <ListItemIcon>
                      <ControlPointIcon />
                    </ListItemIcon>
                    <ListItemText primary="Crear" />
                  </ListItemButton>
                </ListItem>

                <ListItem
                  onClick={() => redirectToRoute("/proveedores")}
                  key={"mp2"}
                  disablePadding>
                  <ListItemButton sx={{ pl: 3.5 }}>
                    <ListItemIcon>
                      <FormatListBulletedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Listar" />
                  </ListItemButton>
                </ListItem>
              </Collapse>
            )}

            {/* 
            { rol==1 &&
                <ListItem onClick={e=>menuBitacora(e)} key={'mb'}>
                    <ListItemIcon>
                        <BookmarksIcon className={classes.itemThree}  />
                    </ListItemIcon>
                    <ListItemText primary="Bitácora" />
                </ListItem>
            } 
            */}
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: "#EEF2F6",
          minHeight: "100vh",
          padding: "15px",
        }}>
        <Toolbar />
        <Grid
          container
          spacing={0}
          direction="row"
          justifyContent="center"
          alignItems="center">
          {/* {vistaRender === "cargamasiva" && <LoadFileV />} */}
          {vistaRender === "createuser" && <ConnectedCreateUser />}
          {vistaRender === "edituser" && <ConnectedCreateUser match={match} />}
          {vistaRender === "users" && <ListUser />}
          {vistaRender === "cambiarcontrasena" && <ConnectedChangePassword />}
          {vistaRender === "createprovider" && <ConnectedCreateProvider />}
          {vistaRender === "editprovider" && ( <ConnectedCreateProvider match={match} /> )}
          {vistaRender === "providers" && <ListProvider />}

          {/* ----------- NUEVAS VERSIONES - INICIO ----------- */}
          {vistaRender === "createRegv2" && <ConnectedCreateRegv2 />}
          {vistaRender === "createRegS3Sv2" && <ConnectedCreateRegS3Sv2 />}
          {vistaRender === "createRegS3Pv2" && <ConnectedCreateRegS3Pv2 />}

          {vistaRender === "editRegS3Sv2" && ( <ConnectedCreateRegS3Sv2 match={match} /> )}
          {vistaRender === "editRegS2v2" && ( <ConnectedCreateRegv2 match={match} /> )}

          {vistaRender === "S2Schemav2" && <ListS2Schemav2 />}
          {vistaRender === "S3SSchemav2" && <ListS3SSchemav2 />}
          {vistaRender === "S3PSchemav2" && <ListS3PSchemav2 />}
          {/* ----------- NUEVAS VERSIONES - FIN ----------- */}

          {/* {vistaRender === "createReg" && <ConnectedCreateReg />}
          {vistaRender === "createRegS3S" && <ConnectedCreateRegS3S />}
          {vistaRender === "createRegS3P" && <ConnectedCreateRegS3P />}

          {vistaRender === "editRegS2" && <ConnectedCreateReg match={match} />}
          {vistaRender === "editRegS3S" && ( <ConnectedCreateRegS3S match={match} /> )}
          {vistaRender === "editRegS3P" && ( <ConnectedCreateRegS3P match={match} /> )}
          {vistaRender === "S2Schema" && <ListS2Schema />}
          {vistaRender === "S3SSchema" && <ListS3SSchema />}
          {vistaRender === "S3PSchema" && <ListS3PSchema />} */}

          {/* {vistaRender === "consultarbitacora" && (
            <ConnectedConsultarBitacora />
          )} */}
          {/* {vistaRender === "reportebitacora" && <ListBitacora />} */}
        </Grid>
      </Box>
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  let vistaRender = ownProps.propiedades.renderView;
  let match = ownProps.match;
  return { vistaRender, match };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  closeSession() {
    dispatch(userActions.removeSessionLogIn());
  },
});

export const ConnectedMenuV = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MenuV);
