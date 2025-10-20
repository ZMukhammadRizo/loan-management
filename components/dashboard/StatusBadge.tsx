'use client';

import styled from 'styled-components';

type StatusType = 'pending' | 'approved' | 'rejected' | 'under_review' | 'active' | 'inactive';

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
}

const Badge = styled.span<{ $status: StatusType }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: ${props => props.theme.borderRadiusFull};
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.semibold};
  text-transform: capitalize;
  
  background: ${props => {
    switch (props.$status) {
      case 'approved':
      case 'active':
        return props.theme.colors.success + '20';
      case 'rejected':
      case 'inactive':
        return props.theme.colors.error + '20';
      case 'pending':
        return '#FF9800' + '20';
      case 'under_review':
        return props.theme.colors.primary + '20';
      default:
        return props.theme.colors.secondary;
    }
  }};
  
  color: ${props => {
    switch (props.$status) {
      case 'approved':
      case 'active':
        return props.theme.colors.success;
      case 'rejected':
      case 'inactive':
        return props.theme.colors.error;
      case 'pending':
        return '#FF9800';
      case 'under_review':
        return props.theme.colors.primary;
      default:
        return props.theme.colors.text;
    }
  }};
`;

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label }) => {
  return <Badge $status={status}>{label || status.replace('_', ' ')}</Badge>;
};

