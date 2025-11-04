'use client';

import styled from 'styled-components';
import { FiBell, FiUser } from 'react-icons/fi';

interface TopbarProps {
  title: string;
  userName?: string;
  userRole?: string;
}

const TopbarContainer = styled.header`
  height: 64px;
  background: ${props => props.theme.colors.white};
  border-bottom: 1px solid ${props => props.theme.colors.borderLight};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${props => props.theme.spacing['2xl']};
  position: sticky;
  top: 0;
  z-index: 90;
`;

const Title = styled.h2`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.text};
  letter-spacing: -0.01em;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.lg};
`;

const IconButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: ${props => props.theme.borderRadius};
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.textSecondary};
  transition: all 0.15s ease;
  position: relative;

  &:hover {
    background: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.text};
  }

  svg {
    font-size: ${props => props.theme.fontSizes.lg};
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 8px;
  height: 8px;
  background: ${props => props.theme.colors.error};
  border-radius: 50%;
  border: 2px solid ${props => props.theme.colors.white};
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius};
  background: transparent;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: ${props => props.theme.colors.accent};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: none;
  }
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: ${props => props.theme.borderRadiusFull};
  background: ${props => props.theme.colors.primaryLight};
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${props => props.theme.fontWeights.medium};
  font-size: ${props => props.theme.fontSizes.xs};
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.text};
`;

const UserRole = styled.div`
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.theme.colors.textLight};
  text-transform: capitalize;
`;

export const Topbar: React.FC<TopbarProps> = ({
  title,
  userName = 'User',
  userRole = 'user',
}) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <TopbarContainer>
      <Title>{title}</Title>
      <Actions>
        <IconButton>
          <FiBell />
          <NotificationBadge />
        </IconButton>
        <UserInfo>
          <Avatar>{getInitials(userName)}</Avatar>
          <UserDetails>
            <UserName>{userName}</UserName>
            <UserRole>{userRole}</UserRole>
          </UserDetails>
        </UserInfo>
      </Actions>
    </TopbarContainer>
  );
};

