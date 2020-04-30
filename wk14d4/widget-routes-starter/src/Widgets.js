import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import Clock from "./Clock";
import Folder from "./Folder";
import Weather from "./Weather";
import Auto from "./Auto";

const Widgets = ({ folders, names }) => (
    <div>
        <h1>Widgets</h1>
        <nav>
            <NavLink exact to="/">Home</NavLink>
            <NavLink to="/clock">Clock</NavLink>
            <NavLink to="/folders">Folders</NavLink>
            <NavLink to="/weather">Weather</NavLink>
            <NavLink to="/auto">Auto</NavLink>
        </nav>
        <Switch>
            <Route path="/clock" component={Clock} />
            <Route path="/folders" render={() => <Folder folders={folders} />} />
            <Route path="/weather" component={Weather} />
            <Route path="/auto" render={() => <Auto names={names} />} />
            <Route exact path="/" render={() => <h1>Welcome to your widgets app!</h1>} />
            <Route path="/" render={() => <h1>404: Page not found</h1>} />
        </Switch>
    </div>
);

export default Widgets;
