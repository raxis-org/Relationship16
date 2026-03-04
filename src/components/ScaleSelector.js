'use client';

import styles from './ScaleSelector.module.css';

/**
 * 5段階選択コンポーネント
 * 
 * 丸のサイズ:
 * - 大: はい (+2)、いいえ (-2)
 * - 中: どちらかというとはい (+1)、どちらかというといいえ (-1)
 * - 小: どちらでもない (0)
 */

const options = [
  { value: 2, label: 'はい', subLabel: '', size: 'large', type: 'positive' },
  { value: 1, label: 'どちらか', subLabel: 'というとはい', size: 'medium', type: 'positive' },
  { value: 0, label: 'どちらでも', subLabel: 'ない', size: 'small', type: 'neutral' },
  { value: -1, label: 'どちらか', subLabel: 'というといいえ', size: 'medium', type: 'negative' },
  { value: -2, label: 'いいえ', subLabel: '', size: 'large', type: 'negative' },
];

export default function ScaleSelector({ value, onChange, variant = 'default', disabled = false }) {
  return (
    <div className={`${styles.container} ${styles[variant]} ${disabled ? styles.disabled : ''}`}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => !disabled && onChange(option.value)}
          disabled={disabled}
          className={`${styles.option} ${styles[option.size]} ${styles[option.type]} ${
            value === option.value ? styles.selected : ''
          } ${disabled ? styles.optionDisabled : ''}`}
        >
          <div className={styles.circle}>
            <div className={styles.inner} />
          </div>
          <div className={styles.label}>
            <span className={styles.mainLabel}>{option.label}</span>
            {option.subLabel && (
              <span className={styles.subLabel}>{option.subLabel}</span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
