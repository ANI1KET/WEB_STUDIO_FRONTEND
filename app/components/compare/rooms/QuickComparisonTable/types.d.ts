import { RoomData } from "@/app/types/types";
import { SortableField } from "@/app/types/sortableField";

export interface ComparisonField<Key extends keyof RoomData> {
  key: Key;
  label: string;
  format: (value: RoomData[Key], room: RoomData) => string;
}

export interface ComparisonTableProps {
  rooms: RoomData[];
  isExpanded: boolean;
  fieldsToShow: Array<ComparisonField<keyof RoomData>>;
}

export interface TableRowProps {
  rooms: RoomData[];
  field: ComparisonField<keyof RoomData>;
}

export interface ComparisonHeaderProps {
  rooms: RoomData[];
  isExpanded: boolean;
  selectedCity: string;
  sortBy: SortableField;
  sortOrder: "asc" | "desc";
  onToggleExpanded: () => void;
  onCityChange: (value: string) => void;
  onSortChange: (value: SortableField) => void;
  onSortOrderChange: (value: "asc" | "desc") => void;
}

export interface SortingControlsProps {
  sortBy: SortableField;
  sortOrder: "asc" | "desc";
  onSortChange: (value: SortableField) => void;
  onSortOrderChange: (value: "asc" | "desc") => void;
}
