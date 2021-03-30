"use strict";

module.exports = {
  extends: "octane",
  rules: {
    "no-implicit-this": false,
  },
  ignore: ["test-app/node_modules/**", "test-app/dist/**"],
};
