[![This project uses GitHub Actions for continuous integration.](https://github.com/ember-cli/ember-welcome-page/workflows/CI/badge.svg)](https://github.com/ember-cli/ember-welcome-page/actions?query=workflow%3ACI)

# ember-welcome-page

Displays a nice welcome page for newly generated applications with links to resources.


## Installation

```sh
ember install ember-welcome-page
```

<details>
<summary>Use Glint or <code>&lt;template&gt;</code> tag? ✨</summary>

- Update your template registry to extend this addon's. Check the [Glint documentation](https://typed-ember.gitbook.io/glint/using-glint/ember/using-addons#using-glint-enabled-addons) for more information.

    ```ts
    /* types/index.d.ts */

    import '@glint/environment-ember-loose';

    import type EmberWelcomePageRegistry from 'ember-welcome-page/template-registry';

    declare module '@glint/environment-ember-loose/registry' {
      export default interface Registry extends EmberWelcomePageRegistry, /* other addon registries */ {
        // local entries
      }
    }
    ```

- If you are using [`<template>` tag](https://github.com/ember-template-imports/ember-template-imports), you are good to go! Use the named import to consume things.

    ```ts
    /* app/components/hello-world.{gjs,gts} */

    import { WelcomePage } from 'ember-welcome-page';

    <template>
      <WelcomePage />
    </template>
    ```

</details>


## Compatibility

- Ember.js v3.28 or above
- Ember CLI v3.28 or above
- Node.js v14 or above


## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).
