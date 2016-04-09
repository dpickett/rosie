import React from 'react';
import NavigationItem from '../containers/navigation-item';
import { Link } from 'react-router';

export default function DefaultLayout({children}){
  return (
    <div>
      <div className="row">
        <div className="column align-center">
          <ul className="menu">
            <NavigationItem to="/" text="Today" />
            <NavigationItem to="/trello/Values" text="Values" />
            <NavigationItem to="/trello/Annual%20Goals" text="Annual Goals" />
            <NavigationItem to="/trello/Rocks" text="Rocks" />
            <NavigationItem to="/trello/This%20Week" text="This Week" />
            <NavigationItem to="/trello/Done" text="Done" />
          </ul>
        </div>
      </div>

      <div className="row">
        <div className="column align-center">
          {children}
        </div>
      </div>
    </div>
  );
}
