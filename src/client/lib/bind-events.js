import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchAgenda } from '../actions/index';

export default function(key, klass) {
  const mapDispatchToProps = function(dispatch) {
    return bindActionCreators({ fetchAgenda }, dispatch);
  }

  klass.prototype.fetchAgenda = function() {
    this.props.fetchAgenda(key,
      this.props.listTtlMinutes, this.props.refreshedAt);
  }

  klass.prototype.componentDidMount = function() {
    this.fetchAgenda()
  }

  klass.prototype.componentWillUpdate = function(nextProps, nextState) {
    this.fetchAgenda()
  }

  return connect((state) => { return state.events[key] },
    mapDispatchToProps)(klass)
}
