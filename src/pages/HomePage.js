import { useEffect, useState } from "react";
import Post from "../Post";
import { URL } from "../App";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(`${URL}/post`).then(response => {
      response.json().then(posts => {
        setPosts(posts);
      });
    });
  }, []);

  return (
    <div>
      {posts.length > 0 && posts.map(post => (
        <Post {...post}/>
      ))}
    </div>
  );
}
