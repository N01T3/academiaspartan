import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { md3 } from 'vuetify/blueprints'

export default createVuetify({
  blueprint: md3,
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        dark: true,
        colors: {
          background: '#0B0D10',
          surface: '#0F1216',
          'surface-variant': '#14181E',
          'surface-bright': '#1A1F27',
          'on-surface': '#E7E8EA',
          'on-surface-variant': '#C4C6CC',
          primary: '#E11D2E',
          'on-primary': '#FFFFFF',
          secondary: '#F97316',
          'on-secondary': '#1A0D00',
          tertiary: '#FFB74D',
          'on-tertiary': '#241A00',
          error: '#FF5449',
          'on-error': '#2C0006',
          info: '#7C9BFF',
          success: '#4CAF50',
          warning: '#FFB74D',
          outline: '#8F9094',
        },
      },
    },
  },
  defaults: {
    global: {
      rounded: 'lg',
    },
    VBtn: {
      rounded: 'xl',
      flat: true,
    },
    VCard: {
      rounded: 'xl',
      elevation: 0,
    },
    VTextField: {
      variant: 'outlined',
      density: 'comfortable',
      color: 'primary',
    },
    VTextarea: {
      variant: 'outlined',
      color: 'primary',
    },
    VSelect: {
      variant: 'outlined',
      color: 'primary',
    },
    VChip: {
      rounded: 'sm',
    },
  },
})
