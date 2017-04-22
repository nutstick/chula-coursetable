import AsyncComponents from '../AsyncComponents';
import SearchCourse from './SearchCourse';

export const AsyncSearchCourse = AsyncComponents(() => _import('./SearchCourse'));

export default SearchCourse;
