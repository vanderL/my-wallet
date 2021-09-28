import { Container } from "./styles"

interface ISelectInputProps {
    options: {
        value: string | number;
        label: string | number;
    }[],
}

export const SelectInput: React.FC<ISelectInputProps> = ({ options }) => {
    return (
        <Container>
            <select name="" id="">
                {
                    options.map(option => (
                        <option value={option.value}>{option.label}</option>
                    ))
                }
            </select>
        </Container>
    )
}