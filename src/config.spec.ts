//@ts-nocheck
import { CustomConfig } from './config';

describe('Test CustomConfig', () => {
  test('When no options are passed, it should throw with endpoint is mandatory config error', async () => {
    expect(() => {
      new CustomConfig();
    }).toThrow(
      'EsLogs config is specified for this package and endpoint should be specified under custom.esLogs.endpoint'
    );
  });
  test('When no options are passed, it should throw with index is mandatory config error', async () => {
    const service = {
      custom: {
        esLogs: {
          endpoint: 'testEndpoint',
        },
        splitStacks: {},
      },
    };
    expect(() => {
      new CustomConfig(service);
    }).toThrow(
      'EsLogs config is specified for this package and index should be specified under custom.esLogs.index'
    );
  });
  test('When no options are passed, it should return default', async () => {
    const service = {
      custom: {
        esLogs: {
          endpoint: 'testEndpoint',
          index: 'test',
        },
        splitStacks: {},
      },
      functions: [],
      serverless: {
        config: {
          servicePath: 'test',
        },
      },
    };
    const customConfig = new CustomConfig(service);
    expect(customConfig.get()).toEqual({
      esbuild: {
        concurrency: 10,
        exclude: ['aws-sdk'],
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
        custom: 'test/.serverless/stacks-map.js',
        perFunction: false,
        perType: false,
        perGroupFunction: false,
        stackConcurrency: 5,
      },
    });
  });
  test('When functions in valid format, it should format output file correctly', async () => {
    const service = {
      custom: {
        esLogs: {
          endpoint: 'testEndpoint',
          index: 'test',
        },
        splitStacks: {},
      },
      functions: [
        '${file(src/components/data/infrastructure/controller/functions.yml)}',
        '${file(src/components/record/infrastructure/controller/functions.yml)}',
      ],
      serverless: {
        config: {
          servicePath: 'test',
        },
      },
    };
    const customConfig = new CustomConfig(service);
    expect(customConfig.get()).toEqual({
      esbuild: {
        concurrency: 10,
        exclude: ['aws-sdk'],
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
        custom: 'test/.serverless/stacks-map.js',
        perFunction: false,
        perType: false,
        perGroupFunction: false,
        stackConcurrency: 5,
      },
    });
  });
});
