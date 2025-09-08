// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: "'IranYekan', Roboto, Arial, sans-serif",
  },
  palette: {
    primary: { main: '#1976d2' },
    text: { secondary: 'grey' },
  },
});

export default theme;
