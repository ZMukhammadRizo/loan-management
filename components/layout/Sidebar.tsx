'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  FiHome,
  FiDollarSign,
  FiUsers,
  FiBarChart2,
  FiFileText,
  FiUser,
  FiLogOut,
  FiCheckCircle,
} from 'react-icons/fi';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  role: 'admin' | 'broker';
}

const SidebarContainer = styled.aside`
  width: 260px;
  height: 100vh;
  background: ${props => props.theme.colors.white};
  border-right: 1px solid ${props => props.theme.colors.border};
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    width: 220px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: none;
  }
`;

const Logo = styled.div`
  padding: ${props => props.theme.spacing.xl};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const LogoText = styled.h1`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const Nav = styled.nav`
  flex: 1;
  padding: ${props => props.theme.spacing.lg};
  overflow-y: auto;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`;

const NavItem = styled(motion.li)``;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius};
  font-size: ${props => props.theme.fontSizes.md};
  font-weight: ${props => props.$isActive ? props.theme.fontWeights.semibold : props.theme.fontWeights.medium};
  color: ${props => props.$isActive ? props.theme.colors.primary : props.theme.colors.text};
  background: ${props => props.$isActive ? props.theme.colors.accent : 'transparent'};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.primary};
  }

  svg {
    font-size: ${props => props.theme.fontSizes.xl};
  }
`;

const Footer = styled.div`
  padding: ${props => props.theme.spacing.lg};
  border-top: 1px solid ${props => props.theme.colors.border};
`;

const LogoutButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius};
  font-size: ${props => props.theme.fontSizes.md};
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.error};
  background: transparent;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.error}15;
  }

  svg {
    font-size: ${props => props.theme.fontSizes.xl};
  }
`;

export const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const pathname = usePathname();

  const adminNavItems: NavItem[] = [
    { label: 'Dashboard', href: '/admin', icon: <FiHome /> },
    { label: 'All Loans', href: '/admin/loans', icon: <FiDollarSign /> },
    { label: 'Brokers', href: '/admin/brokers', icon: <FiUsers /> },
    { label: 'Analytics', href: '/admin/analytics', icon: <FiBarChart2 /> },
  ];

  const brokerNavItems: NavItem[] = [
    { label: 'Dashboard', href: '/broker', icon: <FiHome /> },
    { label: 'My Leads', href: '/broker/leads', icon: <FiFileText /> },
    { label: 'Borrowers', href: '/broker/borrowers', icon: <FiCheckCircle /> },
    { label: 'Profile', href: '/broker/profile', icon: <FiUser /> },
  ];

  const navItems = role === 'admin' ? adminNavItems : brokerNavItems;

  const handleLogout = () => {
    // TODO: Implement logout logic with Supabase
    console.log('Logout clicked');
  };

  return (
    <SidebarContainer>
      <Logo>
        <LogoText>
          <FiDollarSign />
          LoanPlatform
        </LogoText>
      </Logo>

      <Nav>
        <NavList>
          {navItems.map((item, index) => (
            <NavItem
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <NavLink href={item.href} $isActive={pathname === item.href}>
                {item.icon}
                {item.label}
              </NavLink>
            </NavItem>
          ))}
        </NavList>
      </Nav>

      <Footer>
        <LogoutButton onClick={handleLogout}>
          <FiLogOut />
          Logout
        </LogoutButton>
      </Footer>
    </SidebarContainer>
  );
};

