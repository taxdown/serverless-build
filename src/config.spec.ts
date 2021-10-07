//@ts-nocheck
import { CustomConfig } from './config';

describe('Test CustomConfig', () => {
  test('When no options are passed, it should return default', async () => {
    const customConfig = new CustomConfig();
    expect(customConfig.get()).toEqual({
      esbuild: {
        concurrency: 10,
        external: ['aws-sdk'],
        format: 'cjs',
        sourcemap: 'external',
      },
      esLogs: {
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
