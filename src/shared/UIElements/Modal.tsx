import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./Modal.css";
import Backdrop from "./Backdrop";
import { useRef } from "react";

interface ModalProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  headerClass?: string;
  header: string;
  onSubmit?: () => void;
  contentClass?: string;
  footerClass?: string;
  footer?: React.ReactNode;
  show: boolean;
  onCancel: () => void;
}

export default function Modal(props: ModalProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const mount = document.getElementById("modal-hook");

  if (!mount) {
    console.warn("Modal: #modal-hook not found in DOM");
    return null;
  }

  const modalContent = (
    <div
      ref={nodeRef}
      className={`modal ${props.className || ""}`}
      style={props.style}
    >
      <header className={`modal__header ${props.headerClass || ""}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`modal__content ${props.contentClass || ""}`}>
          {props.children}
        </div>
        {props.footer && (
          <footer className={`modal__footer ${props.footerClass || ""}`}>
            {props.footer}
          </footer>
        )}
      </form>
    </div>
  );

  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
        nodeRef={nodeRef}
      >
        <>{ReactDOM.createPortal(modalContent, mount)}</>
      </CSSTransition>
    </>
  );
}
