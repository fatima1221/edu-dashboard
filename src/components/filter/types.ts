export type SelectOption = {
  value: string | number;
  label: string;
};

export type FilterField =
  | { type: "text"; name: string; label: string }
  | { type: "number"; name: string; label: string }
  | { type: "date"; name: string; label: string }
  | { type: "select"; name: string; label: string; options: SelectOption[] }
  | { type: "checkbox"; name: string; label: string };
