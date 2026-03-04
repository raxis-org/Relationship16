'use client';

import { useEffect, useState } from 'react';
import { Check, AlertCircle, X } from 'lucide-react';
import styles from './Toast.module.css';

export default function Toast({ message, type = 'success', duration = 3000, onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // マウント時にアニメーション開始
    const showTimer = setTimeout(() => setIsVisible(true), 10);
    
    // 自動クローズ
    const closeTimer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(closeTimer);
    };
  }, [duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose?.();
    }, 300);
  };

  const icon = type === 'success' ? <Check className={styles.icon} /> : <AlertCircle className={styles.icon} />;

  return (
    <div 
      className={`${styles.container} ${isVisible ? styles.visible : ''} ${isLeaving ? styles.leaving : ''} ${styles[type]}`}
    >
      {icon}
      <span className={styles.message}>{message}</span>
      <button onClick={handleClose} className={styles.closeButton}>
        <X className={styles.closeIcon} />
      </button>
    </div>
  );
}
