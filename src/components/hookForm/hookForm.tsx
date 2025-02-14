import React, { useEffect } from "react";
import { useForm, SubmitHandler, UseFormReturn } from "react-hook-form";

type HookFormProps = {
  onSubmit: SubmitHandler<any>;
  init?: (method: UseFormReturn<any>) => void;
  defaultForm?: any;
  children: (method: UseFormReturn<any>) => React.ReactNode;
};

/**
 * Functional component that creates a form using React Hook Form library.
 * @param {HookFormProps} props - The props object containing onSubmit and init functions.
 * @returns JSX element representing a form with children elements.
 */
function HookForm(props: HookFormProps) {
  const { onSubmit, init } = props;

  /**
   * Initializes a form using the useForm hook from the react-hook-form library.
   * @param {Object} props - The props object containing default form values.
   * @returns The form object with specified configuration options.
   */
  const method = useForm({
    mode: "onChange",
    defaultValues: props.defaultForm,
    criteriaMode: "all"
  });

  /**
   * Runs the initialization function with the specified method when the component mounts or when the dependencies change.
   * @param {Function} init - The initialization function to run.
   * @param {string} method - The method to pass to the initialization function.
   * @returns None
   */
  useEffect(() => {
    init && init(method);
  }, [init, method]);

  return (
    <form onSubmit={method.handleSubmit(onSubmit)}>
      {props.children(method)}
    </form>
  );
}

/**
 * Default props for the HookForm component.
 * @type {Object}
 * @property {Object} defaultForm - The default form object.
 * @property {Function} onSubmit - The function to be called on form submission.
 */
HookForm.defaultProps = {
  defaultForm: {},
  onSubmit: () => {},
};

export default HookForm;
