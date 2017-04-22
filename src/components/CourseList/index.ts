import AsyncComponents from '../AsyncComponents';
import CourseList from './CourseList';

export const AsyncCourseList = AsyncComponents(() => _import('./CourseList'))
export default AsyncCourseList;
