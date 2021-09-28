import { Container, Tag } from "./styles"

interface IHistoryFinanceCardprops {
    cardColor: string;
    tagColor: string;
    title: string;
    subtitle: string;
    amount: string;
}

export const HistoryFinanceCard: React.FC<IHistoryFinanceCardprops> = ({
    cardColor,
    tagColor,
    title,
    subtitle,
    amount
}) => {
    return (
        <Container color={cardColor}>
            <Tag color={tagColor} />
            <div>
                <span>{title}</span>
                <small>{subtitle}</small>
            </div>
            <h3>{amount}</h3>
        </Container>
    )
}