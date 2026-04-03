export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: message }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    // 🔥 IN LOG RA ĐỂ XEM LỖI THẬT
    console.log("FULL RESPONSE:", JSON.stringify(data, null, 2));

    // ❌ Nếu API lỗi → trả lỗi thật ra frontend
    if (!response.ok) {
      return res.status(500).json({
        error: "Google API lỗi",
        detail: data
      });
    }

    if (!data.candidates) {
      return res.status(500).json({
        error: "Không có candidates",
        detail: data
      });
    }

    const reply = data.candidates[0].content.parts[0].text;

    return res.status(200).json({ reply });

  } catch (err) {
    return res.status(500).json({
      error: "Server crash",
      detail: err.message
    });
  }
}
