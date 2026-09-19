const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        message: "Text-to-Speech server is running"
    });
});

// Text-to-Speech API
app.post("/api/tts", (req, res) => {
    const { text, language, voice } = req.body;

    if (!text || !text.trim()) {
        return res.status(400).json({
            success: false,
            message: "Text is required"
        });
    }

    if (text.length > 500) {
        return res.status(400).json({
            success: false,
            message: "Text cannot exceed 500 characters"
        });
    }

    if (!language) {
        return res.status(400).json({
            success: false,
            message: "Language is required"
        });
    }

    res.json({
        success: true,
        message: "Text received successfully",
        data: {
            text: text.trim(),
            language: language,
            voice: voice || null
        }
    });
});

// Voices API
app.get("/api/voices", (req, res) => {
    res.json({
        success: true,
        message: "Voice list endpoint is ready",
        data: {
            source: "Browser Web Speech API",
            note: "Available voices are provided by the user's browser."
        }
    });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});