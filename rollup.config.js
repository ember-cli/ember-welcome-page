import babel from '@rollup/plugin-babel';
import { Addon } from '@embroider/addon-dev/rollup';

const addon = new Addon();

export default {
  output: addon.output(),
  plugins: [
    addon.publicEntrypoints(['components/**/*.js', 'index.js']),
    addon.appReexports(['components/welcome-page.js']),
    babel({
      plugins: ['@embroider/addon-dev/template-colocation-plugin'],
    }),
    addon.hbs(),
    addon.keepAssets(['**/*.css']),
    addon.clean(),
  ],
};
