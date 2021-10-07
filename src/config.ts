const DEFAULT_CONFIG = {
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
};

export class CustomConfig {
  options: any;
  constructor(options: any) {
    if (!options?.esLogs.endpoint) {
      throw new Error(
        'EsLogs config is mandatory for this package and endpoint should be specified under custom.esLogs.endpoint'
      );
    }
    if (!options?.esLogs.index) {
      throw new Error(
        'EsLogs config is mandatory for this package and index should be specified under custom.esLogs.index'
      );
    }
    this.options = {
      esbuild: { ...options?.esbuild, ...DEFAULT_CONFIG.esbuild },
      esLogs: { ...options?.esLogs, ...DEFAULT_CONFIG.esLogs },
      prune: { ...options?.prune, ...DEFAULT_CONFIG.prune },
      splitStacks: { ...options?.splitStacks, ...DEFAULT_CONFIG.splitStacks },
    };
  }
  get() {
    return JSON.parse(JSON.stringify(this.options));
  }
}
