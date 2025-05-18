export const Input = ({ label, type = 'text', name, value, onChange, error, ...props }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>{label}</label>}
      <input
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error ? 'border-red-500' : ''}`}
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        {...props}
      />
      {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
    </div>
  );
};