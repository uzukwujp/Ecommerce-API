import mongoose from "mongoose";

export class DbConnection {
  /**
   * @return {Promise<DatabaseConnection>}
   */
  static async connect() {
    try {
      await mongoose.connect("mongodb://localhost/Ecommerce");
      return new DbConnection();
      console.log(`successfully connected to database`);
    } catch (error) {
      console.error(error);
    }
  }
}
