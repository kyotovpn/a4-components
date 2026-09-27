import { useState, useEffect } from "react";

import Header from "./components/Header";
import LoginScreen from "./components/LoginScreen";
import LeaderBoard  from "./components/LeaderBoard";
import Game from "./components/Game"



function App() {
  const [scores, setScores] = useState([]);
  const [user, setUser] = useState(null);

  function loadScores() {
  fetch("/getData")
    .then((response) => response.json())
    .then((json) => setScores(json));
}
  //W
  useEffect(()=>{
    loadScores();
    fetch("/me",{})
    .then((response) => response.json())
    .then((data) => data.loggedIn? setUser(data.user): setUser(null));
  },[]);
  

  return (
    <>
      <Header />

      <main>
        
        <LeaderBoard scores={scores} user={user} onChange = {loadScores}/>
        {user ?<Game user={user} onSubmitted={loadScores}/>: <LoginScreen />}
        

        
      </main>
    </>
  );
}

export default App;
