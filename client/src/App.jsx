import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("en-US");
  const [voice, setVoice] = useState("");
  const [voices, setVoices] = useState([]);
  const [speaking, setSpeaking] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [status, setStatus] = useState("");

  // Load browser voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices =
        window.speechSynthesis.getVoices();

      const filteredVoices = availableVoices.filter(
        (v) =>
          v.lang.startsWith(language.split("-")[0])
      );

      setVoices(filteredVoices);

      if (filteredVoices.length > 0) {
        setVoice(filteredVoices[0].name);
      } else {
        setVoice("");
      }
    };

    loadVoices();

    window.speechSynthesis.onvoiceschanged =
      loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [language]);

  // Word count
  const wordCount = text.trim()
    ? text.trim().split(/\s+/).length
    : 0;

  // Generate Speech
  const handleSpeak = async () => {
    if (!text.trim()) {
      setStatus("Please enter some text first! ✏️");
      return;
    }

    setStatus("Preparing your speech... ✨");

    try {
      const response = await fetch(
       "https://text-to-speech-iaye.onrender.com/api/tts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: text,
            language: language,
            voice: voice,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setStatus(data.message);
        return;
      }

      console.log("Backend response:", data);

      window.speechSynthesis.cancel();

      const speech =
        new SpeechSynthesisUtterance(text);

      speech.lang = language;
      speech.rate = speed;

      const selectedVoice = voices.find(
        (v) => v.name === voice
      );

      if (selectedVoice) {
        speech.voice = selectedVoice;
      }

      speech.onstart = () => {
        setSpeaking(true);
        setStatus("Speaking... 🔊");
      };

      speech.onend = () => {
        setSpeaking(false);
        setStatus("Speech completed! ⭐");
      };

      speech.onerror = () => {
        setSpeaking(false);
        setStatus("Something went wrong with the speech.");
      };

      window.speechSynthesis.speak(speech);

    } catch (error) {
      console.error("Backend error:", error);

      setSpeaking(false);
      setStatus("Unable to connect to the server. ⚠️");
    }
  };

  // Stop Speech
  const handleStop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
    setStatus("Speech stopped. ⏹️");
  };

  // Clear
  const handleClear = () => {
    window.speechSynthesis.cancel();

    setText("");
    setSpeaking(false);
    setStatus("");
  };

  return (
    <div className="app">

      {/* Animated stars */}

      <div className="stars">
        <span className="star star1">★</span>
        <span className="star star2">✦</span>
        <span className="star star3">★</span>
        <span className="star star4">✦</span>
        <span className="star star5">★</span>
        <span className="star star6">✦</span>
        <span className="star star7">★</span>
        <span className="star star8">✦</span>
        <span className="star star9">★</span>
        <span className="star star10">✦</span>
        <span className="star star11">★</span>
        <span className="star star12">✦</span>
      </div>

      {/* Clouds */}

      <div className="cloud cloud1">☁️</div>
      <div className="cloud cloud2">☁️</div>
      <div className="cloud cloud3">☁️</div>

      {/* Main Content */}

      <main className="page-content">

        {/* Project Badge */}

        <div className="project-badge">
          🌈 FUN LEARNING TOOL
        </div>

        {/* Main Card */}

        <section className="container">

          <div className="top-star">⭐</div>
          <div className="title-decoration">✨</div>

          <h1>Text to Speech</h1>

          <p className="subtitle">
            Turn your words into a voice! 🎤
          </p>

          <p className="intro">
            Type something below and let your browser
            read it aloud.
          </p>

          {/* Text Input */}

          <label>
            📝 Enter your text
          </label>

          <textarea
            value={text}
            onChange={(e) =>
              setText(e.target.value)
            }
            maxLength={500}
            placeholder="Type or paste your text here..."
          />

          <div className="counter">
            <span>
              Characters: {text.length}/500
            </span>

            <span>
              Words: {wordCount}
            </span>
          </div>

          {/* Language and Voice */}

          <div className="selection-area">

            <div className="field">

              <label>
                🌎 Language
              </label>

              <select
                value={language}
                onChange={(e) =>
                  setLanguage(e.target.value)
                }
              >
                <option value="en-US">
                  English
                </option>

                <option value="hi-IN">
                  Hindi
                </option>

                <option value="gu-IN">
                  Gujarati
                </option>

                <option value="ru-RU">
                  Russian
                </option>

                <option value="mr-IN">
                  Marathi
                </option>

                <option value="es-ES">
                  Spanish
                </option>

                <option value="fr-FR">
                  French
                </option>

                <option value="de-DE">
                  German
                </option>
              </select>

            </div>

            <div className="field">

              <label>
                🎤 Voice
              </label>

              <select
                value={voice}
                onChange={(e) =>
                  setVoice(e.target.value)
                }
              >

                {voices.length === 0 ? (

                  <option value="">
                    No voices available
                  </option>

                ) : (

                  voices.map((v, index) => (
                    <option
                      key={index}
                      value={v.name}
                    >
                      {v.name}
                    </option>
                  ))

                )}

              </select>

            </div>

          </div>

          {/* Speed */}

          <div className="speed-control">

            <label>
              🚀 Speaking Speed: {speed}x
            </label>

            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={speed}
              onChange={(e) =>
                setSpeed(
                  Number(e.target.value)
                )
              }
            />

            <div className="speed-labels">
              <span>🐢 0.5x</span>
              <span>⭐ 1x</span>
              <span>🚀 2x</span>
            </div>

          </div>

          {/* Buttons */}

          <div className="buttons">

            <button
              className="generate"
              onClick={handleSpeak}
            >
              {speaking
                ? "🔊 Speaking..."
                : "🔊 Generate Speech"}
            </button>

            <button
              className="stop"
              onClick={handleStop}
            >
              ⏹ Stop
            </button>

            <button
              className="clear"
              onClick={handleClear}
            >
              🧹 Clear
            </button>

          </div>

          {/* Status */}

          {status && (
            <div className="status">
              💬 {status}
            </div>
          )}

          <div className="footer-text">
            ✨ Let your words speak! ✨
          </div>

        </section>

        {/* Features */}

        <section className="features-section">

          <h2>
            🌟 What Can You Do?
          </h2>

          <div className="feature-grid">

            <div className="feature-card">
              <div className="feature-icon">
                🌎
              </div>
              <h3>Multiple Languages</h3>
              <p>
                Choose from different languages
                and explore new voices.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                🎤
              </div>
              <h3>Choose a Voice</h3>
              <p>
                Select an available voice
                from your browser.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                🚀
              </div>
              <h3>Change Speed</h3>
              <p>
                Make the speech slower or
                faster using the speed control.
              </p>
            </div>

          </div>

        </section>

        {/* How It Works */}

        <section className="how-section">

          <h2>
            💡 How It Works
          </h2>

          <div className="steps">

            <div className="step">
              <div className="step-number">
                1
              </div>

              <div>
                <h3>Type</h3>
                <p>
                  Enter your text in the box.
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">
                2
              </div>

              <div>
                <h3>Choose</h3>
                <p>
                  Select a language and voice.
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">
                3
              </div>

              <div>
                <h3>Listen</h3>
                <p>
                  Press Generate Speech and
                  listen to your text.
                </p>
              </div>
            </div>

          </div>

        </section>

        {/* About */}

        <section className="about-section">

          <h2>
            🧸 About This Project
          </h2>

          <p>
            This Text-to-Speech application converts
            written text into spoken words using the
            browser's Web Speech API. A Node.js and
            Express backend is used to receive and
            validate the text-to-speech request.
          </p>

        </section>

        {/* Footer */}

        <footer>
          <p>
            🌈 Text to Speech • Made for
            learning and creativity ✨
          </p>

          <span>
            Built with React • Node.js • Express
          </span>
        </footer>

      </main>

    </div>
  );
}

export default App;