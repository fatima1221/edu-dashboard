import { FilterPanel } from "../../../components/filter/FilterPanel";
import type { FilterField } from "../../../components/filter/types";
import DataTable from "../../../components/ui/DataTable";
import type { Column } from "../../../components/ui/DataTable";
import { useFilters } from "../../../components/filter/useFilters";
import { useGetUniversitiesQuery } from "../universitiesApi";
import type { University, UniversityFilters } from "../types";

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
      />
    </>
  );
}
