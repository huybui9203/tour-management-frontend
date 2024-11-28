import Modal from "./Modal/Modal";

const Dialog = ({ open, onClose, onConfirm, msg, hiddenBtnCancel=false }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
          <h1 className="text-lg font-semibold text-gray-800 mb-4">{msg}</h1>
          <div className="flex justify-end space-x-3">
            {!hiddenBtnCancel && <button
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded"
              onClick={onClose}
            >
              Hủy
            </button>}
            
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              onClick={onConfirm}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Dialog;
