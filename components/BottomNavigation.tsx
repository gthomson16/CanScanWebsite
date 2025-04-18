'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { FiHome, FiSearch, FiCamera } from 'react-icons/fi';
import { IoBarcodeOutline } from 'react-icons/io5';
import styles from './BottomNavigation.module.css';

const BottomNavigation = () => {
  const pathname = usePathname();
  const t = useTranslations('BottomNavigation');
  const tCTA = useTranslations('DownloadCTA'); // Add separate hook for DownloadCTA namespace

  const isActive = (path: string) => {
    return pathname === path;
  };
  
  return (
    <nav className={styles.bottomNav}>
      <Link href="/" className={`${styles.navItem} ${isActive('/') ? styles.active : ''}`}>
        <FiHome className={styles.icon} />
        <span>{t('home')}</span>
      </Link>

      {/* Disabled Barcode Scan */}
      <div className={`${styles.navItem} ${styles.disabledItem} opacity-50 cursor-not-allowed`}>
        <IoBarcodeOutline className={styles.icon} />
        <span>{t('barcodeScanner')}</span>
        <span className={styles.comingSoonText}>{tCTA('comingSoon')}</span> {/* Use tCTA */}
      </div>

      {/* Disabled Image Scan */}
      <div className={`${styles.navItem} ${styles.disabledItem} opacity-50 cursor-not-allowed`}>
        <FiCamera className={styles.icon} />
        <span>{t('imageScanner')}</span>
        <span className={styles.comingSoonText}>{tCTA('comingSoon')}</span> {/* Use tCTA */}
      </div>

      <Link href="/product-search" className={`${styles.navItem} ${isActive('/product-search') ? styles.active : ''}`}>
        <FiSearch className={styles.icon} />
        <span>{t('search')}</span>
      </Link>
    </nav>
  );
};

export default BottomNavigation;
