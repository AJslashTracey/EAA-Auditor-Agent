import { Agent } from '@openserv-labs/sdk';
import { z } from 'zod';
import dotenv from 'dotenv';
import { getFeedback } from './EAASum.js';

dotenv.config();

const requiredEnvVars = ['OPENSERV_API_KEY', 'OPENAI_API_KEY'];
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        throw new Error(`${envVar} environment variable is required`);
    }
}


function isValidUrl(possibleUrl) {
    try {
        new URL(possibleUrl);
        return true;
    } catch (e) {
        return false;
    }
}

const agent = new Agent({
    systemPrompt: `You are an EAA compliance agent that checks websites for European Accessibility Act (EAA) compliance.
When asked to audit a website or create a plan, follow these steps:
1. If no valid URL is provided, ask the user for one.
2. Validate the URL.
3. If valid, run an EAA compliance check with getFeedback() and provide results.
4. If invalid, ask the user again for a properly formatted URL.

Always maintain context between messages and remember any previously provided URLs.`
});

agent.addCapability({
    name: 'auditWebsite',
    description: 'Analyze EAA compliance for a website',
    schema: z.object({
        url: z.string().describe('A valid URL for the website to be audited')
    }),
    async run({ args, action }, messages) {
        try {
            if (!isValidUrl(args.url)) {
                return `The value "${args.url}" is not a valid URL. Please provide a properly formatted URL (including http:// or https://).`;
            }

            const feedbackResults = await getFeedback(args.url);

            if (feedbackResults) {
                return `EAA Compliance Analysis Complete!\n\n${feedbackResults}`;
            } else {
                return `No feedback returned. Please verify the site is reachable.`;
            }
        } catch (error) {
            return `Error analyzing website: ${error.message}`;
        }
    }
});

agent.respondToChat = async function(action) {
    const lastMessage = action.messages[action.messages.length - 1].message.toLowerCase();

    const urlMatch = lastMessage.match(/(https?:\/\/[^\s]+)/i);

    if (urlMatch) {
        await this.handleToolRoute({
            params: { toolName: 'auditWebsite' },
            body: {
                args: { url: urlMatch[0] },
                action,
                messages: action.messages
            }
        });
    } else if (lastMessage.includes('plan') || lastMessage.includes('analyze') || lastMessage.includes('audit')) {
        await this.sendChatMessage({
            workspaceId: action.workspace.id,
            agentId: action.me.id,
            message: "I'd be happy to audit a website for EAA compliance. Please provide the URL (including http:// or https://)."
        });
    } else {
        await this.sendChatMessage({
            workspaceId: action.workspace.id,
            agentId: action.me.id,
            message: "I need a valid URL to proceed. Please share a properly formatted URL (including http:// or https://)."
        });
    }
};

agent.doTask = async function(action) {
    const task = action.task;

    if (!task) {
        console.log("[doTask] No task found in action:", JSON.stringify(action));
        return;
    }

    console.log("[doTask] Processing task ID:", task.id);

    try {
        await this.updateTaskStatus({
            workspaceId: action.workspace.id,
            taskId: task.id,
            status: 'in-progress'
        });

        if (task.humanAssistanceRequests && task.humanAssistanceRequests.length > 0) {
            const lastRequest = task.humanAssistanceRequests[task.humanAssistanceRequests.length - 1];
            const responseText = lastRequest?.humanResponse;

            console.log("[doTask] Human assistance response text:", responseText);

            if (responseText) {
                const urlMatch = responseText.match(/(https?:\/\/[^\s]+)/i);

                if (urlMatch) {
                    console.log("[doTask] Processing URL from human assistance:", urlMatch[0]);
                    const feedbackResults = await getFeedback(urlMatch[0]);
                    
                    await this.completeTask({
                        workspaceId: action.workspace.id,
                        taskId: task.id,
                        output: `EAA Compliance Analysis Results:\n\n${feedbackResults}`
                    });
                    return;
                }
            }
        }

        // Check task.input for a URL
        let urlMatch;
        if (task.input) {
            urlMatch = task.input.match(/(https?:\/\/[^\s]+)/i);
        }

        if (urlMatch) {
            console.log("[doTask] Processing URL from task input:", urlMatch[0]);
            const feedbackResults = await getFeedback(urlMatch[0]);

            await this.completeTask({
                workspaceId: action.workspace.id,
                taskId: task.id,
                output: `EAA Compliance Analysis Results:\n\n${feedbackResults}`
            });
        } else {
            console.log("[doTask] No valid URL found, requesting human assistance");
            await this.requestHumanAssistance({
                workspaceId: action.workspace.id,
                taskId: task.id,
                type: 'text',
                question: "⚠️ I need a valid URL to proceed.\n\n💡 Please provide a properly formatted URL including the protocol, e.g. `https://example.com`.",
                agentDump: {
                    conversationHistory: action.messages,
                    expectedFormat: "A valid URL (including http:// or https://).",
                    processResponse: true
                }
            });
            console.log("[doTask] Human assistance request sent for task:", {
                taskId: task.id,
                workspaceId: action.workspace.id
            });
        }
    } catch (error) {
        console.error("[doTask] Error processing task:", {
            taskId: task.id,
            error: error.message,
            stack: error.stack
        });

        await this.markTaskAsErrored({
            workspaceId: action.workspace.id,
            taskId: task.id,
            error: `Error: ${error.message}`
        });
    }
};

agent.start()
    .then(() => {
        console.log(`EAA Compliance Agent running on port ${process.env.PORT || 8080}`);
    })
    .catch(error => {
        console.error("Error starting EAA compliance agent:", error.message);
        process.exit(1);
    });
