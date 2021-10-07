//@ts-nocheck
import { CustomConfig } from './config';

describe('Test CustomConfig', () => {
  test('When no options are passed, it should throw with endpoint is mandatory config error', async () => {
    expect(() => {
      new CustomConfig();
    }).toThrow('EsLogs config is mandatory for this package and endpoint should be specified under custom.esLogs.endpoint');
  });
  test('When no options are passed, it should throw with index is mandatory config error', async () => {
    const config = {
      esLogs: {
        endpoint: 'testEndpoint',
      },
    };
    expect(() => {
      new CustomConfig(config);
    }).toThrow('EsLogs config is mandatory for this package and index should be specified under custom.esLogs.index');
  });
  test('When no options are passed, it should return default', async () => {
    const config = {
      esLogs: {
        endpoint: 'testEndpoint',
        index: 'test',
      },
    };
    const customConfig = new CustomConfig(config);
    expect(customConfig.get()).toEqual({
      esbuild: {
        concurrency: 10,
        external: ['aws-sdk'],
        format: 'cjs',
        sourcemap: 'external',
      },
      esLogs: {
        endpoint: 'testEndpoint',
        index: 'test',
        indexDateSeparator: '-',
        useDefaultRole: true,
        includeApiGWLogs: true,
        mergeFunctionPolicies: true,
      },
      prune: {
        automatic: true,
        number: 10,
      },
      splitStacks: {
        perFunction: false,
        perType: false,
        perGroupFunction: false,
        stackConcurrency: 5,
      },
    });
  });
});
