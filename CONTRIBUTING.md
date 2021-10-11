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
- `yarn test:ember` – Run the test suite (with its default dependencies) and then exit.
- `yarn test` – Run the test suite under each tested scenario and then exit.
- `yarn scenario:list` - List the names of all tested scenarios.
- `yarn scenario:run $SCENARIO_NAME` - Run only one scenario and then exit.
- `yarn scenario:output $SCENARIO_NAME` - Create a copy of the test-app in the `./scenario` directory that is configured for the named scenario. Useful to interactively run and debug individual scenarios. (Caution: due to https://github.com/stefanpenner/node-fixturify-project/issues/56 you may need to invoke commands like "ember" as `./node_modules/ember-cli/bin/ember` because executables are not linked automatically into the scenario yet.)

We use [scenario-tester](https://github.com/ef4/scenario-tester) to reconfigure the test-app with different dependencies to ensure that the addon works with all the intended Ember versions and build system variations.

`./test-app/scenarios.js` defines the scenarios, which link to dependencies that all appear in `package.json`. We can test multiple versions of the same package without multiple NPM installs by using NPM aliasing.

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
