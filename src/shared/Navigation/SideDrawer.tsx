import { CSSTransition } from "react-transition-group";
import ReactDOM from "react-dom";
import { useRef, type ReactNode } from "react";
import "./SideDrawer.css";

interface SideDrawerProps {
  children: ReactNode;
  show: boolean;
  onClick?: () => void;
}

export default function SideDrawer({
  children,
  show,
  onClick,
}: SideDrawerProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const mount = document.getElementById("drawer-hook");

  if (!mount) {
    console.warn("SideDrawer: #drawer-hook not found in DOM");
    return null;
  }

  return ReactDOM.createPortal(
    <CSSTransition
      in={show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
      nodeRef={nodeRef}
    >
      <aside ref={nodeRef} className="side-drawer" onClick={onClick}>
        {children}
      </aside>
    </CSSTransition>,
    mount
  );
}
