/*!
 * Nom du fichier : story.js
 * Auteur : VicMtn
 * Date : 09.01.2025
 * Description : Service de gestion des histoires
 * Licence : MIT
 * Version : 1.0.0
 */

import DbManager from '../dbManager.js';



class Story {
  //Get all the stories
  static async getStories(req, res) {
    try {
      const stories = await DbManager.getStories();
      res.status(200).json(stories);
      //return stories;
    } catch (error) {
      res.status(500).json({error: 'Unable to get stories'});
      console.log(error);
    }
  }

  static async addStory(req, res) {
    const {date, title, description} = req.body;
    if (!date || !title || !description) {
      return res.status(400).json({error: 'Date, title and description are required'});
    }
    try {
      await DbManager.addStory({date, title, description});
      return res.status(201).json({message: 'Story added'});
    } catch (error) {
      console.log(error);
      return res.status(500).json({error: 'Unable to add story'});
    }
  }

  static async deleteStory(req, res) {
    const { title } = req.params;
    if (!title) {
      return res.status(400).json({error: 'Title is required'});
    }
    try {
      const result = await DbManager.deleteStory(title);
      res.status(200).json({message: 'Story ' + title + ' deleted', succes: true, deletedCount: result});
    } catch (error) {
      console.log(error);
      return res.status(500).json({error: 'Unable to delete story'});

    }
  }

}
export default Story;
