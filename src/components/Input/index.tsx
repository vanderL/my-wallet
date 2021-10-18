import React , { InputHTMLAttributes } from 'react';
import { Container } from "./styles"

type IInputProps = InputHTMLAttributes<HTMLInputElement>

export const Input: React.FC<IInputProps> = ({...rest}) => (
    <Container {...rest} />
)

