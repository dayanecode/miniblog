import styles from './PostDetail.module.css'

import { Link } from 'react-router-dom'

const PostDetail = ({post}) => {
  return (
    <div>
        <img src={post.image} alt={post.title} />
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <p>{post.createBy}</p>
        <div>
            {post.tagsArray.map((tag) => (
               <p key={tag}>
                   <span>#</span>
                    {tag}
                </p>   
              ))}     
        </div>
        <Link to={`/posts/${post.id}`} className='btn btn-outline'>Consultar</Link>   
    </div>
  );
};

export default PostDetail