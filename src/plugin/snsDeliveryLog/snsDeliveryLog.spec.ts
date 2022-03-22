import Serverless from 'serverless';
import { ServerlessSnsDeliveryLogPlugin } from './snsDeliveryLog';

describe('Test ServerlessSnsDeliveryLogPlugin', () => {
  describe('No SNS topic on resources', () => {
    const serverless = {
      cli: {
        log: jest.fn(),
      },
      service: {
        //functions on processed format after initialization
        functions: {},
        resources: {
          Resources: {
            LambdaFunction: {
              Type: 'AWS::Lambda::Function',
            },
          },
        },
      },
      configSchemaHandler: {
        defineFunctionProperties: jest.fn(),
      },
    } as unknown as Serverless;
    Object.freeze(serverless);
    test('When package is befor finalize, ensure isSnsTopics is false', async () => {
      const plugin = new ServerlessSnsDeliveryLogPlugin(serverless);
      await plugin.hooks['before:package:finalize']();
      //@ts-expect-error
      expect(plugin.isSnsTopics).toBe(false);
    });
    test('When package is finalized, ensure there are no custom resource', async () => {
      const plugin = new ServerlessSnsDeliveryLogPlugin(serverless);
      await plugin.hooks['before:package:finalize']();
      await plugin.hooks['aws:package:finalize:mergeCustomProviderResources']();
      expect(serverless.service.provider).toBeUndefined();
      // await plugin.hooks['after:deploy:deploy']();
    });
    test('When we have finished deploy, do nothing', async () => {
      const plugin = new ServerlessSnsDeliveryLogPlugin(serverless);
      await plugin.hooks['before:package:finalize']();
      await plugin.hooks['aws:package:finalize:mergeCustomProviderResources']();
      await plugin.hooks['after:deploy:deploy']();
      expect(serverless.service.provider).toBeUndefined();
    });
  });
  describe('One sns topic on resources', () => {
    const serverless = {
      cli: {
        log: jest.fn(),
      },
      service: {
        //functions on processed format after initialization
        functions: {},
        resources: {
          Resources: {
            LambdaFunction: {
              Type: 'AWS::SNS::Topic',
            },
          },
        },
        provider: {
          compiledCloudFormationTemplate: {
            Resources: {},
          },
        },
      },
      configSchemaHandler: {
        defineFunctionProperties: jest.fn(),
      },
    } as unknown as Serverless;
    const plugin = new ServerlessSnsDeliveryLogPlugin(serverless);
    test('When finizing package, ensure isSnsTopics is true', async () => {
      await plugin.hooks['before:package:finalize']();
      //@ts-expect-error
      expect(plugin.isSnsTopics).toBe(true);
    });
    test('When finizing package, ensure LambdaRole is present', async () => {
      await plugin.hooks['before:package:finalize']();
      await plugin.hooks['aws:package:finalize:mergeCustomProviderResources']();
      expect(serverless.service.provider).toEqual({
        compiledCloudFormationTemplate: {
          Resources: {
            ServerlessSnsDeliveryLogIamRole: {
              Type: 'AWS::IAM::Role',
              Properties: {
                AssumeRolePolicyDocument: {
                  Version: '2012-10-17',
                  Statement: [
                    {
                      Effect: 'Allow',
                      Principal: { Service: 'sns.amazonaws.com' },
                      Action: 'sts:AssumeRole',
                    },
                  ],
                },
                Policies: [
                  {
                    PolicyName: 'ServerlessSnsDeliveryLogIAMPolicy',
                    PolicyDocument: {
                      Version: '2012-10-17',
                      Statement: [
                        {
                          Effect: 'Allow',
                          Action: [
                            'logs:CreateLogGroup',
                            'logs:CreateLogStream',
                            'logs:PutLogEvents',
                            'logs:PutMetricFilter',
                            'logs:PutRetentionPolicy',
                          ],
                          Resource: 'arn:aws:logs:*:*:*',
                        },
                      ],
                    },
                  },
                ],
              },
            },
          },
        },
      });
    });
  });
});
