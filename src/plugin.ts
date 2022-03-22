import ServerlessEsLogsPlugin from '@taxdown/serverless-es-logs';
import EsbuildServerlessPlugin from 'serverless-esbuild';
import ServerlessIamPerFunctionPlugin from 'serverless-iam-roles-per-function';
import ServerlessPluginSplitStacks from 'serverless-plugin-split-stacks';
import ServerlessPluginPrune from 'serverless-prune-plugin';

import * as Serverless from 'serverless';
import * as ServerlessPlugin from 'serverless/classes/Plugin';
import { CustomConfig } from './config';
import { ServerlessDisableFunctionPlugin } from './plugin/disable';
import { ServerlessSnsDeliveryLogPlugin } from './plugin/snsDeliveryLog/snsDeliveryLog';

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
    serverless.pluginManager.addPlugin(ServerlessDisableFunctionPlugin);
    if (this.customConfig.isEsLogs()) {
      serverless.pluginManager.addPlugin(ServerlessEsLogsPlugin);
    }
    serverless.pluginManager.addPlugin(ServerlessIamPerFunctionPlugin);
    if (this.customConfig.isSplitStacks()) {
      serverless.pluginManager.addPlugin(ServerlessPluginSplitStacks);
    }
    if (this.customConfig.isSnsDeliveryLog()) {
      serverless.pluginManager.addPlugin(ServerlessSnsDeliveryLogPlugin);
    }

    this.hooks = {
      'after:package:initialize': () => {
        if (this.customConfig.isSplitStacks()) {
          this.customConfig.createStackMap();
        }
      },
    };
  }
}
