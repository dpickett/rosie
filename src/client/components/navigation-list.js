import React, { Component } from 'react';
import NavigationItem from '../containers/navigation-item';

export default class NavigationList extends Component {
  renderList(){
    return NavigationList.destinations.map((destination) => {
      return (
        <NavigationItem key={destination.to}
          to={destination.to}
          text={destination.text}
          shuffle={destination.shuffle} />
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
    to: '/tomorrow',
    text: 'Tomorrow'
  },
  {
    to: "/trello/Values",
    text: "Values"
  },
  {
    to: "/trello/Weekly%20Goals",
    text: "Weekly Goals",
    shuffle: true
  },
  {
    to: "/trello/Rocks",
    text: "Rocks",
    shuffle: true
  },
  {
    to: "/trello/Annual%20Goals",
    text: "Annual Goals",
    shuffle: true
  },
  {
    to: "/trello/This%20Week",
    text: "This Week",
    shuffle: true
  },
  {
    to: "/trello/Done",
    text: "Done",
    shuffle: true
  }
];
