import dotenv from "dotenv"
import pa11y from "pa11y";
import OpenAI from "openai";
export {getFeedback}

dotenv.config()

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});





async function getFeedback(url) {
    (async () => {
        try {
            const results = await pa11y(url);
            console.log(results);
            const response = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: "You are an accessibility expert. Analyze the provided accessibility audit results based on the European Accessibility Act (EAA) and WCAG 2.1 AA. Identify which issues require compliance fixes and which are best practices."
                    },
                    {
                        role: "user",
                        content: `Accessibility Audit Results: ${JSON.stringify(results)}`
                    }
                ],
                max_tokens: 2000,
                temperature: 0.7 
            });
            console.log(response.choices[0].message.content);
        } catch (error) {
            console.error("Accessibility audit failed:", error);
        }
    })();
    
}


