import * as cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import * as s from './TimeInterval.css';

const messages = defineMessages({
  about: {
    id: 'navigation.about',
    defaultMessage: 'About',
    description: 'About link in header',
  },
  contact: {
    id: 'navigation.contact',
    defaultMessage: 'Contact',
    description: 'Contact link in header',
  },
  login: {
    id: 'navigation.login',
    defaultMessage: 'Log in',
    description: 'Log in link in header',
  },
  or: {
    id: 'navigation.separator.or',
    defaultMessage: 'or',
    description: 'Last separator in list, lowercase "or"',
  },
  signup: {
    id: 'navigation.signup',
    defaultMessage: 'Sign up',
    description: 'Sign up link in header',
  },
});

export interface ITimeInterval {
  start: number;
  end: number;
  size?: number;
  position?: number;
  maxTime?: number;
};

class TimeInterval extends React.Component<ITimeInterval, void> {
  render() {
    // Extract variable
    const { start, end, size, position } = this.props;
    let { maxTime } = this.props;

    // Set time range of showed timetable
    // 8:00 = 8 * 60 = 480
    // 16:00 = 16 * 60 = 960
    // 21:00 = 21 * 60 = 1260
    const minTime = 480;
    maxTime = maxTime > 960 ? 1260 : 960;

    const customStyle = {
      left: `${(start - minTime) * 100 / (maxTime - minTime)}%`,
      width: `${(end - start) * 100 / (maxTime - minTime)}%`,
      height: `calc(${100 / (size || 1)}%)`,
      top: `${(position - 1 || 0) * 100 / (size || 1)}%`,
    };
    return (
      <div className={s.root} style={customStyle} />
    );
  }
}

export default withStyles(s)(TimeInterval);
