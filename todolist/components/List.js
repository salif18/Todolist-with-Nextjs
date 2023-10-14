import React from "react";
import styles from '../styles/list.module.scss'
const List = ({item, handleDelete, handleChangeChecked }) => {
    
  return (
    <article className={styles.card} key={item.id}>
      <section className={styles.corps}>
        <input 
        type='checkbox'
        checked={item.checkbox}
        onChange={()=>handleChangeChecked(item.id)}
         />
        <p className={styles.contenu}>{item.contenu}</p>
      </section>
      <button className={styles.delbtn} onClick={()=>handleDelete(item.id)}>
        Delete tache
      </button>
    </article>
  );
};

export default List;
