import ContentModel from "@/models/ContentModel";

export default {
  async getContentList() {
    try {
      const content = await ContentModel.fetchAllContent();
      return content; // Return the data to the view
    } catch (error) {
      console.error("Controller: Failed to get content list", error);
      throw error; // Propagate error to the view
    }
  },

  async createContent(newContent) {
    try {
      const content = await ContentModel.addContent(newContent);
      return content; // Return the created content to the view
    } catch (error) {
      console.error("Controller: Failed to create content", error);
      throw error; // Propagate error to the view
    }
  },
};
