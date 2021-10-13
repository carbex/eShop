// Components
import Home from "./Pages/Home/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
// Styles
import { Wrapper } from "./App.styles";

const App: React.FC = () => {
  return (
    <Router>
      <Wrapper>
        <Route path="/" exact component={Home} />
      </Wrapper>
    </Router>
  );
};

export default App;
