import React, { useMemo, useState, useEffect } from 'react';
import { uuid } from 'uuidv4';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';

import { ContentHeader } from "../../components/ContentHeader";
import { SelectInput } from "../../components/SelectInput";
import { HistoryFinanceCard } from "../../components/HistoryFinanceCard";
import { Container, Content, Filters } from "./styles";

import formatCurrency from '../../utils/formatCurrency';
import formartData from '../../utils/formartData';
import listOfMonths from '../../utils/months';

interface IRouteParams {
    match: {
        params: {
            type: string;
        }
    }
}

interface IData {
    id: string;
    description: string;
    amountFormatted: string;
    frequency: string;
    dateFormatted: string;
    tagColor: string;
}

export const List: React.FC<IRouteParams> = ({ match }) => {
    const [data, setData] = useState<IData[]>([]);
    const [monthSelected, setMonthSelected] = useState<string>(String(new Date().getMonth() + 1));
    const [yearSelected, setYearSelected] = useState<string>(String(new Date().getFullYear()));
    const [selectedFrequency, setSelectedFrequency] = useState(['recorrente', 'eventual']);

    const { type } = match.params;

    const title = useMemo(() => {
        return type === 'income' ? 'Entradas' : 'Saídas';
    }, [type]);

    const lineColor = useMemo(() => {
        return type === 'income' ? '#f7931b' : '#e44c4e';
    }, [type]);

    const listData = useMemo(() => {
        return type === 'income' ? gains : expenses;

    },[type]);

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

        listData.forEach(item => {
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
    },[listData])

    const handleFrequencyClick = (frequency: string = 'teste') => {
        const alreadySelected = selectedFrequency.findIndex(item => item === frequency);

        if(alreadySelected >= 0){
           const filtered = selectedFrequency.filter(item => item !== frequency);
           setSelectedFrequency(filtered);
        } else {
            setSelectedFrequency((prev) => [...prev, frequency] );
        }
    }

    useEffect(() => {
       const filteredDate = listData.filter(item => {
           const date = new Date(item.date);
           const month = String(date.getMonth() + 1);
           const year = String(date.getFullYear());

           return month === monthSelected && year === yearSelected && selectedFrequency.includes(item.frequency);
       })

       const formattedData = filteredDate.map(item => {
           return {
               id: uuid(),
               description: item.description,
               amountFormatted: formatCurrency(Number(item.amount)),
               frequency: item.frequency,
               dateFormatted: formartData(item.date),
               tagColor: item.frequency === 'recorrente' ? '#4e41f0' : '#e44c4e',
           }
       })
       setData(formattedData);
    },[listData, monthSelected, yearSelected, selectedFrequency ]);

    

    return (
        <Container>
            <ContentHeader title={title} lineColor={lineColor}>
                <SelectInput 
                    options={months}
                    onChange={e => setMonthSelected(e.target.value)}
                    defaultValue={monthSelected}
                />
                <SelectInput 
                    options={years}
                    onChange={e => setYearSelected(e.target.value)}
                    defaultValue={yearSelected}
                />
            </ContentHeader>

            <Filters>
                <button 
                    type="button"
                    className={`
                        tag-filter 
                        tag-filter-recurrent
                        ${selectedFrequency.includes('recorrente') && 'tag-actived'}
                    `}
                    onClick={() => handleFrequencyClick('recorrente')}
                >
                    Recorrentes
                </button>

                <button 
                    type="button"
                    className={`
                        tag-filter 
                        tag-filter-eventual
                        ${selectedFrequency.includes('eventual') && 'tag-actived'}
                    `}
                    onClick={() => handleFrequencyClick('eventual')}
                >
                    Eventuais
                </button>
            </Filters>

            <Content>
                {
                    data.map(item => (
                        
                        <HistoryFinanceCard 
                            key={item.id}
                            tagColor={item.tagColor}
                            title={item.description}
                            subtitle={item.dateFormatted}
                            amount={item.amountFormatted}
                        />
                    ))
                }
                
            </Content>
        </Container>
    )
}