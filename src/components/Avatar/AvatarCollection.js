import styles from './AvatarCollection.module.css'

import { useState, useEffect } from 'react'

const AvatarCollection = (props) => {

    const [posts, setPosts] = useState([]);
  
    useEffect(() => fetchPosts(), []);
  
    function fetchPosts() {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((res) => res.json())
        .then((data) => {
          setPosts(data); //passa os dados da API para setPosts
          console.log(data)
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
                src={`https://api.dicebear.com/6.x/micah/svg?seed=${post.id}`} 
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

export default AvatarCollection