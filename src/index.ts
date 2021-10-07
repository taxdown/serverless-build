import ServerlessEsLogsPlugin from '@taxdown/serverless-es-logs';
import EsbuildServerlessPlugin from 'serverless-esbuild';
import ServerlessIamPerFunctionPlugin from 'serverless-iam-roles-per-function';
import ServerlessPluginSplitStacks from 'serverless-plugin-split-stacks';
import ServerlessPluginPrune from 'serverless-prune-plugin';

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
