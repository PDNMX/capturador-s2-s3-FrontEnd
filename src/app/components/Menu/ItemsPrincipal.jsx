import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';

export const ListaPrincipal = (
  <div>
    <ListItem button>
      <ListItemIcon >
        <PeopleIcon style={{color:'#34b3eb'}}/>
      </ListItemIcon>
      <ListItemText primary="Usuarios" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Bitacora" />
    </ListItem>
  </div>
);


export const ListaSecundaria = (
  <div>
    <ListSubheader inset>Opciones de Usuario</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Administrar datos" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Carga de datos" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
         <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Captura de datos" />
    </ListItem>
  </div>
);