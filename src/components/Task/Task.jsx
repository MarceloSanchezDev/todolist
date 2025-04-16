export default function Task({ children }) {
  return (
    <div className="border border-2 rounded p-3 mb-3 d-flex flex-column flex-sm-row justify-content-between align-items-center w-100">
      {children}
    </div>
  );
}
