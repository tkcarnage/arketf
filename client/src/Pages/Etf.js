import React from 'react';
import { useParams } from 'react-router-dom';
import './Etf.css';

function Etf(props) {
  let { id } = useParams();

  return (
    <div>
      <div>{id}</div>
    </div>
  );
}

export default Etf;
