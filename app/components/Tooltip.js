import React from 'react';
import PropTypes from 'prop-types';
import Hover from './Hover';

function Tooltip({ text, children }) {
  return (
    <Hover
      render={hovering => (
        <div className='hover-box'>
          {hovering && <div className='hover-popup'>{text}</div>}
          {children}
        </div>
      )}
    />
  );
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired
};

export default Tooltip;
