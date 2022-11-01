import { InputProps } from '@chakra-ui/react';
import { Control, Path, FieldValues } from 'react-hook-form';
import FormControl from './FormControl';

type UrlControlProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  placeholder?: string;
  onChangeValue?: (value: string) => void;
  requiredMsg?: string;
  renderLabelRight?: React.ReactNode;
} & InputProps;

function UrlControl<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  onChangeValue,
  requiredMsg,
  renderLabelRight,
  ...inputProps
}: UrlControlProps<TFieldValues>): JSX.Element {
  const urlPattern = /^http[s]?:\/\//i;
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
      }}
      rules={{
        required: inputProps.isRequired,
        pattern: { value: urlPattern, message: 'URL 포맷이 올바르지 않습니다' },
      }}
    />
  );
}

export default UrlControl;
