import logoImg from '../../assets/logo.svg';

import { 
    MdDashboard, 
    MdArrowDownward, 
    MdArrowUpward, 
    MdExitToApp 
} from 'react-icons/md'

import { 
    Container, 
    Header, 
    LogoImg, 
    MenuContainer,
    MenuItemLink,
    MenuItemButton,
    Title
} from "./styles"

import { useAuth } from '../../hooks/auth';

export const Aside: React.FC = () => {
    const { signOut } = useAuth();

    return (
        <Container>
            <Header>
                <LogoImg src={logoImg} alt="My Wallet" />
                <Title>My Wallet</Title>
            </Header>

            <MenuContainer>
                <MenuItemLink href="/">
                    <MdDashboard />
                    Dashboard
                </MenuItemLink>

                <MenuItemLink href="/list/income">
                    <MdArrowDownward />
                    Entradas
                </MenuItemLink>

                <MenuItemLink href="/list/outcome">
                    <MdArrowUpward />
                    Saidas
                </MenuItemLink>

                <MenuItemButton onClick={signOut}>
                    <MdExitToApp />
                    Sair
                </MenuItemButton>
            </MenuContainer>
        </Container>
    )
}