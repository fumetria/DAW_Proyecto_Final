"use client";
import { useState } from "react";
import { createPortal } from "react-dom";

type ModalChildrenProps = {
  handleCloseModal: () => void;
};

type ModalChildren = (props: ModalChildrenProps) => React.ReactNode;

function ModalContent({
  onClose,
  children,
  closeBtn,
  handleCloseModal,
}: {
  onClose: () => void;
  closeBtn?: boolean;
  handleCloseModal: () => void;
  children: ModalChildren;
}) {
  return (
    <div className="bg-white p-4 rounded shadow-xl z-50">
      <div>{children({ handleCloseModal })}</div>
      {closeBtn ? (
        <button
          onClick={onClose}
          className="mt-4 px-2 py-1 rounded bg-red-700 hover:ring hover:text-red-700 hover:bg-red-200 ring-red-700 text-stone-100"
        >
          Close
        </button>
      ) : null}
    </div>
  );
}

/**
 * Modal window
 *
 * @param {string} wLabel Modal window tittle
 * @param {string} btnLabel Modal button text
 * @param {string} btnIcon Modal button icon
 * @param {string} btnStyle Modal button style
 * @param {HTMLElement} children HTML elements to show inside the modal
 * @param {boolean} windowX Show a X in the modal header to close modal
 * @param {boolean} closeBtn Show a button to close the modal inside de modal content
 * @returns button with modal window
 */
export default function Modal({
  wLabel,
  btnLabel,
  btnIcon,
  btnStyle,
  children,
  windowX,
  closeBtn,
}: {
  wLabel: string;
  btnLabel: string;
  btnIcon: React.ReactElement;
  btnStyle: string;
  children: ModalChildren;
  windowX: boolean;
  closeBtn?: boolean;
}) {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={btnStyle ? btnStyle : "bg-green-500 text-xl rounded p-2"}
        title={btnLabel}
      >
        {btnIcon}
        {btnLabel}
      </button>

      {showModal &&
        createPortal(
          <div className="fixed inset-0 flex items-center justify-center border-b border-stone-300 bg-black/40 z-50">
            <div className="w-64 rounded shadow bg-white">
              <div
                id="modal-header"
                className="flex justify-between bg-stone-600 text-white p-2 rounded-t"
              >
                {wLabel}
                {windowX ? (
                  <button
                    onClick={() => setShowModal(false)}
                    className="cursor-pointer hover:font-semibold"
                  >
                    X
                  </button>
                ) : null}
              </div>

              <ModalContent
                onClose={() => setShowModal(false)}
                closeBtn={closeBtn}
                handleCloseModal={handleCloseModal}
              >
                {children}
              </ModalContent>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
