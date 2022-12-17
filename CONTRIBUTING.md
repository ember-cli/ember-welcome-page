# How To Contribute

## Installation

- `git clone <repository-url>`
- `cd ember-welcome-page`
- `yarn install`

## Linting

- `yarn lint`
- `yarn lint:fix`

## Running & Testing

- `yarn start` - Run the test-app for interactive development
  - view the app at [http://localhost:4200](http://localhost:4200).
  - run the test suite at [http://localhost:4200/tests](http://localhost:4200/tests)
- `yarn test` – Run `lint` and `test` scripts

## The test-app

The directory `./test-app` contains a complete Ember app intended for testing the addon. It has its own `package.json` to declare its dependencies, but **you should not need to run a separate `npm` or `yarn` install** within it, because everything it needs is included in the top-level `package.json` `devDependencies`.

After you make changes to dependencies in the test-app, you can run `yarn sync-dev-deps` to ensure they are properly synchronized with the top-level package.json.

### Upgrading the test app

To upgrade the test app:

1. `cd test-app`
2. `npx ember-cli-update`
3. `cd ..`
4. `yarn sync-dev-deps`
5. `yarn install`
