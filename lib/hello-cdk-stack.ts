import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';
import { CfnOutput, Construct, Stack, StackProps } from '@aws-cdk/core';
export class HelloCdkStack extends Stack {

  public readonly urlOutput: CfnOutput;

  constructor(scope: Construct, id: string, props?: StackProps) {
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
        allowOrigins: apigw.Cors.ALL_ORIGINS,
        allowMethods: apigw.Cors.ALL_METHODS,
      },
    });

    api.root.addCorsPreflight({
      allowHeaders: ['Content-Type', 'X-Amz-Date', 'Authorization', 'X-Api-Key'],
      allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      allowCredentials: true,
      allowOrigins: ['http://localhost:3000'],
    });
    
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