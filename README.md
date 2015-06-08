# atom-vue-component-loader

loads a pack of vue components.

## Install

```sh
npm install atom-vue-component-loader

```

## Usage
requiring `atom-vue-component-loader`

returns a `Function(names, options={})`

| Parameter | Type    | Usage                                   |
| --------: | ------- | :-------------------------------------- |
| names     | array   | name of the package you want to reload (will be converted to kebab case) |
| options   | object  | object containing all options |

| options   | Type    | Usage                                   |
| --------: | ------- | :-------------------------------------- |
| cwd       | string  | current working directory - where packages will be searched |
| reload    | boolean | if set, deletes cache before loading    |
| deep      | boolean | only if reload is true, deletes nested dependencies from cache |

## Example
```coffee
loader = require "atom-vue-component-loader"
components = loader ["nested-comp","main-app"], reload: true
components["main-app"] # reference to vue component
```



## Release History
 - *v0.0.3*: Switched to kebab case
 - *v0.0.2*: First bugfix
 - *v0.0.1*: First release

## License
Copyright (c) 2015 Paul Pflugradt
Licensed under the MIT license.
