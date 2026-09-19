# 🎙️ Text-to-Speech Web Application

A web-based Text-to-Speech application that converts written text into spoken audio directly in the browser. The application provides a simple and interactive interface where users can enter text, select a language and voice, adjust speaking speed, and control speech playback.

The project uses a React frontend, a Node.js + Express backend, and the browser's Web Speech API for speech synthesis.

---

## 🌐 Live Application

**Frontend:**  
https://text-to-speech-one-beta.vercel.app

**Backend:**  
https://text-to-speech-iaye.onrender.com

---

## 📌 Project Overview

The Text-to-Speech application allows users to enter written content and listen to it as speech.

The React frontend collects the user's text, selected language, voice, and other settings. The information is sent to the Node.js and Express backend through the `/api/tts` endpoint for validation.

After successful validation, the browser's Web Speech API generates the speech using the selected browser voice.

### Application Flow

```text
User
  ↓
React Frontend
  ↓
POST /api/tts
  ↓
Node.js + Express Backend
  ↓
Input Validation
  ↓
Browser Web Speech API
  ↓
Speech Output
