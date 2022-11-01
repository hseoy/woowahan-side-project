import { InputProps } from '@chakra-ui/react';
import { Control, Path, FieldValues } from 'react-hook-form';
import FormControl from './FormControl';

type GithubUrlControlProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  placeholder?: string;
  onChangeValue?: (value: string) => void;
  requiredMsg?: string;
  renderLabelRight?: React.ReactNode;
} & InputProps;

function GithubUrlControl<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  onChangeValue,
  requiredMsg,
  renderLabelRight,
  ...inputProps
}: GithubUrlControlProps<TFieldValues>): JSX.Element {
  const githubUrlPattern = /https:\/\/github.com[:/](.*)/g;

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
        pattern: {
          value: githubUrlPattern,
          message: 'Github URL이 아닙니다',
        },
      }}
    />
  );
}

export default GithubUrlControl;
