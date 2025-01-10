import axios from "axios";

const BASE_URL = "http://localhost:3000/content";

export default {
  async fetchAllContent() {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching content:", error);
      throw error; // Propagate error to the controller
    }
  },

  async addContent(newContent) {
    try {
      const response = await axios.post(BASE_URL, newContent);
      return response.data;
    } catch (error) {
      console.error("Error adding content:", error);
      throw error; // Propagate error to the controller
    }
  },
};
