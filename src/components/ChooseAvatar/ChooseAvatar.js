import styles from './ChooseAvatar.module.css'

import { useState, useEffect } from 'react'

// import { useAuthentication } from '../../hooks/useAuthentication'
import { useInsertDocument } from '../../hooks/useInsertDocument';
import { useAuthValue } from "../../context/AuthContext"
import AvatarCollection from '../Avatar/AvatarCollection'
import { useNavigate } from 'react-router-dom';

const ChooseAvatar = () => {

  // Para obter o uid da tabela user
  const { user } = useAuthValue();

  const [error, setError] = useState("")

  const navigate = useNavigate();

  const { insertDocument, response } = useInsertDocument("users_avatars")

  const [escolherAvatar, setEscolherAvatar] = useState(false)
  const [isAvatarFixed, setIsAvatarFixed] = useState(true)
  const [avatarUrl, setAvatarUrl] = useState("")


  // Obtém a URL do componente Avatar(filho)
  useEffect(() => {
    const handleMessage = (e) => {
      const url = e.data;

      let avatarIcon = document.getElementById('avatarIcon');
      avatarIcon.src = url

      setEscolherAvatar(false)
    }

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  const handleClick = (url) => {
    setAvatarUrl(url)
    setIsAvatarFixed(false)
    setEscolherAvatar(true)
  }

  useEffect(() => {
    if (isAvatarFixed) {
      setAvatarUrl("https://cdn-icons-png.flaticon.com/512/6596/6596121.png");
    }

  }, [isAvatarFixed])


  const handleSubmit = (e) => {
    e.preventDefault()

    // Para zerar os erros
    setError("")

    // Se o avatar selecionado for igual ao ícone de avatar inicial 
    if (avatarUrl == 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png') {
      setError("Você precisa escolher um avatar.")
      return;
    }

    insertDocument({
      avatarUrl,
      uid: user.uid,
      userName: user.displayName,
    });

    //  recirect to home page 
    navigate("/");
  }

  return (
    <div className={styles.avatar_user}>
      <form onSubmit={handleSubmit}>
        <div><p>Escolha um Avatar</p></div>
        <div className={styles.avatar_url}>
          <img
            id="avatarIcon"
            src={isAvatarFixed ? "https://cdn-icons-png.flaticon.com/512/6596/6596121.png" : avatarUrl}
            alt="Avatar"
          />
          <input className={styles.choose_avatar_url_btn} onClick={handleClick}
            type='button'
            value={`\u270E Editar`}
          />
        </div>
        {escolherAvatar && <div className={styles.avatar_collection}><AvatarCollection handleClick={handleClick} /></div>}
        {/* Se NÃO estiver em loading vai exibir o botão Cadastrar */}
        <div><button className='btn'>  Atualizar</button></div>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default ChooseAvatar