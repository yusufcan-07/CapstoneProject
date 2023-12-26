// api.js
import axios from "axios";

async function query(data) {
  try {
    const response = await axios.post("http://127.0.0.1:5000//analyze-news/", {
      content: data.inputs,
    });
    return response.data;
  } catch (error) {
    console.error("Error during API call:", error);
    throw error; // Re-throw the error to handle it where the function is called
  }
}

export { query };
