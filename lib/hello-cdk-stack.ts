import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';
import * as NodejsLambda from '@aws-cdk/aws-lambda-nodejs';
import * as path from 'path';
import { CfnOutput, Construct, Stack, StackProps } from '@aws-cdk/core';
export class HelloCdkStack extends Stack {

  public readonly urlOutput: CfnOutput;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const lambdaFunction = new NodejsLambda.NodejsFunction(this, 'HelloCdkLambda', {
      entry: path.join(__dirname, 'functions/agora-recording.js'),
      handler: 'agora-recording.handler',
      runtime: lambda.Runtime.NODEJS_14_X,
      bundling: {
        nodeModules: ['axios'],
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

    
    this.urlOutput = new CfnOutput(this, 'Url', {
      value: api.url,
    });

  }

}
