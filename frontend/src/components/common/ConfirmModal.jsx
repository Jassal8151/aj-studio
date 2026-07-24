import React from 'react';
import Modal from './Modal';
import Button from './Button';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', cancelText = 'Cancel', isDestructive = false, isLoading = false }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-md">
      <div className="py-4">
        <p className="text-gray-600">{message}</p>
      </div>
      <div className="mt-6 flex justify-end gap-3 border-t pt-4">
        <Button variant="outline" onClick={onClose} disabled={isLoading}>
          {cancelText}
        </Button>
        <Button 
          variant={isDestructive ? 'danger' : 'primary'} 
          onClick={onConfirm}
          isLoading={isLoading}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
