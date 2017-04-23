import { Core, Model } from 'iridium';
import { mongodb } from '../../config';
import { Course, ICourseDocument } from './Course';
import { Section, ISectionDocument } from './Section';

class Database extends Core {
  Course = new Model<ICourseDocument, Course>(this, Course);
  Section = new Model<ISectionDocument, Section>(this, Section);
}

const database = new Database({ database: mongodb });

export { database, Database };
