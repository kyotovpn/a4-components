import { useEffect, useState } from "react";

export default function Game(props) {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [phase, setPhase] = useState("ready");
  const [note, setNote] = useState("");
  function handleClick() {
    if (phase === "ready") {
      setPhase("playing");
    }
    setScore(score + 1);
  }
  async function handleSumbit(event) {
    event.preventDefault();
    if (note === "") return;

    let currentDate = new Date();
    let gamedate = currentDate.toDateString();

    await fetch("/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ score: score, note: note, date: gamedate }),
    });
    setScore(0);
    setTimeLeft(10);
    setPhase("ready");
    setNote("");
    props.onSubmitted();
  }

  useEffect(() => {
    if (phase !== "playing") return;

    const id = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(id);
  }, [phase]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setPhase("done");
    }
  }, [timeLeft]);

  return (
    <div className="nes-container with-title  clickerGame" id="gameScreen">
      <h2 id="timer">TIME LEFT: {timeLeft}</h2>
      <p id="scoreBoard">Score: {score}</p>

      {phase === "ready" && <h3 id="instructions"> click to start playing!</h3>}

      {phase !== "done" && (
        <button
          id="clicker"
          type="button"
          className="nes-btn is-primary"
          onClick={handleClick}
        >
          clicker
        </button>
      )}
      {phase === "done" && (
        <form id="scoreForm" onSubmit={handleSumbit}>
          <p>
            Username: <strong id="playerName">{props.user.username}</strong>
          </p>
          <label htmlFor="userNote"> Your note:</label>
          <textarea
            maxLength="25"
            id="userNote"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
          <button type="submit" id="sumbitScore">
            submit
          </button>
        </form>
      )}
      <a id="logoutButton" className="nes-badge" href="/logout">
        <span className="is-warning">Logout</span>
      </a>
    </div>
  );
}
