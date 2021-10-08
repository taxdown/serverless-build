import fs from 'fs-extra';
import Service from 'serverless/classes/Service';

const DEFAULT_CONFIG = {
  esbuild: {
    concurrency: 10,
    exclude: ['aws-sdk'],
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
    custom: undefined,
    perFunction: false,
    perType: false,
    perGroupFunction: false,
    stackConcurrency: 5,
  },
};

export class CustomConfig {
  options: typeof DEFAULT_CONFIG;
  stackMapFile: string;

  constructor(service: Service) {
    const options = service?.custom;
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
      ...options,
      esbuild: { ...options?.esbuild, ...DEFAULT_CONFIG.esbuild },
      esLogs: { ...options?.esLogs, ...DEFAULT_CONFIG.esLogs },
      prune: { ...options?.prune, ...DEFAULT_CONFIG.prune },
      splitStacks: this.buildStackMapOptions(service),
    };
  }

  buildStackMapFile(importedFunctions: string[]): string {
    const components = importedFunctions
      .map(path => {
        const component = path.split('/')[2];
        return component.charAt(0).toUpperCase() + component.slice(1);
      })
      .sort();
    const componentsText = components.map(
      component =>
        `if (logicalId.startsWith('${component}')) return { destination: '${component}' };`
    );
    return `
    module.exports = (resource, logicalId) => {
      ${componentsText.join('\n')}
    };`;
  }

  buildStackMapOptions(service: Service): typeof DEFAULT_CONFIG.splitStacks {
    this.stackMapFile = this.buildStackMapFile(service.functions as unknown as string[]);
    const options = service.custom;
    const pathjs = `${service.serverless.config.servicePath}/.serverless/stacks-map.js`;
    return {
      ...options.splitStacks,
      ...DEFAULT_CONFIG.splitStacks,
      custom: pathjs,
    };
  }

  createStackMap(): void {
    fs.outputFileSync(this.options.splitStacks.custom, this.getStackMap());
  }
  getStackMap(): string {
    return this.stackMapFile;
  }

  get(): typeof DEFAULT_CONFIG {
    return JSON.parse(JSON.stringify(this.options));
  }
}
