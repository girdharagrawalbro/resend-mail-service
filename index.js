import express from 'express';
import dotenv from 'dotenv';
import { Resend } from 'resend';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT || 5600);
const RESEND_API_KEY = process.env.RESEND_API_KEY || process.env.API;
const DEFAULT_FROM = process.env.RESEND_FROM || 'onboarding@resend.dev';
const DEFAULT_TO = process.env.RESEND_TO || 'girdharagrawalbro@gmail.com';

if (!RESEND_API_KEY) {
  console.error('[Resend] Missing RESEND_API_KEY (or API) in .env');
  process.exit(1);
}

const resend = new Resend(RESEND_API_KEY);

app.get('/health', (req, res) => {
  res.json({ success: true, service: 'resendmail', status: 'ok' });
});

app.post('/api/send-test', async (req, res) => {
  try {
    const result = await resend.emails.send({
      from: DEFAULT_FROM,
      to: DEFAULT_TO,
      subject: 'Hello World',
      html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
    });

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/send', async (req, res) => {
  try {
    const { from = DEFAULT_FROM, to, subject, html, text } = req.body || {};

    if (!to || !subject || (!html && !text)) {
      return res.status(400).json({
        success: false,
        message: 'to, subject and html or text are required'
      });
    }

    const result = await resend.emails.send({ from, to, subject, html, text });
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`[Resend] Service running on http://localhost:${PORT}`);
});
