"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdkpipelinesDemoPipelineStack = void 0;
const codepipeline = require("@aws-cdk/aws-codepipeline");
const codepipeline_actions = require("@aws-cdk/aws-codepipeline-actions");
const core_1 = require("@aws-cdk/core");
const pipelines_1 = require("@aws-cdk/pipelines");
const cdk_pipeline_stage_1 = require("./cdk-pipeline-stage");
/**
 * The stack that defines the application pipeline
 */
class CdkpipelinesDemoPipelineStack extends core_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const sourceArtifact = new codepipeline.Artifact();
        const cloudAssemblyArtifact = new codepipeline.Artifact();
        const pipeline = new pipelines_1.CdkPipeline(this, 'Pipeline', {
            // The pipeline name
            pipelineName: 'AgoraPipelinev1',
            cloudAssemblyArtifact,
            // Where the source can be found
            sourceAction: new codepipeline_actions.GitHubSourceAction({
                actionName: 'GitHub',
                output: sourceArtifact,
                oauthToken: core_1.SecretValue.secretsManager('github-token-cdk-agora'),
                owner: 'yuthikasagarage',
                repo: 'agora-app-cdk',
                branch: 'release'
            }),
            // How it will be built and synthesized
            synthAction: pipelines_1.SimpleSynthAction.standardNpmSynth({
                sourceArtifact,
                cloudAssemblyArtifact,
                // We need a build step to compile the TypeScript Lambda
                buildCommand: 'npm run build',
                environment: {
                    privileged: true
                }
            }),
        });
        // put validations for the stages 
        pipeline.addApplicationStage(new cdk_pipeline_stage_1.CdkpipelinesDemoStage(this, 'Prod', {
            env: { account: '506223296078', region: 'us-east-1' }
        }));
    }
}
exports.CdkpipelinesDemoPipelineStack = CdkpipelinesDemoPipelineStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLXBpcGVsaW5lLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2RrLXBpcGVsaW5lLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBEQUEwRDtBQUMxRCwwRUFBMEU7QUFDMUUsd0NBQTBFO0FBQzFFLGtEQUFvRTtBQUNwRSw2REFBNEQ7QUFHNUQ7O0dBRUc7QUFDSCxNQUFhLDZCQUE4QixTQUFRLFlBQUs7SUFDdEQsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFrQjtRQUMxRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLGNBQWMsR0FBRyxJQUFJLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNuRCxNQUFNLHFCQUFxQixHQUFHLElBQUksWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRTFELE1BQU0sUUFBUSxHQUFHLElBQUksdUJBQVcsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFO1lBQ2pELG9CQUFvQjtZQUNwQixZQUFZLEVBQUUsaUJBQWlCO1lBQy9CLHFCQUFxQjtZQUVyQixnQ0FBZ0M7WUFDaEMsWUFBWSxFQUFFLElBQUksb0JBQW9CLENBQUMsa0JBQWtCLENBQUM7Z0JBQ3hELFVBQVUsRUFBRSxRQUFRO2dCQUNwQixNQUFNLEVBQUUsY0FBYztnQkFDdEIsVUFBVSxFQUFFLGtCQUFXLENBQUMsY0FBYyxDQUFDLHdCQUF3QixDQUFDO2dCQUNoRSxLQUFLLEVBQUUsaUJBQWlCO2dCQUN4QixJQUFJLEVBQUUsZUFBZTtnQkFDckIsTUFBTSxFQUFFLFNBQVM7YUFDbEIsQ0FBQztZQUVGLHVDQUF1QztZQUN2QyxXQUFXLEVBQUUsNkJBQWlCLENBQUMsZ0JBQWdCLENBQUM7Z0JBQzlDLGNBQWM7Z0JBQ2QscUJBQXFCO2dCQUVyQix3REFBd0Q7Z0JBQ3hELFlBQVksRUFBRSxlQUFlO2dCQUM3QixXQUFXLEVBQUU7b0JBQ1gsVUFBVSxFQUFFLElBQUk7aUJBQ2pCO2FBQ0YsQ0FBQztTQUNILENBQUMsQ0FBQztRQUVILGtDQUFrQztRQUNsQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsSUFBSSwwQ0FBcUIsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFO1lBQ25FLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRTtTQUN0RCxDQUFDLENBQUMsQ0FBQztJQUVOLENBQUM7Q0FDRjtBQXpDRCxzRUF5Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjb2RlcGlwZWxpbmUgZnJvbSAnQGF3cy1jZGsvYXdzLWNvZGVwaXBlbGluZSc7XG5pbXBvcnQgKiBhcyBjb2RlcGlwZWxpbmVfYWN0aW9ucyBmcm9tICdAYXdzLWNkay9hd3MtY29kZXBpcGVsaW5lLWFjdGlvbnMnO1xuaW1wb3J0IHsgQ29uc3RydWN0LCBTZWNyZXRWYWx1ZSwgU3RhY2ssIFN0YWNrUHJvcHMgfSBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCB7IENka1BpcGVsaW5lLCBTaW1wbGVTeW50aEFjdGlvbiB9IGZyb20gXCJAYXdzLWNkay9waXBlbGluZXNcIjtcbmltcG9ydCB7IENka3BpcGVsaW5lc0RlbW9TdGFnZX0gZnJvbSAnLi9jZGstcGlwZWxpbmUtc3RhZ2UnO1xuaW1wb3J0IHsgU2hlbGxTY3JpcHRBY3Rpb24gfSBmcm9tICdAYXdzLWNkay9waXBlbGluZXMnO1xuXG4vKipcbiAqIFRoZSBzdGFjayB0aGF0IGRlZmluZXMgdGhlIGFwcGxpY2F0aW9uIHBpcGVsaW5lXG4gKi9cbmV4cG9ydCBjbGFzcyBDZGtwaXBlbGluZXNEZW1vUGlwZWxpbmVTdGFjayBleHRlbmRzIFN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBTdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICBjb25zdCBzb3VyY2VBcnRpZmFjdCA9IG5ldyBjb2RlcGlwZWxpbmUuQXJ0aWZhY3QoKTtcbiAgICBjb25zdCBjbG91ZEFzc2VtYmx5QXJ0aWZhY3QgPSBuZXcgY29kZXBpcGVsaW5lLkFydGlmYWN0KCk7XG5cbiAgICBjb25zdCBwaXBlbGluZSA9IG5ldyBDZGtQaXBlbGluZSh0aGlzLCAnUGlwZWxpbmUnLCB7XG4gICAgICAvLyBUaGUgcGlwZWxpbmUgbmFtZVxuICAgICAgcGlwZWxpbmVOYW1lOiAnQWdvcmFQaXBlbGluZXYxJyxcbiAgICAgIGNsb3VkQXNzZW1ibHlBcnRpZmFjdCxcblxuICAgICAgLy8gV2hlcmUgdGhlIHNvdXJjZSBjYW4gYmUgZm91bmRcbiAgICAgIHNvdXJjZUFjdGlvbjogbmV3IGNvZGVwaXBlbGluZV9hY3Rpb25zLkdpdEh1YlNvdXJjZUFjdGlvbih7XG4gICAgICAgIGFjdGlvbk5hbWU6ICdHaXRIdWInLFxuICAgICAgICBvdXRwdXQ6IHNvdXJjZUFydGlmYWN0LFxuICAgICAgICBvYXV0aFRva2VuOiBTZWNyZXRWYWx1ZS5zZWNyZXRzTWFuYWdlcignZ2l0aHViLXRva2VuLWNkay1hZ29yYScpLFxuICAgICAgICBvd25lcjogJ3l1dGhpa2FzYWdhcmFnZScsXG4gICAgICAgIHJlcG86ICdhZ29yYS1hcHAtY2RrJyxcbiAgICAgICAgYnJhbmNoOiAncmVsZWFzZSdcbiAgICAgIH0pLFxuXG4gICAgICAvLyBIb3cgaXQgd2lsbCBiZSBidWlsdCBhbmQgc3ludGhlc2l6ZWRcbiAgICAgIHN5bnRoQWN0aW9uOiBTaW1wbGVTeW50aEFjdGlvbi5zdGFuZGFyZE5wbVN5bnRoKHtcbiAgICAgICAgc291cmNlQXJ0aWZhY3QsXG4gICAgICAgIGNsb3VkQXNzZW1ibHlBcnRpZmFjdCxcbiAgICAgICAgXG4gICAgICAgIC8vIFdlIG5lZWQgYSBidWlsZCBzdGVwIHRvIGNvbXBpbGUgdGhlIFR5cGVTY3JpcHQgTGFtYmRhXG4gICAgICAgIGJ1aWxkQ29tbWFuZDogJ25wbSBydW4gYnVpbGQnLFxuICAgICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICAgIHByaXZpbGVnZWQ6IHRydWVcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgfSk7XG5cbiAgICAvLyBwdXQgdmFsaWRhdGlvbnMgZm9yIHRoZSBzdGFnZXMgXG4gICAgcGlwZWxpbmUuYWRkQXBwbGljYXRpb25TdGFnZShuZXcgQ2RrcGlwZWxpbmVzRGVtb1N0YWdlKHRoaXMsICdQcm9kJywge1xuICAgICAgZW52OiB7IGFjY291bnQ6ICc1MDYyMjMyOTYwNzgnLCByZWdpb246ICd1cy1lYXN0LTEnIH1cbiAgICB9KSk7XG4gICAgXG4gIH1cbn0iXX0=