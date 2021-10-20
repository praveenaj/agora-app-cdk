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
        allowOrigins: apigw.Cors.ALL_ORIGINS
      }
    });

    api.root.addMethod('OPTIONS', new apigw.MockIntegration({
      integrationResponses: [{
      statusCode: '200',
      responseParameters: {
          'method.response.header.Access-Control-Allow-Headers': "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
          'method.response.header.Access-Control-Allow-Origin': "'*'",
          'method.response.header.Access-Control-Allow-Credentials': "'false'",
          'method.response.header.Access-Control-Allow-Methods': "'OPTIONS,GET,PUT,POST,DELETE'",
      },
      }],
      passthroughBehavior: apigw.PassthroughBehavior.NEVER,
      requestTemplates: {
      "application/json": "{\"statusCode\": 200}"
      },
  }), {
      methodResponses: [{
      statusCode: '200',
      responseParameters: {
          'method.response.header.Access-Control-Allow-Headers': true,
          'method.response.header.Access-Control-Allow-Methods': true,
          'method.response.header.Access-Control-Allow-Credentials': true,
          'method.response.header.Access-Control-Allow-Origin': true,
      },  
      }]
  })
    

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