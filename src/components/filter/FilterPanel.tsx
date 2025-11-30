import {
  Paper,
  TextField,
  MenuItem,
  Button,
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import type { FilterField } from "./types";

interface Props<T extends object> {
  title?: string;
  filters: T;
  fields: FilterField[];
  onChange: (key: keyof T, value: any) => void;
  onClear?: () => void;
}

export function FilterPanel<T extends object>({
  title,
  filters,
  fields,
  onChange,
  onClear,
}: Props<T>) {
  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      {title && (
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          {title}
        </Typography>
      )}

      <Grid container spacing={2}>
        {fields.map((f) => {
          const value = (filters as any)[f.name] ?? "";

          switch (f.type) {
            case "text":
            case "number":
              return (
                <TextField
                  key={f.name}
                  label={f.label}
                  type={f.type}
                  value={value}
                  onChange={(e) =>
                    onChange(
                      f.name as keyof T,
                      f.type === "number"
                        ? e.target.value === ""
                          ? undefined
                          : Number(e.target.value)
                        : e.target.value
                    )
                  }
                  sx={{ minWidth: 200 }}
                />
              );

            case "date":
              return (
                <TextField
                  key={f.name}
                  label={f.label}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={value || ""}
                  onChange={(e) =>
                    onChange(
                      f.name as keyof T,
                      e.target.value === "" ? undefined : e.target.value
                    )
                  }
                  sx={{ minWidth: 200 }}
                />
              );

            case "select":
              return (
                <TextField
                  key={f.name}
                  label={f.label}
                  select
                  value={value}
                  onChange={(e) => onChange(f.name as keyof T, e.target.value)}
                  sx={{ minWidth: 200 }}
                >
                  <MenuItem value="">All</MenuItem>
                  {f.options.map((o) => (
                    <MenuItem key={o.value} value={o.value}>
                      {o.label}
                    </MenuItem>
                  ))}
                </TextField>
              );

            case "checkbox":
              return (
                <FormControlLabel
                  key={f.name}
                  control={
                    <Checkbox
                      checked={!!value}
                      onChange={(e) =>
                        onChange(f.name as keyof T, e.target.checked)
                      }
                    />
                  }
                  label={f.label}
                />
              );

            default:
              return null;
          }
        })}
      </Grid>

      {onClear && (
        <Button sx={{ mt: 2 }} variant="outlined" onClick={onClear}>
          Clear Filters
        </Button>
      )}
    </Paper>
  );
}
