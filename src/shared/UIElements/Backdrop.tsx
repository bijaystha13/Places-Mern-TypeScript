import ReactDOM from "react-dom";

import "./Backdrop.css";

interface BackdropProps {
  onClick?: () => void;
}

export default function Backdrop(props: BackdropProps) {
  const mount = document.getElementById("backdrop-hook");

  if (!mount) {
    console.warn("Backdrop: #backdrop-hook not found in DOM");
    return null;
  }

  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick} />,
    mount
  );
}
