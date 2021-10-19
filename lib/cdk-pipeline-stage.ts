import { CfnOutput, Construct, Stage, StageProps } from '@aws-cdk/core';
import { HelloCdkStack } from './hello-cdk-stack';

/**
 * Deployable unit of web service app
 */
 export class CdkpipelinesDemoStage extends Stage {
    public readonly urlOutput: CfnOutput;
    
    constructor(scope: Construct, id: string, props?: StageProps) {
      super(scope, id, props);
  
      const service = new HelloCdkStack(this, 'WebService');
      
      // Expose HelloCdkStack's output one level higher
      this.urlOutput = service.urlOutput;
    }
  }