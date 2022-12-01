import axios from 'axios';

const key = '30848188-838038a8b40bb43baa3f98f48';

const fetchImg = async (searchQuery = '', currentPage = 1) => {
  return axios
    .get(
      `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`
    )
    .then(response => response.data.hits);
};

export {fetchImg};
