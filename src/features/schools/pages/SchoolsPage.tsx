import { FilterPanel } from "../../../components/filter/FilterPanel";
import type { FilterField } from "../../../components/filter/types";
import DataTable from "../../../components/ui/DataTable";
import type { Column } from "../../../components/ui/DataTable";
import { useFilters } from "../../../components/filter/useFilters";
import { useGetSchoolsQuery } from "../schoolsApi";
import type { School, SchoolFilters } from "../types";

const fields: FilterField[] = [
  { type: "text", name: "search", label: "Search" },
  { type: "text", name: "city", label: "City" },
  { type: "text", name: "district", label: "District" },
  {
    type: "select",
    name: "type",
    label: "Type",
    options: [
      { value: "primary", label: "Primary" },
      { value: "secondary", label: "Secondary" },
      { value: "highschool", label: "Highschool" },
    ],
  },
  { type: "number", name: "minStudents", label: "Min Students" },
  { type: "number", name: "maxStudents", label: "Max Students" },
];

const columns: Column<School>[] = [
  { key: "name", header: "Name" },
  { key: "city", header: "City" },
  { key: "district", header: "District" },
  { key: "type", header: "Type" },
  { key: "studentCount", header: "Students" },
];

export default function SchoolsPage() {
  const { filters, updateFilter, clearFilters } = useFilters<SchoolFilters>({
    search: "",
    city: "",
    district: "",
    minStudents: undefined,
    maxStudents: undefined,
  });

  const { data = [], isLoading } = useGetSchoolsQuery(filters);

  return (
    <>
      <FilterPanel
        title="School Filters"
        filters={filters}
        fields={fields}
        onChange={updateFilter}
        onClear={clearFilters}
      />

      <DataTable
        title="Schools"
        rows={isLoading ? [] : data}
        columns={columns}
      />
    </>
  );
}
