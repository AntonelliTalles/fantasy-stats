import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#ffffff',  // Branco
      100: '#e1e1e1', // Cinza claro
      200: '#cfcfcf',
      300: '#b1b1b1',
      400: '#9e9e9e',
      500: '#7e7e7e',
      600: '#626262',
      700: '#515151',
      800: '#3b3b3b',
      900: '#222222', // Cinza escuro
      green: '#004d40', // Verde escuro
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'brand.900' : 'brand.50',
        color: props.colorMode === 'dark' ? 'brand.50' : 'brand.900',
      },
    }),
  },
});

export default theme;
