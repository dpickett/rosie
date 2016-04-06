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
          <Link to="/trello/Annual Goals">Annual Goals</Link>
        </li>
      </ul>

      {children}
    </div>
  );
}
