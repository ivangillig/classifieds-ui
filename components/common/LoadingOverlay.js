// app/components/LoadingOverlay.js
import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

const LoadingOverlay = () => {
  return (
    <div style={styles.overlay}>
      <ProgressSpinner />
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
};

export default LoadingOverlay;
