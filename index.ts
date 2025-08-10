import { config } from 'dotenv';
import { Agent, Graph } from '@astreus-ai/astreus';

// Load environment variables
config();

async function main() {
  // Create specialized agents
  const researcher = await Agent.create({
    name: 'Researcher',
    model: 'gpt-4o',
    systemPrompt: 'You research topics thoroughly.'
  });

  const writer = await Agent.create({
    name: 'Writer', 
    model: 'gpt-4o',
    systemPrompt: 'You create engaging content.'
  });

  // Create workflow pipeline
  const pipeline = new Graph({
    name: 'content-pipeline',
    defaultAgentId: researcher.id
  });

  // Define workflow steps
  const research = pipeline.addTaskNode({
    prompt: 'Research AI trends in 2024',
    agentId: researcher.id
  });

  const article = pipeline.addTaskNode({
    prompt: 'Write an article based on the research',
    agentId: writer.id,
    dependencies: [research]
  });

  // Execute the workflow
  const results = await pipeline.run();
  console.log('Article completed:', results.results[article].response);
}

main().catch(console.error);