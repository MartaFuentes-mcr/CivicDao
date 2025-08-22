import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

const openaiApiKey = process.env.OPENAI_API_KEY;
if (!openaiApiKey) {
  // Log a warning early to help local setup
  console.warn('WARNING: OPENAI_API_KEY is not set. Set it in server/.env');
}

const openai = new OpenAI({ apiKey: openaiApiKey });

app.get('/health', (req, res) => {
  res.json({ ok: true, status: 'healthy' });
});

// Minimal proxy for Responses API
app.post('/api/generate-story', async (req, res) => {
  try {
    const { prompt, model } = req.body || {};
    const finalModel = model || 'gpt-5';
    const input = prompt && String(prompt).trim().length > 0
      ? String(prompt)
      : 'Write a short bedtime story about a unicorn.';

    // Call OpenAI Responses API
    const response = await openai.responses.create({
      model: finalModel,
      input
    });

    // Prefer the convenience field when available
    const outputText = response.output_text
      || (Array.isArray(response.output)
          ? response.output.map(o => {
              const firstContent = o.content && o.content[0];
              return firstContent && firstContent.text ? firstContent.text : '';
            }).join('\n').trim()
          : '');

    res.json({
      success: true,
      model: finalModel,
      story: outputText
    });
  } catch (error) {
    console.error('OpenAI proxy error:', error);
    const status = error.status || 500;
    res.status(status).json({
      success: false,
      error: {
        message: error.message || 'Unknown error',
        status
      }
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`OpenAI proxy running on http://localhost:${PORT}`);
});



