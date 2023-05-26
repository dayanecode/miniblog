import { useState, useEffect } from 'react'
import styles from './ShowUserAvatar.module.css'

import { useAuthValue } from '../../context/AuthContext'
import { useFetchUrlAvatars } from "../../hooks/useFetchUrlAvatars"

import CreateAvatar from '../CreateAvatar/CreateAvatar'

const ShowUserAvatar = () => {

    const { user } = useAuthValue()
    const uid = user.uid

    const [alterarAvatar, setAlterarAvatar] = useState(false)

    const { urlAvatars: avatars, loading } = useFetchUrlAvatars("users_avatars", null, uid)

    if (loading) {
        return <p>Carregando...</p>
    }

    return (
        <div className={styles.user_avatar}> 
            {/* Quando não tiver avatar */}    
            {avatars && avatars.length === 0 ? (
              <div>
                <img 
                      src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                      alt='user icon'
                    />
              </div>
            ) : (
              <>               
                {/* renderizar linha onde exibe o post com os botões de ação */}
                {avatars &&
                  avatars.map((avatar) => (
                  <div key={avatar.id}>
                    <img 
                      src={avatar.avatarUrl} 
                      alt='avatar icon' 
                    />
                </div>
                ))}
              </>
            )}
        </div>
      )
    }
export default ShowUserAvatar