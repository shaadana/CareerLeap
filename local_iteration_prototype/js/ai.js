const GEMINI_API_KEY = // retrieve from .env file;
const MODEL_NAME = "gemini-2.5-flash";

const AI = {
    async call(prompt, systemInstruction = "") {
        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        contents: [
                            {
                                parts: [{ text: prompt }],
                            },
                        ],
                        systemInstruction: {
                            parts: [{ text: systemInstruction }],
                        },
                    }),
                }
            );

            if (!response.ok) {
                const error = await response.json();
                console.error("Gemini API Error:", error);
                throw new Error(error.error?.message || "Failed to call Gemini API");
            }

            const data = await response.json();
            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error("AI Call failed:", error);
            return null;
        }
    },

    parseJSON(text) {
        if (!text) return null;
        try {
            // Find the first { and last } to extract JSON even if wrapped in text
            const firstBrace = text.indexOf("{");
            const lastBrace = text.lastIndexOf("}");

            if (firstBrace === -1 || lastBrace === -1) {
                console.error("No JSON braces found in response:", text);
                return null;
            }

            let jsonStr = text.substring(firstBrace, lastBrace + 1);

            // Remove + signs before numbers in JSON values only (not in strings)
            // Matches: ": +15" or ": +15.5" but not inside quoted strings
            jsonStr = jsonStr.replace(/:\s*\+(\d+\.?\d*)/g, ": $1");

            return JSON.parse(jsonStr);
        } catch (e) {
            console.error("Failed to parse AI JSON:", e, text);
            return null;
        }
    },

    // Specific Agent Prompts
    prompts: {
        diagnostic: {
            system: `You are the Career Leap Diagnostic Agent. Your goal is to have a thoughtful, supportive dialogue with a teen (12-18) to understand their skills, interests, and goals. Ask adaptive follow-up questions one at a time. Be emotionally intelligent. Output format should be JSON if finalizing an analysis, or plain text for conversation.`,
        },
        simulator: {
            system: `You are the BitLife-style Career Simulator engine for Career Leap. Generate realistic, choice-based scenarios for a selected career path. Each stage should present a narrative and 3-4 choices with clear consequences.`,
        },
        cilo: {
            system: `You are Cilo, the persistent AI mentor for Career Leap. You are warm, intelligent, and supportive. Use person's profile context (Diagnostic results) to offer advice.`,
        },
    },
};
