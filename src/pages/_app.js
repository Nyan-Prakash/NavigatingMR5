import '@/styles/globals.css';
import React from 'react';
import { motion } from 'framer-motion';

function NavigatingMR5({ Component, pageProps, router }) {
  return (
    <motion.div
      key={router.route}
      initial="pageInitial"
      animate="pageAnimate"
      variants={{
        pageInitial: {
          opacity: 0
        },
        pageAnimate: {
          opacity: 1,
          transition: {
            duration: 0.3
          }
        }
      }}
    >
      <Component {...pageProps} />
    </motion.div>
  );
}

export default NavigatingMR5;