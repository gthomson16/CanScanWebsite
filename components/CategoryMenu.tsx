'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import styles from './CategoryMenu.module.css';

interface CategoryNode {
  name: string;
  children: CategoryNode[];
  productCount?: number; // Add optional product count
}

interface CategoryMenuProps {
  categoryTree: CategoryNode[]; // The full category tree
  selectedCategoryPath: string[]; // Array of selected category names for each level
  onCategorySelect: (categoryPath: string[]) => void; // Callback when a category is selected
  className?: string;
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({
  categoryTree,
  selectedCategoryPath,
  onCategorySelect,
  className = '',
}) => {
  const t = useTranslations('ProductSearchPage');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Current selected path display
  const displayPath = selectedCategoryPath.filter(Boolean).join(' > ') || t('allCategories');
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Handle selecting a category at a specific level
  const handleCategorySelect = (categoryPath: string[], isLeaf: boolean = false) => {
    onCategorySelect(categoryPath);
    if (isLeaf) {
      setIsMenuOpen(false); // Close menu if it's a leaf node
    }
  };
  
  // Reset categories
  const handleReset = () => {
    onCategorySelect([]);
    setIsMenuOpen(false);
  };
  
  // Get the current visible nodes based on selected path
  const getCurrentNodes = (): { nodes: CategoryNode[], currentPath: string[] } => {
    let current = categoryTree;
    let path: string[] = [];
    
    // Traverse the category tree based on selected path
    for (let i = 0; i < selectedCategoryPath.length; i++) {
      const categoryName = selectedCategoryPath[i];
      if (!categoryName) continue;
      
      const foundNode = current.find(node => node.name === categoryName);
      if (foundNode && foundNode.children && foundNode.children.length > 0) {
        path.push(categoryName);
        current = foundNode.children;
      } else {
        break;
      }
    }
    
    return { nodes: current, currentPath: path };
  };
  
  // Format number for display (e.g., 1,234)
  const formatCount = (count: number | undefined): string => {
    if (count === undefined) return "";
    return `${count.toLocaleString()} ${t('productsCountLabel')}`;
  };
  
  // Get the current level being displayed
  const currentLevel = selectedCategoryPath.filter(Boolean).length;
  const { nodes: currentNodes, currentPath } = getCurrentNodes();
  
  return (
    <div className={`${styles.categoryMenuContainer} ${className}`} ref={menuRef}>
      <button 
        className={styles.categoryMenuToggle}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-expanded={isMenuOpen}
      >
        <span className={styles.categoryPath}>{displayPath}</span>
        <span className={styles.dropdownIcon}>{isMenuOpen ? '▲' : '▼'}</span>
      </button>
      
      {isMenuOpen && (
        <div className={styles.menuDropdown}>
          <div className={styles.menuHeader}>
            <h3>{t('categories')}</h3>
            <div>
              {selectedCategoryPath.some(Boolean) && (
                <button 
                  onClick={handleReset} 
                  className={styles.resetButton}
                >
                  ↺
                </button>
              )}
              <button 
                onClick={() => setIsMenuOpen(false)} 
                className={styles.closeButton}
              >
                ×
              </button>
            </div>
          </div>
          <div className={styles.categoryTree}>
            {/* Only show the current level */}
            <div className={`${styles.categoryLevel} ${currentLevel > 0 ? styles.nestedLevel : ''}`}>
              <ul className={styles.categoryList}>
                {currentLevel > 0 && (
                  <li className={styles.backOption}>
                    <button 
                      onClick={() => handleCategorySelect(currentPath.slice(0, -1))}
                      className={styles.backButton}
                    >
                      ← {t('backToPrevious')}
                    </button>
                  </li>
                )}
                
                {currentNodes.map(node => {
                  const nodePath = [...currentPath, node.name];
                  const hasChildren = node.children && node.children.length > 0;
                  
                  return (
                    <li key={node.name} className={styles.categoryItem}>
                      <button
                        onClick={() => handleCategorySelect(nodePath, !hasChildren)}
                        className={styles.categoryButton}
                      >
                        <span className={styles.categoryName}>{node.name}</span>
                        <div className={styles.categoryInfo}>
                          {node.productCount !== undefined && (
                            <span className={styles.categoryCount}>{formatCount(node.productCount)}</span>
                          )}
                          {hasChildren && <span className={styles.hasChildrenIndicator}>›</span>}
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryMenu; 