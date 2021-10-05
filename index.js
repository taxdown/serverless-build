const ServerlessEsLogsPlugin = require('@taxdown/serverless-es-logs');
const EsbuildServerlessPlugin = require('serverless-esbuild');
const ServerlessIamPerFunctionPlugin = require('serverless-iam-roles-per-function');
const ServerlessPluginSplitStacks = require('serverless-plugin-split-stacks');
const ServerlessPluginPrune = require('serverless-prune-plugin');

class ServerlessPlugin extends EsbuildServerlessPlugin {
  constructor(serverless, options) {
    super(serverless, options);
    serverless.pluginManager.addPlugin(ServerlessPluginPrune);
    serverless.pluginManager.addPlugin(ServerlessEsLogsPlugin);
    serverless.pluginManager.addPlugin(ServerlessIamPerFunctionPlugin);
    serverless.pluginManager.addPlugin(ServerlessPluginSplitStacks);
  }
}

module.exports = ServerlessPlugin;
