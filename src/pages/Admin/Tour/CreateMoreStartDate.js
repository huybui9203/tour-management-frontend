import Modal from "../../../components/Modal/Modal";

const CreateMoreStartDate = ({ open, onClose, id }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="bg-white p-6 rounded-lg shadow-lg mx-auto">
        <h1 className="font-bold text-xl text-gray-800 mb-4">Thêm ngày khởi hành</h1>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Ngày khởi hành</label>
            <input
              type="date"
              className="block w-full rounded-md border-0 py-2 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Ngày kết thúc</label>
            <input
              type="date"
              className="block w-full rounded-md border-0 py-2 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-400"
          >
            Hủy
          </button>
          <button
            className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
          >
            Thêm
          </button>
        </div>
      </div>
    </Modal>

  );
};

export default CreateMoreStartDate;
