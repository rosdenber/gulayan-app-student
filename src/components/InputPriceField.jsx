const formatPHP = (digits) => {
  if (!digits) return "";
  const n = Number(digits);
  if (Number.isNaN(n)) return "";
  return "₱" + n.toLocaleString("en-PH"); // comma-separated
};

const toDigits = (value) => (value || "").replace(/[^\d]/g, "");

export default function InputPriceField({
  formData, setFormData, className, placeholder, id, name,
  value, onChange
}) {
  // Support both prop patterns:
  //   1) formData + setFormData + name  (original)
  //   2) value + onChange               (used by modals)
  const currentValue = value !== undefined ? value : formData?.[name];

  const handlePriceChange = (e) => {
    const digits = toDigits(e.target.value);
    if (onChange) {
      onChange(digits);
    } else if (setFormData && name) {
      setFormData((prev) => ({ ...prev, [name]: digits }));
    }
  };

  const textboxStyle = className ? className : "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none";

  return (
    <input
      type="text"
      id={id}
      inputMode="numeric"
      autoComplete="off"
      value={formatPHP(currentValue)}
      onChange={handlePriceChange}
      className={textboxStyle}
      placeholder={placeholder}
    />
  );
}