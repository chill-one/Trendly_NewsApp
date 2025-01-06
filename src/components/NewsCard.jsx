import React from 'react'
import './NewsFeed'
import defaultImage from '../assets/img/breakingNews.webp'

function NewsCard({article}) {
    const handleImageError = (e) => {
        e.target.src = defaultImage
    }

  return (
    <div className='news-card'>
        <img src={article.urlToImage || defaultImage} alt={article.title} className='news-image' onError={handleImageError}/>
        <div className='news-content'>
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.url}>Read more</a>
        </div>
    </div>
  )
}

export default NewsCard