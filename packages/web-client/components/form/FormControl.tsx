import {
  FormControl as ChakraFormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import React from 'react';
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
  inputType?: 'input' | 'select';
  selectOptions?: { name: string; value: string }[];
  onChangeValue?: (value: string) => void;
} & UseControllerProps['rules'];

function FormControl<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  placeholder = '',
  type = 'text',
  inputType = 'input',
  selectOptions = [],
  onChangeValue,
  ...rules
}: FormControlProps<TFieldValues>): JSX.Element {
  const {
    field: { ref, onChange: onControlChange, value, ...inputProps },
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

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    if (onChangeValue) {
      onChangeValue(e.target.value);
    }
    onControlChange(e);
  };

  return (
    <ChakraFormControl
      isRequired={!!rules.required}
      isInvalid={!!error?.message}
    >
      <FormLabel htmlFor={name}>{label}</FormLabel>
      {inputType === 'input' ? (
        <Input
          {...inputProps}
          name={name}
          ref={ref}
          placeholder={placeholder}
          onChange={onChangeHandler}
          value={value || ''}
          focusBorderColor="mint.500"
          type={type}
        />
      ) : (
        <Select
          {...inputProps}
          name={name}
          ref={ref}
          placeholder={placeholder}
          onChange={onChangeHandler}
          value={value || ''}
          focusBorderColor="mint.500"
        >
          {selectOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </Select>
      )}
      {error && <FormErrorMessage>{error?.message}</FormErrorMessage>}
    </ChakraFormControl>
  );
}

export default FormControl;
