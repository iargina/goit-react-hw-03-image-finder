import { createClient } from 'pexels';

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
    const data = await client.photos.search(params);
    const total_results = data.total_results;
    const finalPhotos = data.photos.map(
      ({ id, alt, src: { medium, large } }) => ({
        id,
        alt,
        medium,
        large,
      })
    );
    return {
      page,
      finalPhotos,
      total_results,
    };
  } catch (error) {
    console.error(error);
  }
};
