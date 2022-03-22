export const iamRole = {
  Type: 'AWS::IAM::Role',
  Properties: {
    AssumeRolePolicyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: {
            Service: 'sns.amazonaws.com',
          },
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
};
