#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkpipelinesDemoPipelineStack} from '../lib/cdk-pipeline-stack';

const app = new cdk.App();
new CdkpipelinesDemoPipelineStack(app, 'CdkpipelinesDemoPipelineStack', {
  env: { region:'us-east-1',  account:'506223296078'},
});

app.synth();



