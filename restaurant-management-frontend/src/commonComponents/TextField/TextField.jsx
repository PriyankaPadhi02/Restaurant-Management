import React from "react";
import { Input, Typography } from "antd";

const { Text } = Typography;

const TextField = forwardRef(
  (
    {
      placeholder,
      onChange,
      type,
      value,
      variant,
      label,
      error,
      message,
      required,
      prefix,
      suffix,
      size,
      disabled,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    return (
      <>
        <div className="form-group">
          <label htmlFor={label}>
            {label} {required && <Text type="danger">*</Text>}
          </label>
          <Input
            ref={ref}
            disabled={disabled}
            suffix={suffix}
            prefix={prefix}
            name={label}
            data-testid={label}
            // eslint-disable-next-line no-extra-boolean-cast
            status={Boolean(error) ? "error" : ""}
            id={label}
            placeholder={placeholder}
            onChange={onChange}
            type={type}
            value={value}
            variant={variant}
            label={label}
            size={size}
            onKeyDown={onKeyDown}
            {...props}
          />
          {Boolean(error) && (
            <Typography.Text type="danger" className="ant-typography-danger">
              {message}
            </Typography.Text>
          )}
        </div>
      </>
    );
  }
);

export default TextField;
