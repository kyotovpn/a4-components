export default function LoginScreen() {
  return (
    <div id="LoginScreen">
      <h3>Please login to play</h3>
      <a className="nes-badge" href="/auth/github">
        <span className="is-warning">Login with GitHub</span>
      </a>
    </div>
  );
}
