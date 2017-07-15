import * as cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as React from 'react';
import { compose, DefaultChildProps, graphql } from 'react-apollo';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import { default as CourseTablePreview, ICourseTablePreview } from '../../components/CourseTablePreview';
import { setFloatingButtonDeactive } from '../../redux/ui/actions';

import * as COURSETABLEPREVIEWQUERY from './CourseTablePreviewQuery.gql';
import * as s from './CourseTablesPage.css';
import * as CREATECOURSETABLEMUTATION from './CreateCourseTableMutation.gql';

import { ICourseTable } from '../../schema/types/CourseTable';
import { IUser } from '../../schema/types/User';

// TODO Use import
// tslint:disable-next-line:no-var-requires
const MdAdd = require('react-icons/lib/md/add');

namespace CourseTablesPage {
  export interface IProps extends React.Props<any> {
    formatMessage: intlShape;
  }

  export interface ICreateCourseTableMutation {
    onCreateCourseTable: () => void;
  }

  export interface ICoursetablePreviewQuery {
    me: IUser;
  }

  export type Props = DefaultChildProps<IProps & ICreateCourseTableMutation, ICoursetablePreviewQuery>;
}

const messages = defineMessages({
  header: {
    id: 'home.header',
    defaultMessage: 'My Coursetables',
    description: 'View all Coursetable',
  },
  unname: {
    id: 'home.unname',
    defaultMessage: 'No name',
    description: 'No Coursetable Name',
  },
});

class CourseTablesPage extends React.Component<CourseTablesPage.Props> {
  constructor(props) {
    super(props);
  }

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
        <div className={s.container}>
          {
            me ? <div className={s.wrap}>
              {
                me.coursetables.edges.map((item) => (
                <Link
                  key={item.node._id}
                  className={s.item}
                  to={`coursetable/${item.node._id}`}
                >
                  <CourseTablePreview className={s.courseTable} {...item.node} />
                  <div className={s.itemContent}>
                    <h3>
                      {item.node.name || (formatMessage && formatMessage(messages.unname)) || 'No name'}
                    </h3>
                  </div>
                </Link>
                ))
              }
              <a
                className={cx(s.addCourseTable, s.item)}
                onClick={this.props.onCreateCourseTable.bind(this)}
              >
                <div className={s.addCourseRoot}>
                  <div className={s.fixAspect}></div>
                  <div className={s.content}>
                    <MdAdd size={36} />
                  </div>
                </div>
              </a>
            </div> : <div className={s.loading}><Loader active inline /></div>
          }
        </div>
      </div>
    );
  }
}

export default compose(
  injectIntl,
  withStyles(s),
  graphql<CourseTablesPage.ICreateCourseTableMutation, CourseTablesPage.Props>(CREATECOURSETABLEMUTATION, {
    props: ({ mutate }) => ({
      onCreateCourseTable: async () => {
        const coursetable = await mutate({});
      },
    }),
  }),
  graphql<CourseTablesPage.ICoursetablePreviewQuery, CourseTablesPage.Props>(COURSETABLEPREVIEWQUERY),
)(CourseTablesPage);
