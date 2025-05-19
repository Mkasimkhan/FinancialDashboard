export const fetchMockData = async () => {
    const response = await fetch('/data/mockData.json');
    const data = await response.json();
    return data;
  };