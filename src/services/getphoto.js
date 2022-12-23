import axios from 'axios';
import { createClient } from 'pexels';

const API_KEY = '563492ad6f91700001000001a1215475e7a64958baadc8684534de88';
axios.defaults.baseURL = 'https://api.pexels.com/v1';
axios.defaults.headers.common['Authorization'] = API_KEY;

export const getImagesArr = async (query, page) => {
  const params = {
    query,
    page,
    orientation: 'landscape',
    per_page: 12,
  };
  const client = createClient(
    '563492ad6f91700001000001a1215475e7a64958baadc8684534de88'
  );
  try {
    const data = await client.photos.search(params).then(response => {
      const { page, photos, total_results } = response;
      return { page, photos, total_results };
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};
