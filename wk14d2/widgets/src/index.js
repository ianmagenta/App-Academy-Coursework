import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import './index.css';
import Root from './Root';

const folders = [
  { title: 'one', content: 'I am the first' },
  { title: 'two', content: 'Second folder here' },
  { title: 'three', content: 'Third folder here' }
];

ReactDOM.render(
  <React.StrictMode>
    <Root folders={folders} />
  </React.StrictMode>,
  document.getElementById('root')
);
