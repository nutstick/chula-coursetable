import { Core, Model } from 'iridium';
import { mongodb } from '../../config';
import { Course, ICourseDocument } from './Course';
import { CourseTable, ICourseTableDocument } from './CourseTable';
import { ISectionDocument, Section } from './Section';

class Database extends Core {
  Course = new Model<ICourseDocument, Course>(this, Course);
  CourseTable = new Model<ICourseTableDocument, CourseTable>(this, CourseTable);
  Section = new Model<ISectionDocument, Section>(this, Section);
}

const database = new Database({ database: mongodb });

export async function InstallMockData() {
  await database.Section.remove({});
  await database.Course.remove({});

  const s1 = await database.Section.insert({
    sectionNo: 1,
    building: 'MAHIT',
    classroom: '202',
    timeIntervals: [{
      day: 'THURSDAY',
      start: '13:00',
      end: '16:00',
    }],
    type: 2,
  });
  const s2 = await database.Section.insert({
    sectionNo: 2,
    building: 'MAHIT',
    classroom: '202',
    timeIntervals: [{
      day: 'THURSDAY',
      start: '8:00',
      end: '11:00',
    }],
    type: 2,
  });
  const s3 = await database.Section.insert({
    sectionNo: 3,
    building: 'MAHIT',
    classroom: '202',
    timeIntervals: [{
      day: 'FRIDAY',
      start: '8:00',
      end: '11:00',
    }],
    type: 2,
  });

  await database.Course.insert({
    courseID: '0123101',
    name: 'PARAGRAP WRITING',
    credit: 3.0,
    type: 2,
    gened: {
      type: 'HU',
    },
    sections: [s1._id, s2._id, s3._id],
  });

  const x = await database.Course.find().toArray();
}

export { database, Database };
