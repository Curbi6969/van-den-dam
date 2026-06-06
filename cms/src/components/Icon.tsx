import React from 'react'

export const Icon = ({
  name,
  className,
  style,
}: {
  name: string
  className?: string
  style?: React.CSSProperties
}) => (
  <span className={`material-symbols-outlined ${className ?? ''}`} style={style}>
    {name}
  </span>
)
