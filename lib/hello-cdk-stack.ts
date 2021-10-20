import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';
import { IResource, LambdaIntegration, MockIntegration, PassthroughBehavior, RestApi } from '@aws-cdk/aws-apigateway';
import { Resource } from '@aws-cdk/core';

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
    
    const api = new apigw.RestApi(this, 'HelloCdkApi', {
      defaultCorsPreflightOptions: {
        allowOrigins: apigw.Cors.ALL_ORIGINS
      }
    });

    const integration = new apigw.LambdaIntegration(lambdaFunction);

    api.root.addMethod('ANY', integration);

    

    api.root.resourceForPath('/acquire')
      .addMethod('POST', new apigw.LambdaIntegration(lambdaFunction));

    
    api.root.resourceForPath('/start')
      .addMethod('POST', new apigw.LambdaIntegration(lambdaFunction));
    

    api.root.resourceForPath('/stop')
      .addMethod('POST', new apigw.LambdaIntegration(lambdaFunction));

    
    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url ?? "something went wrong ",
    });
  }
}
