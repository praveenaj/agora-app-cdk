import * as sns from '@aws-cdk/aws-sns';
import * as subs from '@aws-cdk/aws-sns-subscriptions';
import * as sqs from '@aws-cdk/aws-sqs';
import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as iam from '@aws-cdk/aws-iam';
import * as s3 from '@aws-cdk/aws-s3';
import * as apigw from '@aws-cdk/aws-apigateway';
export class HelloCdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaFunction = new lambda.Function(this, 'HelloCdkLambda', {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset('functions'),
      handler: 'agora-recording.handler',
      environment: {
      },
    });
    
    const api = new apigw.RestApi(this, 'HelloCdkApi');

    const integration = new apigw.LambdaIntegration(lambdaFunction);

    api.root.addMethod('ANY', integration);

    api.root.resourceForPath('/')
      .addMethod('POST', new apigw.LambdaIntegration(lambdaFunction));

    
    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url ?? "something went wrong ",
    });

  }

}
