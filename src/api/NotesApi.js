import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:7777/'

export const getAllNotes = async () => {
    try {
        const response = await axios.get('notes');
        return response.data;
    } catch (error) {
        return error;
    }
}

export const addNote = async (body) => {
    try {
        const response = await axios.post('note', body);
        return response;
    } catch (error) {
        return error;
    }
}

export const removeNote = async (id) => {
    try {
        const response = await axios.delete(`notes/${id}`);
        return response;
    } catch (error) {
        console.error("Error deleting note:", error);
        throw error;
    }
}