import "./Avatar.css";

interface AvatarList {
  image: string;
  alt: string;
  width?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function Avatar(props: AvatarList) {
  return (
    <div className={`avatar ${props.className}`} style={props.style}>
      <img
        src={props.image}
        alt={props.alt}
        style={{ width: props.width, height: props.width }}
      />
    </div>
  );
}
