import MedicineCard from "./MedicineCard";

export default function MedicineList({ medicines, searchQuery, filterStatus, ...rest }) {
  const filteredMedicines = medicines.filter((med) => {
    const matchesSearch = med.medicine_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          med.brand_name.toLowerCase().includes(searchQuery.toLowerCase());
    const getByFilter = filterStatus === 'All' ? true : (filterStatus === 'Available' ? med.quantity > 0: (filterStatus === 'Low Quantity' ? med.quantity > 0 && med.quantity <= med.reorder_level : med.quantity === 0))
    return matchesSearch && getByFilter;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-15">
      {filteredMedicines.map((med) => (
        <MedicineCard key={med.id} med={med} {...rest} />
      ))}
    </div>
  );
}