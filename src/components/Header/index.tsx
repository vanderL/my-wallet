import React, {useMemo} from 'react';
import {Toggle} from '../Toggle';

import emojis from '../../utils/emojis';

import { 
    Container, 
    Profile, 
    UserName, 
    Welcome 
} from "./styles"

export const Header:React.FC = () => {
    
    const emoji = useMemo(() => {
        const indice = Math.floor(Math.random() * emojis.length);
        return emojis[indice];
    },[])

    return (
        <Container>
            <Toggle />
            <Profile>
                <Welcome>Olá, {emoji}</Welcome>
                <UserName>Vander Lima de Andrade</UserName>
            </Profile>
        </Container>
    )
}