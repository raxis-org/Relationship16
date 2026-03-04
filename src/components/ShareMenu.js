'use client';

import { useEffect, useState } from 'react';
import { Link2, MessageCircle, X, Share, Copy } from 'lucide-react';
import styles from './ShareMenu.module.css';

export default function ShareMenu({ url, title, text, isOpen, onClose, onCopy }) {
  const [isVisible, setIsVisible] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10);
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setShowCopied(true);
      onCopy?.();
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      // フォールバック
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setShowCopied(true);
      onCopy?.();
      setTimeout(() => setShowCopied(false), 2000);
    }
  };

  const handleLineShare = () => {
    const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`;
    window.open(lineUrl, '_blank', 'width=600,height=600');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title || 'RelationCheck 16',
          text: text || '',
          url: url,
        });
      } catch (err) {
        // ユーザーがキャンセルした場合は無視
        if (err.name !== 'AbortError') {
          console.error('Share failed:', err);
        }
      }
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`${styles.backdrop} ${isVisible ? styles.visible : ''}`}
      onClick={handleBackdropClick}
    >
      <div className={`${styles.container} ${isVisible ? styles.visible : ''}`}>
        <div className={styles.header}>
          <h3 className={styles.title}>シェア</h3>
          <button onClick={handleClose} className={styles.closeButton}>
            <X className={styles.closeIcon} />
          </button>
        </div>

        <div className={styles.actions}>
          {/* LINE */}
          <button onClick={handleLineShare} className={styles.actionButton}>
            <div className={`${styles.iconWrapper} ${styles.line}`}>
              <MessageCircle className={styles.icon} />
            </div>
            <span className={styles.label}>LINE</span>
          </button>

          {/* ネイティブ共有 */}
          {typeof navigator !== 'undefined' && navigator.share && (
            <button onClick={handleNativeShare} className={styles.actionButton}>
              <div className={`${styles.iconWrapper} ${styles.native}`}>
                <Share className={styles.icon} />
              </div>
              <span className={styles.label}>その他</span>
            </button>
          )}

          {/* URLコピー */}
          <button onClick={handleCopy} className={styles.actionButton}>
            <div className={`${styles.iconWrapper} ${styles.copy}`}>
              {showCopied ? <Link2 className={styles.icon} /> : <Copy className={styles.icon} />}
            </div>
            <span className={styles.label}>{showCopied ? 'コピー済み' : 'URLをコピー'}</span>
          </button>
        </div>

        <div className={styles.urlPreview}>
          <div className={styles.urlText}>{url}</div>
        </div>
      </div>
    </div>
  );
}
