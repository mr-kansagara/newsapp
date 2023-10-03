import React, { Component } from 'react'

export class NewsItems extends Component {
    render() {
        let {title, description,imageUrl,newsUrl} = this.props;
        return (
            <div className='conitainer my-3'>
                <div className="card">
                    <img src={!imageUrl?"https://t4.ftcdn.net/jpg/05/17/53/57/240_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg":imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <a href={newsUrl}  rel="noreferrer" target='_blank' className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItems
