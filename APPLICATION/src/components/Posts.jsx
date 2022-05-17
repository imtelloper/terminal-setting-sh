import React from "react";

const Posts = ({posts, loading}) => {
  return (
    <>
      { loading &&
        <div>loading...</div>
      }
      <ul>
        {posts.map(post=>(
          <li key={post.id}>
            {post.data}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Posts;
