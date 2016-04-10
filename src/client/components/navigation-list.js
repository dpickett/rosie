import React, { Component } from 'react';
import NavigationItem from '../containers/navigation-item';

export default class NavigationList extends Component {
  renderList(){
    return NavigationList.destinations.map((destination) => {
      return (
        <NavigationItem key={destination.to}
          to={destination.to}
          text={destination.text} />
      )
    });
  }
  render(){
    return (
      <div className="navigation-list">
        <ul className="menu">
          { this.renderList() }
        </ul>
      </div>
    );
  }
}

NavigationList.destinations = [
  {
    to: '/',
    text: 'Today'
  },
  {
    to: "/trello/Values",
    text: "Values"
  },
  {
    to: "/trello/Annual%20Goals",
    text: "Annual Goals"
  },
  {
    to: "/trello/Rocks",
    text: "Rocks"
  },
  {
    to: "/trello/This%20Week",
    text: "This Week"
  },
  {
    to: "/trello/Done",
    text: "Done"
  }
];
