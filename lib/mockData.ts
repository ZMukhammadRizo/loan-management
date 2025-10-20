// Mock data for US state loan information
export const mockAdminStateData = {
  "AL": { totalLoans: 5, totalAmount: 450000, stateName: 'Alabama' },
  "AK": { totalLoans: 1, totalAmount: 120000, stateName: 'Alaska' },
  "AZ": { totalLoans: 8, totalAmount: 780000, stateName: 'Arizona' },
  "AR": { totalLoans: 4, totalAmount: 320000, stateName: 'Arkansas' },
  "CA": { totalLoans: 25, totalAmount: 2800000, stateName: 'California' },
  "CO": { totalLoans: 9, totalAmount: 850000, stateName: 'Colorado' },
  "CT": { totalLoans: 6, totalAmount: 550000, stateName: 'Connecticut' },
  "DE": { totalLoans: 2, totalAmount: 180000, stateName: 'Delaware' },
  "FL": { totalLoans: 18, totalAmount: 1900000, stateName: 'Florida' },
  "GA": { totalLoans: 12, totalAmount: 1100000, stateName: 'Georgia' },
  "HI": { totalLoans: 3, totalAmount: 280000, stateName: 'Hawaii' },
  "ID": { totalLoans: 2, totalAmount: 150000, stateName: 'Idaho' },
  "IL": { totalLoans: 14, totalAmount: 1300000, stateName: 'Illinois' },
  "IN": { totalLoans: 7, totalAmount: 600000, stateName: 'Indiana' },
  "IA": { totalLoans: 4, totalAmount: 300000, stateName: 'Iowa' },
  "KS": { totalLoans: 3, totalAmount: 250000, stateName: 'Kansas' },
  "KY": { totalLoans: 6, totalAmount: 500000, stateName: 'Kentucky' },
  "LA": { totalLoans: 5, totalAmount: 450000, stateName: 'Louisiana' },
  "ME": { totalLoans: 2, totalAmount: 160000, stateName: 'Maine' },
  "MD": { totalLoans: 8, totalAmount: 750000, stateName: 'Maryland' },
  "MA": { totalLoans: 11, totalAmount: 1000000, stateName: 'Massachusetts' },
  "MI": { totalLoans: 9, totalAmount: 800000, stateName: 'Michigan' },
  "MN": { totalLoans: 6, totalAmount: 550000, stateName: 'Minnesota' },
  "MS": { totalLoans: 3, totalAmount: 240000, stateName: 'Mississippi' },
  "MO": { totalLoans: 7, totalAmount: 620000, stateName: 'Missouri' },
  "MT": { totalLoans: 1, totalAmount: 90000, stateName: 'Montana' },
  "NE": { totalLoans: 3, totalAmount: 220000, stateName: 'Nebraska' },
  "NV": { totalLoans: 6, totalAmount: 580000, stateName: 'Nevada' },
  "NH": { totalLoans: 2, totalAmount: 190000, stateName: 'New Hampshire' },
  "NJ": { totalLoans: 10, totalAmount: 950000, stateName: 'New Jersey' },
  "NM": { totalLoans: 3, totalAmount: 260000, stateName: 'New Mexico' },
  "NY": { totalLoans: 19, totalAmount: 2100000, stateName: 'New York' },
  "NC": { totalLoans: 11, totalAmount: 1050000, stateName: 'North Carolina' },
  "ND": { totalLoans: 1, totalAmount: 80000, stateName: 'North Dakota' },
  "OH": { totalLoans: 13, totalAmount: 1200000, stateName: 'Ohio' },
  "OK": { totalLoans: 4, totalAmount: 350000, stateName: 'Oklahoma' },
  "OR": { totalLoans: 7, totalAmount: 650000, stateName: 'Oregon' },
  "PA": { totalLoans: 12, totalAmount: 1150000, stateName: 'Pennsylvania' },
  "RI": { totalLoans: 2, totalAmount: 170000, stateName: 'Rhode Island' },
  "SC": { totalLoans: 6, totalAmount: 520000, stateName: 'South Carolina' },
  "SD": { totalLoans: 2, totalAmount: 140000, stateName: 'South Dakota' },
  "TN": { totalLoans: 8, totalAmount: 700000, stateName: 'Tennessee' },
  "TX": { totalLoans: 22, totalAmount: 2500000, stateName: 'Texas' },
  "UT": { totalLoans: 5, totalAmount: 480000, stateName: 'Utah' },
  "VT": { totalLoans: 1, totalAmount: 100000, stateName: 'Vermont' },
  "VA": { totalLoans: 10, totalAmount: 900000, stateName: 'Virginia' },
  "WA": { totalLoans: 11, totalAmount: 1100000, stateName: 'Washington' },
  "WV": { totalLoans: 3, totalAmount: 200000, stateName: 'West Virginia' },
  "WI": { totalLoans: 7, totalAmount: 620000, stateName: 'Wisconsin' },
  "WY": { totalLoans: 1, totalAmount: 70000, stateName: 'Wyoming' }
};

export const mockBrokerStateData = {
  "CA": { totalLoans: 8, totalAmount: 750000, stateName: 'California' },
  "TX": { totalLoans: 5, totalAmount: 480000, stateName: 'Texas' },
  "FL": { totalLoans: 6, totalAmount: 550000, stateName: 'Florida' },
  "NY": { totalLoans: 3, totalAmount: 320000, stateName: 'New York' },
  "IL": { totalLoans: 2, totalAmount: 180000, stateName: 'Illinois' },
  "WA": { totalLoans: 4, totalAmount: 420000, stateName: 'Washington' }
};

export const mockLoanDetailsByState: Record<string, Array<{
  id: string;
  borrower: string;
  broker: string;
  amount: number;
  status: string;
}>> = {
  "CA": [
    { id: 'L001', borrower: 'Tech Innovations LLC', broker: 'Sarah Wilson', amount: 150000, status: 'Approved' },
    { id: 'L002', borrower: 'Green Energy Solutions', broker: 'Mike Johnson', amount: 200000, status: 'Pending' },
    { id: 'L003', borrower: 'Urban Restaurant Group', broker: 'Sarah Wilson', amount: 100000, status: 'Approved' },
    { id: 'L004', borrower: 'Bay Area Startups', broker: 'Lisa Chen', amount: 300000, status: 'In Review' }
  ],
  "TX": [
    { id: 'L005', borrower: 'Digital Marketing Hub', broker: 'John Davis', amount: 250000, status: 'Approved' },
    { id: 'L006', borrower: 'Austin Food Trucks', broker: 'Mike Johnson', amount: 120000, status: 'Pending' },
    { id: 'L007', borrower: 'Houston Energy Co', broker: 'John Davis', amount: 180000, status: 'Approved' }
  ],
  "NY": [
    { id: 'L008', borrower: 'Manhattan Retail LLC', broker: 'Sarah Wilson', amount: 400000, status: 'Approved' },
    { id: 'L009', borrower: 'Brooklyn Creative Studios', broker: 'Lisa Chen', amount: 150000, status: 'In Review' }
  ],
  "FL": [
    { id: 'L010', borrower: 'Sunshine Tourism Inc', broker: 'Mike Johnson', amount: 180000, status: 'Approved' },
    { id: 'L011', borrower: 'Miami Beach Resorts', broker: 'John Davis', amount: 320000, status: 'Pending' },
    { id: 'L012', borrower: 'Orlando Entertainment', broker: 'Sarah Wilson', amount: 200000, status: 'Approved' }
  ]
};

export type StateData = {
  totalLoans: number;
  totalAmount: number;
  stateName: string;
};

export type LoanDetail = {
  id: string;
  borrower: string;
  broker: string;
  amount: number;
  status: string;
};

