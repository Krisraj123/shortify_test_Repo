const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");

 

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY)

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };


export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Write a script to generate a 30 seconds video on topic : Interesting historical story along with AI Image prompt in Realistic format for each scene and give me result in JSON format with ImagePrompt and contentText as field"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"video_script\": [\n    {\n      \"scene_number\": 1,\n      \"duration\": 5,\n      \"imagePrompt\": \"A realistic, wide shot of a bustling, ancient Roman marketplace during the day. Vendors are selling various goods, and people in togas are interacting. Sunlight illuminates the scene, casting long shadows.\",\n      \"contentText\": \"Imagine a Roman marketplace, vibrant with life. But beneath the surface, a secret was brewing...\"\n    },\n    {\n      \"scene_number\": 2,\n       \"duration\": 7,\n      \"imagePrompt\": \"A realistic, close-up shot of a humble Roman baker, his face covered in flour, carefully crafting a loaf of bread. The bread has a dark, almost burnt color. Warm light illuminates the area.\",\n      \"contentText\": \"This baker, not unlike others, was about to change history. He wasn't baking just bread; he was baking ergot...\"\n    },\n    {\n      \"scene_number\": 3,\n       \"duration\": 8,\n      \"imagePrompt\": \"A realistic, slightly blurry depiction of a large crowd of Romans during a public festival, they look confused and disturbed. Some look unwell with distorted facial expressions and movements. The atmosphere is strange and uneasy.\",\n      \"contentText\": \"Ergot, a fungus that causes hallucinations and fits. Its accidental inclusion in his bread… sparked a city-wide, bizarre and disturbing episode.\"\n    },\n    {\n       \"scene_number\": 4,\n        \"duration\": 10,\n      \"imagePrompt\": \"A realistic depiction of Roman senators looking concerned and perplexed in their senate chamber. They are discussing frantically, with scrolls and documents spread across a large table. Light is coming from candles.\",\n      \"contentText\": \"Senators struggled to understand the mass confusion and erratic behaviors. Was it divine punishment? A revolt? It took years to trace it back to a simple loaf of bread.\"\n    }\n  ]\n}\n```\n"},
          ],
        },
      ],
    });

