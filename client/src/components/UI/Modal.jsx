import { createPortal } from "react-dom";

export default function Modal({ children, onClose, ...props }) {
  return createPortal(
    <>
      <div className="bg-black/50 fixed inset-0 z-10" onClick={onClose} />
      <dialog
        className="z-20 mt-32 p-4 bg-emerald-800 rounded text-slate-100 w-11/12 md:w-1/2 lg:w-1/3"
        open
        onClose={onClose}
        {...props}
      >
        {children}
      </dialog>
    </>,
    document.getElementById("modal-root")
  );
}
