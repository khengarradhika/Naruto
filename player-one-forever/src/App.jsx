import { useState, useEffect, useCallback, useRef } from "react";
import "./App.css";

/* ─── personalisation ─── */
const BOYFRIEND = "kutraaaa";
const NICKNAME  = "bachchu";

/* ─── quiz data ─── */
const questions = [
  {
    question: "Who is always right in this relationship? 🤨",
    options: [
      "Me, obviously",
      "Also me",
      "Let me think... me",
      "You, but don't get used to it",
    ],
    correct: 0,
    joke: "Correct! Your intelligence is truly questionable. 😂",
  },
  {
    question: "What is your girlfriend's superpower? ✨",
    options: [
      "Reading minds",
      "Being cute and annoying simultaneously",
      "Stealing your food",
      "All of the above",
    ],
    correct: 3,
    joke: "Amazing! You have learned the ancient girlfriend lore. 💅",
  },
  {
    question: "What should you do when she says 'I'm fine'? 👀",
    options: [
      "Run away",
      "Ask what's wrong and listen",
      "Start playing video games",
      "Say 'okay' and sleep",
    ],
    correct: 1,
    joke: "Good answer. Your survival instincts are improving. ❤️",
  },
  {
    question: "What is your birthday reward? 🎁",
    options: [
      "A million dollars",
      "Unlimited pizza",
      "Unlimited love from me",
      "All of the above, obviously",
    ],
    correct: 2,
    joke: "You get unlimited love. The million dollars are still pending. 😂",
  },
  {
    question: "What's my favorite thing about you? 💖",
    options: [
      "Your smile",
      "Your bad jokes",
      "Everything, obviously",
      "Your face when you're sleepy",
    ],
    correct: 2,
    joke: "See? I love every single thing about you. No exceptions. 🥰",
  },
];

/* ─── letters data ─── */
const letters = [
  {
    icon: "🥹",
    title: "Open when you miss me",
    subtitle: "For the days when I'm not beside you",
    message:
      "Hey baby, if you miss me right now, imagine me giving you the biggest hug ever. Distance, busy days, or silly arguments cannot change how special you are to me. I'm always cheering for you. Sending you a thousand kisses. 💋",
  },
  {
    icon: "😂",
    title: "Open when you're annoyed with me",
    subtitle: "An extremely important legal document",
    message:
      "Dear boyfriend, unfortunately, your girlfriend is cute, dramatic, and occasionally right. Your contract has no cancellation policy. Thank you for your cooperation. You may now hug me and stop pretending you're not smiling. 😂❤️",
  },
  {
    icon: "🌧️",
    title: "Open when you're sad",
    subtitle: "A little reminder from your person",
    message:
      "You don't have to be strong every single moment. It's okay to have difficult days and take things slowly. I'm proud of you for all the things you do, including the little things nobody else notices. You deserve kindness, rest, and so much love. I'm in your corner, always. 🫶",
  },
  {
    icon: "🤣",
    title: "Open when you need a laugh",
    subtitle: "Emergency boyfriend entertainment",
    message:
      "BREAKING NEWS: Local handsome man continues to be ridiculously cute despite being an absolute headache. Scientists recommend one hug, two kisses, and immediate contact with his girlfriend. Side effects include smiling like an idiot. 😂",
  },
  {
    icon: "💌",
    title: "Open on your birthday",
    subtitle: "The one I really want you to read",
    message:
      "Happy birthday, my love. ❤️ Out of all the people in this world, I'm so grateful that life brought you into mine. You make ordinary days feel special, make me laugh when I least expect it, and give me so many little moments to treasure. I hope this new year brings you happiness, peace, exciting adventures, and everything you've been wishing for. I hope I get to celebrate so many more birthdays with you. I love you more than this little website could ever explain. Today is your day, my favorite human. Never forget how loved you are. 💗",
  },
];

/* ═══════════════════════════════════════════════
   FLOATING-HEARTS  – ambient + burst
   ═══════════════════════════════════════════════ */
function FloatingHearts({ burst }) {
  const [hearts, setHearts] = useState([]);
  const idRef = useRef(0);

  /* continuous ambient hearts */
  useEffect(() => {
    const interval = setInterval(() => {
      const id = idRef.current++;
      setHearts((prev) => [
        ...prev.slice(-18),
        {
          id,
          x: Math.random() * 100,
          size: 12 + Math.random() * 18,
          dur: 4 + Math.random() * 5,
          delay: 0,
          emoji: ["♥", "💗", "💖", "💕", "✨"][Math.floor(Math.random() * 5)],
        },
      ]);
    }, 700);
    return () => clearInterval(interval);
  }, []);

  /* burst hearts on correct answer / page change */
  useEffect(() => {
    if (!burst) return;
    const batch = Array.from({ length: 20 }, (_, i) => ({
      id: idRef.current++,
      x: 30 + Math.random() * 40,
      size: 16 + Math.random() * 22,
      dur: 2.5 + Math.random() * 3,
      delay: i * 0.06,
      emoji: ["♥", "💗", "💖", "💕", "🩷"][Math.floor(Math.random() * 5)],
    }));
    setHearts((prev) => [...prev, ...batch]);
  }, [burst]);

  return (
    <div className="floating-hearts" aria-hidden="true">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="fh"
          style={{
            left: `${h.x}%`,
            fontSize: `${h.size}px`,
            animationDuration: `${h.dur}s`,
            animationDelay: `${h.delay}s`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   CONFETTI BURST  – fires on the final page
   ═══════════════════════════════════════════════ */
function Confetti({ active }) {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    if (!active) return;
    const batch = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: [
        "#ff8dc7",
        "#b8a1ff",
        "#8ef2bf",
        "#ffc2e0",
        "#ffd700",
        "#ff6b9d",
        "#c084fc",
        "#67e8f9",
      ][Math.floor(Math.random() * 8)],
      size: 6 + Math.random() * 8,
      dur: 2 + Math.random() * 3,
      delay: Math.random() * 1.5,
      rotation: Math.random() * 360,
      drift: -30 + Math.random() * 60,
    }));
    setPieces(batch);
  }, [active]);

  if (!active) return null;

  return (
    <div className="confetti-layer" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.x}%`,
            width: `${p.size}px`,
            height: `${p.size * 1.4}px`,
            background: p.color,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
            "--drift": `${p.drift}px`,
            "--rotation": `${p.rotation}deg`,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   PIXEL CHARACTER  – walks across the bottom
   ═══════════════════════════════════════════════ */
function PixelCharacter() {
  const [pos, setPos] = useState(-10);
  const [flip, setFlip] = useState(false);
  const dirRef = useRef(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPos((prev) => {
        let next = prev + dirRef.current * 0.4;
        if (next > 105) {
          dirRef.current = -1;
          setFlip(true);
        }
        if (next < -10) {
          dirRef.current = 1;
          setFlip(false);
        }
        return next;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="pixel-character"
      style={{
        left: `${pos}%`,
        transform: flip ? "scaleX(-1)" : "scaleX(1)",
      }}
      aria-hidden="true"
    >
      <div className="pc-body">
        <div className="pc-head">
          <span className="pc-eye pc-eye-l" />
          <span className="pc-eye pc-eye-r" />
          <span className="pc-mouth" />
        </div>
        <div className="pc-torso" />
        <div className="pc-legs">
          <span className="pc-leg pc-leg-l" />
          <span className="pc-leg pc-leg-r" />
        </div>
        <span className="pc-heart">♥</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MINI-GAME: Catch the Hearts
   ═══════════════════════════════════════════════ */
function HeartCatchGame({ onComplete }) {
  const GAME_DURATION = 20;
  const GOAL = 12;
  const [caught, setCaught] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [fallingHearts, setFallingHearts] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [sparkles, setSparkles] = useState([]);
  const heartIdRef = useRef(0);
  const sparkIdRef = useRef(0);

  /* timer */
  useEffect(() => {
    if (gameOver) return;
    if (timeLeft <= 0) {
      setGameOver(true);
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, gameOver]);

  /* spawn hearts */
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      const id = heartIdRef.current++;
      setFallingHearts((prev) => [
        ...prev.slice(-14),
        {
          id,
          x: 5 + Math.random() * 85,
          emoji: ["♥", "💗", "💖", "💕", "🩷"][Math.floor(Math.random() * 5)],
          dur: 2.8 + Math.random() * 2.5,
          size: 28 + Math.random() * 20,
          createdAt: Date.now(),
        },
      ]);
    }, 450);
    return () => clearInterval(interval);
  }, [gameOver]);

  const catchHeart = useCallback(
    (id, x, y) => {
      if (gameOver) return;
      setFallingHearts((prev) => prev.filter((h) => h.id !== id));
      setCaught((prev) => {
        const next = prev + 1;
        if (next >= GOAL) setGameOver(true);
        return next;
      });
      /* sparkle effect */
      const sid = sparkIdRef.current++;
      setSparkles((prev) => [
        ...prev.slice(-10),
        { id: sid, x, y },
      ]);
    },
    [gameOver]
  );

  const won = caught >= GOAL;

  return (
    <section className="panel game-panel minigame-panel">
      <p className="eyebrow">BONUS LEVEL · CATCH THE HEARTS</p>
      <h2>
        Catch <span className="pink">{GOAL}</span> hearts to unlock
        your love letters! 💕
      </h2>

      <div className="minigame-hud">
        <span>💗 {caught}/{GOAL}</span>
        <span>⏱️ {timeLeft}s</span>
      </div>

      <div className="minigame-progress-track">
        <div
          className="minigame-progress-fill"
          style={{ width: `${Math.min((caught / GOAL) * 100, 100)}%` }}
        />
      </div>

      {!gameOver ? (
        <div className="catch-area">
          {fallingHearts.map((h) => (
            <button
              key={h.id}
              className="falling-heart"
              style={{
                left: `${h.x}%`,
                fontSize: `${h.size}px`,
                animationDuration: `${h.dur}s`,
              }}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                catchHeart(h.id, rect.left + rect.width / 2, rect.top);
              }}
              aria-label="Catch this heart"
            >
              {h.emoji}
            </button>
          ))}
          {sparkles.map((s) => (
            <span
              key={s.id}
              className="catch-sparkle"
              style={{ left: s.x, top: s.y }}
            >
              ✨
            </span>
          ))}
          <p className="catch-hint">TAP THE HEARTS! 💕</p>
        </div>
      ) : (
        <div className="feedback minigame-result">
          {won ? (
            <>
              <div className="result-icon">🎉</div>
              <p className="pink bold">YOU CAUGHT THEM ALL!</p>
              <p>
                {caught} hearts caught! Your reflexes are as fast as my
                love for you. 💗
              </p>
              <button className="primary-button" onClick={onComplete}>
                UNLOCK YOUR LETTERS ♥
              </button>
            </>
          ) : (
            <>
              <div className="result-icon">🥺</div>
              <p className="pink bold">TIME'S UP!</p>
              <p>
                You caught {caught}/{GOAL} hearts. But don't worry — my
                love doesn't have a time limit. Try again! 💕
              </p>
              <button
                className="primary-button"
                onClick={() => {
                  setCaught(0);
                  setTimeLeft(GAME_DURATION);
                  setGameOver(false);
                  setFallingHearts([]);
                }}
              >
                TRY AGAIN ↻
              </button>
              <button
                className="text-button"
                onClick={onComplete}
              >
                Skip and see your letters anyway 💌
              </button>
            </>
          )}
        </div>
      )}
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SPARKLE TRAIL – follows cursor / touch
   ═══════════════════════════════════════════════ */
function SparkleTrail() {
  const [sparkles, setSparkles] = useState([]);
  const idRef = useRef(0);
  const lastRef = useRef(0);

  useEffect(() => {
    function spawn(x, y) {
      const now = Date.now();
      if (now - lastRef.current < 60) return;
      lastRef.current = now;
      const id = idRef.current++;
      setSparkles((prev) => [
        ...prev.slice(-12),
        {
          id,
          x,
          y,
          emoji: ["✦", "✧", "⋆", "♥"][Math.floor(Math.random() * 4)],
        },
      ]);
    }
    function handleMouse(e) {
      spawn(e.clientX, e.clientY);
    }
    function handleTouch(e) {
      const t = e.touches[0];
      if (t) spawn(t.clientX, t.clientY);
    }
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("touchmove", handleTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("touchmove", handleTouch);
    };
  }, []);

  return (
    <div className="sparkle-trail" aria-hidden="true">
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="sparkle"
          style={{ left: s.x, top: s.y }}
        >
          {s.emoji}
        </span>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   STARS background
   ═══════════════════════════════════════════════ */
function StarField() {
  const [stars] = useState(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2,
      dur: 2 + Math.random() * 4,
      delay: Math.random() * 4,
    }))
  );

  return (
    <div className="star-field" aria-hidden="true">
      {stars.map((s) => (
        <span
          key={s.id}
          className="star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDuration: `${s.dur}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState("home");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [openedLetter, setOpenedLetter] = useState(null);
  const [heartBurst, setHeartBurst] = useState(0);

  /* ─── runaway button state for "no i do not want to play" ─── */
  const [noBtnOffset, setNoBtnOffset] = useState({ x: 0, y: 0 });
  const [noClickCount, setNoClickCount] = useState(0);
  const [noMsg, setNoMsg] = useState("");
  const lastNoActionRef = useRef(0);

  const handleNoAction = useCallback((e) => {
    if (e && e.preventDefault && e.type === "touchstart") {
      e.preventDefault();
    }
    const now = Date.now();
    if (now - lastNoActionRef.current < 160) return;
    lastNoActionRef.current = now;

    const isMobile = window.innerWidth < 600;
    const maxX = isMobile ? 35 : 150;
    const maxY = isMobile ? 65 : 105;

    setNoBtnOffset((prev) => {
      let nextX = (Math.random() * 2 - 1) * maxX;
      let nextY = (Math.random() * 2 - 1) * maxY;

      // Ensure it jumps a noticeable distance from current position
      if (Math.hypot(nextX - prev.x, nextY - prev.y) < 40) {
        nextX = prev.x > 0 ? -Math.abs(nextX) : Math.abs(nextX);
        nextY = prev.y > 0 ? -Math.abs(nextY) : Math.abs(nextY);
      }
      return { x: Math.round(nextX), y: Math.round(nextY) };
    });

    setNoClickCount((prev) => prev + 1);
    setNoMsg("option nthi brooo, rmvi to pdse jjjj");
    setHeartBurst((b) => b + 1);
  }, []);

  const question = questions[questionIndex];

  function changePage(next) {
    setPage(next);
    setHeartBurst((b) => b + 1);
    if (next === "home") {
      setNoBtnOffset({ x: 0, y: 0 });
      setNoMsg("");
      setNoClickCount(0);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function answerQuestion(index) {
    if (chosen !== null) return;
    setChosen(index);
    if (index === question.correct) {
      setScore((prev) => prev + 1);
      setHeartBurst((b) => b + 1);
    }
  }

  function nextQuestion() {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((prev) => prev + 1);
      setChosen(null);
    } else {
      changePage("minigame");
    }
  }

  function restartGame() {
    setQuestionIndex(0);
    setScore(0);
    setChosen(null);
    changePage("game");
  }

  return (
    <>
      <StarField />
      <FloatingHearts burst={heartBurst} />
      <SparkleTrail />
      <PixelCharacter />
      <Confetti active={page === "final"} />

      <main className="app-shell">
        <header className="topbar">
          <button className="brand" onClick={() => changePage("home")}>
            <span>♥</span> PLAYER 1: MY FOREVER
          </button>
          <span className="top-tag">A GAME MADE WITH LOVE</span>
        </header>

        {/* ─── HOME ─── */}
        {page === "home" && (
          <section className="hero panel" key="home">
            <div className="pixel-heart" aria-hidden="true">
              ♥
            </div>
            <p className="eyebrow">✦ hellooooo gadhedaaa ✦</p>
            <h1>
              HAPPYY HAPPYY BIRTHDAY,
              <br />
              <span>KUTRAAAA!</span>
            </h1>
            <p className="hero-copy">
              so are you ready bachchu to play my game ?
            </p>
            <div className="stats">
              <span>♥ INFINITE LOVE</span>
              <span>★ LEVEL: BIRTHDAY BOY</span>
            </div>

            <div className="hero-buttons">
              <button
                id="play-game-btn"
                className="primary-button glow-btn"
                onClick={() => changePage("game")}
              >
                PLAY GAME <span>▶</span>
              </button>

              <button
                id="no-play-btn"
                type="button"
                className="secondary-button runaway-btn"
                style={{
                  transform: `translate(${noBtnOffset.x}px, ${noBtnOffset.y}px)`,
                }}
                onClick={handleNoAction}
                onMouseEnter={handleNoAction}
                onTouchStart={handleNoAction}
              >
                no i do not want to play the game
              </button>
            </div>

            {noMsg && (
              <div key={noClickCount} className="no-message-bubble" role="alert">
                <span className="no-msg-emoji">😂</span>
                <p className="no-msg-text">{noMsg}</p>
              </div>
            )}

            <p className="tiny-note">WARNING: excessive cuteness ahead.</p>
          </section>
        )}

        {/* ─── QUIZ ─── */}
        {page === "game" && (
          <section className="panel game-panel" key="game">
            <p className="eyebrow">LEVEL 01 · THE BOYFRIEND TEST</p>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width: `${((questionIndex + 1) / questions.length) * 100}%`,
                }}
              />
            </div>
            <div className="game-meta">
              <span>
                QUESTION {questionIndex + 1}/{questions.length}
              </span>
              <span>★ {score} POINTS</span>
            </div>

            <h2>{question.question}</h2>

            <div className="answer-list">
              {question.options.map((option, index) => {
                let className = "answer-button";
                if (chosen !== null && index === question.correct)
                  className += " answer-correct";
                else if (chosen === index) className += " answer-wrong";
                return (
                  <button
                    key={option}
                    className={className}
                    onClick={() => answerQuestion(index)}
                    disabled={chosen !== null}
                  >
                    <span>{String.fromCharCode(65 + index)}.</span> {option}
                  </button>
                );
              })}
            </div>

            {chosen !== null && (
              <div className="feedback" role="status">
                <p>
                  {chosen === question.correct
                    ? "✨ CORRECT ANSWER!"
                    : "💗 NICE TRY, BIRTHDAY BOY!"}
                </p>
                {question.joke}
                <button className="primary-button" onClick={nextQuestion}>
                  {questionIndex === questions.length - 1
                    ? "NEXT LEVEL: CATCH THE HEARTS ♥"
                    : "NEXT QUESTION →"}
                </button>
              </div>
            )}

            <button className="text-button" onClick={restartGame}>
              ↻ Restart the game
            </button>
          </section>
        )}

        {/* ─── MINI-GAME ─── */}
        {page === "minigame" && (
          <HeartCatchGame
            key="minigame"
            onComplete={() => changePage("letters")}
          />
        )}

        {/* ─── LETTERS ─── */}
        {page === "letters" && (
          <section className="panel letters-panel" key="letters">
            <p className="eyebrow">LEVEL 03 · A LITTLE SOMETHING FOR YOU</p>
            <h1>
              OPEN WHEN
              <br />
              <span>YOU NEED ME 💌</span>
            </h1>
            <p className="hero-copy">
              You unlocked {score} out of {questions.length} bonus
              points. But the real prize is waiting in these envelopes.
            </p>

            <div className="letter-grid">
              {letters.map((letter, index) => (
                <button
                  className="letter-card"
                  key={letter.title}
                  onClick={() => setOpenedLetter(index)}
                >
                  <span className="envelope">{letter.icon}</span>
                  <strong>{letter.title}</strong>
                  <span className="letter-subtitle">{letter.subtitle}</span>
                  <span className="open-label">TAP TO OPEN ↗</span>
                </button>
              ))}
            </div>

            <button
              className="primary-button glow-btn"
              onClick={() => changePage("final")}
            >
              UNLOCK MY FINAL MESSAGE ♥
            </button>
          </section>
        )}

        {/* ─── FINAL ─── */}
        {page === "final" && (
          <section className="panel final-panel" key="final">
            <div className="pixel-heart">♥</div>
            <p className="eyebrow">🏆 ACHIEVEMENT UNLOCKED 🏆</p>
            <h1>
              YOU'RE MY
              <br />
              <span>FAVORITE PERSON.</span>
            </h1>

            <div className="final-letter">
              <p>To my favorite human,</p>
              <p>
                Happy birthday, {NICKNAME}. 🥹❤️ I made this little corner
                of the internet just for you because you deserve to feel
                special, not just today, but every day.
              </p>
              <p>
                Thank you for being part of my life, for all our laughs,
                all our memories, and all the little moments that mean
                more to me than you know.
              </p>
              <p>
                I hope your next chapter is full of beautiful surprises.
                And I hope I get to annoy you through all of them.
              </p>
              <p className="signature">Forever on your team,</p>
              <p className="signature">Your girl. ♥</p>
            </div>

            <button
              className="primary-button"
              onClick={() => changePage("home")}
            >
              ↻ PLAY AGAIN, BIRTHDAY BOY
            </button>
            <p className="tiny-note">Made with all my love, just for you.</p>
          </section>
        )}

        <footer>
          <span>MADE WITH ♥ JUST FOR YOU</span>
          <span>NO REFUNDS ON THIS LOVE</span>
        </footer>

        {/* ─── LETTER MODAL ─── */}
        {openedLetter !== null && (
          <div
            className="modal-backdrop"
            onClick={() => setOpenedLetter(null)}
          >
            <section
              className="letter-modal"
              role="dialog"
              aria-modal="true"
              aria-label={letters[openedLetter].title}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="close-button"
                onClick={() => setOpenedLetter(null)}
                aria-label="Close letter"
              >
                ✕
              </button>
              <div className="modal-icon">{letters[openedLetter].icon}</div>
              <p className="eyebrow">A LITTLE NOTE FROM ME TO YOU</p>
              <h2>{letters[openedLetter].title}</h2>
              <p className="modal-subtitle">
                {letters[openedLetter].subtitle}
              </p>
              <p className="letter-message">
                {letters[openedLetter].message}
              </p>
              <button
                className="primary-button"
                onClick={() => setOpenedLetter(null)}
              >
                SENDING YOU A HUG ♥
              </button>
            </section>
          </div>
        )}
      </main>
    </>
  );
}
