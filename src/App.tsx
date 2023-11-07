import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import Main from "@pages/Main";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Main />
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
