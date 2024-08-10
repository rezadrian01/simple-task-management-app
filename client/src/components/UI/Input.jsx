export default function Input({ label, id, textarea, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id}>{label}</label>
      {!textarea && (
        <input
          className="focus:outline-none text-slate-800 px-2 py-1 rounded"
          id={id}
          {...props}
          required
        />
      )}
      {textarea && (
        <textarea
          className="focus:outline-none text-slate-800 px-2 py-1 rounded"
          id={id}
          {...props}
          required
        />
      )}
    </div>
  );
}
