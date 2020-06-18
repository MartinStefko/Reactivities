import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label } from "semantic-ui-react";
import { DateTimePicker } from "react-widgets";

interface IProps extends FieldRenderProps<Date, HTMLElement>, FormFieldProps {}

const DateInput: React.FC<IProps> = ({
  input,
  width,
  placeholder,
  date = false,
  time = false,
  meta: { touched, error },
  ...rest
}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      <DateTimePicker
        className="fix-position-moz-DateTimePicker"
        placeholder={placeholder}
        value={input.value || null}
        onChange={input.onChange}
        // onBlurt must be defined for datePicker to show client-validations from revalidate package
        onBlur={input.onBlur}
        // preventing from to typing to datePicker
        // onKeyDown={(e) => e.preventDefault()}
        // properties aimed to fix the input- datePicker relative position
        // spreading rest of the properties into DataTimePicker
        date={date}
        time={time}
        {...rest}
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default DateInput;
