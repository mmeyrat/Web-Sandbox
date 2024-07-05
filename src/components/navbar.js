import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

class navbar extends React.Component {
   render() {
      return (
         <div>
            <ul>
            <li>Earth3D</li>
            <li>KonamiCode</li>
            </ul>
            {this.props.children}
         </div>
      )
   }
}
export default navbar;