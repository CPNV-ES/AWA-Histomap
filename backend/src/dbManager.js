/*!
 * Nom du fichier : dbManager.js
 * Auteur : VicMtn
 * Date : 09.01.2025
 * Description : Gère la connexion et les requêtes sur le cluster MongoDB
 * Licence : MIT
 * Version : 1.0.0
 */
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

class DbManager {
  static async connect(dbName) {
    try {
      if (!this.client) {
        this.client = await MongoClient.connect(process.env.MONGO_URI)
        this.db = this.client.db(dbName)
        console.log(`Connected to database: ${this.db.databaseName}`)
        return this.client
      } else return this.client
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error)
    }
  }

  static async getStories() {
    await this.connect('HistoryAWA')
    return await this.db.collection('history').find().sort({ createdAt: -1 }).toArray()
  }

  static async addStory({ date, title, description, image }) {
    await this.connect('HistoryAWA')
    return await this.db.collection('history').insertOne({ date, title, description, image })
  }

  static async deleteStory(title) {
    await this.connect('HistoryAWA')
    return await this.db.collection('history').deleteOne({ title })
  }
}

export default DbManager
