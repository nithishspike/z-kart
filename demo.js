const { URLSearchParams } = require('url');
const fetch = require('node-fetch');
async function googleImageSearch(query, apiKey, searchEngineId) {
    const baseUrl = "https://www.googleapis.com/customsearch/v1";
    const params = new URLSearchParams({
      q: query,
      searchType: 'image',
      key: apiKey,
      cx: searchEngineId,
      num: 1  // Number of results you want to fetch
    });
  
    const url = `${baseUrl}?${params.toString()}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching image search results:', error);
    }
  }
  
  // Replace with your Google API key and Custom Search Engine ID
  const apiKey = ' AIzaSyCTSPEOBR8BxnRB5MO4q3JHnay7eyjbiaI ';
  const searchEngineId = '221a8d915474a4a6f'; // Also known as 'cx'
  
  googleImageSearch('acer laptop', apiKey, searchEngineId).then(data => {
    console.log(data);
  });
  