import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const ModalComp = React.forwardRef(({ children }, ref) => {
  const childArr = React.Children.toArray(children);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const toggleModal = () => setIsOpen(!modalIsOpen);

  const modalTriggerComp = React.cloneElement(childArr[0], { onClick: toggleModal });

  React.useImperativeHandle(ref, () => ({
    toggleModal: () => {
      toggleModal();
    },
  }));

  return (
    <React.Fragment>
      {modalTriggerComp}
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        //onAfterOpen={afterOpenModal}
        onRequestClose={toggleModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {childArr[1]}
      </Modal>
    </React.Fragment>
  );
});

export default ModalComp;
