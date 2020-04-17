import React, { PureComponent } from "react";
import Routes from "../routes";
class App extends PureComponent {

  render() {
    return <Routes />;
  }
}
export default App; // здесь передаём state в App и можем использовать в нём же, или в следующих компонентах
