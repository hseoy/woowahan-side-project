import {
  Control,
  Path,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form';
import FormControl from './FormControl';

type TextControlProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  placeholder?: string;
} & UseControllerProps['rules'];

function TextControl<TFieldValues extends FieldValues>(
  props: TextControlProps<TFieldValues>,
): JSX.Element {
  return <FormControl {...props} />;
}

export default TextControl;
