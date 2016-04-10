import React from 'react';
import NavigationList from '../components/navigation-list';
import CycleControls from '../containers/cycle-controls';
import { Link } from 'react-router';

export default function DefaultLayout({children}){
  return (
    <div>
      <div className="row">
        <div className="column align-center">
          <NavigationList />
        </div>
      </div>

      <div className="row">
        <div className="column align-center">
          {children}
        </div>
      </div>

      <div className="row">
        <div className="column align-center">
          <CycleControls />
        </div>
      </div>
    </div>
  );
}
