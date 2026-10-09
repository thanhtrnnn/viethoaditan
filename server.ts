import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

// Khởi tạo Gemini client server-side theo hướng dẫn chuẩn SDK
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Endpoint thẩm định văn hóa & phong cách Việt phục
app.post('/api/gemini/evaluate', async (req, res) => {
  try {
    const { outfit_state, cultural_rules } = req.body;

    if (!outfit_state) {
      return res.status(400).json({ error: 'Thiếu outfit_state' });
    }

    if (!ai) {
      // Nếu chưa có API key trong env, trả về thông báo gián đoạn
      return res.status(503).json({
        error: 'NO_API_KEY',
        message: 'Dịch vụ thẩm định tạm thời gián đoạn do chưa cấu hình khóa API.',
      });
    }

    const systemInstruction = `Bạn là chuyên gia thẩm định văn hóa và phong cách Việt phục của dự án "Việt Hoa Di Tân".
Nhiệm vụ của bạn là thẩm định bộ phối Áo ngũ thân theo các nguyên tắc văn hóa di sản:
1. Bạn CHỈ ĐƯỢC PHÉP đối chiếu dựa trên tập luật văn hóa (cultural_rules) được cung cấp trong lời nhắc. Tuyệt đối không tự suy diễn hoặc bịa đặt quy tắc không có bằng chứng.
2. Nếu dữ liệu không đủ để kết luận, gán culture_check.status = "insufficient_evidence".
3. culture_check.status CHỈ nhận 1 trong 3 giá trị: "ok", "needs_attention", "insufficient_evidence".
4. target của suggestion CHỈ nhận "color" hoặc "accessory".
5. action của suggestion CHỈ nhận "keep", "replace" hoặc "remove".
6. Đưa ra nhận xét phong cách ngắn gọn, súc tích (1-2 câu).`;

    const promptText = `
Dữ liệu bộ phối hiện tại:
${JSON.stringify(outfit_state, null, 2)}

Kho dữ liệu luật văn hóa đã xác minh:
${JSON.stringify(cultural_rules, null, 2)}

Hãy thẩm định bộ phối này theo đúng cấu trúc phản hồi quy chuẩn.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction,
        temperature: 0.2, // Nhiệt độ thấp cho kết quả thẩm định ổn định
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            schema_version: { type: Type.STRING },
            style_feedback: {
              type: Type.OBJECT,
              properties: {
                summary: { type: Type.STRING },
              },
              required: ['summary'],
            },
            culture_check: {
              type: Type.OBJECT,
              properties: {
                status: {
                  type: Type.STRING,
                  enum: ['ok', 'needs_attention', 'insufficient_evidence'],
                },
                findings: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      rule_id: { type: Type.STRING },
                      message: { type: Type.STRING },
                      evidence_ids: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                      },
                    },
                    required: ['rule_id', 'message'],
                  },
                },
              },
              required: ['status', 'findings'],
            },
            suggestions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  target: { type: Type.STRING, enum: ['color', 'accessory'] },
                  action: { type: Type.STRING, enum: ['keep', 'replace', 'remove'] },
                  value: { type: Type.STRING },
                  reason: { type: Type.STRING },
                },
                required: ['target', 'action', 'value', 'reason'],
              },
            },
            explanation: { type: Type.STRING },
          },
          required: [
            'schema_version',
            'style_feedback',
            'culture_check',
            'suggestions',
            'explanation',
          ],
        },
      },
    });

    const outputText = response.text;
    if (!outputText) {
      throw new Error('Mô hình không trả về nội dung');
    }

    let parsedJson: any;
    try {
      parsedJson = JSON.parse(outputText);
    } catch {
      return res.status(503).json({
        error: 'SERVICE_UNAVAILABLE',
        message: 'Dịch vụ thẩm định tạm thời gián đoạn do dữ liệu phản hồi chưa đúng định dạng.',
      });
    }

    return res.json(parsedJson);
  } catch (err: any) {
    console.error('Lỗi khi gọi Gemini API:', err);
    return res.status(503).json({
      error: 'SERVICE_UNAVAILABLE',
      message: 'Dịch vụ thẩm định tạm thời gián đoạn do hệ thống đang xử lý lượng yêu cầu cao.',
    });
  }
});

// Tích hợp Vite dev middleware
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Việt Hoa Di Tân server running at http://0.0.0.0:${port}`);
  });
}

startServer();
