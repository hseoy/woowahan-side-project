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
} & Omit<UseControllerProps['rules'], 'pattern'>;

function UrlControl<TFieldValues extends FieldValues>(
  props: UrlControlProps<TFieldValues>,
): JSX.Element {
  const urlPattern =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/g;
  return (
    <FormControl
      {...props}
      pattern={{ value: urlPattern, message: 'URL 포맷이 올바르지 않습니다' }}
    />
  );
}

export default UrlControl;
