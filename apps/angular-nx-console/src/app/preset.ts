import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
import { palette } from '@primeng/themes';

const classiePalette = palette('#A18220');

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50:  classiePalette[50],
      100: classiePalette[100],
      200: classiePalette[200],
      300: classiePalette[300],
      400: classiePalette[400],
      500: classiePalette[500],
      600: classiePalette[600],
      700: classiePalette[700],
      800: classiePalette[800],
      900: classiePalette[900],
      950: classiePalette[950],
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
          ground: '#101015',
          section: '#202029',
          card: '#1f2029',
          overlay: '#1f2029',
        },
        base: {
          content: '#101015',
        }
      },
    },
  },
  components: {
    card: {
        colorScheme: {
            light: {
                root: {
                    background: '{surface.0}',
                    color: '{surface.700}'
                },
                subtitle: {
                    color: '{surface.500}'
                }
            },
            dark: {
                root: {
                    background: 'linear-gradient(180deg, #24252F 0%, #1C1C24 100%)',
                    color: '{surface.0}'
                },
                subtitle: {
                    color: '{surface.400}'
                }
            }
        }
    },
    button: {
      colorScheme: {
        light: {
          primary: {
            root: {
              background: '{primary.500}',
              color: '#ffffff',
              border: '{primary.500}'
            },
            hover: {
              background: '{primary.600}',
              borderColor: '{primary.600}',
              color: '#ffffff'
            }
          }
        },
        dark: {
          primary: {
            root: {
              background: '{primary.500}',
              color: '#ffffff',
              border: '{primary.500}'
            },
            hover: {
              background: '{primary.600}',
              borderColor: '{primary.600}',
              color: '#ffffff'
            }
          }
        }
      }
    }
  }
});

export default MyPreset;
