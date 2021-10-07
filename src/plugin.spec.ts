//@ts-nocheck
import Serverless from 'serverless';
import { ServerlessBuildPlugin } from './plugin';

describe('Test ServerlessBuildPlugin', () => {
  test('When creating the serverless build plugin, it should add all plugins', async () => {
    const addPlugin = jest.fn();
    const serverless = {
      config: {
        serviceDir: './',
      },
      pluginManager: {
        addPlugin,
      },
      service: {
        serverless: {
          config: {
            servicePath: '',
          },
        },
        custom: {
          esLogs: {
            endpoint: 'testEndpoint',
            index: 'testIndex',
          },
        },
        functions: [],
      },
    } as unknown as Serverless;
    const plugin = new ServerlessBuildPlugin(serverless);
    expect(addPlugin).toHaveBeenCalledTimes(5);
  });
});
