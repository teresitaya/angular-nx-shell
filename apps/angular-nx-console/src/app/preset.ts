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
        formField: {
          background: '#ffffff',
          borderColor: 'transparent',
          hoverBorderColor: 'transparent',
          focusBorderColor: 'transparent',
          iconColor: '{surface.500}'
        }
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
        },
        formField: {
          background: '#23242E',
          borderColor: 'transparent',
          hoverBorderColor: 'transparent',
          focusBorderColor: 'transparent',
          iconColor: '#ffffff'
        }
      },
    },
    formField: {
      paddingX: "1rem",
      paddingY: "0.75rem",
      sm: {
          fontSize: "0.875rem",
          paddingX: "0.625rem",
          paddingY: "0.375rem"
      },
      lg: {
          fontSize: "1.125rem",
          paddingX: "0.875rem",
          paddingY: "0.625rem"
      },
      borderRadius: "{border.radius.xl}",
      focusRing: {
          width: "0",
          style: "none",
          color: "transparent",
          offset: "0",
          shadow: "none"
      },
      transitionDuration: "{transition.duration}"
    },
    content: {
      borderRadius: "{border.radius.xl}"
    }
  },
  
  components: {
    inputtext: {
      root: {
        borderRadius: '{formField.border.radius}',
        borderColor: '{formField.border.color}',
        hoverBorderColor: '{formField.hover.border.color}',
        focusBorderColor: '{formField.focus.border.color}',
        paddingX: '{formField.padding.x}',
        paddingY: '{formField.padding.y}'
      },
      colorScheme: {
        light: {
          root: {
            color: '{text.color}',
            placeholderColor: '{text.color.secondary}'
          }
        },
        dark: {
          root: {
            color: '#ffffff',
            placeholderColor: 'rgba(255,255,255,0.7)'
          }
        }
      }
    },
    inputgroup: {
      root: {
        borderRadius: '{formField.border.radius}'
      },
      addon: {
        background: '{formField.background}',
        borderColor: '{formField.border.color}',
        color: '{formField.icon.color}',
        borderRadius: '{formField.border.radius}',
        padding: '0.75rem',
        minWidth: '2.75rem'
      }
    },
    dropdown: {
      root: {
        borderRadius: '{formField.border.radius}',
        borderColor: '{formField.border.color}',
        hoverBorderColor: '{formField.hover.border.color}',
        focusBorderColor: '{formField.focus.border.color}'
      },
      trigger: {
        borderRadius: '{formField.border.radius}'
      },
      panel: {
        borderRadius: '1rem'
      },
      colorScheme: {
        light: {
          root: {
            color: '{text.color}'
          },
          trigger: {
            color: '{text.color}'
          },
          item: {
            color: '{text.color}'
          }
        },
        dark: {
          root: {
            color: '#ffffff'
          },
          trigger: {
            color: '#ffffff'
          },
          item: {
            color: '#ffffff'
          }
        }
      }
    },
    /* inputswitch: {
      slider: {
        borderRadius: '1rem',
        background: '#4a4b52'
      },
      handle: {
        background: '#ffffff'
      }
    }, */
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
