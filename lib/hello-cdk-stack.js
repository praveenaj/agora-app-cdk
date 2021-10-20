"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloCdkStack = void 0;
const lambda = require("@aws-cdk/aws-lambda");
const apigw = require("@aws-cdk/aws-apigateway");
const NodejsLambda = require("@aws-cdk/aws-lambda-nodejs");
const core_1 = require("@aws-cdk/core");
class HelloCdkStack extends core_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const lambdaFunction = new NodejsLambda.NodejsFunction(this, 'HelloCdkLambda', {
            entry: 'functions/agora-recording.js',
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
        console.log("as");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsbG8tY2RrLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaGVsbG8tY2RrLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhDQUE4QztBQUM5QyxpREFBaUQ7QUFDakQsMkRBQTJEO0FBRTNELHdDQUF3RTtBQUN4RSxNQUFhLGFBQWMsU0FBUSxZQUFLO0lBSXRDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBa0I7UUFDMUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxjQUFjLEdBQUcsSUFBSSxZQUFZLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRTtZQUM3RSxLQUFLLEVBQUUsOEJBQThCO1lBQ3JDLE9BQU8sRUFBRSx5QkFBeUI7WUFDbEMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNuQyxRQUFRLEVBQUU7Z0JBQ1IsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDO2FBQ3ZCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsTUFBTSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxhQUFhLEVBQUU7WUFDakQsMkJBQTJCLEVBQUU7Z0JBQzNCLFlBQVksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVc7YUFDckM7U0FDRixDQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2pCLE1BQU0sV0FBVyxHQUFHLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRWhFLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQztRQUl2QyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUM7YUFDakMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBR2xFLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQzthQUMvQixTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFHbEUsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDO2FBQzlCLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUdsRSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksZ0JBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO1lBQzFDLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRztTQUNmLENBQUMsQ0FBQztJQUVMLENBQUM7Q0FFRjtBQTlDRCxzQ0E4Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSAnQGF3cy1jZGsvYXdzLWxhbWJkYSc7XG5pbXBvcnQgKiBhcyBhcGlndyBmcm9tICdAYXdzLWNkay9hd3MtYXBpZ2F0ZXdheSc7XG5pbXBvcnQgKiBhcyBOb2RlanNMYW1iZGEgZnJvbSAnQGF3cy1jZGsvYXdzLWxhbWJkYS1ub2RlanMnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IENmbk91dHB1dCwgQ29uc3RydWN0LCBTdGFjaywgU3RhY2tQcm9wcyB9IGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuZXhwb3J0IGNsYXNzIEhlbGxvQ2RrU3RhY2sgZXh0ZW5kcyBTdGFjayB7XG5cbiAgcHVibGljIHJlYWRvbmx5IHVybE91dHB1dDogQ2ZuT3V0cHV0O1xuXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgY29uc3QgbGFtYmRhRnVuY3Rpb24gPSBuZXcgTm9kZWpzTGFtYmRhLk5vZGVqc0Z1bmN0aW9uKHRoaXMsICdIZWxsb0Nka0xhbWJkYScsIHtcbiAgICAgIGVudHJ5OiAnZnVuY3Rpb25zL2Fnb3JhLXJlY29yZGluZy5qcycsXG4gICAgICBoYW5kbGVyOiAnYWdvcmEtcmVjb3JkaW5nLmhhbmRsZXInLFxuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzE0X1gsXG4gICAgICBidW5kbGluZzoge1xuICAgICAgICBub2RlTW9kdWxlczogWydheGlvcyddLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICBcbiAgICBjb25zdCBhcGkgPSBuZXcgYXBpZ3cuUmVzdEFwaSh0aGlzLCAnSGVsbG9DZGtBcGknLCB7XG4gICAgICBkZWZhdWx0Q29yc1ByZWZsaWdodE9wdGlvbnM6IHtcbiAgICAgICAgYWxsb3dPcmlnaW5zOiBhcGlndy5Db3JzLkFMTF9PUklHSU5TXG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc29sZS5sb2coXCJhc1wiKVxuICAgIGNvbnN0IGludGVncmF0aW9uID0gbmV3IGFwaWd3LkxhbWJkYUludGVncmF0aW9uKGxhbWJkYUZ1bmN0aW9uKTtcblxuICAgIGFwaS5yb290LmFkZE1ldGhvZCgnQU5ZJywgaW50ZWdyYXRpb24pO1xuXG4gICAgXG5cbiAgICBhcGkucm9vdC5yZXNvdXJjZUZvclBhdGgoJy9hY3F1aXJlJylcbiAgICAgIC5hZGRNZXRob2QoJ1BPU1QnLCBuZXcgYXBpZ3cuTGFtYmRhSW50ZWdyYXRpb24obGFtYmRhRnVuY3Rpb24pKTtcblxuICAgIFxuICAgIGFwaS5yb290LnJlc291cmNlRm9yUGF0aCgnL3N0YXJ0JylcbiAgICAgIC5hZGRNZXRob2QoJ1BPU1QnLCBuZXcgYXBpZ3cuTGFtYmRhSW50ZWdyYXRpb24obGFtYmRhRnVuY3Rpb24pKTtcbiAgICBcblxuICAgIGFwaS5yb290LnJlc291cmNlRm9yUGF0aCgnL3N0b3AnKVxuICAgICAgLmFkZE1ldGhvZCgnUE9TVCcsIG5ldyBhcGlndy5MYW1iZGFJbnRlZ3JhdGlvbihsYW1iZGFGdW5jdGlvbikpO1xuXG4gICAgXG4gICAgdGhpcy51cmxPdXRwdXQgPSBuZXcgQ2ZuT3V0cHV0KHRoaXMsICdVcmwnLCB7XG4gICAgICB2YWx1ZTogYXBpLnVybCxcbiAgICB9KTtcblxuICB9XG5cbn1cbiJdfQ==