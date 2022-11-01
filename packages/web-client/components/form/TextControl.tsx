import { InputProps } from '@chakra-ui/react';
import { Control, Path, FieldValues } from 'react-hook-form';
import FormControl from './FormControl';

type TextControlProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  placeholder?: string;
  onChangeValue?: (value: string) => void;
  requiredMsg?: string;
  renderLabelRight?: React.ReactNode;
} & InputProps;

function TextControl<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  onChangeValue,
  requiredMsg,
  renderLabelRight,
  ...inputProps
}: TextControlProps<TFieldValues>): JSX.Element {
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
        inputProps,
        rules: { required: inputProps.isRequired },
      }}
    />
  );
}

export default TextControl;
