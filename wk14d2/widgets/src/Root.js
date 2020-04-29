import React from 'react';
import Clock from "./Clock";
import Folder from "./Folder";
import Weather from "./Weather";
import Auto from "./Auto";

const Root = folders => (
  <div>
    <Clock />
    <Folder folders={folders} />
    <Weather />
    <Auto />
  </div>
);

export default Root;
