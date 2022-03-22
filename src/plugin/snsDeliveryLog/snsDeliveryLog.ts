import AWS from 'aws-sdk';
import * as Serverless from 'serverless';
import * as ServerlessPlugin from 'serverless/classes/Plugin';

import { iamRole } from './role';

const SNS_ATTRIBUTE_ROLE = [
  'HTTPSuccessFeedbackRoleArn',
  'HTTPFailureFeedbackRoleArn',
  'FirehoseSuccessFeedbackRoleArn',
  'FirehoseFailureFeedbackRoleArn',
  'LambdaSuccessFeedbackRoleArn',
  'LambdaFailureFeedbackRoleArn',
  'ApplicationSuccessFeedbackRoleArn',
  'ApplicationFailureFeedbackRoleArn',
  'SQSSuccessFeedbackRoleArn',
  'SQSFailureFeedbackRoleArn',
];

const SNS_ATTRIBUTE_SAMPLE_RATE = [
  'HTTPSuccessFeedbackSampleRate',
  'FirehoseSuccessFeedbackSampleRate',
  'LambdaSuccessFeedbackSampleRate',
  'ApplicationSuccessFeedbackSampleRate',
  'SQSSuccessFeedbackSampleRate',
];

export class ServerlessSnsDeliveryLogPlugin implements ServerlessPlugin {
  hooks: ServerlessPlugin.Hooks;
  protected readonly roleName = 'ServerlessSnsDeliveryLogIamRole';
  constructor(protected serverless: Serverless) {
    this.hooks = {
      'aws:package:finalize:mergeCustomProviderResources': this.addSnsIamRole.bind(this),
      'after:deploy:deploy': this.setSnsDeliveryAttributes.bind(this),
    };
  }
  protected async getIamRoleArn(): Promise<string> {
    const cloudFormation = new AWS.CloudFormation({
      region: this.serverless.service.provider.region,
      apiVersion: '2010-05-15',
    });
    const stackName = this.serverless.getProvider('aws').naming.getStackName();
    const roleResource = await cloudFormation
      .describeStackResource({ StackName: stackName, LogicalResourceId: this.roleName })
      .promise();
    const rolePhysicalId = roleResource.StackResourceDetail.PhysicalResourceId;
    const iam = new AWS.IAM({ apiVersion: '2010-05-08' });
    const role = await iam.getRole({ RoleName: rolePhysicalId }).promise();
    return role.Role.Arn;
  }
  protected checkSnsTopics(): boolean {
    for (const resource in this.serverless.service.resources.Resources) {
      if (this.serverless.service.resources.Resources[resource].Type === 'AWS::SNS::Topic') {
        return true;
      }
    }
  }
  protected async getTopicArn(topicName: string): Promise<string> {
    const region = this.serverless.service.provider.region;
    const sts = new AWS.STS();
    const { Account: account } = await sts.getCallerIdentity().promise();
    return `arn:aws:sns:${region}:${account}:${topicName}`;
  }
  async addSnsIamRole(): Promise<void> {
    if (this.checkSnsTopics()) {
      const template = this.serverless.service.provider.compiledCloudFormationTemplate;
      template.Resources[this.roleName] = iamRole;
    }
  }
  async setSnsDeliveryAttributes(): Promise<void> {
    if (this.checkSnsTopics()) {
      const sns = new AWS.SNS({
        region: this.serverless.service.provider.region,
        apiVersion: '2010-03-31',
      });
      const roleArn = await this.getIamRoleArn();
      for (const resource in this.serverless.service.resources.Resources) {
        if (this.serverless.service.resources.Resources[resource].Type === 'AWS::SNS::Topic') {
          const topicArn = await this.getTopicArn(
            this.serverless.service.resources.Resources[resource].Properties.TopicName
          );
          // Set role for topic delivery messages
          for (const attributeRole of SNS_ATTRIBUTE_ROLE) {
            const params = {
              AttributeName: attributeRole,
              TopicArn: topicArn,
              AttributeValue: roleArn,
            };
            await sns.setTopicAttributes(params).promise();
          }
          // Set sample rate for topic delicery messages
          for (const attributeRole of SNS_ATTRIBUTE_SAMPLE_RATE) {
            const params = {
              AttributeName: attributeRole,
              TopicArn: topicArn,
              AttributeValue: '0',
            };
            await sns.setTopicAttributes(params).promise();
          }
        }
      }
    }
  }
}
