"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdkpipelinesDemoPipelineStack = void 0;
const codepipeline = require("@aws-cdk/aws-codepipeline");
const codepipeline_actions = require("@aws-cdk/aws-codepipeline-actions");
const core_1 = require("@aws-cdk/core");
const pipelines_1 = require("@aws-cdk/pipelines");
const cdk_pipeline_stage_1 = require("./cdk-pipeline-stage");
const pipelines_2 = require("@aws-cdk/pipelines");
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
                buildCommand: 'npm run build'
            }),
        });
        // This is where we add the application stages
        const preprod = new cdk_pipeline_stage_1.CdkpipelinesDemoStage(this, 'PreProd', {
            env: { account: '506223296078', region: 'us-east-1' }
        });
        // put validations for the stages 
        const preprodStage = pipeline.addApplicationStage(preprod);
        preprodStage.addActions(new pipelines_2.ShellScriptAction({
            actionName: 'TestService',
            useOutputs: {
                // Get the stack Output from the Stage and make it available in
                // the shell script as $ENDPOINT_URL.
                ENDPOINT_URL: pipeline.stackOutput(preprod.urlOutput),
            },
            commands: [
                // Use 'curl' to GET the given URL and fail if it returns an error
                'curl -Ssf $ENDPOINT_URL',
            ],
        }));
        console.log("as");
        pipeline.addApplicationStage(new cdk_pipeline_stage_1.CdkpipelinesDemoStage(this, 'Prod', {
            env: { account: '506223296078', region: 'us-east-1' }
        }));
    }
}
exports.CdkpipelinesDemoPipelineStack = CdkpipelinesDemoPipelineStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLXBpcGVsaW5lLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2RrLXBpcGVsaW5lLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBEQUEwRDtBQUMxRCwwRUFBMEU7QUFDMUUsd0NBQTBFO0FBQzFFLGtEQUFvRTtBQUNwRSw2REFBNEQ7QUFDNUQsa0RBQXVEO0FBRXZEOztHQUVHO0FBQ0gsTUFBYSw2QkFBOEIsU0FBUSxZQUFLO0lBQ3RELFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBa0I7UUFDMUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxjQUFjLEdBQUcsSUFBSSxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDbkQsTUFBTSxxQkFBcUIsR0FBRyxJQUFJLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUUxRCxNQUFNLFFBQVEsR0FBRyxJQUFJLHVCQUFXLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRTtZQUNqRCxvQkFBb0I7WUFDcEIsWUFBWSxFQUFFLGlCQUFpQjtZQUMvQixxQkFBcUI7WUFFckIsZ0NBQWdDO1lBQ2hDLFlBQVksRUFBRSxJQUFJLG9CQUFvQixDQUFDLGtCQUFrQixDQUFDO2dCQUN4RCxVQUFVLEVBQUUsUUFBUTtnQkFDcEIsTUFBTSxFQUFFLGNBQWM7Z0JBQ3RCLFVBQVUsRUFBRSxrQkFBVyxDQUFDLGNBQWMsQ0FBQyx3QkFBd0IsQ0FBQztnQkFDaEUsS0FBSyxFQUFFLGlCQUFpQjtnQkFDeEIsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLE1BQU0sRUFBRSxTQUFTO2FBQ2xCLENBQUM7WUFFRix1Q0FBdUM7WUFDdkMsV0FBVyxFQUFFLDZCQUFpQixDQUFDLGdCQUFnQixDQUFDO2dCQUM5QyxjQUFjO2dCQUNkLHFCQUFxQjtnQkFFckIsd0RBQXdEO2dCQUN4RCxZQUFZLEVBQUUsZUFBZTthQUM5QixDQUFDO1NBQ0gsQ0FBQyxDQUFDO1FBQ0gsOENBQThDO1FBQzdDLE1BQU0sT0FBTyxHQUFHLElBQUksMENBQXFCLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUMxRCxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUU7U0FDdEQsQ0FBQyxDQUFDO1FBRUgsa0NBQWtDO1FBQ2xDLE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUUzRCxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksNkJBQWlCLENBQUM7WUFDNUMsVUFBVSxFQUFFLGFBQWE7WUFDekIsVUFBVSxFQUFFO2dCQUNWLCtEQUErRDtnQkFDL0QscUNBQXFDO2dCQUNyQyxZQUFZLEVBQUUsUUFBUSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO2FBQ3REO1lBQ0QsUUFBUSxFQUFFO2dCQUNSLGtFQUFrRTtnQkFDbEUseUJBQXlCO2FBQzFCO1NBQ0YsQ0FBQyxDQUFDLENBQUM7UUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xCLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLDBDQUFxQixDQUFDLElBQUksRUFBRSxNQUFNLEVBQUU7WUFDbkUsR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFO1NBQ3RELENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztDQUVKO0FBekRELHNFQXlEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNvZGVwaXBlbGluZSBmcm9tICdAYXdzLWNkay9hd3MtY29kZXBpcGVsaW5lJztcbmltcG9ydCAqIGFzIGNvZGVwaXBlbGluZV9hY3Rpb25zIGZyb20gJ0Bhd3MtY2RrL2F3cy1jb2RlcGlwZWxpbmUtYWN0aW9ucyc7XG5pbXBvcnQgeyBDb25zdHJ1Y3QsIFNlY3JldFZhbHVlLCBTdGFjaywgU3RhY2tQcm9wcyB9IGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuaW1wb3J0IHsgQ2RrUGlwZWxpbmUsIFNpbXBsZVN5bnRoQWN0aW9uIH0gZnJvbSBcIkBhd3MtY2RrL3BpcGVsaW5lc1wiO1xuaW1wb3J0IHsgQ2RrcGlwZWxpbmVzRGVtb1N0YWdlfSBmcm9tICcuL2Nkay1waXBlbGluZS1zdGFnZSc7XG5pbXBvcnQgeyBTaGVsbFNjcmlwdEFjdGlvbiB9IGZyb20gJ0Bhd3MtY2RrL3BpcGVsaW5lcyc7XG5cbi8qKlxuICogVGhlIHN0YWNrIHRoYXQgZGVmaW5lcyB0aGUgYXBwbGljYXRpb24gcGlwZWxpbmVcbiAqL1xuZXhwb3J0IGNsYXNzIENka3BpcGVsaW5lc0RlbW9QaXBlbGluZVN0YWNrIGV4dGVuZHMgU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IFN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIGNvbnN0IHNvdXJjZUFydGlmYWN0ID0gbmV3IGNvZGVwaXBlbGluZS5BcnRpZmFjdCgpO1xuICAgIGNvbnN0IGNsb3VkQXNzZW1ibHlBcnRpZmFjdCA9IG5ldyBjb2RlcGlwZWxpbmUuQXJ0aWZhY3QoKTtcblxuICAgIGNvbnN0IHBpcGVsaW5lID0gbmV3IENka1BpcGVsaW5lKHRoaXMsICdQaXBlbGluZScsIHtcbiAgICAgIC8vIFRoZSBwaXBlbGluZSBuYW1lXG4gICAgICBwaXBlbGluZU5hbWU6ICdBZ29yYVBpcGVsaW5ldjEnLFxuICAgICAgY2xvdWRBc3NlbWJseUFydGlmYWN0LFxuXG4gICAgICAvLyBXaGVyZSB0aGUgc291cmNlIGNhbiBiZSBmb3VuZFxuICAgICAgc291cmNlQWN0aW9uOiBuZXcgY29kZXBpcGVsaW5lX2FjdGlvbnMuR2l0SHViU291cmNlQWN0aW9uKHtcbiAgICAgICAgYWN0aW9uTmFtZTogJ0dpdEh1YicsXG4gICAgICAgIG91dHB1dDogc291cmNlQXJ0aWZhY3QsXG4gICAgICAgIG9hdXRoVG9rZW46IFNlY3JldFZhbHVlLnNlY3JldHNNYW5hZ2VyKCdnaXRodWItdG9rZW4tY2RrLWFnb3JhJyksXG4gICAgICAgIG93bmVyOiAneXV0aGlrYXNhZ2FyYWdlJyxcbiAgICAgICAgcmVwbzogJ2Fnb3JhLWFwcC1jZGsnLFxuICAgICAgICBicmFuY2g6ICdyZWxlYXNlJ1xuICAgICAgfSksXG5cbiAgICAgIC8vIEhvdyBpdCB3aWxsIGJlIGJ1aWx0IGFuZCBzeW50aGVzaXplZFxuICAgICAgc3ludGhBY3Rpb246IFNpbXBsZVN5bnRoQWN0aW9uLnN0YW5kYXJkTnBtU3ludGgoe1xuICAgICAgICBzb3VyY2VBcnRpZmFjdCxcbiAgICAgICAgY2xvdWRBc3NlbWJseUFydGlmYWN0LFxuICAgICAgICBcbiAgICAgICAgLy8gV2UgbmVlZCBhIGJ1aWxkIHN0ZXAgdG8gY29tcGlsZSB0aGUgVHlwZVNjcmlwdCBMYW1iZGFcbiAgICAgICAgYnVpbGRDb21tYW5kOiAnbnBtIHJ1biBidWlsZCdcbiAgICAgIH0pLFxuICAgIH0pO1xuICAgIC8vIFRoaXMgaXMgd2hlcmUgd2UgYWRkIHRoZSBhcHBsaWNhdGlvbiBzdGFnZXNcbiAgICAgY29uc3QgcHJlcHJvZCA9IG5ldyBDZGtwaXBlbGluZXNEZW1vU3RhZ2UodGhpcywgJ1ByZVByb2QnLCB7XG4gICAgICBlbnY6IHsgYWNjb3VudDogJzUwNjIyMzI5NjA3OCcsIHJlZ2lvbjogJ3VzLWVhc3QtMScgfVxuICAgIH0pO1xuXG4gICAgLy8gcHV0IHZhbGlkYXRpb25zIGZvciB0aGUgc3RhZ2VzIFxuICAgIGNvbnN0IHByZXByb2RTdGFnZSA9IHBpcGVsaW5lLmFkZEFwcGxpY2F0aW9uU3RhZ2UocHJlcHJvZCk7XG4gIFxuICAgIHByZXByb2RTdGFnZS5hZGRBY3Rpb25zKG5ldyBTaGVsbFNjcmlwdEFjdGlvbih7XG4gICAgICBhY3Rpb25OYW1lOiAnVGVzdFNlcnZpY2UnLFxuICAgICAgdXNlT3V0cHV0czoge1xuICAgICAgICAvLyBHZXQgdGhlIHN0YWNrIE91dHB1dCBmcm9tIHRoZSBTdGFnZSBhbmQgbWFrZSBpdCBhdmFpbGFibGUgaW5cbiAgICAgICAgLy8gdGhlIHNoZWxsIHNjcmlwdCBhcyAkRU5EUE9JTlRfVVJMLlxuICAgICAgICBFTkRQT0lOVF9VUkw6IHBpcGVsaW5lLnN0YWNrT3V0cHV0KHByZXByb2QudXJsT3V0cHV0KSxcbiAgICAgIH0sXG4gICAgICBjb21tYW5kczogW1xuICAgICAgICAvLyBVc2UgJ2N1cmwnIHRvIEdFVCB0aGUgZ2l2ZW4gVVJMIGFuZCBmYWlsIGlmIGl0IHJldHVybnMgYW4gZXJyb3JcbiAgICAgICAgJ2N1cmwgLVNzZiAkRU5EUE9JTlRfVVJMJyxcbiAgICAgIF0sXG4gICAgfSkpO1xuICAgIGNvbnNvbGUubG9nKFwiYXNcIik7XG4gICAgcGlwZWxpbmUuYWRkQXBwbGljYXRpb25TdGFnZShuZXcgQ2RrcGlwZWxpbmVzRGVtb1N0YWdlKHRoaXMsICdQcm9kJywge1xuICAgICAgZW52OiB7IGFjY291bnQ6ICc1MDYyMjMyOTYwNzgnLCByZWdpb246ICd1cy1lYXN0LTEnIH1cbiAgICB9KSk7XG4gICAgfVxuICBcbn0iXX0=