import styles from './CreatePost.module.css'

import { useState } from 'react';
import { useInsertDocument } from '../../hooks/useInsertDocument';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from "../../context/AuthContext"

const CreatePost = () => {
  
  const { user } = useAuthValue();
  
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")  

  const navigate = useNavigate();

  const { insertDocument, response } = useInsertDocument("posts")

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // checar todos os valores
    if (!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os campos")
      return
    } 

    // validate image URL
      try {
        // Aqui a gente tenta criar uma nova URL
        new URL(image);
      } catch (error) {
        return setFormError("A imagem precisa ser uma URL.");
      }


    // criar o array de tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());
   
    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createBy: user.displayName,
    });

    //  recirect to home page
      navigate("/");

  }

  return (
    <div className={styles.create_post}>
      <h2>Criar Post</h2>
      <p>Escreva sobre o que quiser e compartilhe do seu conhecimento</p>
      <form className={styles.search_form} onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name='title'
            // required
            placeholder='Pense num bom título...'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>URL da imagem:</span>
          <input
            type="text"
            name='image'
            // required
            placeholder='Insira uma imagem que representa o seu post...'
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>
        <label>
          <span>Conteúdo:</span>
          <textarea
            name='body'
            // required
            placeholder='Insira o conteúdo do post'
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>
        </label>
        <label>
          <span>Tags:</span>
          <input
            type="text"
            name='tags'
            // required
            placeholder='Insira as tags separadas por vírgula...'
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        {!response.loading && <button className='btn'>Criar Post</button>}
        {response.loading && (
          <button className ='btn' disabled>
            Aguarde...
          </button>
        )}
        {(response.error || formError)  && (<p className="error">{response.error || formError}</p>)}
        
      </form>
    </div>
  )
}

export default CreatePost