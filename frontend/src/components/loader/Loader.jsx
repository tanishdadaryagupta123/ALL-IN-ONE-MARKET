import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Loader.module.scss';
import loaderImg from '../../assets/loader.gif';

export const Loader = () => {
  
  const portalRoot = document.getElementById("loader");

  
  if (!portalRoot) return null;

  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
        <div className={styles.Loader}>
            <img src={loaderImg} alt="loading"/>
        </div>
    </div>,
    portalRoot 
  )
};

export const Spinner = ()  => {
  return(
    <div className='--center-all'>
      <img src ={loaderImg} alt = "loading" width={40} />

    </div>
  )
}

export default Loader;
