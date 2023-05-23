import styles from './Post.module.css'

import { Link } from 'react-router-dom'

const Post = ({ post }) => {
    return (
        <div className={styles.post} >
            <h2>{post.id}</h2>
        </div>
    );
};

export default Post