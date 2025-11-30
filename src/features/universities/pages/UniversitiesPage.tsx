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
import ModalComponent from "../../../components/ui/ModalComponent";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";

const fields: FilterField[] = [
  { type: "text", name: "name", label: "University Name" },
  { type: "number", name: "yearFrom", label: "From Year" },
  { type: "number", name: "yearTo", label: "To Year" },
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

  const [corporaOpen, setCorporaOpen] = React.useState(false);
  const [corporaUniversity, setCorporaUniversity] =
    React.useState<University | null>(null);

  const handleViewCorpora = (university: University) => {
    setCorporaUniversity(university);
    setCorporaOpen(true);
  };

  const columns: Column<University>[] = [
    { key: "name", header: "Name" },
    { key: "city", header: "City" },
    { key: "district", header: "District" },
    { key: "establishedYear", header: "Established" },

    {
      key: "corpora",
      header: "Corpora",
      render: (university) => (
        <Tooltip title="View corpora">
          <IconButton
            size="small"
            onClick={() => handleViewCorpora(university)}
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

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
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      <ModalComponent
        open={corporaOpen}
        title={`${corporaUniversity?.name} – Corpora`}
        onClose={() => setCorporaOpen(false)}
      >
        <ul style={{ paddingLeft: 20 }}>
          {corporaUniversity?.corpora?.map((c) => (
            <li key={c.id}>{c.name}</li>
          ))}
        </ul>
      </ModalComponent>
    </>
  );
}
