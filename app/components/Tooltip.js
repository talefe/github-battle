var React = require('react');
var PropTypes = require('prop-types');

class Tooltip extends React.Component {
  state = {
    hovering: false
  };
  mouseOver = () => {
    this.setState({ hovering: true });
  };
  mouseOut = () => {
    this.setState({ hovering: false });
  };
  render() {
    return (
      <div
        onMouseOver={this.mouseOver}
        onMouseOut={this.mouseOut}
        className="hover-box"
      >
        {this.state.hovering && (
          <div className="hover-popup">{this.props.text}</div>
        )}
        {this.props.children}
      </div>
    );
  }
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired
};

module.exports = Tooltip;
