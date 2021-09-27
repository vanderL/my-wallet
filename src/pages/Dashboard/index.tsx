import { Container } from "./styles"
import { ContentHeader } from '../../components/ContentHeader';
import { SelectInput } from "../../components/SelectInput";

export const Dashboard: React.FC = () => {
    const options = [
        {value: 'Vander', label: 'Vander'},
        {value: 'Jose', label: 'Jose'},
        {value: 'Maria', label: 'Maria'},
    ]
    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor="#f7931b">
                <SelectInput options={options}/>
            </ContentHeader>
        </Container>
    )
}