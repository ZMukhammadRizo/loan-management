'use client';

import styled from 'styled-components';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
  role: 'admin' | 'broker';
  pageTitle: string;
  userName?: string;
  userRole?: string;
}

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${props => props.theme.colors.secondary};
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 260px;
  display: flex;
  flex-direction: column;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    margin-left: 220px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-left: 0;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: ${props => props.theme.spacing.xl};
  max-width: 1600px;
  width: 100%;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.lg};
  }
`;

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  role,
  pageTitle,
  userName,
  userRole,
}) => {
  return (
    <LayoutContainer>
      <Sidebar role={role} />
      <MainContent>
        <Topbar title={pageTitle} userName={userName} userRole={userRole} />
        <Content>{children}</Content>
      </MainContent>
    </LayoutContainer>
  );
};

