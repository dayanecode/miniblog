import styles from './Register.module.css'

import { useState, useEffect } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication'
import Avatar from '../../components/Avatar/Avatar'

const Register = (props) => {
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const { createUser, error: authError, loading } = useAuthentication();

  const [escolherAvatar, setEscolherAvatar] = useState(false)
  const [isAvatarFixed, setIsAvatarFixed] = useState(true)
  const [selecionarAvatarUrl, setSelecionarAvatarUrl] = useState("")
  
  // Fica mapeando se o setError mudou! Se Mudou vai substituir pelo erro da aplicação
  useEffect(() => {
    if (authError) {
      setError(authError)
    }
  }, [authError])

  // Obtém a URL do componente Avatar(filho)
  useEffect(() => {
    const handleMessage = (e) => {
      const url = e.data;

      let imgAvatar = document.getElementById('imgAvatar');
      imgAvatar.src = url

      setEscolherAvatar(false)
    }

    window.addEventListener('message', handleMessage);

    return() =>{
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  const handleClick = (url) => {
    setSelecionarAvatarUrl(url)
    setIsAvatarFixed(false)
    setEscolherAvatar(true)
  }

  useEffect(() => {
    if (isAvatarFixed) {    
      setSelecionarAvatarUrl("https://cdn-icons-png.flaticon.com/512/6596/6596121.png");
    }

  }, [isAvatarFixed])
  

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Para zerar os erros
    setError("")

    const user = {
      displayName,
      email,
      password,
    }
    // Se as senhas forem diferentes:
    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais")
      return;
    }

    const res = await createUser(user);

    console.log(user)
  }


  return (
    <div className={styles.register}>
      <h1>Cadastre-se para postar</h1>
      <p>Crie seu usuário e compartilhe suas histórias</p>

      <form className='avatar' onSubmit={handleSubmit}>
          <img
            id="imgAvatar" 
            src={isAvatarFixed ? "https://cdn-icons-png.flaticon.com/512/6596/6596121.png" : selecionarAvatarUrl}
            alt="Avatar" 
            onClick={handleClick}
          />
          <p>Selecione um Avatar</p>
          {escolherAvatar &&  <Avatar handleClick={handleClick} />}     
        <label>
          <span>Nome: </span>
          <input
            type="text"
            name='displayName'
            required
            placeholder='Nome do usuário'
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
        </label>
        <label>
          <span>Email: </span>
          <input
            type="email"
            name='email'
            required
            placeholder='E-mail do usuário'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label>
          <span>Senha: </span>
          <input
            type="password"
            name='password'
            required
            placeholder='Insira sua senha'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>

        <label>
          <span>Confirmação de senha: </span>
          <input
            type="password"
            name='confirmPassword'
            required
            placeholder='Confirme a sua senha'
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </label>
        {/* Se NÃO estiver em loading vai exibir o botão Cadastrar */}
        {!loading && <button className='btn'>Cadastrar</button>}
        {loading && (
          <button className='btn' disabled>
            Aguarde...
          </button>
        )}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default Register