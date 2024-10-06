import Modal from "./Modal/Modal"
const Dialog = ({open, onClose, onConfirm, msg }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <div className="fixed bg-white">
                <h1>{msg}</h1>
                <button onClick={() => onClose()}>Hủy</button>
                <button onClick={() => onConfirm()}>Xác nhận</button>
            </div>
        </Modal>
    )
}

export default Dialog
