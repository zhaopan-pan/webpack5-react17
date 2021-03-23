import React, { useState } from "react";
import ReactDOM from "react-dom";
import { hot } from "react-hot-loader/root";

function App() {
  const [haha, setHaha] = useState("111");
  return (
    <div>
      <div onClick={() => setHaha("22222222222")}>click</div>
      <span>{haha}</span>
    </div>
  );
}
hot(App);
const render = (Component) => {
  return ReactDOM.render(<Component />, document.getElementById("app"));
};
render(App);

if (module.hot) {
  module.hot.accept(App, () => {
    render(App);
  });
}
