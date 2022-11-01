import {
  Flex,
  FormControl as ChakraFormControl,
  FormErrorMessage,
  FormLabel,
  InputProps,
  Select,
  SelectProps,
} from '@chakra-ui/react';
import React from 'react';
import {
  Control,
  Path,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import Input from './Input';

type FormControlProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  inputType?: 'input' | 'select';
  selectOptions?: { name: string; value: string }[];
  onChangeValue?: (value: string) => void;
  requiredMsg?: string;
  renderLabelRight?: React.ReactNode;
  rules: UseControllerProps['rules'];
  inputProps?: InputProps;
  selectProps?: SelectProps;
};

function FormControl<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  placeholder = '',
  type = 'text',
  inputType = 'input',
  selectOptions = [],
  onChangeValue,
  requiredMsg,
  renderLabelRight,
  rules,
  inputProps: inputUserProps,
  selectProps: selectUserProps,
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
        rules?.required === true
          ? requiredMsg || `${label} 입력이 누락되었습니다`
          : rules?.required,
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
      isRequired={!!rules?.required}
      isInvalid={!!error?.message}
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        marginBottom="8px"
      >
        <FormLabel htmlFor={name} margin="0px">
          {label}
        </FormLabel>
        {renderLabelRight}
      </Flex>
      {inputType === 'input' ? (
        <Input
          {...inputProps}
          {...inputUserProps}
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
          {...selectUserProps}
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
