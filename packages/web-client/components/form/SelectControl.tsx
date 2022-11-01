import { SelectProps } from '@chakra-ui/react';
import { Control, Path, FieldValues } from 'react-hook-form';
import FormControl from './FormControl';

type SelectControlProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  placeholder?: string;
  selectOptions: { name: string; value: string }[];
  onChangeValue?: (value: string) => void;
  renderLabelRight?: React.ReactNode;
  requiredMsg?: string;
} & SelectProps;

function SelectControl<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  onChangeValue,
  requiredMsg,
  renderLabelRight,
  selectOptions,
  ...selectProps
}: SelectControlProps<TFieldValues>): JSX.Element {
  return (
    <FormControl
      {...{
        name,
        control,
        label,
        placeholder,
        onChangeValue,
        requiredMsg,
        renderLabelRight,
        selectProps,
        selectOptions,
      }}
      inputType="select"
      rules={{
        required: selectProps.isRequired,
      }}
    />
  );
}

export default SelectControl;
