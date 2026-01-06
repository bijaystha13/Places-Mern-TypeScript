import "./MainHeader.css";

interface MainHeaderProps {
  children: React.ReactNode;
}

export default function MainHeader(props: MainHeaderProps) {
  return <header className="main-header">{props.children}</header>;
}
