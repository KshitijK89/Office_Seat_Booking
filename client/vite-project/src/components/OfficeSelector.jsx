const OfficeSelector = ({ offices, selectedOffice, onSelect }) => {
  return (
    <select
      value={selectedOffice}
      onChange={(e) => onSelect(e.target.value)}
    >
      {offices.map((office) => (
        <option key={office.id} value={office.id}>
          {office.name}
        </option>
      ))}
    </select>
  );
};

export default OfficeSelector;