import React from 'react';
import { Link } from 'react-router';

export default function DefaultLayout({children}){
  return (
    <div>
      <div className="row">
        <div className="column align-center">
          <ul className="menu">
            <li className="active">
              <Link to="/">Today</Link>
            </li>
            <li>
              <Link to="/trello/Values">Values</Link>
            </li>
            <li>
              <Link to="/trello/Annual Goals">Annual Goals</Link>
            </li>
            <li>
              <Link to="/trello/Rocks">Rocks</Link>
            </li>
            <li>
              <Link to="/trello/This%20Week">This Week</Link>
            </li>
            <li>
              <Link to="/trello/Done">Done</Link>
            </li>
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
