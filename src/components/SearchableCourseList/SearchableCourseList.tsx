import * as cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import { defineMessages, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as Redux from 'redux';
import { Accordion, Button, Checkbox, Label } from 'semantic-ui-react';
import { pushAddCourseAction } from '../../redux/action/actions';
import { IAction } from '../../redux/action/reducers';
import { IState } from '../../redux/IState';
import { ICourse, ICourseGroup, IEdge, ITeacher, ITimeInterval } from '../share';
import * as s from './SearchableCourseList.css';
import * as SEARCHCOURSEQUERY from './SearchCourseQuery.gql';

// TODO use import
// tslint:disable-next-line:no-var-requires
const MdArrowBack = require('react-icons/lib/md/arrow-back');

const messages = defineMessages({
});

interface IConnectionState {
  actions?: IAction[];
}

interface IConnectedDispatch {
  onAddCourseActionTrigger?: (coursetable: string, course, target) => void;
}

interface ISearchableCourseListProps extends React.Props<any> {
  text: string;
  search: Array<IEdge<ICourse | ICourseGroup>>;
  error: any;
  loading: boolean;
  match: {
    params: {
      id: string,
    },
  };
}

const CourseItem = ({ courseID, name, sectionNo }: { courseID: string, name: string, sectionNo?: number }) => (
  <div className={s.courseItem}>
    <div className={s.header}>{courseID}</div>
    <div className={s.subHeader}>{name}</div>
    <div className={s.section}>{sectionNo}</div>
  </div>
);

interface ISectionPageProps {
  index: number;
  teachers: ITeacher[];
  timeIntervals: ITimeInterval[];
  type: string;
  applied?: boolean;
  onApply?: (e) => void;
}

const SectionItem = ({ index, teachers, timeIntervals, type, applied, onApply }: ISectionPageProps) => {
  const colorType = type === 'gened' ? 'teal' : type === 'approved' ? 'red' : null;
  return (<div className={s.sectionItem}>
    <Checkbox className={s.checkBox} radio value={`${index}`} checked={applied} onChange={onApply} />
    <div className={s.sectionContent}>
      <div>
        <h4 className={s.sectionNo}>#{index}</h4>
        <span>{teachers && `Teacher: ${teachers}`}</span>
        <span>
          {timeIntervals.map(({ day, start, end }) => (
            <span key={`${day}:${start}:${end}`}>{day} {start} - {end}</span>
          ))}
        </span>
      </div>
      <Label className={s.tags} as="a" tag color={colorType} size="mini">{type}</Label>
    </div>
  </div>);
};

class SearchableCourseList extends
  React.Component<IConnectedDispatch & IConnectionState & ISearchableCourseListProps, void> {
  constructor(props) {
    super(props);
  }

  public render() {
    const renderPanels = this.props.search && this.props.search.filter((c) => (
      c.node.__typename === 'NormalCourse' ||
      c.node.__typename === 'GenedCourse' ||
      c.node.__typename === 'ApprovedCourse'
    ))
    .map((c) => (c.node as ICourse))
    .map((c) => ({
      key: `course-${c._id}`,
      title: (<CourseItem name={c.name} courseID={c.courseID} />),
      content: (
        <div>
          {c.sections.edges.map(({ node }) => (
            <SectionItem
              key={`${c._id} ${node._id}`}
              index={node.sectionNo}
              onApply={this.props.onAddCourseActionTrigger
                .bind(this, this.props.match.params.id, c._id, node._id)}
              teachers={node.teachers}
              timeIntervals={node.timeIntervals}
              type={node.type}
            />
          ))}
        </div>
      ),
    }));

    return (
      <div className={cx(s.root)}>
        {
          this.props.search && this.props.search.length ? <Accordion panels={renderPanels} styled fluid /> :
            this.props.text ? (<div className={s.text}>No results</div>) :
              (<div className={s.text}>Type to search...</div>)
        }
      </div>
    );
  }
}

const mapStateToProps = (state: IState): IConnectionState => ({});

const mapDispatchToProps = (dispatch: Redux.Dispatch<IState>): IConnectedDispatch => {
  return {
    onAddCourseActionTrigger: (coursetable, course, target) => {
      const self: any = this;
      dispatch(pushAddCourseAction(coursetable, course, target));
    },
  };
};

export default withStyles(s)(
  compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(SEARCHCOURSEQUERY, {
    options: ({ text }) => {
      return {
        variables: {
          search: text,
        },
      };
    },
    props(props) {
      const { data: { search, error, loading }, ...p } = props;
      return {
        search: search && search.edges,
        error,
        loading,
        ...p,
      };
    },
  }),
)(SearchableCourseList));
