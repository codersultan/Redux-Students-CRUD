import { LiaTimesSolid } from "react-icons/lia";

const Modal = ({ title, children }) => {
  return (
    <div
      className="modal-wrapper toggle-close bg-white/80 fixed left-0 top-0 w-full h-full flex justify-center items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal w-10/12 md:w-3/12 bg-white shadow-lg rounded-xl">
        <div className="modal-head px-5 py-3 border-b flex justify-between items-center">
          <h2 id="modal-title" className="text-xl font-semibold">
            {title && title}
          </h2>
          <button
            className="toggle-close p-2 rounded-full border bg-slate-200 hover:bg-slate-300"
            aria-label="Close modal"
          >
            <LiaTimesSolid className="toggle-close" />
          </button>
        </div>
        <div className="modal-body p-5 pb-8">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
