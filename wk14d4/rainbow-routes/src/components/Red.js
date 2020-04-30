import React from 'react';
import { Route, NavLink, NavNavLink } from 'react-router-dom';

import Orange from './Orange';
import Yellow from './Yellow';

const Red = () => (
    <div>
        <h2 className="red">Red</h2>
        <NavLink exact to='/red' >Red only</NavLink>
        <NavLink to='/red/yellow' >Add yellow</NavLink>
        <NavLink to='/red/orange' >Add orange</NavLink>

        <Route path="/red/orange" component={Orange} />
        <Route path="/red/yellow" component={Yellow} />
    </div>
);

export default Red;
