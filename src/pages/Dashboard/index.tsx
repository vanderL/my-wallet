import { useMemo, useState } from "react";

import { ContentHeader } from '../../components/ContentHeader';
import { SelectInput } from "../../components/SelectInput";
import {WalletBox} from '../../components/WalletBox';
import {MessageBox} from '../../components/MessageBox';
import {PieChartComponent} from '../../components/PieChart';
import {HistoryBox} from '../../components/HistoryBox';
import { BarChartBox } from "../../components/BarChartBox";

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';

import flatImg from '../../assets/flat.svg';
import loudlyCryingFaceImg from '../../assets/loudlyCryingFace.svg';
import grinningImg from '../../assets/grinning.svg';
import opsImg from '../../assets/ops.svg';

import listOfMonths from '../../utils/months';
import { Container, Content } from "./styles"

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
        

    },[])

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
        console.log(totalGains)
        if(totalBalance < 0){
            return {
                title: "Que bad!",
                    description: "Neste mês, você gastou mais do que deveria.",
                    footerText: "Verifique seus gastos e tente cortar algumas coisas desnecessárias",
                    icon: loudlyCryingFaceImg    
            }
        } else if(totalGains === 0 && totalExpenses === 0){
            return {
                title: "Opa Opa! ",
                description: "Não há registros de entradas ou saídas",
                footerText: "Parece que você não fez nenhum registro no mês selecionado",
                icon: opsImg    
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
    },[totalBalance, totalGains, totalExpenses]);

    const relationExpensesVersusGains = useMemo(() => {
        const total = totalGains + totalExpenses;

        const gainsPercent = Number(((totalGains / total) * 100).toFixed(1));
        const expensesPercent = Number(((totalExpenses / total) * 100).toFixed(1));

        const data = [
            {
                name: "Entradas",
                value: totalGains,
                percent: gainsPercent ? gainsPercent : 0,
                color: '#f7931b'
            },
            {
                name: "Saídas",
                value: totalExpenses,
                percent: expensesPercent ? expensesPercent : 0,
                color: '#e44c4e' 
            }
        ];

        return data;

    }, [totalGains, totalExpenses]);

    const historyData = useMemo(() =>{
        return listOfMonths.map((_, month) => {
            
            let amountEntry = 0;
            gains.forEach(gain => {
                const date = new Date(gain.date);
                const gainMonth = date.getMonth();
                const gainYear = date.getFullYear();

                if(gainMonth === month && gainYear === yearSelected) {
                    try {
                        amountEntry += Number(gain.amount)
                    } catch {
                        throw new Error('AmountEntry is invalid. AmountEntry must be valid number')
                    }
                }
            });

            let amountOutput = 0;
            expenses.forEach(expense => {
                const date = new Date(expense.date);
                const expenseMonth = date.getMonth();
                const expenseYear = date.getFullYear();

                if(expenseMonth === month && expenseYear === yearSelected) {
                    try {
                        amountOutput += Number(expense.amount)
                    } catch {
                        throw new Error('AmountOutput is invalid. AmountOutput must be valid number')
                    }
                }
            });

            return {
                monthNumber: month,
                month: listOfMonths[month].substr(0, 3),
                amountEntry,
                amountOutput
            }
        }).filter(item => {
            const currentMonth =new Date().getMonth();
            const currentYear = new Date().getFullYear();

            return (yearSelected === currentYear && item.monthNumber <= currentMonth || yearSelected < currentYear)
        })
    },[yearSelected]);

    const relationExpensevesRecurrentVersusEventual = useMemo(() => {
        let amountRecurrent = 0;
        let amountEventual = 0;

        expenses.filter((item) => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            return month === monthSelected && year === yearSelected;
        }).forEach((item) => {
            if(item.frequency === 'recorrente'){
                return amountRecurrent += Number(item.amount);
            }

            if(item.frequency === 'eventual'){
                return amountEventual += Number(item.amount);
            }

        });

        const total = amountRecurrent + amountEventual;
        const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));
        const percentRecurrent = Number(((amountRecurrent / total) * 100).toFixed(1));

        return [
            {
                name: 'Recorrentes',
                amount: amountRecurrent,
                percent: percentRecurrent ? percentRecurrent : 0,
                color: '#f7931b'
            },
            {
                name: 'Eventuais',
                amount: amountEventual,
                percent: percentEventual ? percentEventual : 0,
                color: '#e44c4e'
            },
        ]
    },[monthSelected, yearSelected]);

    const relationGainsRecurrentVersusEventual = useMemo(() => {
        let amountRecurrent = 0;
        let amountEventual = 0;

        gains.filter((item) => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            return month === monthSelected && year === yearSelected;
        }).forEach((item) => {
            if(item.frequency === 'recorrente'){
                return amountRecurrent += Number(item.amount);
            }

            if(item.frequency === 'eventual'){
                return amountEventual += Number(item.amount);
            }

        });

        const total = amountRecurrent + amountEventual;

        const percentRecurrent = Number(((amountRecurrent / total) * 100).toFixed(1));
        const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));

        return [
            {
                name: 'Recorrentes',
                amount: amountRecurrent,
                percent: percentRecurrent ? percentRecurrent : 0,
                color: '#f7931b'
            },
            {
                name: 'Eventuais',
                amount: amountEventual,
                percent: percentEventual ? percentEventual : 0,
                color: '#e44c4e'
            },
        ]
    },[monthSelected, yearSelected]);

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

                <PieChartComponent data={relationExpensesVersusGains}/>

                <HistoryBox 
                    data={historyData}
                    lineColorAmountEntry="#f7931b"
                    lineColorAmountOutput="#e44c4e"
                />

                <BarChartBox 
                    title="Saídas"
                    data={relationExpensevesRecurrentVersusEventual}
                />

                <BarChartBox 
                    title="Entradas"
                    data={relationGainsRecurrentVersusEventual}
                />
            </Content>
        </Container>
    )
}