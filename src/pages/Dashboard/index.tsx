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
                    amount={150.00}
                    footerLabel={'Atualizado com base nas entradas e saídas'}
                    color={'#4e41f0'}
                    icon={'cifrao'}
                />
                <WalletBox 
                    title={'Entradas'}
                    amount={5000.00}
                    footerLabel={'Atualizado com base nas entradas e saídas'}
                    color={'#f7931b'}
                    icon={'arrowUp'}
                />
                <WalletBox 
                    title={'Saidas'}
                    amount={4850.00}
                    footerLabel={'Atualizado com base nas entradas e saídas'}
                    color={'#e44c4e'}
                    icon={'arrowDown'}
                />
                <MessageBox 
                    title={'Que bad!'}
                    description={'Sua carteira está negativa!'}
                    footerText={'Continue assim. Ei, investi ai mano'}
                    icon={loudlyCryingFaceImg}
                />
            </Content>
        </Container>
    )
}