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
            code: new lambda.AssetCode('functions'),
            handler: 'agora-recording.handler',
            environment: {},
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
        this.urlOutput = new core_1.CfnOutput(this, 'Url', {
            value: api.url,
        });
    }
}
exports.HelloCdkStack = HelloCdkStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsbG8tY2RrLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaGVsbG8tY2RrLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhDQUE4QztBQUM5QyxpREFBaUQ7QUFDakQsd0NBQXdFO0FBQ3hFLE1BQWEsYUFBYyxTQUFRLFlBQUs7SUFJdEMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFrQjtRQUMxRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLGNBQWMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFO1lBQ2pFLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsSUFBSSxFQUFFLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7WUFDdkMsT0FBTyxFQUFFLHlCQUF5QjtZQUNsQyxXQUFXLEVBQUUsRUFDWjtTQUNGLENBQUMsQ0FBQztRQUVILE1BQU0sR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFO1lBQ2pELDJCQUEyQixFQUFFO2dCQUMzQixZQUFZLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXO2FBQ3JDO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsTUFBTSxXQUFXLEdBQUcsSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFaEUsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBSXZDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQzthQUNqQyxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFHbEUsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDO2FBQy9CLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUdsRSxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUM7YUFDOUIsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBR2xFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxnQkFBUyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUU7WUFDMUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFHO1NBQ2YsQ0FBQyxDQUFDO0lBRUwsQ0FBQztDQUVGO0FBN0NELHNDQTZDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGxhbWJkYSBmcm9tICdAYXdzLWNkay9hd3MtbGFtYmRhJztcbmltcG9ydCAqIGFzIGFwaWd3IGZyb20gJ0Bhd3MtY2RrL2F3cy1hcGlnYXRld2F5JztcbmltcG9ydCB7IENmbk91dHB1dCwgQ29uc3RydWN0LCBTdGFjaywgU3RhY2tQcm9wcyB9IGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuZXhwb3J0IGNsYXNzIEhlbGxvQ2RrU3RhY2sgZXh0ZW5kcyBTdGFjayB7XG5cbiAgcHVibGljIHJlYWRvbmx5IHVybE91dHB1dDogQ2ZuT3V0cHV0O1xuXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgY29uc3QgbGFtYmRhRnVuY3Rpb24gPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsICdIZWxsb0Nka0xhbWJkYScsIHtcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xMl9YLFxuICAgICAgY29kZTogbmV3IGxhbWJkYS5Bc3NldENvZGUoJ2Z1bmN0aW9ucycpLFxuICAgICAgaGFuZGxlcjogJ2Fnb3JhLXJlY29yZGluZy5oYW5kbGVyJyxcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICB9LFxuICAgIH0pO1xuICAgIFxuICAgIGNvbnN0IGFwaSA9IG5ldyBhcGlndy5SZXN0QXBpKHRoaXMsICdIZWxsb0Nka0FwaScsIHtcbiAgICAgIGRlZmF1bHRDb3JzUHJlZmxpZ2h0T3B0aW9uczoge1xuICAgICAgICBhbGxvd09yaWdpbnM6IGFwaWd3LkNvcnMuQUxMX09SSUdJTlNcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGludGVncmF0aW9uID0gbmV3IGFwaWd3LkxhbWJkYUludGVncmF0aW9uKGxhbWJkYUZ1bmN0aW9uKTtcblxuICAgIGFwaS5yb290LmFkZE1ldGhvZCgnQU5ZJywgaW50ZWdyYXRpb24pO1xuXG4gICAgXG5cbiAgICBhcGkucm9vdC5yZXNvdXJjZUZvclBhdGgoJy9hY3F1aXJlJylcbiAgICAgIC5hZGRNZXRob2QoJ1BPU1QnLCBuZXcgYXBpZ3cuTGFtYmRhSW50ZWdyYXRpb24obGFtYmRhRnVuY3Rpb24pKTtcblxuICAgIFxuICAgIGFwaS5yb290LnJlc291cmNlRm9yUGF0aCgnL3N0YXJ0JylcbiAgICAgIC5hZGRNZXRob2QoJ1BPU1QnLCBuZXcgYXBpZ3cuTGFtYmRhSW50ZWdyYXRpb24obGFtYmRhRnVuY3Rpb24pKTtcbiAgICBcblxuICAgIGFwaS5yb290LnJlc291cmNlRm9yUGF0aCgnL3N0b3AnKVxuICAgICAgLmFkZE1ldGhvZCgnUE9TVCcsIG5ldyBhcGlndy5MYW1iZGFJbnRlZ3JhdGlvbihsYW1iZGFGdW5jdGlvbikpO1xuXG4gICAgXG4gICAgdGhpcy51cmxPdXRwdXQgPSBuZXcgQ2ZuT3V0cHV0KHRoaXMsICdVcmwnLCB7XG4gICAgICB2YWx1ZTogYXBpLnVybCxcbiAgICB9KTtcblxuICB9XG5cbn1cbiJdfQ==