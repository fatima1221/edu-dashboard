import React, { useMemo } from "react";
import { FilterPanel } from "../../../components/filter/FilterPanel";
import type { FilterField } from "../../../components/filter/types";
import DataTable from "../../../components/ui/DataTable";
import type { Column } from "../../../components/ui/DataTable";
import { useFilters } from "../../../components/filter/useFilters";
import { useDeleteSchoolMutation, useGetSchoolsQuery } from "../schoolsApi";
import type { School, SchoolFilters } from "../types";
import ConfirmDialog from "../../../components/ui/ConfirmDialog";
import { useDebouncedValue } from "../../../hooks/useDebouncedValue";

export default function SchoolsPage() {
  const fields = useMemo<FilterField[]>(
    () => [
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
    ],
    []
  );

  const columns = useMemo<Column<School>[]>(
    () => [
      { key: "name", header: "Name" },
      { key: "city", header: "City" },
      { key: "district", header: "District" },
      { key: "type", header: "Type" },
      { key: "studentCount", header: "Students" },
    ],
    []
  );

  const { filters, updateFilter, clearFilters } = useFilters<SchoolFilters>({
    search: "",
    city: "",
    district: "",
    minStudents: undefined,
    maxStudents: undefined,
  });

  const debouncedFilters = useDebouncedValue(filters, 500);

  const { data = [], isLoading } = useGetSchoolsQuery(debouncedFilters);
  const [deleteSchool] = useDeleteSchoolMutation();

  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [selectedSchool, setSelectedSchool] = React.useState<School | null>(
    null
  );

  const handleDeleteClick = (school: School) => {
    setSelectedSchool(school);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedSchool) return;
    await deleteSchool(selectedSchool.id);
    setConfirmOpen(false);
    setSelectedSchool(null);
  };

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
        onDelete={handleDeleteClick}
        loading={isLoading}
      />

      <ConfirmDialog
        open={confirmOpen}
        title="Delete School"
        message={`Are you sure you want to delete the school "${selectedSchool?.name}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}
