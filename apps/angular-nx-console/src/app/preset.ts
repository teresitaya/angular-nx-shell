import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
import { palette } from '@primeng/themes';

const classiePallete = palette('#a28220');

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50:  classiePallete[50],
      100: classiePallete[100],
      200: classiePallete[200],
      300: classiePallete[300],
      400: classiePallete[400],
      500: classiePallete[500],
      600: classiePallete[600],
      700: classiePallete[700],
      800: classiePallete[800],
      900: classiePallete[900],
      950: classiePallete[950],
    },
    colorScheme: {
      light: {
        surface: {
          ground: '#ffffff',
          section: '#f8f9fa',
          card: '#ffffff',
          overlay: '#ffffff',
        },
      },
      dark: {
        surface: {
          ground: '#141419',
          section: '#202029',
          card: '#202029',
          overlay: '#202029',
        },
        base: {
          content: '#141419',
        }
      },
    },
  },
});

export default MyPreset;
