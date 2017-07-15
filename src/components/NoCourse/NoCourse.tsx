import * as cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as React from 'react';
import { compose, DefaultChildProps, graphql } from 'react-apollo';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Card, Divider, Label } from 'semantic-ui-react';

// import 'semantic-ui-css/components/card.css';
// import 'semantic-ui-css/components/divider.css';
// import 'semantic-ui-css/components/label.css';
import * as s from './NoCourse.css';
import * as SUGGESTCOURSEGROUPQUERY from './SuggestCourseGroupQuery.gql';

import { IState } from '../../redux/IState';
import { ICourseGroup } from '../../schema/types/CourseGroup';
import { ICourseTableCourse } from '../../schema/types/CourseTable';
import { IUser } from '../../schema/types/User';

namespace NoCourse {
  export interface IProps extends React.Props<any> {
    id: string;
  }

  export interface ISuggestCourseGroupQuery {
    me: IUser;
  }

  export type Props = DefaultChildProps<IProps, ISuggestCourseGroupQuery>;
}

const messages = defineMessages({
  noCourse: {
    id: 'sidebar.courselist.nocourse',
    defaultMessage: 'No Course found.',
    description: 'No course found in coursetable',
  },
  addCourseNoResult: {
    id: 'sidebar.courselist.nocourse.addcoursenoresult',
    defaultMessage: 'Add some?',
    description: 'Add courses in coursetable',
  },
  or: {
    id: 'sidebar.courselist.nocourse.or',
    defaultMessage: 'or',
    description: 'Or',
  },
  suggest: {
    id: 'sidebar.courselist.nocourse.suggest',
    defaultMessage: 'Suggest course group',
    description: 'Suggest course group',
  },
  loading: {
    id: 'sidebar.courselist.nocourse.loading',
    defaultMessage: 'loading',
    description: 'Loading',
  },
});

const SuggestCourseGroup = ({ id, suggestCourseGroup }) => (
  <Link to={`/coursetable/${id}/coursegroup/${suggestCourseGroup._id}`}>
    <Card className={s.card}>
      <Card.Content className={s.content}>
        <Card.Header>
          {suggestCourseGroup.name}
        </Card.Header>
        <Card.Meta>
          {suggestCourseGroup.faculty} {suggestCourseGroup.department} {suggestCourseGroup.year}
        </Card.Meta>
        <Card.Description className={s.description}>
          <b>Consist of : </b>
          {suggestCourseGroup.courses.map((c) => `${c.courseID} ${c.name}`).join()}
        </Card.Description>
      </Card.Content>
    </Card>
  </Link>
);

class NoCourse extends React.Component<NoCourse.Props> {
  public render() {
    return (
      <div className={s.nocourse}>
        <FormattedMessage {...messages.noCourse} />
        <Link className={s.noCourseSearch} to={`/coursetable/${this.props.id}/search`}>
          <FormattedMessage {...messages.addCourseNoResult}/>
        </Link>
        <Divider horizontal>
          <FormattedMessage {...messages.or} />
        </Divider>
        <Label className={s.suggest} color="teal" ribbon>
          <FormattedMessage {...messages.suggest} />
        </Label>
        <div>
          {
            this.props.data.loading ? <FormattedMessage {...messages.loading} /> :
            this.props.data.me.suggestCourseGroup && <SuggestCourseGroup
              id={this.props.id}
              suggestCourseGroup={this.props.data.me.suggestCourseGroup}
            />
          }
        </div>
      </div>
    );
  }
}

export default compose(
  withStyles(s),
  graphql<NoCourse.ISuggestCourseGroupQuery, NoCourse.Props>(SUGGESTCOURSEGROUPQUERY),
)(NoCourse);
