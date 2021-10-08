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
    publicEntrypoints({
      srcDir: 'src',
      include: ['components/**/*.js', 'index.js'],
    }),
    appReexports({
      srcDir: 'src',
      include: ['components/welcome-page.js'],
    }),
    babel({
      plugins: ['@embroider/addon-dev/template-colocation-plugin'],
    }),
    hbs(),
    clean({ targets: 'dist/*' }),
  ],
};
