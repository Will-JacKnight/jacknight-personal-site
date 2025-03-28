import { Link } from 'react-router-dom';
import '../styles/Card.css';

function Card({ title, description, tags, date, link, isExternal = false, highlight }) {
  const CardWrapper = isExternal ? 'a' : Link;
  const cardProps = isExternal ? { href: link, target: "_blank", rel: "noopener noreferrer" } : { to: link };

  return (
    <article className="card">

      <CardWrapper {...cardProps} className="card-link">
        <h3 className="card-title">{title}</h3>
        
        {date && (
          <p className="card-date">{date}</p>
        )}
        <p className="card-description">{description}</p>
        <div className="card-tags">
          {tags && tags.map(tag => (
            <span key={tag} className="card-tag">{tag}</span>
          ))}
          {highlight && (
            <span className="card-tag highlight-tag">{highlight}</span>
          )}
        </div>
      </CardWrapper>
    </article>
  );
}

export default Card; 