import { ContentHeader } from "../../components/ContentHeader"
import { SelectInput } from "../../components/SelectInput"
import { HistoryFinanceCard } from "../../components/HistoryFinanceCard"
import { Container, Content } from "./styles"

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

            <Content>
                <HistoryFinanceCard 
                    cardColor={"#313862"}
                    tagColor={"#e44c4e"}
                    title={"Conta de Luz"}
                    subtitle={"27/07/2021"}
                    amount={"R$ 130,00"}
                />
            </Content>
        </Container>
    )
}