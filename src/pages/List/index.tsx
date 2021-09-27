import { ContentHeader } from "../../components/ContentHeader"
import { SelectInput } from "../../components/SelectInput"
import { Container } from "./styles"

export const List: React.FC = () => {
    const options = [
        {value: 'Vander', label: 'Vander'},
        {value: 'Jose', label: 'Jose'},
        {value: 'Maria', label: 'Maria'},
    ]

    return (
        <Container>
            <ContentHeader title="Saidas" lineColor="#e44c4e">
                <SelectInput options={options}/>
            </ContentHeader>
        </Container>
    )
}