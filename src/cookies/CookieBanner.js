import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

export const OPTIONS = {
  TOP: 'top'
};

class CookieBanner extends Component {

  constructor(props) {
    super(props);
    this.accept.bind(this);

    this.state = {
      visible: true,
      style: {
        position: 'fixed',
        width: '100%',
        padding: '15px',
        background: '#000',
        color: 'white',
        left: '0',
        zIndex: '999',
        lineHeight: '30px',
        textAlign: 'left',
      },
      buttonStyle: {
        cursor: 'pointer',
        marginLeft: '20px',
        border: '0',
        background: '#386cfe',
        boxShadow: 'none',
        borderRadius: '0px',
        padding: '5px',
        color: 'white',
      },
    };
  }

  componentWillMount() {
    const { cookieName } = this.props;

    if (Cookies.get(cookieName) !== undefined) {
      this.setState({ visible: false });
    }
  }

  accept() {
    const { cookieName } = this.props;

    let domain = 'localhost';
    if (process.env.NODE_ENV === 'production') {
      domain = '*.utopian.io';
    }

    Cookies.set(cookieName, true, { domain, expires: 365 });

    if (Cookies.get(cookieName) !== undefined) {
      this.setState({ visible: false });
    }
  }

  render() {
    if (!this.state.visible) {
      return null;
    }

    const {
      location,
      style,
      buttonStyle,
      disableStyles,
      onAccept,
      buttonText,
    } = this.props;

    let myStyle = {};
    let myButtonStyle = {};

    if (disableStyles) {
      myStyle = Object.assign({}, style);
      myButtonStyle = Object.assign({}, buttonStyle);
    } else {
      myStyle = Object.assign({}, { ...this.state.style, ...style });
      myButtonStyle = Object.assign(
        {},
        { ...this.state.buttonStyle, ...buttonStyle },
      );
    }

    switch (location) {
      case OPTIONS.TOP:
        myStyle.top = '0';
        break;
      default:
        myStyle.top = '0';
        break;
    }

    return (
      <div className="cookieConsent" style={myStyle}>
        {this.props.children}
        <button
          style={myButtonStyle}
          onClick={() => {
            this.accept();
            onAccept();
          }}
        >
          {buttonText}
        </button>
      </div>
    );
  }
}

CookieBanner.propTypes = {
  location: PropTypes.oneOf(['top', 'bottom']),
  style: PropTypes.object,
  buttonStyle: PropTypes.object,
  children: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  disableStyles: PropTypes.bool,
  onAccept: PropTypes.func,
  buttonText: PropTypes.string,
  cookieName: PropTypes.string
};
CookieBanner.defaultProps = {
  disableStyles: false,
  location: OPTIONS.TOP,
  onAccept: () => {},
  cookieName: 'accept-cookies',
  buttonText: 'I accept cookies',
};

export default CookieBanner;
export { Cookies };
