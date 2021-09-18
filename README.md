Fresh Platform Plugin for [vue-cli@3.0](https://github.com/vuejs/vue-cli)

Exclusive tool for the Fresh Platform UI and requires [Fresh BUS UI](https://github.com/FreshinUp/fresh-bus-forms)

This package is for UI only projects versus the Laravel based ones in the prior project. 
Whereas the `vue-cli-plugin-freshinup` this package is for building a Client project written with Laravel.


# Install

If you haven't yet installed vue-cli 3, first follow the install instructions here: https://github.com/vuejs/vue-cli

This package is not registered with any public or private package managers. As such you must install via Github

```bash
$ yarn add --dev git+ssh://git@github.com/freshinup/vue-cli-plugin-freshinup-ui.git
$ vue invoke freshinup-ui
```

# Usage

## Injected Commands
Coming soon...

Currently just a **generator** project for bootstraping new Laravel Projects


# Contributing

```bash
$ cd ~/Development # or similar
$ git clone https://github.com/freshinup/vue-cli-plugin-freshinup-ui.git
$ cd vue-cli-plugin-freshinup-ui
$ yarn link
$ cd ..
$ laravel new fresh-project
$ cd fresh-project
$ yarn link vue-cli-plugin-freshinup
```

It is a good idea to use this in a new project
