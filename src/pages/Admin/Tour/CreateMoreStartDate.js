import Modal from "../../../components/Modal/Modal";

const CreateMoreStartDate = ({ open, onClose, id }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <h1>Thêm ngày khởi hành</h1>
      <div className="flex">
        <label>Ngày khởi hành</label>
        <input
          type="date"
          className="block rounded-md my-2 border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <label>Ngày kết thúc</label>
        <input
          type="date"
          className="block  rounded-md my-2 border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      <button onClick={() => onClose()}>Hủy</button>

      <button>Thêm</button>
    </Modal>
  );
};

export default CreateMoreStartDate;
