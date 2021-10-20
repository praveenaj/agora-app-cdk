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
        const api = new apigw.LambdaRestApi(this, 'HelloCdkApi', {
            // defaultCorsPreflightOptions: {
            //   allowOrigins: apigw.Cors.ALL_ORIGINS,
            //   allowMethods: apigw.Cors.ALL_METHODS
            // },
            handler: lambdaFunction,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsbG8tY2RrLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaGVsbG8tY2RrLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhDQUE4QztBQUM5QyxpREFBaUQ7QUFDakQsd0NBQXdFO0FBQ3hFLE1BQWEsYUFBYyxTQUFRLFlBQUs7SUFJdEMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFrQjtRQUMxRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLGNBQWMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFO1lBQ2pFLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQztZQUN4QyxPQUFPLEVBQUUseUJBQXlCO1lBQ2xDLFdBQVcsRUFBRSxFQUNaO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsTUFBTSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxhQUFhLEVBQUU7WUFDdkQsaUNBQWlDO1lBQ2pDLDBDQUEwQztZQUMxQyx5Q0FBeUM7WUFDekMsS0FBSztZQUNMLE9BQU8sRUFBRyxjQUFjO1NBQ3pCLENBQUMsQ0FBQztRQUVILEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUM7WUFDdEQsb0JBQW9CLEVBQUUsQ0FBQztvQkFDdkIsVUFBVSxFQUFFLEtBQUs7b0JBQ2pCLGtCQUFrQixFQUFFO3dCQUNoQixxREFBcUQsRUFBRSx5RkFBeUY7d0JBQ2hKLG9EQUFvRCxFQUFFLEtBQUs7d0JBQzNELHlEQUF5RCxFQUFFLFNBQVM7d0JBQ3BFLHFEQUFxRCxFQUFFLCtCQUErQjtxQkFDekY7aUJBQ0EsQ0FBQztZQUNGLG1CQUFtQixFQUFFLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLO1lBQ3BELGdCQUFnQixFQUFFO2dCQUNsQixrQkFBa0IsRUFBRSx1QkFBdUI7YUFDMUM7U0FDSixDQUFDLEVBQUU7WUFDQSxlQUFlLEVBQUUsQ0FBQztvQkFDbEIsVUFBVSxFQUFFLEtBQUs7b0JBQ2pCLGtCQUFrQixFQUFFO3dCQUNoQixxREFBcUQsRUFBRSxJQUFJO3dCQUMzRCxxREFBcUQsRUFBRSxJQUFJO3dCQUMzRCx5REFBeUQsRUFBRSxJQUFJO3dCQUMvRCxvREFBb0QsRUFBRSxJQUFJO3FCQUM3RDtpQkFDQSxDQUFDO1NBQ0wsQ0FBQyxDQUFBO1FBR0EsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDO2FBQ2pDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUdsRSxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUM7YUFDL0IsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBR2xFLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQzthQUM5QixTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFHbEUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGdCQUFTLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTtZQUMxQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUc7U0FDZixDQUFDLENBQUM7SUFFTCxDQUFDO0NBRUY7QUFwRUQsc0NBb0VDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gJ0Bhd3MtY2RrL2F3cy1sYW1iZGEnO1xuaW1wb3J0ICogYXMgYXBpZ3cgZnJvbSAnQGF3cy1jZGsvYXdzLWFwaWdhdGV3YXknO1xuaW1wb3J0IHsgQ2ZuT3V0cHV0LCBDb25zdHJ1Y3QsIFN0YWNrLCBTdGFja1Byb3BzIH0gZnJvbSAnQGF3cy1jZGsvY29yZSc7XG5leHBvcnQgY2xhc3MgSGVsbG9DZGtTdGFjayBleHRlbmRzIFN0YWNrIHtcblxuICBwdWJsaWMgcmVhZG9ubHkgdXJsT3V0cHV0OiBDZm5PdXRwdXQ7XG5cbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBTdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICBjb25zdCBsYW1iZGFGdW5jdGlvbiA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgJ0hlbGxvQ2RrTGFtYmRhJywge1xuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzEyX1gsXG4gICAgICBjb2RlOiBsYW1iZGEuQ29kZS5mcm9tQXNzZXQoJ2Z1bmN0aW9ucycpLFxuICAgICAgaGFuZGxlcjogJ2Fnb3JhLXJlY29yZGluZy5oYW5kbGVyJyxcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICB9LFxuICAgIH0pO1xuICAgIFxuICAgIGNvbnN0IGFwaSA9IG5ldyBhcGlndy5MYW1iZGFSZXN0QXBpKHRoaXMsICdIZWxsb0Nka0FwaScsIHtcbiAgICAgIC8vIGRlZmF1bHRDb3JzUHJlZmxpZ2h0T3B0aW9uczoge1xuICAgICAgLy8gICBhbGxvd09yaWdpbnM6IGFwaWd3LkNvcnMuQUxMX09SSUdJTlMsXG4gICAgICAvLyAgIGFsbG93TWV0aG9kczogYXBpZ3cuQ29ycy5BTExfTUVUSE9EU1xuICAgICAgLy8gfSxcbiAgICAgIGhhbmRsZXIgOiBsYW1iZGFGdW5jdGlvbixcbiAgICB9KTtcblxuICAgIGFwaS5yb290LmFkZE1ldGhvZCgnT1BUSU9OUycsIG5ldyBhcGlndy5Nb2NrSW50ZWdyYXRpb24oe1xuICAgICAgaW50ZWdyYXRpb25SZXNwb25zZXM6IFt7XG4gICAgICBzdGF0dXNDb2RlOiAnMjAwJyxcbiAgICAgIHJlc3BvbnNlUGFyYW1ldGVyczoge1xuICAgICAgICAgICdtZXRob2QucmVzcG9uc2UuaGVhZGVyLkFjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMnOiBcIidDb250ZW50LVR5cGUsWC1BbXotRGF0ZSxBdXRob3JpemF0aW9uLFgtQXBpLUtleSxYLUFtei1TZWN1cml0eS1Ub2tlbixYLUFtei1Vc2VyLUFnZW50J1wiLFxuICAgICAgICAgICdtZXRob2QucmVzcG9uc2UuaGVhZGVyLkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IFwiJyonXCIsXG4gICAgICAgICAgJ21ldGhvZC5yZXNwb25zZS5oZWFkZXIuQWNjZXNzLUNvbnRyb2wtQWxsb3ctQ3JlZGVudGlhbHMnOiBcIidmYWxzZSdcIixcbiAgICAgICAgICAnbWV0aG9kLnJlc3BvbnNlLmhlYWRlci5BY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzJzogXCInT1BUSU9OUyxHRVQsUFVULFBPU1QsREVMRVRFJ1wiLFxuICAgICAgfSxcbiAgICAgIH1dLFxuICAgICAgcGFzc3Rocm91Z2hCZWhhdmlvcjogYXBpZ3cuUGFzc3Rocm91Z2hCZWhhdmlvci5ORVZFUixcbiAgICAgIHJlcXVlc3RUZW1wbGF0ZXM6IHtcbiAgICAgIFwiYXBwbGljYXRpb24vanNvblwiOiBcIntcXFwic3RhdHVzQ29kZVxcXCI6IDIwMH1cIlxuICAgICAgfSxcbiAgfSksIHtcbiAgICAgIG1ldGhvZFJlc3BvbnNlczogW3tcbiAgICAgIHN0YXR1c0NvZGU6ICcyMDAnLFxuICAgICAgcmVzcG9uc2VQYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgJ21ldGhvZC5yZXNwb25zZS5oZWFkZXIuQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycyc6IHRydWUsXG4gICAgICAgICAgJ21ldGhvZC5yZXNwb25zZS5oZWFkZXIuQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kcyc6IHRydWUsXG4gICAgICAgICAgJ21ldGhvZC5yZXNwb25zZS5oZWFkZXIuQWNjZXNzLUNvbnRyb2wtQWxsb3ctQ3JlZGVudGlhbHMnOiB0cnVlLFxuICAgICAgICAgICdtZXRob2QucmVzcG9uc2UuaGVhZGVyLkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6IHRydWUsXG4gICAgICB9LCAgXG4gICAgICB9XVxuICB9KVxuICAgIFxuXG4gICAgYXBpLnJvb3QucmVzb3VyY2VGb3JQYXRoKCcvYWNxdWlyZScpXG4gICAgICAuYWRkTWV0aG9kKCdQT1NUJywgbmV3IGFwaWd3LkxhbWJkYUludGVncmF0aW9uKGxhbWJkYUZ1bmN0aW9uKSk7XG5cbiAgICBcbiAgICBhcGkucm9vdC5yZXNvdXJjZUZvclBhdGgoJy9zdGFydCcpXG4gICAgICAuYWRkTWV0aG9kKCdQT1NUJywgbmV3IGFwaWd3LkxhbWJkYUludGVncmF0aW9uKGxhbWJkYUZ1bmN0aW9uKSk7XG4gICAgXG5cbiAgICBhcGkucm9vdC5yZXNvdXJjZUZvclBhdGgoJy9zdG9wJylcbiAgICAgIC5hZGRNZXRob2QoJ1BPU1QnLCBuZXcgYXBpZ3cuTGFtYmRhSW50ZWdyYXRpb24obGFtYmRhRnVuY3Rpb24pKTtcblxuICAgIFxuICAgIHRoaXMudXJsT3V0cHV0ID0gbmV3IENmbk91dHB1dCh0aGlzLCAnVXJsJywge1xuICAgICAgdmFsdWU6IGFwaS51cmwsXG4gICAgfSk7XG5cbiAgfVxuXG59Il19