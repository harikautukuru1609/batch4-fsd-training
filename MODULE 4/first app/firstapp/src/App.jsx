import Header from "./components/Header";
import ClassHeader from "./components/ClassHeader";
import Counter from "./components/Counter";
import LikesDislikes from "./components/LikesDislikes";

function App() {
  return (
    <div className="container">

      <Header />

      <hr />

      <ClassHeader />

      <hr />

      <Counter />

      <hr />

      <LikesDislikes />

    </div>
  );
}

export default App;