import { motion } from 'framer-motion';

const Reveal = ({ children, width = 'fit-content', delay = 0 }) => {
  return (
    <div style={{ position: 'relative', width, overflow: 'visible' }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7, delay: delay, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Reveal;

