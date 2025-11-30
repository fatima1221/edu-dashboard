import React from "react";
import { FilterPanel } from "../../../components/filter/FilterPanel";
import type { FilterField } from "../../../components/filter/types";
import DataTable from "../../../components/ui/DataTable";
import type { Column } from "../../../components/ui/DataTable";
import { useFilters } from "../../../components/filter/useFilters";
import {
  useGetUniversitiesQuery,
  useDeleteUniversityMutation,
} from "../universitiesApi";
import type { University, UniversityFilters } from "../types";
import ConfirmDialog from "../../../components/ui/ConfirmDialog";

const fields: FilterField[] = [
  { type: "text", name: "name", label: "University Name" },
  { type: "number", name: "yearFrom", label: "From Year" },
  { type: "number", name: "yearTo", label: "To Year" },
];

const columns: Column<University>[] = [
  { key: "name", header: "Name" },
  { key: "city", header: "City" },
  { key: "district", header: "District" },
  { key: "establishedYear", header: "Established" },
  {
    key: "corpora",
    header: "Corpora",
    render: (u) => u.corpora?.map((c) => c.name).join(", ") ?? "—",
  },
];

export default function UniversitiesPage() {
  const { filters, updateFilter, clearFilters } = useFilters<UniversityFilters>(
    {
      name: "",
      yearFrom: undefined,
      yearTo: undefined,
    }
  );

  const { data = [], isLoading } = useGetUniversitiesQuery(filters);
  const [deleteUniversity] = useDeleteUniversityMutation();

  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [selectedUniversity, setSelectedUniversity] =
    React.useState<University | null>(null);

  const handleDeleteClick = (university: University) => {
    setSelectedUniversity(university);
    setConfirmOpen(true);
  };
  const handleConfirmDelete = async () => {
    if (!selectedUniversity) return;
    await deleteUniversity(selectedUniversity.id);
    setConfirmOpen(false);
    setSelectedUniversity(null);
  };

  return (
    <>
      <FilterPanel
        title="University Filters"
        filters={filters}
        fields={fields}
        onChange={updateFilter}
        onClear={clearFilters}
      />

      <DataTable
        title="Universities"
        rows={isLoading ? [] : data}
        columns={columns}
        onDelete={handleDeleteClick}
      />
      <ConfirmDialog
        open={confirmOpen}
        title="Delete University"
        message={`Are you sure you want to delete the university "${selectedUniversity?.name}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}
