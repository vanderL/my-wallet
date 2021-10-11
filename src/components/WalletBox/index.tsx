import { useMemo} from 'react';

import CountUp from 'react-countup';

import { Container } from "./styles"

import cifraoImg from '../../assets/cifrao.svg';
import arrowDownImg from '../../assets/arrowDown.svg';
import arrowUpImg from '../../assets/arrowUp.svg';

interface IWalletBoxProps {
    title: string;
    amount: number;
    footerLabel: string;
    icon: 'cifrao' | 'arrowDown' | 'arrowUp';
    color: string;
}

export const WalletBox: React.FC<IWalletBoxProps> = ({
        title,
        amount,
        footerLabel,
        icon,
        color
}) => {

    const iconSelected = useMemo(() => {
        switch (icon) {
            case 'cifrao':
                return cifraoImg;
            case 'arrowDown':
                return arrowDownImg;
            case 'arrowUp':
                return arrowUpImg;
            default:
                return undefined;
        }
    }, [icon]);

    return (
        <Container color={color}>
            <span>{title}</span>
            <h1>
                <CountUp 
                    end={amount}
                    prefix={'R$ '}
                    separator="."
                    decimal=","
                    decimals={2}
                    preserveValue={true}
                    duration={2.00}
                />
            </h1>
            <small>{footerLabel}</small>
            <img src={iconSelected} alt={title} />
        </Container>
    )
}