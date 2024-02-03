import React from 'react';
import './style.css';
import { ImportIcon } from '@commercetools-uikit/icons';

const ImageUpload = ({ src, alt }) => {
  return (
    <div className="image-upload">
      <img src={src} alt={alt} className="payment-list-img" />
      <div
        style={{
          border: 'dotted #45BEAA',
          padding: '20px',
        }}
      >
        <ImportIcon style={{ fill: '#45BEAA' }} />
        <span style={{ color: '#45BEAA' }}>Upload a file</span>
      </div>
    </div>
  );
};

export default ImageUpload;
