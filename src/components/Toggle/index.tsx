import { Container, ToggleLabel, ToggleSelector } from "./styles";

export const Toggle: React.FC = () => (
    <Container>
        <ToggleLabel>Light</ToggleLabel>
        <ToggleSelector 
            checked
            uncheckedIcon={false}
            checkedIcon={false}
            onChange={() => console.log('mudei')}
        />
        <ToggleLabel>Dark</ToggleLabel>
    </Container>
)