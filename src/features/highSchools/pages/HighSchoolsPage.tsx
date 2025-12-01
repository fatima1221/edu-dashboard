import React, { useMemo } from "react";
import { FilterPanel } from "../../../components/filter/FilterPanel";
import type { FilterField } from "../../../components/filter/types";
import DataTable from "../../../components/ui/DataTable";
import type { Column } from "../../../components/ui/DataTable";
import { useFilters } from "../../../components/filter/useFilters";
import {
  useGetHighSchoolsQuery,
  useDeleteHighSchoolMutation,
} from "../highSchoolsApi";
import type { HighSchool, HighSchoolFilters } from "../types";
import ConfirmDialog from "../../../components/ui/ConfirmDialog";

export default function HighSchoolsPage() {
  const fields = useMemo<FilterField[]>(
    () => [
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
    ],
    []
  );

  const columns = useMemo<Column<HighSchool>[]>(
    () => [
      { key: "name", header: "Name" },
      { key: "city", header: "City" },
      { key: "district", header: "District" },
      { key: "specialization", header: "Specialization" },
      {
        key: "hasDormitory",
        header: "Dormitory",
        render: (hs) => (hs.hasDormitory ? "Yes" : "No"),
      },
    ],
    []
  );

  const { filters, updateFilter, clearFilters } = useFilters<HighSchoolFilters>(
    {
      search: "",
      city: "",
      district: "",
      specialization: undefined,
      hasDormitory: undefined,
    }
  );

  const { data = [], isLoading } = useGetHighSchoolsQuery(filters);
  const [deleteHighSchool] = useDeleteHighSchoolMutation();

  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [selectedHighSchool, setSelectedHighSchool] =
    React.useState<HighSchool | null>(null);

  const handleDeleteClick = (highSchool: HighSchool) => {
    setSelectedHighSchool(highSchool);
    setConfirmOpen(true);
  };
  const handleConfirmDelete = async () => {
    if (!selectedHighSchool) return;
    await deleteHighSchool(selectedHighSchool.id);
    setConfirmOpen(false);
    setSelectedHighSchool(null);
  };
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
        onDelete={handleDeleteClick}
        loading={isLoading}
      />
      <ConfirmDialog
        open={confirmOpen}
        title="Delete High School"
        message={`Are you sure you want to delete the high school "${selectedHighSchool?.name}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}
