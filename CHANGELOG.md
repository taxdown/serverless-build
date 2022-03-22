# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.6.3](https://github.com/taxdown/serverless-build/compare/v0.6.2...v0.6.3) (2022-03-22)


### Bug Fixes

* get account from aws sdk instead of serverless ([d72d32f](https://github.com/taxdown/serverless-build/commits/d72d32f3d3d2c1a27d4c723f241bd825bd01143d))

### [0.6.2](https://github.com/taxdown/serverless-build/compare/v0.6.1...v0.6.2) (2022-03-22)


### Bug Fixes

* do not use unnecessary createTopic (having those permissions) and manually form the Arn ([2927070](https://github.com/taxdown/serverless-build/commits/2927070e318bef6432ea79e9be8fff40b75320fd))

### [0.6.1](https://github.com/taxdown/serverless-build/compare/v0.6.0...v0.6.1) (2022-03-22)


### Bug Fixes

* do not use plugin var since it gets clean in separate steps (i.e. build and deploy) ([fe646db](https://github.com/taxdown/serverless-build/commits/fe646db7c9b48a9a009f3ecc51e819b81c03554c))

## [0.6.0](https://github.com/taxdown/serverless-build/compare/v0.5.0...v0.6.0) (2022-03-22)


### Features

* add custom plugin for sns delivery metrics to cloudwatch after deploy when there are topics ([#14](https://github.com/taxdown/serverless-build/issues/14)) ([0180a52](https://github.com/taxdown/serverless-build/commits/0180a52641ed29410119ef74e966ca5df0fb825d))

## [0.5.0](https://github.com/taxdown/serverless-build/compare/v0.4.1...v0.5.0) (2022-03-21)


### Features

* allow disabling lambdas so that they get removed from stack ([#13](https://github.com/taxdown/serverless-build/issues/13)) ([59b93e8](https://github.com/taxdown/serverless-build/commits/59b93e8a5d233ff7adfdb9eb2ffca1858edc38a3))

### [0.4.1](https://github.com/taxdown/serverless-build/compare/v0.4.0...v0.4.1) (2022-03-14)


### Bug Fixes

* package lock serverless-build 1.25.0 ([#11](https://github.com/taxdown/serverless-build/issues/11)) ([3b17eae](https://github.com/taxdown/serverless-build/commits/3b17eae487190b7ca4ff00da5a5f1c353b25cbb5))

## [0.4.0](https://github.com/taxdown/serverless-build/compare/v0.3.0...v0.4.0) (2022-03-12)


### Features

* allow disabling splitStacks ([1097790](https://github.com/taxdown/serverless-build/commits/109779078713eab77aad27b7305fd77fab03a41d))

## [0.3.0](https://github.com/taxdown/serverless-build/compare/v0.2.3...v0.3.0) (2022-02-09)


### Features

* add esbuild-runner as dependency and maintain esbuild-jest for back compat ([c3933fd](https://github.com/taxdown/serverless-build/commits/c3933fd6eeb5fc08e7ae27bf4d6e582029dfb123))

### [0.2.3](https://github.com/taxdown/serverless-build/compare/v0.2.2...v0.2.3) (2021-10-29)


### Bug Fixes

* if split stacks plugin is disabled, do not create stack map on hook ([19620e7](https://github.com/taxdown/serverless-build/commits/19620e7c48f0a652028c0c2ca5d92b17361b9ae9))

### [0.2.2](https://github.com/taxdown/serverless-build/compare/v0.2.1...v0.2.2) (2021-10-29)


### Bug Fixes

* also handle the case where service.functions is an empty object ([bfc4c44](https://github.com/taxdown/serverless-build/commits/bfc4c44b7dc4f57c11ae07919a44261215e8c453))

### [0.2.1](https://github.com/taxdown/serverless-build/compare/v0.2.0...v0.2.1) (2021-10-29)


### Bug Fixes

* when no functions available (i.e. infrastructure) remove split stacks plugin and config ([466c1be](https://github.com/taxdown/serverless-build/commits/466c1be5199009590e6f20e7623033c5971508c8))

## [0.2.0](https://github.com/taxdown/serverless-build/compare/v0.1.5...v0.2.0) (2021-10-19)


### Features

* eslogs plugin is now optional based on the user's configuration ([#7](https://github.com/taxdown/serverless-build/issues/7)) ([b746a81](https://github.com/taxdown/serverless-build/commits/b746a811eef65e85c4c1ccba9ad6df3372cb700f))

### [0.1.5](https://github.com/taxdown/serverless-build/compare/v0.1.4...v0.1.5) (2021-10-14)

### [0.1.4](https://github.com/taxdown/serverless-build/compare/v0.1.3...v0.1.4) (2021-10-14)

### [0.1.3](https://github.com/taxdown/serverless-build/compare/v0.1.2...v0.1.3) (2021-10-13)

### [0.1.2](https://github.com/taxdown/serverless-build/compare/v0.1.1...v0.1.2) (2021-10-08)

### [0.1.1](https://github.com/taxdown/serverless-build/compare/v0.1.0...v0.1.1) (2021-10-08)


### Bug Fixes

* update external key for default options ([2c55c10](https://github.com/taxdown/serverless-build/commits/2c55c10b1aae7ca0203fb7936a7fab91c20be231))

## [0.1.0](https://github.com/taxdown/serverless-build/compare/v0.0.4...v0.1.0) (2021-10-07)


### Features

* add default options to package ([#4](https://github.com/taxdown/serverless-build/issues/4)) ([12e5f4a](https://github.com/taxdown/serverless-build/commits/12e5f4abc0a9553c35c07bda288c3e22b46ff439))
* automatic stack splitting based on components ([#6](https://github.com/taxdown/serverless-build/issues/6)) ([33102ba](https://github.com/taxdown/serverless-build/commits/33102ba1a379891bc5899b49d68535eaa3be65ef))

### 0.0.4 (2021-10-07)


### Features

* set up typescript for this package ([#1](https://github.com/taxdown/serverless-build/issues/1)) ([e87bdba](https://github.com/taxdown/serverless-build/commits/e87bdba6c6869ff43bc076ff8dadbace0a60ebbc)), closes [#2](https://github.com/taxdown/serverless-build/issues/2) [#3](https://github.com/taxdown/serverless-build/issues/3)

### 0.0.3 (2021-10-06)

### Features

- add convetional commit to this package ([ac06537](https://github.com/taxdown/serverless-build/commits/ac06537e6d32c268d731d8e92f34690f418e77a8))
- set up typescript for this package ([a138dd3](https://github.com/taxdown/serverless-build/commits/a138dd37bea19845215b5405503ea93f55acc96e))
