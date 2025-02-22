import MedicineCard from "./MedicineCard";

export default function MedicineList({ medicines, searchQuery, filterStatus, ...rest }) {
  const filteredMedicines = medicines.filter((med) => {
    const matchesSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          med.brandName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "All" || med.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredMedicines.map((med) => (
        <MedicineCard key={med.id} med={med} {...rest} />
      ))}
    </div>
  );
}