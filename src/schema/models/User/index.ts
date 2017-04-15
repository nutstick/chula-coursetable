import * as Iridium from 'iridium';
import { Collection, Index, Instance, Model, ObjectID, Property } from 'iridium';
import { CourseTable, ICourseTableDocument } from '../CourseTable';
import { Account, IAccountDocument } from './account';

interface IUserDocument {
  _id?: string;
  name: string;
  account: IAccountDocument;
  avatar: string;
  createAt?: Date;
  updateAt?: Date;

  coursetables: ICourseTableDocument[];
}

@Index({
  'account.email': 1,
  'account.facebookAccessCode': 1,
  'account.googleAccessCode': 1,
}, { unique: true })
@Collection('users')
class User extends Instance<IUserDocument, User> implements IUserDocument {
  @ObjectID
  _id: string;
  @Property(/^.+$/, true)
  name: string;

  @Property(Account, true)
  account: IAccountDocument;

  @Property(String, true)
  avatar: string;
  @Property(Date, false)
  createAt: Date;
  @Property(Date, false)
  updateAt: Date;

  @Property([CourseTable], false)
  coursetables: ICourseTableDocument[];

  static onCreating(user: IUserDocument) {
    user.createAt = new Date();
    user.updateAt = new Date();
  }

  static onSaving(user: User, changes: Iridium.Changes) {
    user.updateAt = new Date();
  }
}

export { IUserDocument, User };
