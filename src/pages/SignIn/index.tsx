import React, { useState } from 'react';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { useAuth } from '../../hooks/auth';
import { 
    Container, 
    Form, 
    FormTitle, 
    Logo 
} from "./styles";

import logoImg from '../../assets/logo.svg'


export const SingIn: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const { signIn } = useAuth();

    return (
        <Container>
            <Logo>
                <img src={logoImg} alt="Minha Carteira" />
                <h2>Minha Carteira</h2>
            </Logo>

            <Form onSubmit={() => signIn(email, password)}>
                <FormTitle> Entrar </FormTitle>

                <Input 
                    type="email" 
                    placeholder="E-mail"
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    placeholder="Senha"
                    type="password" 
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}

                />

                <Button type="submit">Acessar</Button>
            </Form>
        </Container>
    )
}