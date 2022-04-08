import React, {useContext, useEffect, useState} from 'react';

export const NewsContext = React.createContext();

const NewsProvider = props => {
  const [news, setNews] = React.useState({
    loading: true,
    newsData: null,
    reload: false,
  });
  let controller = new AbortController();

  const getNewsData = async () => {
    console.log('\nhey news');

    await fetch('http://10.0.2.2:8000/api/news/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    })
      .then(res => res.json())
      .then(response => {
        console.log('news server response:', 'ok');
        setNews({loading: false, newsData: response, reload: false});
      })
      .catch(err => {
        setNews({loading: false, newsData: null, reload: false});
        console.log('error server fetch:', err);
        // alert('News Data Network Error')
      });
  };

  React.useEffect(() => {
    getNewsData();
  }, []);
  React.useEffect(() => {
    if (news.reload) {
      console.log("rleoad api works")
      getNewsData();
    }
  }, [news.reload]);

  return (
    <NewsContext.Provider value={[news, setNews]}>
      {props.children}
    </NewsContext.Provider>
  );
};

export default NewsProvider;
