//import React from 'react'
import ReactDOM from 'react-dom'
//import App from './App'
import { App } from "./app/components/App";
import { createTheme, ThemeProvider, Theme, StyledEngineProvider } from '@mui/material/styles';
import { esES } from '@mui/material/locale';


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


const theme = createTheme({
  palette: {
      primary: {
          main: '#D8ACD8'
      }
  }
}, esES);

ReactDOM.render(
    <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    </StyledEngineProvider>,
  document.getElementById("root")
)
