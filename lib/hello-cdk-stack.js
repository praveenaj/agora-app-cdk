"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloCdkStack = void 0;
const lambda = require("@aws-cdk/aws-lambda");
const apigw = require("@aws-cdk/aws-apigateway");
const NodejsLambda = require("@aws-cdk/aws-lambda-nodejs");
const path = require("path");
const core_1 = require("@aws-cdk/core");
class HelloCdkStack extends core_1.Stack {
    constructor(scope, id, props) {
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
        this.urlOutput = new core_1.CfnOutput(this, 'Url', {
            value: api.url,
        });
    }
}
exports.HelloCdkStack = HelloCdkStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsbG8tY2RrLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaGVsbG8tY2RrLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhDQUE4QztBQUM5QyxpREFBaUQ7QUFDakQsMkRBQTJEO0FBQzNELDZCQUE2QjtBQUM3Qix3Q0FBd0U7QUFDeEUsTUFBYSxhQUFjLFNBQVEsWUFBSztJQUl0QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWtCO1FBQzFELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sY0FBYyxHQUFHLElBQUksWUFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7WUFDN0UsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLDhCQUE4QixDQUFDO1lBQzNELE9BQU8sRUFBRSx5QkFBeUI7WUFDbEMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNuQyxRQUFRLEVBQUU7Z0JBQ1IsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDO2FBQ3ZCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsTUFBTSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxhQUFhLEVBQUU7WUFDakQsMkJBQTJCLEVBQUU7Z0JBQzNCLFlBQVksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVc7YUFDckM7U0FDRixDQUFDLENBQUM7UUFFSCxNQUFNLFdBQVcsR0FBRyxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUVoRSxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFJdkMsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDO2FBQ2pDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUdsRSxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUM7YUFDL0IsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBR2xFLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQzthQUM5QixTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFHbEUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGdCQUFTLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTtZQUMxQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUc7U0FDZixDQUFDLENBQUM7SUFFTCxDQUFDO0NBRUY7QUE5Q0Qsc0NBOENDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gJ0Bhd3MtY2RrL2F3cy1sYW1iZGEnO1xuaW1wb3J0ICogYXMgYXBpZ3cgZnJvbSAnQGF3cy1jZGsvYXdzLWFwaWdhdGV3YXknO1xuaW1wb3J0ICogYXMgTm9kZWpzTGFtYmRhIGZyb20gJ0Bhd3MtY2RrL2F3cy1sYW1iZGEtbm9kZWpzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBDZm5PdXRwdXQsIENvbnN0cnVjdCwgU3RhY2ssIFN0YWNrUHJvcHMgfSBmcm9tICdAYXdzLWNkay9jb3JlJztcbmV4cG9ydCBjbGFzcyBIZWxsb0Nka1N0YWNrIGV4dGVuZHMgU3RhY2sge1xuXG4gIHB1YmxpYyByZWFkb25seSB1cmxPdXRwdXQ6IENmbk91dHB1dDtcblxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IFN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIGNvbnN0IGxhbWJkYUZ1bmN0aW9uID0gbmV3IE5vZGVqc0xhbWJkYS5Ob2RlanNGdW5jdGlvbih0aGlzLCAnSGVsbG9DZGtMYW1iZGEnLCB7XG4gICAgICBlbnRyeTogcGF0aC5qb2luKF9fZGlybmFtZSwgJ2Z1bmN0aW9ucy9hZ29yYS1yZWNvcmRpbmcuanMnKSxcbiAgICAgIGhhbmRsZXI6ICdhZ29yYS1yZWNvcmRpbmcuaGFuZGxlcicsXG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTRfWCxcbiAgICAgIGJ1bmRsaW5nOiB7XG4gICAgICAgIG5vZGVNb2R1bGVzOiBbJ2F4aW9zJ10sXG4gICAgICB9LFxuICAgIH0pO1xuICAgIFxuICAgIGNvbnN0IGFwaSA9IG5ldyBhcGlndy5SZXN0QXBpKHRoaXMsICdIZWxsb0Nka0FwaScsIHtcbiAgICAgIGRlZmF1bHRDb3JzUHJlZmxpZ2h0T3B0aW9uczoge1xuICAgICAgICBhbGxvd09yaWdpbnM6IGFwaWd3LkNvcnMuQUxMX09SSUdJTlNcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGludGVncmF0aW9uID0gbmV3IGFwaWd3LkxhbWJkYUludGVncmF0aW9uKGxhbWJkYUZ1bmN0aW9uKTtcblxuICAgIGFwaS5yb290LmFkZE1ldGhvZCgnQU5ZJywgaW50ZWdyYXRpb24pO1xuXG4gICAgXG5cbiAgICBhcGkucm9vdC5yZXNvdXJjZUZvclBhdGgoJy9hY3F1aXJlJylcbiAgICAgIC5hZGRNZXRob2QoJ1BPU1QnLCBuZXcgYXBpZ3cuTGFtYmRhSW50ZWdyYXRpb24obGFtYmRhRnVuY3Rpb24pKTtcblxuICAgIFxuICAgIGFwaS5yb290LnJlc291cmNlRm9yUGF0aCgnL3N0YXJ0JylcbiAgICAgIC5hZGRNZXRob2QoJ1BPU1QnLCBuZXcgYXBpZ3cuTGFtYmRhSW50ZWdyYXRpb24obGFtYmRhRnVuY3Rpb24pKTtcbiAgICBcblxuICAgIGFwaS5yb290LnJlc291cmNlRm9yUGF0aCgnL3N0b3AnKVxuICAgICAgLmFkZE1ldGhvZCgnUE9TVCcsIG5ldyBhcGlndy5MYW1iZGFJbnRlZ3JhdGlvbihsYW1iZGFGdW5jdGlvbikpO1xuXG4gICAgXG4gICAgdGhpcy51cmxPdXRwdXQgPSBuZXcgQ2ZuT3V0cHV0KHRoaXMsICdVcmwnLCB7XG4gICAgICB2YWx1ZTogYXBpLnVybCxcbiAgICB9KTtcblxuICB9XG5cbn1cbiJdfQ==