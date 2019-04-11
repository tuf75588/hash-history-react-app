import React from "react";
import PropTypes from "prop-types";

class Loading extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired
  };
  static defaultProps = {
    text: "Loading"
  };
  state = {
    text: this.props.text
  };
  componentDidMount() {
    const stopper = this.props.text + "...";
    this.interval = setInterval(() => {
      this.state.text === stopper
        ? this.setState(() => ({
            text: this.props.text
          }))
        : this.setState(({ text }) => ({
            text: text + "."
          }));
    }, 200);
  }
  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return (
      <div className='container'>
        <h3 className='text-center'>{this.state.text}</h3>
      </div>
    );
  }
}

export default Loading;
