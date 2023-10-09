import React, { Component } from 'react'
import NewsItems from './NewsItems'
import LoadingCircle from './LoadingCircle';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

  static defaultProps = {
    pageSize: 9,
    country: "in",
    category: "science"
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - News Monkey`;
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=70b1cfeddfc1450881d4ceaaf72543b9&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(50);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  handleNextClick = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    this.updateNews()
  }
  handlePreviousClick = async () => {
    this.setState({
      page: this.state.page - 1,
    });
    this.updateNews()
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=70b1cfeddfc1450881d4ceaaf72543b9&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
    });

  };

  render() {
    return (
      <>
        <h2 className='text-center' style={{ margin: "20px 0px " }}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)}  headlines</h2>
        {this.state.loading && <LoadingCircle />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<LoadingCircle />}
        >
          <div className='container'>
            <div className='row'>
              {this.state.articles.map((element) => {
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
}

export default News
