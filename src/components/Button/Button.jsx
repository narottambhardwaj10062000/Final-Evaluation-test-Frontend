import React from 'react'

const Button = ({ children, style, onClick }) => {
  return (
    <div style={style} onClick={onClick} name={name}>
        {children}
    </div>
  )
}

export default Button