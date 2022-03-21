import * as Serverless from 'serverless';
import * as ServerlessPlugin from 'serverless/classes/Plugin';

export class ServerlessDisableFunctionPlugin implements ServerlessPlugin {
  hooks: ServerlessPlugin.Hooks;
  constructor(protected serverless: Serverless) {
    serverless.configSchemaHandler.defineFunctionProperties('aws', {
      properties: {
        enabled: { type: 'boolean' },
      },
    });
    this.hooks = { 'before:package:initialize': this.run.bind(this) };
  }

  run(): void {
    Object.entries(this.serverless.service.functions).forEach(([key, func]) => {
      //@ts-expect-error this property was defined on runtime by the constructor
      if (func.enabled !== undefined && !func.enabled) {
        this.serverless.cli.log('Disabling function: ' + key);
        delete this.serverless.service.functions[key];
      }
    });
  }
}
