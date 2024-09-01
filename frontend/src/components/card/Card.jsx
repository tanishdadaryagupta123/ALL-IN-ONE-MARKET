import React from 'react';
import styles from "./Card.module.scss";

const Card = ({ children, cla = "" }) => {
  return (
    <div className={`${styles.card} ${cla}`}>
      {children}
    </div>
  );
}

export default Card;
