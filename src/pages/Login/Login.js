import styles from './Login.module.css'

import { useState, useEffect } from 'react'

import { useAuthentication } from '../../hooks/useAuthentication'

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

   
  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault()

  // Para zerar os erros
    setError("")

    const user ={
      email,
      password,
    }

    const res = await createUser(user);
   
    console.log(user)
  }

  // Fica mapeando se o setError mudou! Se Mudou vai substituir pelo erro da aplicação
  useEffect(() => {
    if (authError) {
      setError(authError)
    }
  }, [authError])


  return (
    <div className={styles.login}>
        <h1>Entrar</h1>
      <p>Faça o login para poder utilizar o sistema</p>
      <form onSubmit={handleSubmit}> 
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
    
        {/* Se NÃO estiver em loading vai exibir o botão Cadastrar */}
        {!loading && <button className='btn'>Entrar</button>}
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

export default Login