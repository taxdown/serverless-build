# serverless-build [![Build Status](https://img.shields.io/github/workflow/status/AnomalyInnovations/serverless-bundle/CI)](https://github.com/taxdown/serverless-build/actions/workflows/main.yml)

serverless-build is a [Serverless Framework](https://www.serverless.com) plugin that optimally packages your ES6 or TypeScript Node.js Lambda functions. It uses the [serverless-esbuild](https://github.com/floydspace/serverless-esbuild) plugin internally.

---

## Getting Started

Install the `@taxdown/serverless-build` plugin using:

```bash
$npm install --save-dev @taxdown/serverless-build
```

Then add it to your `serverless.yml`.

```yaml
plugins:
  - '@taxdown/serverless-build'
```

## Usage

Once installed and added to your `serverless.yml`, @taxdown/serverless-build will automatically package your functions using [esbuild](https://github.com/floydspace/serverless-esbuild) when you run the various serverless commands.

## Embedded plugins

There are some plugins that are embedded into this one for various uses:

- [esbuild](https://github.com/floydspace/serverless-esbuild): To package the lambdas as well as run tests
- [prune](https://github.com/claygregory/serverless-prune-plugin): To prune old lambda versions and not hit the maximum code size limit
- [eslogs](https://github.com/taxdown/serverless-es-logs): To send cloudwatch logs of every lambda into elasticsearch
- [iam roles per lambda](https://github.com/functionalone/serverless-iam-roles-per-function): To be able to specify permissions per lambda and create a specific IAM role
- [Split Stacks](https://github.com/dougmoscrop/serverless-plugin-split-stacks): To split stacks, this plugin automatically detects the different components and creates the stacks-map.js, as long as they are imported in this fashion:

  ```yaml
  functions:
    - ${file(src/components/data/infrastructure/controller/functions.yml)}
    - ${file(src/components/record/infrastructure/controller/functions.yml)}
    - ${file(src/components/form/infrastructure/controller/functions.yml)}
  ```

## Options

There are no specific options for this plugin, but other plugins options can be overriden by setting them in their original fashion.

esLogs is optional, but if not explicitely disabled:

```yaml
custom:
  esLogs: false
```

It is mandatory these options are specified:

```yaml
custom:
  esLogs:
    endpoint: https://eslogs # Endpoint to send the CloudWatch logs to
    index: dev-mustafar # Elasticsearch index name
```
