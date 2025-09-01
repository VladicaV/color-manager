// API service for color management
const API_BASE_URL = 'https://68b4c25245c9016787711676.mockapi.io/colors';

class ColorAPI {
  // Get all colors
  static async getColors() {
    try {
      const response = await fetch(`${API_BASE_URL}/colors`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching colors:', error);
      throw error;
    }
  }

  // Add a new color
  static async addColor(colorData) {
    try {
      const response = await fetch(`${API_BASE_URL}/colors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(colorData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error adding color:', error);
      throw error;
    }
  }

  // Delete a color by ID
  static async deleteColor(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/colors/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return true; // Successfully deleted
    } catch (error) {
      console.error('Error deleting color:', error);
      throw error;
    }
  }

  // Update a color (optional - for future use)
  static async updateColor(id, colorData) {
    try {
      const response = await fetch(`${API_BASE_URL}/colors/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(colorData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating color:', error);
      throw error;
    }
  }
}

export default ColorAPI;
