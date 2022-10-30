import {
  FormControl as ChakraFormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import React from 'react';
import {
  Control,
  Path,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';

type ImageUploadControlProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  placeholder?: string;
  onChangeValue?: (value: unknown) => void;
} & UseControllerProps['rules'];

function ImageUploadControl<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  placeholder = '',
  onChangeValue,
  ...rules
}: ImageUploadControlProps<TFieldValues>): JSX.Element {
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

      <Input
        {...inputProps}
        name={name}
        ref={ref}
        placeholder={placeholder}
        onChange={onChangeHandler}
        value={value || ''}
        focusBorderColor="mint.500"
        type="file"
        accept="image/*"
      />

      {error && <FormErrorMessage>{error?.message}</FormErrorMessage>}
    </ChakraFormControl>
  );
}

export default ImageUploadControl;
