import React from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const LightboxModal = ({ isOpen, currentIndex, images = [], onClose }) => {
  return (
    <Lightbox
      open={isOpen}
      close={onClose}
      index={currentIndex}
      slides={images.map(img => ({ src: img.imageUrl, alt: img.title }))}
      carousel={{ finite: false }}
    />
  );
};

export default LightboxModal;
