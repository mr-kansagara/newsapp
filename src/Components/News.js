import React, { useEffect, useState } from 'react'
import NewsItems from './NewsItems'
import LoadingCircle from './LoadingCircle';
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from 'prop-types'

const News = (props) => {

  const [articles, setarticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);



  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  document.title = `${capitalizeFirstLetter(props.category)} - News Monkey`;

  const updateNews = async () => {
    props.updateProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=70b1cfeddfc1450881d4ceaaf72543b9&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.updateProgress(50);
    let parsedData = await data.json();
    setarticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.updateProgress(100);
  }

  useEffect(() => {
    updateNews();

  }, []);

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=70b1cfeddfc1450881d4ceaaf72543b9&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setarticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <>
      <h2 className='text-center' style={{marginTop: "75px" }}>NewsMonkey - Top {capitalizeFirstLetter(props.category)}headlines</h2>
      {loading && <LoadingCircle />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<LoadingCircle />}
      >
        <div className='container'>
          <div className='row'>
            {articles.map((element) => {
              return <div className='col-md-3' key={element.url} >
                <NewsItems title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>

    </>
  )

}


News.defaultProps = {
  pageSize: 9,
  country: "in",
  category: "science"
};

News.propTypes = {
  pageSize : PropTypes.number ,
  country : PropTypes .string ,
  category :PropTypes. string
};
export default News
