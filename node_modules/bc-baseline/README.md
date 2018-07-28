# Baseline

A simple style library for Bigcommerce themes.

## Installation

```
jspm install --save bc-baseline=bitbucket:pixelunion/bc-baseline
```

## Usage

You can now import the baseline stylesheet:

```
@import "../jspm_packages/bitbucket/pixelunion/bc-baseline@{version-number-here}/baseline";
```

You can check which version you have installed with `jspm inspect`.

It is recommended to import `normalize` before `baseline`.

Note: Can also be installed using npm

```
npm install git+ssh://git@bitbucket.org/pixelunion/bc-baseline.git --save
```

Import:

```
@import "../../node_modules/bc-baseline/baseline";
```

## Development

Use [scss-lint](https://github.com/brigade/scss-lint) to check for errors before commiting.

Baseline comes with an example HTML file. To rebuild it after adding/changing styles, run `npm run build`. That will compile all SCSS files and inject them into `/scripts/template.html`, saving the result to `example.html`.