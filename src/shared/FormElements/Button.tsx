import { Link, type LinkProps } from "react-router";
import "./Button.css";

type ButtonSize = "small" | "default" | "large";
type ButtonType = "button" | "submit" | "reset";

interface ButtonProps {
  children?: React.ReactNode;
  size?: ButtonSize;
  inverse?: boolean;
  danger?: boolean;
  disabled?: boolean;
  type?: ButtonType;
  href?: string;
  to?: string;
  onClick?: () => void;
}

export default function Button(props: ButtonProps) {
  const classes = `button button--${props.size || "default"} ${
    props.inverse ? "button--inverse" : ""
  } ${props.danger ? "button--danger" : ""}`.trim();

  if (props.href) {
    return (
      <a className={classes} href={props.href}>
        {props.children}
      </a>
    );
  }

  if (props.to) {
    // React Router v6 Link props
    const linkProps: LinkProps = { to: props.to, className: classes };
    return <Link {...linkProps}>{props.children}</Link>;
  }

  return (
    <button
      className={classes}
      type={props.type || "button"}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
