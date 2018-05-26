import * as React from 'react';
import CounterContainer from './containers/CounterContainer';
import ListContainer from './containers/ListContainer';

class App extends React.Component {
  public render() {
    return (
      <div>
        <CounterContainer/>
        <ListContainer/>
      </div>
    );
  }
}

export default App;
