export interface IPageInfo {
  endCurosr?: string;
  hasNextPage?: boolean;
}

export interface IEdge<T> {
  node: T;
  cursor: string;
}

export interface IPage<T> {
  totalCount?: number;
  edges: Array<IEdge<T>>;
  pageInfo: IPageInfo;
}

export interface ITimeInterval {
  day?: string;
  start?: string;
  end?: string;
}

export interface ITeacher {
  _id: string;
  name?: string;
  abbreviated?: string;
  shortDescription?: string;
}

export interface ISection {
  _id: string;
  sectionNo?: number;
  timeIntervals?: ITimeInterval[];
  teachers?: ITeacher[];
  building?: string;
  classroom?: string;
  type?: string;
}

export type ISectionPage = IPage<ISection>;

export interface ICourse {
  _id: string;
  courseID?: string;
  name?: string;
  credit?: string;
  exam?: string;

  sections: ISectionPage;
}

export interface ICourseTableCourse {
  course?: ICourse;
  section?: ISection;
  color?: string;
}

export interface ICourseTable {
  _id?: string;
  courses?: ICourseTableCourse[];
}
