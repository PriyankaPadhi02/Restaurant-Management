import React from 'react'
import { Button } from 'antd'

const IconWithButton = ({
  htmlType,
  onClick,
  disabled,
  label,
  size,
  shape,
  icon,
  loading,
  type,
  className,
  ...props
}) => {
  return (
    <Button
      type={type || 'primary'} // primary | dashed | link | text | default
      htmlType={htmlType}
      className={className}
      onClick={onClick}
      disabled={disabled}
      icon={icon}
      shape={shape || 'default'} // default | circle | round
      size={size || 'middle'} //large | middle | small
      loading={loading}
      {...props}
    >
      {label}
    </Button>
  )
}

export default IconWithButton
