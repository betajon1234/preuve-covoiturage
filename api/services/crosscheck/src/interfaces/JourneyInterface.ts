import { PositionInterface } from './PositionInterface';

export interface JourneyInterface {
  _id: string;
  journeyId: string;
  operatorJourneyId: string;
  operatorClass?: string;
  operator: {
    _id: string;
    name: string;
  };
  passenger?: {
    identity: IdentityInterface;
    start: PositionInterface;
    end: PositionInterface;
    seats: number;
    contribution: number;
    distance?: number;
    duration?: number;
    cost: number;
    incentive: number;
    remainingFee: number;
  };
  driver?: {
    identity: IdentityInterface;
    start: PositionInterface;
    end: PositionInterface;
    expense: number;
    revenue: number;
    distance?: number;
    duration?: number;
    cost: number;
    incentive: number;
    remainingFee: number;
  };
}


export interface IdentityInterface {
  phone: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  company?: string;
  travelPass?: {
    name: string;
    userId: string;
  };
  over18?: boolean;
}

