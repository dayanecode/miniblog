import styles from "./Dashboard.module.css";

import { Link } from "react-router-dom";

// hooks
import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";

const Dashboard = () => {
  const {user} = useAuthValue()
  const uid = user.uid

  const { documents: posts, loading } = useFetchDocuments("posts", null, uid);

  const { deleteDocument } = useDeleteDocument("posts")

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div className={styles.dashboard}> 
        <h2>Dashboard</h2>
        <p>Gerencie os seus posts</p>
        {/* Quando não tiver pos */}
        {posts && posts.length === 0 ? (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className='btn'>
              Criar primeiro post
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.post_header}> 
             <span>Título</span>
             <span>Ações</span>
            </div>
            {/* renderizar linha onde exibe o post com os botões de ação */}
            {posts &&
              posts.map((post) => (
              <div className={styles.post_row} key={post.id}>
               <p className={styles.dash_title}>{post.title}</p>
              <div className={styles.dash_buttons} >
                <Link to={`/posts/${post.id}`} className="btn btn-outline">Ver</Link>
                <Link to={`/posts/edit/${post.id}`} className="btn btn-outline">Editar</Link>
                <button 
                    onClick={() => deleteDocument(post.id)}
                    className="button"
                >
                  Excluir
                </button>
              </div>
            </div>
            ))}
          </>
        )}
    </div>
  )
}

export default Dashboard