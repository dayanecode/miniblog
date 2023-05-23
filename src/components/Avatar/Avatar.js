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
      
    // Método que captura a URL do Avatar
    const handleDoubleClick = (e) => {
        const url = e.target.src
        // Envia a URL para o componente Register(pai)
        window.parent.postMessage(url, '*')
        props.handleClick(url);   
    }

  return (
    <div>
      <div className={styles.avatar_collection}>
              {posts.map((post) => (     
            <div className={styles.avatar}>
              <img
                src={`https://avatars.dicebear.com/api/avataaars/${post.id}.svg`} 
                alt='Avatar do autor'
                className='author-avatar'
                onDoubleClick={handleDoubleClick}
              />
            </div>    
        ))}
      </div>
    </div>
  )
}

export default Avatar