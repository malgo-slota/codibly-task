import React from 'react';
import './modal.scss';

export default function Modal ( {id, name, year, pantone, color, handleClose }) {
    
  return (
    <div className="modal">
        <button className='close' onClick={handleClose}>X</button>
        <div className="content">
            <div>
                <span>ID</span>
                <span>{id}</span>
            </div>
            <div>
                <span>Name</span>
                <span>{name}</span>
            </div>
            <div>
                <span>Year</span>
                <span>{year}</span>
            </div>
            <div>
                <span>Pantone</span>
                <span>{pantone}</span>
            </div>
            <div>
                <span>Color</span>
                <span style={{background: color}}>{color}</span>
            </div>
        </div>
    </div>
  )
}