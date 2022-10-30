import {
  Control,
  Path,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form';
import FormControl from './FormControl';

type UrlControlProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  placeholder?: string;
  onChangeValue?: (value: string) => void;
} & UseControllerProps['rules'];

function UrlControl<TFieldValues extends FieldValues>(
  props: UrlControlProps<TFieldValues>,
): JSX.Element {
  const urlPattern = /^http[s]?:\/\//i;
  return (
    <FormControl
      {...props}
      pattern={{ value: urlPattern, message: 'URL 포맷이 올바르지 않습니다' }}
    />
  );
}

export default UrlControl;
