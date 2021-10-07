import babel from '@rollup/plugin-babel';
import {
  hbs,
  publicEntrypoints,
  clean,
  appReexports,
} from '@embroider/addon-dev/rollup';

export default {
  external: /\.css$/,
  output: {
    dir: 'dist',
    format: 'es',
    entryFileNames: '[name]',
  },
  plugins: [
    publicEntrypoints(['addon/components/**/*.js', 'addon/index.js']),
    appReexports({
      from: 'addon',
      to: 'app',
      include: ['addon/components/welcome-page.js'],
    }),
    babel({
      plugins: ['@embroider/addon-dev/template-colocation-plugin'],
    }),
    hbs(),
    clean({ targets: 'dist/*' }),
  ],
};
