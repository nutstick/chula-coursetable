import { Core, Model } from 'iridium';
import { mongodb } from '../../config';
import { Course, ICourseDocument } from './Course';
import { CourseGroup, ICourseGroupDocument } from './CourseGroup';
import { CourseTable, ICourseTableDocument } from './CourseTable';
import { ISectionDocument, Section } from './Section';
import { IUserDocument, User } from './User';

class Database extends Core {
  User = new Model<IUserDocument, User>(this, User);
  Course = new Model<ICourseDocument, Course>(this, Course);
  CourseTable = new Model<ICourseTableDocument, CourseTable>(this, CourseTable);
  CourseGroup = new Model<ICourseGroupDocument, CourseGroup>(this, CourseGroup);
  Section = new Model<ISectionDocument, Section>(this, Section);
}

const database = new Database({ database: mongodb });

export async function InstallMockData() {
  await database.Section.remove({});
  await database.Course.remove({});
  await database.CourseGroup.remove({});

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

  const c1 = await database.Course.insert({
    courseID: '0123101',
    name: 'PARAGRAP WRITING',
    credit: 3.0,
    type: 2,
    gened: {
      type: 'HU',
    },
    sections: [s1._id, s2._id, s3._id],
  });

  // SA
  const s4 = await database.Section.insert({
    sectionNo: 1,
    building: 'ENG3',
    classroom: '319',
    timeIntervals: [{
      day: 'TUESDAY',
      start: '9:30',
      end: '11:00',
    }, {
      day: 'THURSDAY',
      start: '9:30',
      end: '11:00',
    }],
    type: 1,
  });
  const s5 = await database.Section.insert({
    sectionNo: 2,
    building: 'ENG3',
    classroom: '320',
    timeIntervals: [{
      day: 'TUESDAY',
      start: '9:30',
      end: '11:00',
    }, {
      day: 'THURSDAY',
      start: '9:30',
      end: '11:00',
    }],
    type: 1,
  });
  const s6 = await database.Section.insert({
    sectionNo: 3,
    building: 'ENG3',
    classroom: '321',
    timeIntervals: [{
      day: 'TUESDAY',
      start: '9:30',
      end: '11:00',
    }, {
      day: 'THURSDAY',
      start: '9:30',
      end: '11:00',
    }],
    type: 1,
  });
  const s7 = await database.Section.insert({
    sectionNo: 4,
    building: 'ENG3',
    classroom: '322',
    timeIntervals: [{
      day: 'TUESDAY',
      start: '9:30',
      end: '11:00',
    }, {
      day: 'THURSDAY',
      start: '9:30',
      end: '11:00',
    }],
    type: 1,
  });

  const c2 = await database.Course.insert({
    courseID: '2110332',
    name: 'SYS ANALYSIS DSGN',
    credit: 3.0,
    type: 1,
    sections: [s4._id, s5._id, s6._id, s7._id],
  });

  await database.CourseGroup.insert({
    department: 'Computer Engineer',
    courses: [c1._id, c2._id],
    faculty: 'Engineer',
    name: 'Computer Engineer Year 3',
    year: 3,
  });
}

export { database, Database };
