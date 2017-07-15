import * as cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as React from 'react';
import { compose, DefaultChildProps, graphql } from 'react-apollo';
import { defineMessages, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as Redux from 'redux';
import { Accordion, Button, Checkbox, Label } from 'semantic-ui-react';
import { pushAddCourseAction } from '../../redux/action/actions';
import * as s from './SearchableCourseList.css';
import * as SEARCHCOURSEQUERY from './SearchCourseQuery.gql';

import { IAction } from '../../redux/action/reducers';
import { IState } from '../../redux/IState';
// import { ICourse } from '../../schema/types/Course';
// import { ICourseGroup } from '../../schema/types/CourseGroup';
import { IPage } from '../../schema/types/Pagination';
import { ISearchResult } from '../../schema/types/SearchResult';
import { ITeacher } from '../../schema/types/Teacher';
import { ITimeInterval } from '../../schema/types/TimeInterval';

// TODO use import
// tslint:disable-next-line:no-var-requires
const MdArrowBack = require('react-icons/lib/md/arrow-back');

namespace SearchableCourseList {
  export interface IProps extends React.Props<any> {
    text: string;
    // search: Array<IEdge<ICourse | ICourseGroup>>;
    match: {
      params: {
        id: string,
      },
    };
  }

  export interface ISearchCourseQuery {
    search: IPage<ISearchResult>;
  }

  export interface IConnectionState {
    actions?: IAction[];
  }

  export interface IConnectedDispatch {
    onAddCourseActionTrigger?: (coursetable: string, course, target) => void;
  }

  export type Props = DefaultChildProps<IProps & IConnectedDispatch & IConnectionState, ISearchCourseQuery>;
}

const messages = defineMessages({
});

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

class SearchableCourseList extends React.Component<SearchableCourseList.Props> {
  public render() {
    const { data: { search } } = this.props;
    const searchResults = search.edges;
    const renderPanels = searchResults && searchResults.filter((c) => (
      c.node.__typename === 'NormalCourse' ||
      c.node.__typename === 'GenedCourse' ||
      c.node.__typename === 'ApprovedCourse'
    ))
    .map((c) => ({
      key: `course-${c.node._id}`,
      title: (<CourseItem name={c.node.name} courseID={c.node.courseID} />),
      content: (
        <div>
          {c.node.sections.edges.map(({ node }) => (
            <SectionItem
              key={`${c.node._id} ${node._id}`}
              index={node.sectionNo}
              onApply={this.props.onAddCourseActionTrigger
                .bind(this, this.props.match.params.id, c.node._id, node._id)}
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
          searchResults && searchResults.length ? <Accordion panels={renderPanels} styled fluid /> :
            this.props.text ? (<div className={s.text}>No results</div>) :
              (<div className={s.text}>Type to search...</div>)
        }
      </div>
    );
  }
}

const mapStateToProps = (state: IState): SearchableCourseList.IConnectionState => ({});

const mapDispatchToProps = (dispatch: Redux.Dispatch<IState>): SearchableCourseList.IConnectedDispatch => {
  return {
    onAddCourseActionTrigger: (coursetable, course, target) => {
      dispatch(pushAddCourseAction(coursetable, course, target));
    },
  };
};

export default withStyles(s)(
  compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql<SearchableCourseList.ISearchCourseQuery, SearchableCourseList.Props>(SEARCHCOURSEQUERY, {
    options: ({ text }) => {
      return { variables: { search: text } };
    },
  }),
)(SearchableCourseList));
