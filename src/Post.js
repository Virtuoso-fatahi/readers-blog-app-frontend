import { Link } from "react-router-dom";
import { format } from "date-fns";

export default function Post({
  _id,
  title,
  summary,
  cover,
  content,
  createdAt,
  author,
}) {
  return (
    <div className="post">
      <div className="post-img">
        <Link to={`/post/${_id}`}>
          <img src={cover.url} alt="" />
        </Link>
      </div>
      <div className="post-content">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2> 
        </Link>

        <p className="info">
          <a className="author">{author.username}</a>
          <time>{format(new Date(createdAt), "MMM d, yyyy HH:mm")}</time>
        </p>
        <p className="content">{summary}</p>
      </div>
    </div>
  );
}
