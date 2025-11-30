import { FilterPanel } from "../../../components/filter/FilterPanel";
import type { FilterField } from "../../../components/filter/types";
import DataTable from "../../../components/ui/DataTable";
import type { Column } from "../../../components/ui/DataTable";
import { useFilters } from "../../../components/filter/useFilters";
import { useGetHighSchoolsQuery } from "../highSchoolsApi";
import type { HighSchool, HighSchoolFilters } from "../types";

const fields: FilterField[] = [
  { type: "text", name: "search", label: "Search" },
  { type: "text", name: "city", label: "City" },
  { type: "text", name: "district", label: "District" },
  {
    type: "select",
    name: "specialization",
    label: "Specialization",
    options: [
      { value: "science", label: "Science" },
      { value: "math", label: "Math" },
      { value: "literature", label: "Literature" },
      { value: "mixed", label: "Mixed" },
    ],
  },
  { type: "checkbox", name: "hasDormitory", label: "Dormitory" },
  { type: "number", name: "minRanking", label: "Min Ranking" },
  { type: "number", name: "maxRanking", label: "Max Ranking" },
];

const columns: Column<HighSchool>[] = [
  { key: "name", header: "Name" },
  { key: "city", header: "City" },
  { key: "district", header: "District" },
  { key: "specialization", header: "Specialization" },
  {
    key: "hasDormitory",
    header: "Dormitory",
    render: (hs) => (hs.hasDormitory ? "Yes" : "No"),
  },
];

export default function HighSchoolsPage() {
  const { filters, updateFilter, clearFilters } = useFilters<HighSchoolFilters>(
    {
      search: "",
      city: "",
      district: "",
      specialization: undefined,
      hasDormitory: false,
      minRanking: undefined,
      maxRanking: undefined,
    }
  );

  const { data = [], isLoading } = useGetHighSchoolsQuery(filters);

  return (
    <>
      <FilterPanel
        title="High School Filters"
        filters={filters}
        fields={fields}
        onChange={updateFilter}
        onClear={clearFilters}
      />

      <DataTable
        title="High Schools"
        rows={isLoading ? [] : data}
        columns={columns}
      />
    </>
  );
}
