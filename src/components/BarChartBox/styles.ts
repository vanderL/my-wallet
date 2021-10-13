import styled from 'styled-components';

interface ILegendProps {
    color: string;
}

export const Container = styled.div`
    width: 48%;
    min-height: 260px;

    margin: 10px 0;
    background-color: ${props => props.theme.color.tertiary};
    color: ${props => props.theme.color.white};

    border-radius: 7px;
    
`;

export const SideLeft = styled.aside`
    padding: 30px 20px;

    > h2 {
        padding-left: 18px;
        margin-bottom: 10px;
    }
`;

export const SideRight = styled.main`
    flex: 1;
    height: 150px;
`;

export const LegendContainer = styled.ul`
    list-style: none;

    max-height: 170px;
    padding-right: 15px;
    overflow-y: scroll;
    display: flex;
    justify-content: space-between;
    padding-left: 18px;

    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.color.secondary};
        border-radius: 10px;
    }

    ::-webkit-scrollbar-track {
        background-color: ${props => props.theme.color.tertiary}
    }
`;

export const Legend = styled.li<ILegendProps>`
    display: flex;
    align-items: center;

    margin-bottom: 7px;
    
    > div {
        background-color: ${props => props.color};

        width: 50px;
        height: 50px;
        border-radius: 5px;

        font-size: 18px;
        line-height: 50px;
        text-align: center;
    }

    > span {
        margin-left: 5px;
    }
`;
