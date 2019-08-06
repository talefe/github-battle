var React = require('react');
var PropTypes = require('prop-types');
var Hover = require('./Hover');

function Tooltip({ text, children }) {
  return (
    <Hover
      render={hovering => (
        <div className="hover-box">
          {hovering && <div className="hover-popup">{text}</div>}
          {children}
        </div>
      )}
    />
  );
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired
};

module.exports = Tooltip;
