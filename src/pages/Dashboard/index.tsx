import { useMemo, useState } from "react";
import { Container, Content } from "./styles"
import { ContentHeader } from '../../components/ContentHeader';
import { SelectInput } from "../../components/SelectInput";

import {WalletBox} from '../../components/WalletBox';
import {MessageBox} from '../../components/MessageBox';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import listOfMonths from '../../utils/months';

import flatImg from '../../assets/flat.svg';
import loudlyCryingFaceImg from '../../assets/loudlyCryingFace.svg';
import grinningImg from '../../assets/grinning.svg';

export const Dashboard: React.FC = () => {
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());
    

    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return {
                value: index + 1,
                label: month,
            }; 
        })
        

    },[listOfMonths])

    const years = useMemo(() => {
        let uniqueYears: number[] = [];

        [...expenses, ...gains].forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();

            if(!uniqueYears.includes(year)) {
                uniqueYears.push(year);
            }
        });

        return uniqueYears.map(year => {
            return {
                value: year,
                label: year,
            }
        });
    },[])


    const totalExpenses = useMemo(() => {
        let total: number = 0;

        expenses.forEach(item =>{
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if(month === monthSelected && year === yearSelected) {
                try {
                    total += Number(item.amount);
                } catch {
                    throw new Error('Invalid amount! Amount must be number.');
                }
            }
        })

        return total;
    },[monthSelected, yearSelected]);

    const totalGains = useMemo(() => {
        let total: number = 0;

        gains.forEach(item =>{
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if(month === monthSelected && year === yearSelected) {
                try {
                    total += Number(item.amount);
                } catch {
                    throw new Error('Invalid amount! Amount must be number.');
                }
            }
        })

        return total;
    },[monthSelected, yearSelected]);

    const totalBalance = useMemo(() => {
        return totalGains - totalExpenses;
    },[totalExpenses, totalGains]);

    const message = useMemo(() => {
        if(totalBalance < 0){
            return {
                title: "Que bad!",
                    description: "Neste mês, você gastou mais do que deveria.",
                    footerText: "Verifique seus gastos e tente cortar algumas coisas desnecessárias",
                    icon: loudlyCryingFaceImg    
            }
        } else if(totalBalance === 0){
            return {
                title: "Quase quase",
                description: "Neste mês, você gastou exatamente oque ganhou",
                footerText: "Tenha cuidado. Faça um plano financeiro urgente, comece com metas curtas",
                icon: grinningImg    
            }
        } else {
            return {
                title: "Muito bem!",
                description: "Sua carteira está positiva",
                footerText: "Continue assim. Considere investir o seu saldo",
                icon: flatImg    
            } 
        }
    },[totalBalance]);

    const handleMonthSelected = (month: string) => {
        try {
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        } catch {
            throw new Error('invalid month value. Is accept 0 - 12.')
        }
    }

    const handleYearSelected = (year: string) => {
        try {
            const parseYear = Number(year);
            setYearSelected(parseYear);
        } catch {
            throw new Error('invalid year value. Is accept integer numbers.')
        } 
    }


    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor="#f7931b">
                <SelectInput 
                    options={months}
                    onChange={e => handleMonthSelected(e.target.value)}
                    defaultValue={monthSelected}
                />
                <SelectInput 
                    options={years}
                    onChange={e => handleYearSelected(e.target.value)}
                    defaultValue={yearSelected}
                />
            </ContentHeader>
            <Content>
                <WalletBox 
                    title={'Saldo'}
                    amount={totalBalance}
                    footerLabel={'Atualizado com base nas entradas e saídas'}
                    color={'#4e41f0'}
                    icon={'cifrao'}
                />
                <WalletBox 
                    title={'Entradas'}
                    amount={totalGains}
                    footerLabel={'Atualizado com base nas entradas e saídas'}
                    color={'#f7931b'}
                    icon={'arrowUp'}
                />
                <WalletBox 
                    title={'Saidas'}
                    amount={totalExpenses}
                    footerLabel={'Atualizado com base nas entradas e saídas'}
                    color={'#e44c4e'}
                    icon={'arrowDown'}
                />
                <MessageBox 
                    title={message.title}
                    description={message.description}
                    footerText={message.footerText}
                    icon={message.icon}
                />
            </Content>
        </Container>
    )
}