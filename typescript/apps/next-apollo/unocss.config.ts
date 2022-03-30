import { defineConfig, presetUno, presetAttributify } from 'unocss'

export default defineConfig({
  exclude: [/node_modules/],
  include: [/\.tsx/],
  presets: [presetUno(), presetAttributify()],
  theme: {
    colors: {
      warn: '#ff0000',
    },
    fontSize: {
      '19p': '19px',
    },
    spacing: {
      '5p': '5px',
      '6p': '6px',
    },
  },
})
