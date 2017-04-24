import AsyncComponents from '../AsyncComponents';
import CourseListPanel from './CourseListPanel';

export const AsyncCourseListPanel = AsyncComponents(() => _import('./CourseListPanel'));
export default CourseListPanel;
