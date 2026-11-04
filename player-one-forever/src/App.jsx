import { useState, useEffect, useCallback, useRef } from "react";
import "./App.css";

/* ─── personalisation ─── */
const BOYFRIEND = "kutraaaa";
const NICKNAME  = "bachchu";

/* ─── quiz data ─── */
const questions = [
  {
    question: "Which is the place we visited most?",
    options: ["amts bus stop", "riverfront", "garden", "duekarty"],
    correct: 0, // A
  },
  {
    question: "Which food we eat most?",
    options: ["pizza", "chhole kulche", "waffle", "frankie"],
    correct: 1, // B
  },
  {
    question: "What thing we liked the most previously?",
    options: ["watching movie", "listing song", "playing game", "jamming at riverfront"],
    correct: 3, // D
  },
  {
    question: "What we eat when we met first time in colledge only you and me?",
    options: ["pizza", "burger", "chinices", "sev usal"],
    correct: 1, // B
  },
  {
    question: "What you gifted on my last birthday?",
    options: ["earings", "neckless", "kitchen", "bracelate"],
    correct: 3, // D
  },
];

/* ─── letters data ─── */
const letters = [
  {
    icon: "🥺",
    title: "Open when you miss me",
    subtitle: "For the days when I'm not beside you",
    message: `Missing me already? Wow, your taste is getting better. 😂❤️

Unfortunately, I'm not available for delivery, so please manage with my pictures for now. 😌

I know, I'm hard to forget.
Even Google can't find someone better. 🤭❤️

Take a deep breath. Close your eyes. Imagine me annoying you.
Feeling better? You're welcome! 😂`,
  },
  {
    icon: "😤",
    title: "Open when you're annoyed with me",
    subtitle: "An extremely important legal document",
    message: `First of all, calm down.

Secondly, you're probably overreacting.

Thirdly, I'm still cute, so you can't stay angry for long. 😌😂

Before you get angry, remember:
I'm always right. Even when I'm wrong. Especially when I'm wrong. 🤣❤️`,
  },
  {
    icon: "🌧️",
    title: "Open when you're sad",
    subtitle: "A little reminder from your person",
    message: `Hey, you! 🥺❤️

I know not every day is going to be perfect, but please don't forget how amazing you are.

And remember, you've got one crazy person who's always cheering for you. That's me! ❤️

Bad days are temporary, but my irritating presence in your life is permanent. 😂❤️

So smile a little, okay?
If today feels heavy, take a break.
You don't have to figure everything out right now.

Sending you unlimited hugs and one imaginary forehead kiss. 🫂❤️`,
  },
  {
    icon: "🤣",
    title: "Open when you need a laugh",
    subtitle: "Emergency boyfriend entertainment",
    message: `Breaking News! 🚨
A handsome boy has been found staring at his screen.
Investigation reveals he's missing his favourite headache. ME! 😂

Your daily reminder:
You're handsome, intelligent, talented and lucky.
Especially lucky because you have ME. 🤣

If life gives you lemons, make lemonade.
If life gives you problems, call me.`,
  },
  {
    icon: "💌",
    title: "Open on your birthday",
    subtitle: "The one I really want you to read",
    message: `Happy Birthday, old man! 😂❤️
Another year older, but don't worry, you're still my favourite idiot.
I hope this year brings you everything you've been working for, endless happiness and lots of reasons to smile.
And yes, you're stuck with me for another year. No cancellation policy! 🤭❤️

I'll give you 10 more problems to forget the first one. 😂
Today is the day the world received one more headache.
And somehow, that headache became my favourite person. 😂❤️

Happy Birthday! Never stop being you.

Dear Birthday Boy,
I wish you success, happiness, good health, unlimited money and a lifetime supply of patience.
Because dealing with me requires a LOT of it. 🤣❤️`,
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
                You caught {caught}/{GOAL} hearts. You must unlock all {GOAL} hearts to see your letters!
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
                RESTART ↻
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
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null));
  const [quizCompleted, setQuizCompleted] = useState(false);
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
  const currentAnswer = userAnswers[questionIndex];

  /* calculate score: +5 for correct, -5 for wrong */
  const score = userAnswers.reduce((total, ans, idx) => {
    if (ans === null) return total;
    return ans === questions[idx].correct ? total + 5 : total - 5;
  }, 0);

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
    if (currentAnswer !== null) return;
    const nextAnswers = [...userAnswers];
    nextAnswers[questionIndex] = index;
    setUserAnswers(nextAnswers);
    setHeartBurst((b) => b + 1);
  }

  function prevQuestion() {
    if (questionIndex > 0) {
      setQuestionIndex((prev) => prev - 1);
    }
  }

  function nextQuestion() {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((prev) => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  }

  function restartAll() {
    setQuestionIndex(0);
    setUserAnswers(Array(questions.length).fill(null));
    setQuizCompleted(false);
    setOpenedLetter(null);
    changePage("home");
  }

  return (
    <>
      <StarField />
      <FloatingHearts burst={heartBurst} />
      <SparkleTrail />
      <PixelCharacter />
      <Confetti active={page === "final"} />

      <main className="app-shell">
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
              aaj kaluu ka birthday haiiiiiiiii, jungleeee aaj 24 yearsss ka ho gayaaaa
            </p>

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
          </section>
        )}

        {/* ─── QUIZ QUESTIONS ─── */}
        {page === "game" && !quizCompleted && (
          <section className="panel game-panel" key="game">
            <p className="eyebrow">LEVEL 01</p>
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
                if (currentAnswer !== null) {
                  if (index === question.correct) {
                    className += " answer-correct";
                  } else if (currentAnswer === index) {
                    className += " answer-wrong";
                  }
                }
                return (
                  <button
                    key={option}
                    className={className}
                    onClick={() => answerQuestion(index)}
                    disabled={currentAnswer !== null}
                  >
                    <span>{String.fromCharCode(65 + index)}.</span> {option}
                  </button>
                );
              })}
            </div>

            {currentAnswer !== null && (
              <div className="feedback" role="status">
                <p>
                  {currentAnswer === question.correct
                    ? "ohhhh kaluuu ko pata thaaaaa"
                    : "seeee! I new it jungleeee ko nhi pata hogaaaa"}
                </p>
              </div>
            )}

            <div className="quiz-nav-buttons">
              <button
                type="button"
                className="secondary-button"
                onClick={prevQuestion}
                disabled={questionIndex === 0}
              >
                ← PREVIOUS
              </button>
              <button
                type="button"
                className="primary-button"
                onClick={nextQuestion}
                disabled={currentAnswer === null}
              >
                {questionIndex === questions.length - 1 ? "FINISH QUIZ ▶" : "NEXT →"}
              </button>
            </div>
          </section>
        )}

        {/* ─── QUIZ RESULT SCREEN ─── */}
        {page === "game" && quizCompleted && (
          <section className="panel game-panel quiz-result-panel" key="quiz-complete">
            <div className="pixel-heart" aria-hidden="true">
              ♥
            </div>
            <p className="eyebrow">✦ LEVEL 01 COMPLETED ✦</p>
            <div className="quiz-final-score">
              <span>FINAL SCORE: {score} POINTS</span>
            </div>
            <h2 className="quiz-love-message">
              Scoree jo bhiiiii hoooo , I will alwaysss love my kaluuuuuu
            </h2>
            <button
              className="primary-button glow-btn"
              onClick={() => changePage("minigame")}
            >
              NEXT LEVEL: CATCH THE HEARTS ▶
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
              Score: {score} points. But the real prize is waiting in these envelopes.
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
              <p>Happy birthday, bachchu. 🥹❤️</p>
              <p>
                I made this little corner of the internet just for you because you
                deserve to feel special, not just today, but every day.
              </p>
              <p>
                Thank you for being part of my life, for all our laughs, all our
                memories, and all the little moments that mean more to me than
                you know.
              </p>
              <p>
                And one thing I really want you to remember is that{" "}
                <strong>I'm not going anywhere.</strong> I'll always be here for
                you, standing beside you through every situation, every high and
                low, and every little battle life throws your way. So please,
                don't overthink things, okay? You don't have to figure everything
                out alone. You've got me, always. ❤️
              </p>
              <p>
                I hope your next chapter is full of beautiful surprises. And I
                hope I get to annoy you through all of them. 😂
              </p>
              <p className="signature">
                <strong>Forever on your team,</strong>
              </p>
              <p className="signature">
                <strong>Your girl. ♥</strong>
              </p>
            </div>

            <button
              className="primary-button glow-btn"
              onClick={restartAll}
            >
              PLAY AGAIN
            </button>
            <p className="tiny-note">Made with all my love, just for you.</p>
          </section>
        )}

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
