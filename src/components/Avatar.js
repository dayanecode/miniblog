import styles from './Avatar.module.css'

import { useState, useEffect } from 'react'

const Avatar = () => {

    const [posts, setPosts] = useState([]);

    const [avatarUrl, setAvatarUrl] = useState("")
  
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
        setAvatarUrl(url)
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
        <div>
          {avatarUrl && <p>URL do Avatar: {avatarUrl}</p>}
      </div>
    </div>
  )
}

export default Avatar