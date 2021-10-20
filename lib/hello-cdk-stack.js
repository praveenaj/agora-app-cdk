"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloCdkStack = void 0;
const lambda = require("@aws-cdk/aws-lambda");
const apigw = require("@aws-cdk/aws-apigateway");
const core_1 = require("@aws-cdk/core");
class HelloCdkStack extends core_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const lambdaFunction = new lambda.Function(this, 'HelloCdkLambda', {
            runtime: lambda.Runtime.NODEJS_12_X,
            code: lambda.Code.fromAsset('functions'),
            handler: 'agora-recording.handler',
            environment: {},
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
        });
        api.root.resourceForPath('/acquire')
            .addMethod('POST', new apigw.LambdaIntegration(lambdaFunction));
        api.root.resourceForPath('/start')
            .addMethod('POST', new apigw.LambdaIntegration(lambdaFunction));
        api.root.resourceForPath('/stop')
            .addMethod('POST', new apigw.LambdaIntegration(lambdaFunction));
        this.urlOutput = new core_1.CfnOutput(this, 'Url', {
            value: api.url,
        });
    }
}
exports.HelloCdkStack = HelloCdkStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsbG8tY2RrLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaGVsbG8tY2RrLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhDQUE4QztBQUM5QyxpREFBaUQ7QUFDakQsd0NBQXdFO0FBQ3hFLE1BQWEsYUFBYyxTQUFRLFlBQUs7SUFJdEMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFrQjtRQUMxRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLGNBQWMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFO1lBQ2pFLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQztZQUN4QyxPQUFPLEVBQUUseUJBQXlCO1lBQ2xDLFdBQVcsRUFBRSxFQUNaO1NBQ0YsQ0FBQyxDQUFDO1FBSUgsTUFBTSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxhQUFhLEVBQUU7WUFDakQsMkJBQTJCLEVBQUU7Z0JBQzNCLFlBQVksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVc7YUFDckM7U0FDRixDQUFDLENBQUM7UUFFSCxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDO1lBQ3RELG9CQUFvQixFQUFFLENBQUM7b0JBQ3ZCLFVBQVUsRUFBRSxLQUFLO29CQUNqQixrQkFBa0IsRUFBRTt3QkFDaEIscURBQXFELEVBQUUseUZBQXlGO3dCQUNoSixvREFBb0QsRUFBRSxLQUFLO3dCQUMzRCx5REFBeUQsRUFBRSxTQUFTO3dCQUNwRSxxREFBcUQsRUFBRSwrQkFBK0I7cUJBQ3pGO2lCQUNBLENBQUM7WUFDRixtQkFBbUIsRUFBRSxLQUFLLENBQUMsbUJBQW1CLENBQUMsS0FBSztZQUNwRCxnQkFBZ0IsRUFBRTtnQkFDbEIsa0JBQWtCLEVBQUUsdUJBQXVCO2FBQzFDO1NBQ0osQ0FBQyxFQUFFO1lBQ0EsZUFBZSxFQUFFLENBQUM7b0JBQ2xCLFVBQVUsRUFBRSxLQUFLO29CQUNqQixrQkFBa0IsRUFBRTt3QkFDaEIscURBQXFELEVBQUUsSUFBSTt3QkFDM0QscURBQXFELEVBQUUsSUFBSTt3QkFDM0QseURBQXlELEVBQUUsSUFBSTt3QkFDL0Qsb0RBQW9ELEVBQUUsSUFBSTtxQkFDN0Q7aUJBQ0EsQ0FBQztTQUNMLENBQUMsQ0FBQTtRQUdBLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQzthQUNqQyxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFHbEUsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDO2FBQy9CLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUdsRSxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUM7YUFDOUIsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBR2xFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxnQkFBUyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUU7WUFDMUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFHO1NBQ2YsQ0FBQyxDQUFDO0lBRUwsQ0FBQztDQUVGO0FBcEVELHNDQW9FQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGxhbWJkYSBmcm9tICdAYXdzLWNkay9hd3MtbGFtYmRhJztcbmltcG9ydCAqIGFzIGFwaWd3IGZyb20gJ0Bhd3MtY2RrL2F3cy1hcGlnYXRld2F5JztcbmltcG9ydCB7IENmbk91dHB1dCwgQ29uc3RydWN0LCBTdGFjaywgU3RhY2tQcm9wcyB9IGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuZXhwb3J0IGNsYXNzIEhlbGxvQ2RrU3RhY2sgZXh0ZW5kcyBTdGFjayB7XG5cbiAgcHVibGljIHJlYWRvbmx5IHVybE91dHB1dDogQ2ZuT3V0cHV0O1xuXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgY29uc3QgbGFtYmRhRnVuY3Rpb24gPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsICdIZWxsb0Nka0xhbWJkYScsIHtcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xMl9YLFxuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KCdmdW5jdGlvbnMnKSxcbiAgICAgIGhhbmRsZXI6ICdhZ29yYS1yZWNvcmRpbmcuaGFuZGxlcicsXG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgfSxcbiAgICB9KTtcblxuICAgIFxuICAgIFxuICAgIGNvbnN0IGFwaSA9IG5ldyBhcGlndy5SZXN0QXBpKHRoaXMsICdIZWxsb0Nka0FwaScsIHtcbiAgICAgIGRlZmF1bHRDb3JzUHJlZmxpZ2h0T3B0aW9uczoge1xuICAgICAgICBhbGxvd09yaWdpbnM6IGFwaWd3LkNvcnMuQUxMX09SSUdJTlNcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFwaS5yb290LmFkZE1ldGhvZCgnT1BUSU9OUycsIG5ldyBhcGlndy5Nb2NrSW50ZWdyYXRpb24oe1xuICAgICAgaW50ZWdyYXRpb25SZXNwb25zZXM6IFt7XG4gICAgICBzdGF0dXNDb2RlOiAnMjAwJyxcbiAgICAgIHJlc3BvbnNlUGFyYW1ldGVyczoge1xuICAgICAgICAgICdtZXRob2QucmVzcG9uc2UuaGVhZGVyLkFjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMnOiBcIidDb250ZW50LVR5cGUsWC1BbXotRGF0ZSxBdXRob3JpemF0aW9uLFgtQXBpLUtleSxYLUFtei1TZWN1cml0eS1Ub2tlbixYLUFtei1Vc2VyLUFnZW50J1wiLFxuICAgICAgICAgICdtZXRob2QucmVzcG9uc2UuaGVhZGVyLkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsXG4gICAgICAgICAgJ21ldGhvZC5yZXNwb25zZS5oZWFkZXIuQWNjZXNzLUNvbnRyb2wtQWxsb3ctQ3JlZGVudGlhbHMnOiBcIidmYWxzZSdcIixcbiAgICAgICAgICAnbWV0aG9kLnJlc3BvbnNlLmhlYWRlci5BY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzJzogXCInT1BUSU9OUyxHRVQsUFVULFBPU1QsREVMRVRFJ1wiLFxuICAgICAgfSxcbiAgICAgIH1dLFxuICAgICAgcGFzc3Rocm91Z2hCZWhhdmlvcjogYXBpZ3cuUGFzc3Rocm91Z2hCZWhhdmlvci5ORVZFUixcbiAgICAgIHJlcXVlc3RUZW1wbGF0ZXM6IHtcbiAgICAgIFwiYXBwbGljYXRpb24vanNvblwiOiBcIntcXFwic3RhdHVzQ29kZVxcXCI6IDIwMH1cIlxuICAgICAgfSxcbiAgfSksIHtcbiAgICAgIG1ldGhvZFJlc3BvbnNlczogW3tcbiAgICAgIHN0YXR1c0NvZGU6ICcyMDAnLFxuICAgICAgcmVzcG9uc2VQYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgJ21ldGhvZC5yZXNwb25zZS5oZWFkZXIuQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycyc6IHRydWUsXG4gICAgICAgICAgJ21ldGhvZC5yZXNwb25zZS5oZWFkZXIuQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kcyc6IHRydWUsXG4gICAgICAgICAgJ21ldGhvZC5yZXNwb25zZS5oZWFkZXIuQWNjZXNzLUNvbnRyb2wtQWxsb3ctQ3JlZGVudGlhbHMnOiB0cnVlLFxuICAgICAgICAgICdtZXRob2QucmVzcG9uc2UuaGVhZGVyLkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IHRydWUsXG4gICAgICB9LCAgXG4gICAgICB9XVxuICB9KVxuICAgIFxuXG4gICAgYXBpLnJvb3QucmVzb3VyY2VGb3JQYXRoKCcvYWNxdWlyZScpXG4gICAgICAuYWRkTWV0aG9kKCdQT1NUJywgbmV3IGFwaWd3LkxhbWJkYUludGVncmF0aW9uKGxhbWJkYUZ1bmN0aW9uKSk7XG5cbiAgICBcbiAgICBhcGkucm9vdC5yZXNvdXJjZUZvclBhdGgoJy9zdGFydCcpXG4gICAgICAuYWRkTWV0aG9kKCdQT1NUJywgbmV3IGFwaWd3LkxhbWJkYUludGVncmF0aW9uKGxhbWJkYUZ1bmN0aW9uKSk7XG4gICAgXG5cbiAgICBhcGkucm9vdC5yZXNvdXJjZUZvclBhdGgoJy9zdG9wJylcbiAgICAgIC5hZGRNZXRob2QoJ1BPU1QnLCBuZXcgYXBpZ3cuTGFtYmRhSW50ZWdyYXRpb24obGFtYmRhRnVuY3Rpb24pKTtcblxuICAgIFxuICAgIHRoaXMudXJsT3V0cHV0ID0gbmV3IENmbk91dHB1dCh0aGlzLCAnVXJsJywge1xuICAgICAgdmFsdWU6IGFwaS51cmwsXG4gICAgfSk7XG5cbiAgfVxuXG59Il19