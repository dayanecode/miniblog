import styles from './PostDetail.module.css'

import { Link } from 'react-router-dom'

const PostDetail = ({post}) => {

  // conversão do creatAt para formato de data e de hora
  const createAt = post.createAt
  const date = createAt.toDate();
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();

  return (
    <div className={styles.post_detail}>
        <img src={post.image} alt={post.title} />
        <p className={styles.createby}>Criado em: {formattedDate} {formattedTime} - Por: {post.createBy}</p>
        <h2>{post.title}</h2>      
        <div className={styles.tags}>
            {post.tagsArray.map((tag) => (
              <p key={tag}>
                   <span>#</span>
                    {tag}
                </p>   
              ))}     
        </div>
        <Link to={`/posts/${post.id}`} className='btn btn-outline'>Ler</Link>   
    </div>
  );
};

export default PostDetail