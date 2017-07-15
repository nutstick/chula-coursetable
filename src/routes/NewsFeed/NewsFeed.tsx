import * as cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as React from 'react';
import { compose, DefaultChildProps, graphql } from 'react-apollo';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router-dom';
import { Feed, Icon, Loader } from 'semantic-ui-react';
import { default as CourseTablePreview, ICourseTablePreview } from '../../components/CourseTablePreview';
import { setFloatingButtonDeactive } from '../../redux/ui/actions';

import * as COURSETABLEPREVIEWQUERY from './CourseTablePreviewQuery.gql';
import * as CREATECOURSETABLEMUTATION from './CreateCourseTableMutation.gql';
import * as elliot from './elliot.jpg';
import * as helen from './helen.jpg';
import * as image from './image.png';
import * as s from './NewsFeed.css';

import { ICourseTable } from '../../schema/types/CourseTable';
import { IUser } from '../../schema/types/User';

// TODO Use import
// tslint:disable-next-line:no-var-requires
const MdAdd = require('react-icons/lib/md/add');

namespace NewsFeed {
  export interface IProps extends React.Props<any> {
    formatMessage: intlShape;
  }

  export interface ICreateCourseTableMutation {
    onCreateCourseTable: () => void;
  }

  export interface ICoursetablePreviewQuery {
    me: IUser;
  }

  export type Props = DefaultChildProps<IProps, ICoursetablePreviewQuery>;
}

const messages = defineMessages({
  header: {
    id: 'home.header',
    defaultMessage: 'News feed',
    description: 'News feeds',
  },
  unname: {
    id: 'home.unname',
    defaultMessage: 'No name',
    description: 'No Coursetable Name',
  },
});

class NewsFeed extends React.Component<NewsFeed.Props> {
  public shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  public async componentWillMount() {
    if (this.context.store) {
      this.context.store.dispatch(setFloatingButtonDeactive());
    }
  }

  public render() {
    const { data: { me, error, loading }, formatMessage } = this.props;
    return (
      <div className={s.root}>
        <h3><FormattedMessage {...messages.header}/></h3>
        <Feed>
          <Feed.Event>
            <Feed.Label>
              <img src={elliot} />
            </Feed.Label>
            <Feed.Content>
              <Feed.Summary>
                <Feed.User>Chanathip Saetie</Feed.User> added you as a friend
                <Feed.Date>1 Hour Ago</Feed.Date>
              </Feed.Summary>
              <Feed.Meta>
                <Feed.Like>
                  <Icon name="like" />
                  4 Likes
                </Feed.Like>
              </Feed.Meta>
            </Feed.Content>
          </Feed.Event>

          <Feed.Event>
            <Feed.Label image={helen} />
            <Feed.Content>
              <Feed.Summary>
                <a>Jijy chanathip</a> added <a>2 new coursetable</a>
                <Feed.Date>4 days ago</Feed.Date>
              </Feed.Summary>
              <Feed.Extra images>
                <a><img src={image} /></a>
                <a><img src={image} /></a>
              </Feed.Extra>
              <Feed.Meta>
                <Feed.Like>
                  <Icon name="like" />
                  1 Like
                </Feed.Like>
              </Feed.Meta>
            </Feed.Content>
          </Feed.Event>
        </Feed>
      </div>
    );
  }
}

export default compose(
  injectIntl,
  withStyles(s),
  graphql<NewsFeed.ICreateCourseTableMutation, NewsFeed.Props>(CREATECOURSETABLEMUTATION, {
    props: ({ mutate }) => ({
      onCreateCourseTable: async () => {
        const coursetable = await mutate({});
        // TODO Redirect
      },
    }),
  }),
  graphql<NewsFeed.ICoursetablePreviewQuery, NewsFeed.Props>(COURSETABLEPREVIEWQUERY),
)(NewsFeed);
