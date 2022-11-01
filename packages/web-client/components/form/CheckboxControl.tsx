import { Checkbox, Flex, FormControl } from '@chakra-ui/react';
import React from 'react';
import {
  Control,
  Path,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';

type CheckboxControlProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  onChangeValue?: (value: string) => void;
} & UseControllerProps['rules'];

function CheckboxControl<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  onChangeValue,
  ...rules
}: CheckboxControlProps<TFieldValues>): JSX.Element {
  const {
    field: { ref, onChange: onControlChange, value, ...inputProps },
  } = useController<TFieldValues>({
    name,
    control,
    rules: {
      ...rules,
    },
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChangeValue) {
      onChangeValue(e.target.value);
    }
    onControlChange(e);
  };

  return (
    <Flex>
      <FormControl>
        <Checkbox
          {...inputProps}
          name={name}
          ref={ref}
          onChange={onChangeHandler}
          isChecked={value || false}
          colorScheme="mint"
        >
          {label}
        </Checkbox>
      </FormControl>
    </Flex>
  );
}

export default CheckboxControl;
