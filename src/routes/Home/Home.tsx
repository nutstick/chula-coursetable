import * as cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router-dom';
import { default as CourseTablePreview, ICourseTablePreview } from '../../components/CourseTablePreview';
import { ICourseTable } from '../../components/share';
import { setFloatingButtonDeactive } from '../../redux/ui/actions';
import * as COURSETABLEPREVIEWQUERY from './CourseTablePreviewQuery.gql';
import * as CREATECOURSETABLEMUTATION from './CreateCourseTableMutation.gql';
import * as s from './Home.css';

// TODO Use import
// tslint:disable-next-line:no-var-requires
const MdAdd = require('react-icons/lib/md/add');

interface IHome extends React.Props<any> {
  onCreateCourseTable: () => void;
  coursetables: ICourseTable[];
  formatMessage: intlShape;
  data: {
    me: {
      coursetables: {
        edges: Array<{
          node: ICourseTable,
        }>,
        pageInfo: {
          endCursor: string,
        },
      },
    },
    error: any,
    loading: boolean;
  };
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

class Home extends React.Component<IHome, void> {
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
    console.log(injectIntl)
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
                  name={item.node.name || (formatMessage && formatMessage(messages.unname)) || 'No name'}
                >
                  <CourseTablePreview className={s.courseTable} {...item.node} />
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
            </div> : <div className={s.loading}>loading</div>
          }
        </div>
      </div>
    );
  }
}

export default injectIntl(compose(
  withStyles(s),
  graphql(CREATECOURSETABLEMUTATION, {
    props: ({ mutate }) => ({
      onCreateCourseTable: async () => {
        const coursetable = await mutate();
        // TODO Redirect
      },
    }),
  }),
  graphql(COURSETABLEPREVIEWQUERY),
)(Home));
