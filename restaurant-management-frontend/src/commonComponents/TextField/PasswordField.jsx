import { Input, Typography } from "antd";
import React from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
const { Text } = Typography;

const PasswordField = ({
  placeholder,
  onChange,
  type,
  value,
  variant,
  label,
  error,
  message,
  required,
  ...props
}) => {
  return (
    <>
      <div className="form-group">
        <label htmlFor={label}>
          {" "}
          {label} {required && <Text type="danger">*</Text>}
        </label>

        <Input.Password
          id={label}
          placeholder={placeholder}
          status={error ? "error" : ""}
          onChange={onChange}
          type={type}
          value={value}
          variant={variant}
          label={label}
          iconRender={(visible) =>
            visible ? (
              <IconEye stroke={1} size={18} />
            ) : (
              <IconEyeOff stroke={1} size={18} />
            )
          }
          {...props}
        />
        {Boolean(error) && (
          <Typography.Text type="danger">{message}</Typography.Text>
        )}
      </div>
    </>
  );
};
export default PasswordField;
