import { Input, Typography } from "antd";
import React from "react";

const { TextArea } = Input;
const { Text } = Typography;

const TextAreaField = ({
  placeholder,
  onChange,
  value,
  label,
  error,
  message,
  required,
  rows,
  autoSize,
  minLength,
  maxLength,
  allowClear = false,
  ...props
}) => {
  return (
    <>
      <div className="form-group">
        <label htmlFor={label}>{label}</label>
        {required && <Text type="danger">*</Text>}
        <TextArea
          id={label}
          placeholder={placeholder}
          label={label}
          onChange={onChange}
          value={value}
          rows={rows}
          autoSize={{ minRows: 4, maxRows: 6 }}
          minLength={minLength ?? 3}
          maxLength={maxLength ?? 500}
          allowClear={allowClear}
          // eslint-disable-next-line no-extra-boolean-cast
          status={Boolean(error) ? "error" : ""}
          {...props}
        />
        {Boolean(error) && (
          <Typography.Text type="danger">{message}</Typography.Text>
        )}
      </div>
    </>
  );
};

export default TextAreaField;
