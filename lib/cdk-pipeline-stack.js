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
        // This is where we add the application stages
        const preprod = new cdk_pipeline_stage_1.CdkpipelinesDemoStage(this, 'PreProd', {
            env: { account: '506223296078', region: 'us-east-1' }
        });
        // put validations for the stages 
    }
}
exports.CdkpipelinesDemoPipelineStack = CdkpipelinesDemoPipelineStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLXBpcGVsaW5lLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2RrLXBpcGVsaW5lLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBEQUEwRDtBQUMxRCwwRUFBMEU7QUFDMUUsd0NBQTBFO0FBQzFFLGtEQUFvRTtBQUNwRSw2REFBNEQ7QUFHNUQ7O0dBRUc7QUFDSCxNQUFhLDZCQUE4QixTQUFRLFlBQUs7SUFDdEQsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFrQjtRQUMxRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLGNBQWMsR0FBRyxJQUFJLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNuRCxNQUFNLHFCQUFxQixHQUFHLElBQUksWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRTFELE1BQU0sUUFBUSxHQUFHLElBQUksdUJBQVcsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFO1lBQ2pELG9CQUFvQjtZQUNwQixZQUFZLEVBQUUsaUJBQWlCO1lBQy9CLHFCQUFxQjtZQUVyQixnQ0FBZ0M7WUFDaEMsWUFBWSxFQUFFLElBQUksb0JBQW9CLENBQUMsa0JBQWtCLENBQUM7Z0JBQ3hELFVBQVUsRUFBRSxRQUFRO2dCQUNwQixNQUFNLEVBQUUsY0FBYztnQkFDdEIsVUFBVSxFQUFFLGtCQUFXLENBQUMsY0FBYyxDQUFDLHdCQUF3QixDQUFDO2dCQUNoRSxLQUFLLEVBQUUsaUJBQWlCO2dCQUN4QixJQUFJLEVBQUUsZUFBZTtnQkFDckIsTUFBTSxFQUFFLFNBQVM7YUFDbEIsQ0FBQztZQUVGLHVDQUF1QztZQUN2QyxXQUFXLEVBQUUsNkJBQWlCLENBQUMsZ0JBQWdCLENBQUM7Z0JBQzlDLGNBQWM7Z0JBQ2QscUJBQXFCO2dCQUVyQix3REFBd0Q7Z0JBQ3hELFlBQVksRUFBRSxlQUFlO2dCQUM3QixXQUFXLEVBQUU7b0JBQ1gsVUFBVSxFQUFFLElBQUk7aUJBQ2pCO2FBQ0YsQ0FBQztTQUNILENBQUMsQ0FBQztRQUNILDhDQUE4QztRQUM5QyxNQUFNLE9BQU8sR0FBRyxJQUFJLDBDQUFxQixDQUFDLElBQUksRUFBRSxTQUFTLEVBQUU7WUFDekQsR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFO1NBQ3RELENBQUMsQ0FBQztRQUVILGtDQUFrQztJQUVwQyxDQUFDO0NBQ0Y7QUExQ0Qsc0VBMENDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY29kZXBpcGVsaW5lIGZyb20gJ0Bhd3MtY2RrL2F3cy1jb2RlcGlwZWxpbmUnO1xuaW1wb3J0ICogYXMgY29kZXBpcGVsaW5lX2FjdGlvbnMgZnJvbSAnQGF3cy1jZGsvYXdzLWNvZGVwaXBlbGluZS1hY3Rpb25zJztcbmltcG9ydCB7IENvbnN0cnVjdCwgU2VjcmV0VmFsdWUsIFN0YWNrLCBTdGFja1Byb3BzIH0gZnJvbSAnQGF3cy1jZGsvY29yZSc7XG5pbXBvcnQgeyBDZGtQaXBlbGluZSwgU2ltcGxlU3ludGhBY3Rpb24gfSBmcm9tIFwiQGF3cy1jZGsvcGlwZWxpbmVzXCI7XG5pbXBvcnQgeyBDZGtwaXBlbGluZXNEZW1vU3RhZ2V9IGZyb20gJy4vY2RrLXBpcGVsaW5lLXN0YWdlJztcbmltcG9ydCB7IFNoZWxsU2NyaXB0QWN0aW9uIH0gZnJvbSAnQGF3cy1jZGsvcGlwZWxpbmVzJztcblxuLyoqXG4gKiBUaGUgc3RhY2sgdGhhdCBkZWZpbmVzIHRoZSBhcHBsaWNhdGlvbiBwaXBlbGluZVxuICovXG5leHBvcnQgY2xhc3MgQ2RrcGlwZWxpbmVzRGVtb1BpcGVsaW5lU3RhY2sgZXh0ZW5kcyBTdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgY29uc3Qgc291cmNlQXJ0aWZhY3QgPSBuZXcgY29kZXBpcGVsaW5lLkFydGlmYWN0KCk7XG4gICAgY29uc3QgY2xvdWRBc3NlbWJseUFydGlmYWN0ID0gbmV3IGNvZGVwaXBlbGluZS5BcnRpZmFjdCgpO1xuXG4gICAgY29uc3QgcGlwZWxpbmUgPSBuZXcgQ2RrUGlwZWxpbmUodGhpcywgJ1BpcGVsaW5lJywge1xuICAgICAgLy8gVGhlIHBpcGVsaW5lIG5hbWVcbiAgICAgIHBpcGVsaW5lTmFtZTogJ0Fnb3JhUGlwZWxpbmV2MScsXG4gICAgICBjbG91ZEFzc2VtYmx5QXJ0aWZhY3QsXG5cbiAgICAgIC8vIFdoZXJlIHRoZSBzb3VyY2UgY2FuIGJlIGZvdW5kXG4gICAgICBzb3VyY2VBY3Rpb246IG5ldyBjb2RlcGlwZWxpbmVfYWN0aW9ucy5HaXRIdWJTb3VyY2VBY3Rpb24oe1xuICAgICAgICBhY3Rpb25OYW1lOiAnR2l0SHViJyxcbiAgICAgICAgb3V0cHV0OiBzb3VyY2VBcnRpZmFjdCxcbiAgICAgICAgb2F1dGhUb2tlbjogU2VjcmV0VmFsdWUuc2VjcmV0c01hbmFnZXIoJ2dpdGh1Yi10b2tlbi1jZGstYWdvcmEnKSxcbiAgICAgICAgb3duZXI6ICd5dXRoaWthc2FnYXJhZ2UnLFxuICAgICAgICByZXBvOiAnYWdvcmEtYXBwLWNkaycsXG4gICAgICAgIGJyYW5jaDogJ3JlbGVhc2UnXG4gICAgICB9KSxcblxuICAgICAgLy8gSG93IGl0IHdpbGwgYmUgYnVpbHQgYW5kIHN5bnRoZXNpemVkXG4gICAgICBzeW50aEFjdGlvbjogU2ltcGxlU3ludGhBY3Rpb24uc3RhbmRhcmROcG1TeW50aCh7XG4gICAgICAgIHNvdXJjZUFydGlmYWN0LFxuICAgICAgICBjbG91ZEFzc2VtYmx5QXJ0aWZhY3QsXG4gICAgICAgIFxuICAgICAgICAvLyBXZSBuZWVkIGEgYnVpbGQgc3RlcCB0byBjb21waWxlIHRoZSBUeXBlU2NyaXB0IExhbWJkYVxuICAgICAgICBidWlsZENvbW1hbmQ6ICducG0gcnVuIGJ1aWxkJyxcbiAgICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgICBwcml2aWxlZ2VkOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgIH0pO1xuICAgIC8vIFRoaXMgaXMgd2hlcmUgd2UgYWRkIHRoZSBhcHBsaWNhdGlvbiBzdGFnZXNcbiAgICBjb25zdCBwcmVwcm9kID0gbmV3IENka3BpcGVsaW5lc0RlbW9TdGFnZSh0aGlzLCAnUHJlUHJvZCcsIHtcbiAgICAgIGVudjogeyBhY2NvdW50OiAnNTA2MjIzMjk2MDc4JywgcmVnaW9uOiAndXMtZWFzdC0xJyB9XG4gICAgfSk7XG5cbiAgICAvLyBwdXQgdmFsaWRhdGlvbnMgZm9yIHRoZSBzdGFnZXMgXG4gICAgXG4gIH1cbn0iXX0=