import React from "react";
import { Button as AntdButton } from "antd";

const Button = ({
  htmlType,
  onClick,
  disabled,
  label,
  type,
  className,
  block,
  size,
  icon,
  shape,
  loading,
}) => {
  return (
    <AntdButton
      htmlType={htmlType}
      onClick={onClick}
      disabled={disabled}
      type={type}
      size={size}
      icon={icon}
      block={block}
      shape={shape}
      loading={loading}
      className={className}
    >
      {" "}
      {label}
    </AntdButton>
  );
};

export default Button;
