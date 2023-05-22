import styles from './Avatar.module.css'

import { useState, useEffect } from 'react'

const Avatar = (props) => {

    const [posts, setPosts] = useState([]);
  
    useEffect(() => fetchPosts(), []);
  
    function fetchPosts() {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((res) => res.json())
        .then((data) => {
          data.lenght = 10;
          setPosts(data); //passa os dados de uma API para o meu setPosts
        })
        .catch((err) => console.log(err));
    }
      
    const getAvatarUrl = (e) => {
        const url = e.target.src
        window.parent.postMessage(url, '*')
        props.handleClick(url);   
    }

  return (
    <div className={styles.avatares}>
            {posts.map((post) => (     
          <div className={styles.avatar}>
            <img
              src={`https://avatars.dicebear.com/api/avataaars/${post.id}.svg`} 
              alt='Avatar do autor'
              className='author-avatar'
              onDoubleClick={getAvatarUrl}
            />
          </div>
        ))}
    </div>
  )
}

export default Avatar