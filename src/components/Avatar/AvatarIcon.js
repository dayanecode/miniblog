import styles from './AvatarIcon.module.css'

import { useState, useEffect } from 'react'

const AvatarIcon = () => {

  return (
    <div className={styles.avatar_icon}>  
        <img
            id="avatarIcon" 
            src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
            alt="Avatar" 
            // onClick={handleClick}
        />
  </div>
  )
}

export default AvatarIcon