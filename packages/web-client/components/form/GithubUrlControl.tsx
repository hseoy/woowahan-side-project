import {
  Control,
  Path,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form';
import FormControl from './FormControl';

type GithubUrlControlProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  placeholder?: string;
} & Omit<UseControllerProps['rules'], 'pattern'>;

function GithubUrlControl<TFieldValues extends FieldValues>(
  props: GithubUrlControlProps<TFieldValues>,
): JSX.Element {
  const githubUrlPattern = /https:\/\/github.com[:/](.*)/g;

  return (
    <FormControl
      {...props}
      pattern={{
        value: githubUrlPattern,
        message: 'Github URL이 아닙니다',
      }}
    />
  );
}

export default GithubUrlControl;
