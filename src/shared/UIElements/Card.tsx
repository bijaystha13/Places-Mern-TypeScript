import "./Card.css";

interface CardList {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export default function Card(props: CardList) {
  return (
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
}
