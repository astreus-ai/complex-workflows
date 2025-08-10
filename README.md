# Complex Workflows

This project demonstrates how to build sophisticated multi-agent workflows with advanced orchestration patterns using the Astreus AI framework.

## Features

- **Multi-Agent Coordination**: Specialized agents working together
- **Complex Dependencies**: Advanced task dependency management
- **Pipeline Orchestration**: Sophisticated workflow execution
- **Agent Specialization**: Different agents for different capabilities

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Edit the `.env` file and add your OpenAI API key:
   - Get your OpenAI API key: https://platform.openai.com/account/api-keys

## Running

```bash
npm run dev
```

## Project Structure

- `index.ts` - Complex workflow example
- `.env.example` - Environment variables template
- `package.json` - Project dependencies
- `tsconfig.json` - TypeScript configuration

## Multi-Agent Workflow Features

This example demonstrates:
- Creating specialized agents for different tasks
- Complex dependency chains and parallel execution
- Agent-specific task assignment
- Result aggregation across multiple agents

## Code Explanation

```typescript
import { Agent, Graph } from '@astreus-ai/astreus';

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
console.log(results.results[article].response);
```

## Advanced Orchestration

The complex workflow system provides:
1. **Agent Specialization**: Each agent optimized for specific tasks
2. **Parallel Execution**: Independent tasks run simultaneously
3. **Resource Management**: Efficient agent and compute utilization
4. **Error Recovery**: Robust failure handling and recovery

## Workflow Patterns

**Pipeline Pattern:**
- Sequential processing through specialized agents
- Each agent adds value to the output
- Linear dependency chain

**Fan-out/Fan-in Pattern:**
- One task spawns multiple parallel tasks
- Results aggregated back into single output
- Parallel processing optimization

**Conditional Branches:**
- Different execution paths based on results
- Dynamic workflow adaptation
- Smart routing and decision making

## Environment Variables

```bash
# Required
OPENAI_API_KEY=sk-your-openai-api-key-here

# Database for workflow persistence
DB_URL=sqlite://./astreus.db

```

## Use Cases

**Content Production:**
- Research → Analysis → Writing → Editing → Publishing
- Market analysis → Strategy → Content creation → Review

**Software Development:**
- Requirements → Design → Implementation → Testing → Deployment
- Bug triage → Investigation → Fix → Validation → Release

**Business Intelligence:**
- Data collection → Analysis → Insights → Recommendations → Reporting
- Customer feedback → Analysis → Action planning → Implementation

## Next Steps

You can extend this complex workflow with:
- Dynamic agent creation based on workload
- Real-time monitoring and intervention
- Custom orchestration algorithms
- Advanced error handling and retry logic

## More Information

- [Astreus AI Documentation](https://astreus.org/docs)
- [Graph Features](https://astreus.org/docs/framework/graph)
- [GitHub Repository](https://github.com/astreus-ai/astreus)