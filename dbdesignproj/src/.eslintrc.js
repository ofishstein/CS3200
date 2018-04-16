// .eslintrc.js
module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
	"plugin:lodash/canonical"
    ],
    "parserOptions": {
        "ecmaVersion": 6,
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "parser": "babel-eslint",
    "plugins": [
        "react",
        "import",
	"lodash"
    ],
    "globals": {
        "__DEV__": false,
        "jest": false,
        "describe": false,
        "it": false,
        "expect": false
    },
    "rules": {
        "indent": [
            "error",
            4,
            {"SwitchCase": 1}
        ],
	"no-unused-vars":[
	    "warn"
	],
        "react/prop-types": [
            0
        ],
        "import/no-unresolved": [2, {commonjs: true, amd: true}],
        "import/named": [2],
        "import/namespace": [2],
        "import/default": [2],
        "import/export": [2],
	"lodash/prefer-lodash-method": [2, {"ignoreMethods": ["assign"]}]
    }
}
