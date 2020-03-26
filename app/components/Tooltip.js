import React from 'react';
import PropTypes from 'prop-types';
import useHover from '../hooks/useHover';

function Tooltip({ text, children }) {
  const [hovering, attrs] = useHover();

  return (
    <div className='hover-box' {...attrs}>
      {hovering && <div className='hover-popup'>{text}</div>}
      {children}
    </div>
  );
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired
};

export default Tooltip;
