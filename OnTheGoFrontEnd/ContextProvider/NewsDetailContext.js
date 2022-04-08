import React from 'react';

export const NewsDetailContext = React.createContext();

const NewsDetailProvider = props => {
  const [newsDetail, setNewsDetail] = React.useState({
    loading: true,
    newsData: null,
  });

  const [newsId, setNewsId] = React.useState(null);

  const getDetails = async () => {
    setNewsDetail({loading: true, newsData: null});
    await fetch(`http://10.0.2.2:8000/api/news/${newsId}/`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        setNewsDetail({loading: false, newsData: data});
      })
      .catch(error => {
        console.log('news details api access error:', error);
      });
  };

  React.useEffect(() => {
    if (newsId !== null) {
      getDetails();
    }
  }, [newsId]);

  return (
    <NewsDetailContext.Provider
      value={{
        selectedNewsDetails: [newsDetail, setNewsDetail],
        selectedNews: [newsId, setNewsId],
      }}>
      {props.children}
    </NewsDetailContext.Provider>
  );
};

export default NewsDetailProvider;
