import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  if (req.method === "POST") {
    const { question, story } = req.body;

    if (!question || !story) {
      return res.status(400).json({ ok: false, message: "Domanda o racconto mancante" });
    }

    try {
      if (process.env.NEXT_PUBLIC_GEMINI_KEY) {
        const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `Domanda: ${question}\nRacconto: ${story}\nRisposta:`;

        const result = await model.generateContent(prompt);

        console.log("Risultato API:", result);

        if (!result.response || !result.response.candidates || result.response.candidates.length === 0) {
          return res.status(400).json({ ok: false, message: "Nessuna risposta disponibile dal modello AI." });
        }

        const output = result.response.candidates[0].content.parts[0].text;

        if (output) {
          res.status(200).json({ ok: true, answer: output });
        } else {
          res.status(400).json({ ok: false, message: "Errore nella risposta alla domanda" });
        }
      } else {
        res.status(400).json({ ok: false, message: "Chiave API mancante" });
      }
    } catch (e) {
      console.error("Errore nell'elaborazione della risposta:", e);
      res.status(500).json({ ok: false, message: "Errore durante la risposta alla domanda" });
    }
  } else {
    res.status(405).json({ message: "Metodo non gestito" });
  }
}
