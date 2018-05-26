import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { counterActions } from '../store/modules/counter';
import Counter from '../components/Counter';
import { State } from '../store/modules';

interface CounterContainerProps {
    value: number;
    CounterActions: typeof counterActions;
}

class CounterContainer extends React.Component<CounterContainerProps> {
    public handleIncrease = () => {
        this.props.CounterActions.increment(3);
    };

    public handleDecrease = () => {
        this.props.CounterActions.decrement(5);
    };

    public render() {
        return (
            <Counter
                value={this.props.value}
                onIncrease={this.handleIncrease}
                onDecrease={this.handleDecrease}/>
        );
    }
}

export default connect(
    ({counter}: State) => ({
        value: counter.value,
    }),
    (dispatch) => ({
        CounterActions: bindActionCreators(counterActions, dispatch)
    })
)(CounterContainer);