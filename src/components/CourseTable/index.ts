import { ICourseTablePreview } from '../CourseTablePreview/CourseTablePreview';
import * as t from './CourseTable';

export type IFullCourse = t.IFullCourse;
export type ICourseTable = ICourseTablePreview<t.IFullCourse>;
export default t.default;