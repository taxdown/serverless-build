import Serverless from 'serverless';
import { ServerlessDisableFunctionPlugin } from './disable';

describe('Test ServerlessDisableFunctionPlugin', () => {
  test('When creating the serverless disable function plugin, add function property and hook', async () => {
    const serverless = {
      service: {
        functions: {},
      },
      configSchemaHandler: {
        defineFunctionProperties: jest.fn(),
      },
    } as unknown as Serverless;
    const plugin = new ServerlessDisableFunctionPlugin(serverless);
    expect(serverless.configSchemaHandler.defineFunctionProperties).toHaveBeenCalledWith('aws', {
      properties: {
        enabled: { type: 'boolean' },
      },
    });
    expect(plugin.hooks).toEqual({ 'before:package:initialize': expect.any(Function) });
  });
  test('When function is not enabled, delete it from final object', async () => {
    const serverless = {
      cli: {
        log: jest.fn(),
      },
      service: {
        //functions on processed format after initialization
        functions: {
          function1: {
            role: 'roleFunction1',
            handler: 'roleFunction1.handler',
            enabled: false,
          },
          function2: {
            role: 'roleFunction2',
            handler: 'roleFunction2.handler',
            enabled: true,
          },
        },
      },
      configSchemaHandler: {
        defineFunctionProperties: jest.fn(),
      },
    } as unknown as Serverless;
    const plugin = new ServerlessDisableFunctionPlugin(serverless);
    plugin.hooks['before:package:initialize']();
    expect(serverless.service.functions).toEqual({
      function2: { enabled: true, handler: 'roleFunction2.handler', role: 'roleFunction2' },
    });
  });
});
