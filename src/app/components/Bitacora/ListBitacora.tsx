import React from 'react';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import {
    Table,
    TableBody,
    TableContainer,
    TableRow,
    TableCell,
    TablePagination,
    TableFooter,
    Tooltip,
    Button,
    TableHead,
    Grid,
    Typography,
} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import TablePaginationActions from '../Common/TablePaginationActionsProps';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Alert } from '@mui/material';
import { history } from "../../store/history";
import { CSVLink } from "react-csv";


export const ListBitacora = () => {

    const { bitacora } = useSelector(state => ({
        providers: state.providers,
        alerta: state.alert,
        providerSelect: state.providerSelect,
        idUser: state.userInSession,
        bitacora: state.bitacora
    }));
    /* const dispatch = useDispatch(); */
    const [pagination, setPagination] = React.useState({ page: 0, pageSize: 10 });

    const handleChangePage = (event, newPage) => {
        setPagination({ page: newPage, pageSize: pagination.pageSize });
    };

    const handleChangeRowsPerPage = (event) => {
        const newSize = parseInt(event.target.value, 10);
        if (pagination.page * newSize > bitacora.length) {
            setPagination({ page: 0, pageSize: parseInt(event.target.value, 10) });
        } else {
            setPagination({ page: pagination.page, pageSize: parseInt(event.target.value, 10) });
        }
    };


    /* const StyledTableCell = withStyles({
        root: {
            color: '#666666'
        }
    })(TableCell); */

    const redirectToRoute = (path) => {
        history.push(path);
    }

    const useStyles = makeStyles((theme) => ({
        fontblack: {
            color: '#666666'
        },
        boton: {
            marginTop: '16px',
            marginBottom: '12px',
            backgroundColor: '#ffe01b',
            color: '#666666'
        },
        boton2: {
            marginTop: '16px',
            marginLeft: '16px',
            marginRight: '-10px',
            marginBottom: '12px',
            backgroundColor: '#ffe01b',
            color: '#666666'
        },
        gridpadding: {
            padding: '10px',
        },
        marginright: {
            marginRight: '30px',
            backgroundColor: '#ffe01b',
            color: '#666666',
            marginBottom: '30px'
        },
        paper: {
            'text-align': 'center',
            margin: 0,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        tableHead: {
            backgroundColor: '#34b3eb'
        },
        tableHeaderColumn: {
            color: '#ffff'
        },

        whiteStyle: {
            color: '#ffff'
        },
    }));

    const headers = [
        { label: "Tipo de operación", key: "tipo" },
        { label: "Fecha", key: "fecha" },
        { label: "Sistema", key: "sistema_label" },
        { label: "Número registros", key: "numeroRegistros" },
        { label: "Usuario", key: "nombre" }
    ];

    const data = bitacora;

    const classes = useStyles();
    return (
        <div>
            <Grid item xs={12}>
                <Typography variant={"h6"} paragraph className={classes.fontblack} align={"center"}>
                    <b>Reporte de bitácora</b>
                </Typography>
            </Grid>
            {alerta.status == true && <Alert severity={alerta.type}>{alerta.message}</Alert>}

            <Grid className={classes.gridpadding} spacing={3} container>
                <TableContainer component={Paper}>
                    {bitacora.length > 0 ?
                        <Table aria-label="custom pagination table">
                            <TableHead className={classes.tableHead}>
                                <TableRow key={'rowhead'}>
                                    <TableCell key={'tbop'} className={classes.tableHeaderColumn}
                                        style={{ width: 'auto' }}
                                        align="left"><b>Operación</b></TableCell>
                                    <TableCell key={'tbfec'} className={classes.tableHeaderColumn}
                                        style={{ width: 'auto' }}
                                        align="left"><b>Fecha</b></TableCell>
                                    <TableCell key={'tbSis'} className={classes.tableHeaderColumn}
                                        style={{ width: 'auto' }}
                                        align="left"><b>Sistema</b></TableCell>
                                    <TableCell key={'tbreg'} className={classes.tableHeaderColumn}
                                        style={{ width: 'auto' }}
                                        align="center"><b>Registros</b></TableCell>
                                    <TableCell key={'tbusrs'} className={classes.tableHeaderColumn}
                                        align="center"><b>Usuario</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody key="bitacora">
                                {bitacora.slice(pagination.page * pagination.pageSize, pagination.page * pagination.pageSize + pagination.pageSize).map((rowbitacora, index) => (
                                    <TableRow key={index}>
                                        <TableCell className={classes.fontblack} component="th" scope="row"
                                            style={{ width: 'auto' }} align="left">
                                            {rowbitacora.tipo}
                                        </TableCell>
                                        <TableCell className={classes.fontblack} style={{ width: 'auto' }} align="left">
                                            {rowbitacora.fecha}
                                        </TableCell>
                                        <TableCell className={classes.fontblack} style={{ width: 'auto' }} align="left">
                                            <div>
                                                {rowbitacora.sistema_label}
                                            </div>
                                        </TableCell>
                                        <TableCell className={classes.fontblack} style={{ width: 'auto' }} align="center">
                                            {rowbitacora.numeroRegistros}
                                        </TableCell>
                                        <TableCell className={classes.fontblack} style={{ width: 'auto' }} align="center">
                                            {rowbitacora.nombre}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow key={'rowpaginator'}>
                                    {pagination.pageSize != undefined && pagination.page != undefined &&
                                        <TablePagination
                                            rowsPerPageOptions={[3, 5, 10, 25, { label: 'Todos', value: bitacora.length }]}
                                            colSpan={6}
                                            count={bitacora.length}
                                            rowsPerPage={pagination.pageSize}
                                            page={pagination.page}
                                            SelectProps={{
                                                inputProps: { 'aria-label': 'Registros por página' },
                                                native: true,
                                            }}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                            ActionsComponent={TablePaginationActions}
                                        />}
                                </TableRow>
                            </TableFooter>
                        </Table>
                        :
                        <Table>
                            <TableBody>
                                <TableRow key={'rowmsj'}>
                                    <TableCell className={classes.fontblack} style={{ width: 'auto' }} align="center">
                                        No hay registros para está consulta.
                                    </TableCell>
                                </TableRow>
                            </TableBody>

                        </Table>}
                </TableContainer>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8} />
                <Grid item xs={12} md={2}>
                    <Tooltip title="Reporte Nuevo" placement="left">
                        <Button onClick={() => redirectToRoute("/bitacora")}
                            variant="contained"
                            className={classes.boton}
                            endIcon={<AddBoxIcon>Reporte Nuevo</AddBoxIcon>}
                        >
                            Generar Nuevo Reporte
                        </Button>
                    </Tooltip>
                </Grid>
                <Grid item xs={12} md={2}>
                    <Tooltip title="Descargar CSV" placement="right">
                        <CSVLink data={data} headers={headers} filename={"Bitacora.csv"} style={{ textDecoration: "none" }}>
                            <Button
                                variant="contained"
                                className={classes.boton2}
                                endIcon={<FileCopyIcon>Descargar CSV</FileCopyIcon>}
                            >
                                Descargar CSV
                            </Button>
                        </CSVLink>
                    </Tooltip>
                </Grid>
            </Grid>
        </div>
    );
}



