import { Core, Model } from 'iridium';
import { mongodb } from '../../config';

class Database extends Core {
  // Test = new Model<ITestDocument, Test>(this, Test);

  // User = new Model<IUserDocument, User>(this, User);
  // Thread = new Model<IThreadDocument, Thread>(this, Thread);
  // Review = new Model<IReviewDocument, Review>(this, Review);
}

const database = new Database({ database: mongodb });

export { database, Database };
