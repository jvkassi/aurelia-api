
# aurelia-api

> This library is a plugin for the [Aurelia](http://www.aurelia.io/) platform and contains support for multiple endpoints, extending the functionalities supplied by [aurelia-fetch-client](https://github.com/aurelia/fetch-client).
> This library plays nice with the [Sails.js framework](http://sailsjs.org).

Talking to your api shouldn't be difficult. You shouldn't have to repeat yourself. You shouldn't need nuclear power plants to make it easier. You should just be able to say "give me that thing!" and be done with it. If only we could do something about that...

You guessed it! We have something for that. Aurelia-api comes with a set of cool features that makes talking to APIs easy and fun.

Aurelia-api is a module wrapped around aurelia-fetch-client that allows you to:

* Perform the usual CRUD
* Supply criteria for your api
* Manage more than one endpoint
* Add defaults
* Add interceptors
* And more

## Documentation

You can find usage examples and the documentation at [aurelia-api-doc](http://aurelia-api.spoonx.org/).

The [changelog](doc/changelog.md) provides you with information about important changes.

## Installation

### Aureli-Cli

Run `npm i aurelia-api --save` from your project root.

Aurelia-api makes use of `aurelia-fetch-client` and `extend`. You might also need a (fetch)[https://github.com/github/fetch] polyfill, if targeting older browsers. So, add following to the `build.bundles.dependencies` section of `aurelia-project/aurelia.json`.

```js
"dependencies": [
  // ...
  "extend",
  "aurelia-fetch-client",
  "aurelia-api",
  // "fetch",
  // ...
],
```

### Webpack

Run `npm i aurelia-api --save` from your project root.

Add `'aurelia-api'` in the `coreBundles.aurelia section` of your `webpack.config.js`.

### Typescript

Npm-based installations pick up the typings automatically. For Jspm-based installations, add to your `typings.json`:

```js
"aurelia-api": "github:spoonx/aurelia-api",
```

and run `typings i`

or run

```sh
typings i github:spoonx/aurelia-api
```

## Usage

### Configuring

Register the plugin and some endpoints.

```js
aurelia.use
  /* Your other plugins and init code */
  .plugin('aurelia-api', config => {

    // Register hosts
    config.registerEndpoint('api', '/mypath');
    config.registerEndpoint('other-api', '/otherpath', {headers: {'Content-Type': 'x-www-form-urlencoded'}});
  })
```

### Get and use an endpoint

You can get endpoints with the `.getEndpoint()` method on the `Config` instance from aurelia-api.

```js
import {inject} from 'aurelia-framework';
import {Config} from 'aurelia-api';

@inject(Config)
export class MyClass {
  constructor(config) {
    this.apiEndpoint = config.getEndpoint('api');

    this.apiEndpoint.find('users')
    .then(users => {
        // use your received users.json
    })
    .catch(console.error);
  }
}
```

## Quick Rest api overview

All methods will:

* stringify the body, if it is an object and the `Content-Type` is set to `application/json` (the default).
* convert the body to querystring format, if the body is an object and the `Content-Type` is set to any other value.
* leave the body unchanged, if the `Content-Type` is not set or when the body is not an object.
* maintain trailing slashes of the resource parameter

All methods return on success a Promise with the server response parsed to an object if possible. On error, they reject with the server response. If possible and parseError is set true, they reject with the JSON parsed server response.

```js
endpoint
  .client                                                           // the httpClient instance
  .endpoint                                                         // name of the endpoint
  .default                                                          // The fetch client defaults
  .find(resource, idOrCriteria, options, responseOutput)                // GET
  .findOne(resource, id, criteria, options, responseOutput)         // GET
  .post(resource, body, options, responseOutput) {                  // POST
  .update(resource, idOrCriteria, body, options, responseOutput)        // PUT
  .updateOne(resource, id, criteria, body, options, responseOutput) // PUT
  .patch(resource, idOrCriteria, body, options, responseOutput)         // PATCH
  .patchOne(resource, id, criteria, body, options, responseOutput)  // PATCH
  .destroy(resource, idOrCriteria, options, responseOutput)             // DELETE
  .destroyOne(resource, id, criteria, options, responseOutput)      // DELETE
  .create(resource, body, options, responseOutput)                  // POST
  .request(method, path, body, options, responseOutput)             // method
```
