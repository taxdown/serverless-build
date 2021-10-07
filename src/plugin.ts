import ServerlessEsLogsPlugin from '@taxdown/serverless-es-logs';
import EsbuildServerlessPlugin from 'serverless-esbuild';
import ServerlessIamPerFunctionPlugin from 'serverless-iam-roles-per-function';
import ServerlessPluginSplitStacks from 'serverless-plugin-split-stacks';
import ServerlessPluginPrune from 'serverless-prune-plugin';

import * as Serverless from 'serverless';
import * as ServerlessPlugin from 'serverless/classes/Plugin';
import { CustomConfig } from './config';

export class ServerlessBuildPlugin implements ServerlessPlugin {
  customConfig: CustomConfig;
  hooks: ServerlessPlugin.Hooks;
  serverless: Serverless;
  constructor(serverless: Serverless) {
    this.customConfig = new CustomConfig(serverless.service);
    serverless.service.custom = this.customConfig.get();
    this.serverless = serverless;

    serverless.pluginManager.addPlugin(EsbuildServerlessPlugin);
    serverless.pluginManager.addPlugin(ServerlessPluginPrune);
    serverless.pluginManager.addPlugin(ServerlessEsLogsPlugin);
    serverless.pluginManager.addPlugin(ServerlessIamPerFunctionPlugin);
    serverless.pluginManager.addPlugin(ServerlessPluginSplitStacks);

    this.hooks = {
      'after:package:initialize': () => {
        this.customConfig.createStackMap();
      },
    };
  }
}
