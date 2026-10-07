import { useState } from "react";

function LikesDislikes() {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  return (
    <div>
      <h2>Likes and Dislikes</h2>

      <p>Likes: {likes}</p>
      <p>Dislikes: {dislikes}</p>

      <button onClick={() => setLikes(likes + 1)}>
        👍 Like
      </button>

      <button onClick={() => setDislikes(dislikes + 1)}>
        👎 Dislike
      </button>
    </div>
  );
}

export default LikesDislikes;