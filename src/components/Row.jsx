import React from 'react';

export default function Row ({ id, name, year, color, expandData }) {

  return (
    <tr style={{background: `${color}`}} onClick={()=>expandData({id})}>
        <td>{id}</td>
        <td>{name}</td>
        <td>{year}</td>
    </tr>
  )
}
