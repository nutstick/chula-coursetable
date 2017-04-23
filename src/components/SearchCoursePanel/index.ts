import AsyncComponents from '../AsyncComponents';
import SearchCoursePanel from './SearchCourse';

export const AsyncSearchCoursePanel = AsyncComponents(() => _import('./SearchCourse'));

export default SearchCoursePanel;
