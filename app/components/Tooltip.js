var React = require('react');
var PropTypes = require('prop-types');
var withHover = require('./withHover');

function Tooltip({ text, children, hovering }) {
  return (
    <div className="hover-box">
      {hovering && <div className="hover-popup">{text}</div>}
      {children}
    </div>
  );
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  hovering: PropTypes.bool.isRequired
};

module.exports = withHover(Tooltip, 'hovering');
