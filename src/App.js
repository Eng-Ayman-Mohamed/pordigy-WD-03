import "./App.css";
import Board from "./Board";
function App() {
  return (
    <div className="app_container">
      <div className="header">
        <img className="logo" src={require("./logo.gif")} alt=""></img>
      </div>
      <Board />
    </div>
  );
}

export default App;
