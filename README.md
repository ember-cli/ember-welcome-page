[![This project uses GitHub Actions for continuous integration.](https://github.com/ember-cli/ember-welcome-page/workflows/CI/badge.svg)](https://github.com/ember-cli/ember-welcome-page/actions?query=workflow%3ACI)

# ember-welcome-page

Displays a nice welcome page for newly generated applications with links to resources.

## Compatibility

- Ember.js v3.28 or above
- Embroider or ember-auto-import v2

## Installation

```sh
ember install ember-welcome-page
```

## Usage

The primary usage of this addon is as a default experience for people when first generating a new Ember application. It is unlikely that you would want to use this component, but if you did here is how you do it: 


```gjs
/* app/components/hello-world.gjs */

import { WelcomePage } from 'ember-welcome-page';

<template>
  <WelcomePage />
</template>
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
