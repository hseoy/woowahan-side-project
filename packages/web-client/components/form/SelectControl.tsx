import {
  Control,
  Path,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form';
import FormControl from './FormControl';

type SelectControlProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  placeholder?: string;
  selectOptions: { name: string; value: string }[];
  onChangeValue?: (value: string) => void;
} & UseControllerProps['rules'];

function SelectControl<TFieldValues extends FieldValues>(
  props: SelectControlProps<TFieldValues>,
): JSX.Element {
  return <FormControl {...props} inputType="select" />;
}

export default SelectControl;
