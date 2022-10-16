import {
  FormControl as ChakraFormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import {
  Control,
  Path,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';

type FormControlProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
} & UseControllerProps['rules'];

function FormControl<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  placeholder = '',
  type = 'text',
  ...rules
}: FormControlProps<TFieldValues>): JSX.Element {
  const {
    field: { ref, onChange, value, ...inputProps },
    fieldState: { error },
  } = useController<TFieldValues>({
    name,
    control,
    rules: {
      ...rules,
      required:
        rules.required === true
          ? `${label} 입력이 누락되었습니다`
          : rules.required,
    },
  });

  return (
    <ChakraFormControl
      isRequired={!!rules.required}
      isInvalid={!!error?.message}
    >
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input
        {...inputProps}
        name={name}
        ref={ref}
        placeholder={placeholder}
        onChange={onChange}
        value={value || ''}
        focusBorderColor="mint.500"
        type={type}
      />
      {error && <FormErrorMessage>{error?.message}</FormErrorMessage>}
    </ChakraFormControl>
  );
}

export default FormControl;
