import { Flight } from '../types/flight';

export type DepartureStackParamList = {
  DepartureList: undefined;
  FlightDetail: { flight: Flight };
};

export type ArrivalStackParamList = {
  ArrivalList: undefined;
  FlightDetail: { flight: Flight };
};
