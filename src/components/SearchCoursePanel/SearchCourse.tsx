import * as cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Button, Dropdown, Icon, Input } from 'semantic-ui-react';
import SearchableCourseList from '../SearchableCourseList';
import * as s from './SearchCourse.css';

// TODO use import
// tslint:disable-next-line:no-var-requires
const MdArrowBack = require('react-icons/lib/md/arrow-back');

const messages = defineMessages({
  courseHeader: {
    id: 'searchcourse.header',
    defaultMessage: 'Search course',
    description: 'Search course',
  },
  searchInput: {
    id: 'searchcourse.input',
    defaultMessage: 'Type to search',
    description: 'Type search text to search field',
  },
});

interface ISearchCourseProps extends React.Props<any> {
  search: string;
  match: {
    params: {
      id: string,
    },
  };
}

interface ISearchCourseState {
  expanded?: boolean;
  text?: string;
  date?: string;
  start?: string;
  end?: string;
}

class SearchCourse extends React.Component<ISearchCourseProps, ISearchCourseState> {
  constructor(props, context) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  private onSearch(e, data) {
    this.setState({
      ...this.state,
      text: data.value,
    });
  }

  private onDateSelect(e, data) {
    this.setState({
      ...this.state,
      date: data.value,
    });
  }

  private onStartSelect(e, data) {
    this.setState({
      ...this.state,
      start: data.value,
    });
  }

  private onEndSelect(e, data) {
    this.setState({
      ...this.state,
      end: data.value,
    });
  }

  private onExpandToggle(e) {
    this.setState({
      ...this.state,
      expanded: !this.state.expanded,
    });
  }

  public render() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturnday'].map((d) => ({
      text: d,
      value: d,
    }));

    return (
      <div className={cx(s.root)}>
        <div className={s.wrap}>
          <div className={s.header}>
            <Link to={`/coursetable/${this.props.match.params.id}`} className={s.back}>
              <MdArrowBack size={24}></MdArrowBack>
            </Link>
            <p><FormattedMessage {...messages.courseHeader} /></p>
          </div>
          <div className={cx(s.header)}>
            <Input
              action={{ icon: 'search' }}
              placeholder="Search..." size="small"
              onChange={this.onSearch.bind(this)}
            />
          </div>
          { this.state.expanded &&
            <div className={cx(s.header, s.subHeader)}>
              <Dropdown className={s.dropdown} placeholder="Day" fluid upward={false} selection options={days} />
              <div>
                <Input
                  className={s.input}
                  placeholder="Start" size="small"
                />
                <Input
                  className={s.input}
                  placeholder="End" size="small"
                />
              </div>
            </div>
          }
          <Button className={s.button} basic onClick={this.onExpandToggle.bind(this)} size="mini">
            <Icon name={this.state.expanded ? 'angle double up' : 'angle double down'} />
          </Button>
          <SearchableCourseList text={this.state.text} match={this.props.match} />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(SearchCourse);
