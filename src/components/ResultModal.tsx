import Modal from 'react-modal';

interface Props {
  isOpen: boolean;
  close: () => void;
  startNewGame: () => void;
  winner: string | null;
}

const ResultModal = ({ isOpen, close, startNewGame, winner }: Props) => {
  return (
    <Modal
      className="result-modal"
      isOpen={isOpen}
      onRequestClose={close}
      ariaHideApp={false}
      style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.6)' } }}
    >
      <div className="modal-wrapper">
        <p className="modal-title">Game Over</p>
        <p className="modal-content">{winner}</p>

        <div className="modal-footer">
          <button className="modal-button" type="button" onClick={close}>
            Close
          </button>
          <button className="modal-button" type="button" onClick={startNewGame}>
            Start Over
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ResultModal;
