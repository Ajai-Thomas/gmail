// This is a Netlify serverless function.
// It acts as a secure proxy to the Google Gemini API.

exports.handler = async function (event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // Get the user prompt and content from the request body
    const { userPrompt, content } = JSON.parse(event.body);
    
    // Get the secret API key from the environment variables set in the Netlify UI
    const geminiApiKey = process.env.GEMINI_API_KEY;

    if (!geminiApiKey) {
      throw new Error("API key is not set in the server environment.");
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`;

    const systemPrompt = `You are an expert data extraction assistant. Your task is to extract structured information from the provided text based on the user's request.
- Analyze the user's instruction to identify the data fields to extract.
- The JSON property names MUST be in double quotes and snake_case, derived from the user's instruction (e.g., "invoice number" becomes "invoice_number").
- The text may contain multiple distinct records. Process each one.
- Return a single, valid JSON array where each object in the array represents one extracted record.
- If a specific piece of information for a field cannot be found in a record, the value for that key should be an empty string "".
- Your entire response must be ONLY the JSON array. Do NOT include any explanatory text, markdown formatting (like \`\`\`json), comments, or any characters outside of the JSON array.`;
    
    const fullPrompt = `USER INSTRUCTION: "${userPrompt}"\n\nTEXT_TO_PROCESS: """${content}"""`;
    
    const payload = {
      contents: [{ role: "user", parts: [{ text: systemPrompt + "\n\n" + fullPrompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        maxOutputTokens: 8192
      }
    };

    // Call the Google Gemini API from the serverless function
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Gemini API Error:", errorBody);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `AI API request failed with status ${response.status}` })
      };
    }

    const result = await response.json();

    // Return the successful response to the frontend
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result)
    };

  } catch (error) {
    console.error('Error in serverless function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'An internal server error occurred.' })
    };
  }
};
