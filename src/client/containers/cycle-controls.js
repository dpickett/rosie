import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleNavCycling } from '../actions/index';
import _ from 'lodash';

import NavigationList from '../components/navigation-list';

class CycleControls extends Component {
  handleClick = (e) => {
    e.preventDefault();
    this.props.toggleNavCycling();
  }

  cycle = () => {
    let index = _.findIndex(NavigationList.destinations, (dest) => {
      return this.props.currentLocation.pathname === dest.to
    });
    let newIndex = index + 1;
    if(newIndex === NavigationList.destinations.length){
      newIndex = 0;
    }
    this.context.router.push(NavigationList.destinations[newIndex].to);
  }

  toggleInterval = () => {
    if(this.props.cycling){
      if(!this.interval){
        this.interval = setInterval(this.cycle, this.props.secondsPerItem * 1000);
      }
    }
    else {
      this.flushInterval()
    }
  }

  flushInterval(){
    if(this.interval){
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  componentWillUnmount(){
    this.flushInterval();
  }

  render(){
    this.toggleInterval();
    let buttonText = "Play";
    let buttonClass = "success"
    let icon = "fa-play";
    if(this.props.cycling){
      buttonText = "Pause";
      icon = "fa-pause";
      buttonClass = "alert";
    }
    return (
      <div className="cycle-controls">
        <a href="#" className={"button " + buttonClass} onClick={this.handleClick}>
          <i className={"fa fa-icon " + icon}></i>&nbsp;{buttonText}
        </a>
      </div>
    );

  }
}

CycleControls.contextTypes = {
  router: React.PropTypes.object
};

function mapStateToProps(state){
  return {
    cycling: state.navCycle.cycling,
    secondsPerItem: state.navCycle.secondsPerItem,
    currentLocation: state.router.locationBeforeTransitions
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({toggleNavCycling}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CycleControls);
