import * as cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as React from 'react';
import * as s from './List.css';

interface IListProps extends React.Props<any> {
  header: string;
  subHeader: string;
}

class List extends React.Component<IListProps, any> {
  public render() {
    return (
      <div className={cx(s.root)}>
        <div className={s.header}>
          {this.props.header}
        </div>
        <div className={s.subHeader}>
          {this.props.subHeader}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(List);
