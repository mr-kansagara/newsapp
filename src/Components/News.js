import React, { Component } from 'react'
import NewsItems from './NewsItems'
import LoadingCircle from './LoadingCircle';

export class News extends Component {

  static defaultProps = {
    pageSize: 9 ,
    country: "in" ,
    category: "science"
  }

  

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1
    }
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=70b1cfeddfc1450881d4ceaaf72543b9&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading :true})
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ 
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading :false
     })
  }

  handleNextClick = async () => {
    // console.log("next");
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) { 
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=70b1cfeddfc1450881d4ceaaf72543b9&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading :true})
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles: parsedData.articles,
        page: this.state.page + 1,
        loading :false
      })
    }
  }
  handlePreviousClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=70b1cfeddfc1450881d4ceaaf72543b9&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading :true})
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page + 1,
      loading : false
    })
  }


  render() {
    return (
      <div className='container my-3'>
        <h2 className='text-center' style={{margin: "20px 0px "}}>NewsMonkey - Top headlines</h2>
          {this.state.loading  && <LoadingCircle/>}
        <div className='row'>
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className='col-md-4' key={element.url} >
              <NewsItems title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} />
            </div>
          })}
        </div>
        <div className='container d-flex justify-content-between'>
          <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePreviousClick}>Previous &larr;</button>
          <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNextClick} id="next" className="btn btn-dark">Next &rarr;</button>

        </div>
      </div>
    )
  }
}

export default News
