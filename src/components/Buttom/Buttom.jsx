export default function Button({ children, onClick, bootstrapClass, type }) {
  return (
    <button type={type} className={bootstrapClass} onClick={onClick}>
      {children}
    </button>
  );
}
