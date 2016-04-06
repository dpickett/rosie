import React from 'react';
import { Link } from 'react-router';

export default function DefaultLayout({children}){
  return (
    <div>
      <ul>
        <li>
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

      {children}
    </div>
  );
}