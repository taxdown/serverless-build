//@ts-nocheck
import Serverless from 'serverless';
import { ServerlessBuildPlugin } from './plugin';

describe('Test ServerlessBuildPlugin', () => {
  test('When creating the serverless build plugin, with esLogs to false, do not add esLogs plugin', async () => {
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
          cli: {
            log: jest.fn(),
          },
          config: {
            servicePath: '',
          },
        },
        custom: {
          esLogs: false,
        },
        functions: [],
      },
    } as unknown as Serverless;
    const plugin = new ServerlessBuildPlugin(serverless);
    expect(addPlugin).toHaveBeenCalledTimes(4);
  });
  test('When creating the serverless build plugin, with no functions, it should not add the stacksMap plugin', async () => {
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
          cli: {
            log: jest.fn(),
          },
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
      },
    } as unknown as Serverless;
    const plugin = new ServerlessBuildPlugin(serverless);
    expect(addPlugin).toHaveBeenCalledTimes(4);
  });
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
