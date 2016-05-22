import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class NavigationItem extends Component {
  render(){
    let activeClass = this.props.currentLocation === this.props.to ? "active" : "inactive";
    let to = {
      pathname: this.props.to,
      state: { shuffle: this.props.shuffle }
    }
    return (
      <li key={this.props.text} className={activeClass}>
        <Link to={to}>{this.props.text}</Link>
      </li>
    );
  }
}

NavigationItem.contextTypes = {
  router: React.PropTypes.object
}

function mapStateToProps(state){
  return {
    currentLocation: state.router.locationBeforeTransitions.pathname
  }
}

export default connect(mapStateToProps, null)(NavigationItem);
