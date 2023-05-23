import styles from './AvatarImg.module.css'

import { useState, useEffect } from 'react'

const AvatarImg = () => {

  return (
    <div className={styles.avatar_img}>  
        <img
            id="imgAvatar" 
            src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
            alt="Avatar" 
            // onClick={handleClick}
        />
  </div>
  )
}

export default AvatarImg