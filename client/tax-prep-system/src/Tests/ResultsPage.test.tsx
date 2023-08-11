import { render, screen } from '@testing-library/react';
import { Provider, useSelector } from 'react-redux';
import ResultsPage from '../Components/Results/ResultsPage';
import store from '../store';
import axios from 'axios';


// Mock useSelector and api
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('axios', () => ({
  get: jest.fn(),
}));

describe('ResultsPage', () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockReturnValue('S');
  });

  test('renders tax owed message when tax is owed', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: [
      {w2Id: {empTin: 123123123, social: 1234569081}, wages: 1234536, fedWithheld: 3450}, 
      {w2Id: {empTin: 890678567, social: 1234569081}, wages: 55555, fedWithheld: 56}] });
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: [
      {ten99Id: {payerTin: 123123123, social: 1234569081}, wages: 1234536, fedWithheld: 3450},
      {ten99Id: {payerTin: 123123123, social: 1234569081}, wages: 1234536, fedWithheld: 3450}
    ] });
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: { status: 'S' } });

    render(
      <Provider store={store}>

          <ResultsPage />

      </Provider>
    );

    await screen.findByText('You owe');
    expect(screen.getByText('You owe')).toBeInTheDocument();
  });

  test('renders tax refund message when no tax is owed', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: [
      {w2Id: {empTin: 123123123, social: 1234569081}, wages: 1234536, fedWithheld: 3450}, 
      {w2Id: {empTin: 890678567, social: 1234569081}, wages: 55555, fedWithheld: 56}] });
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: [
      {ten99Id: {payerTin: 123123123, social: 1234569081}, wages: 1234536, fedWithheld: 3450},
      {ten99Id: {payerTin: 123123123, social: 1234569081}, wages: 1234536, fedWithheld: 3450}
    ] });
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: { status: 'S' } });

    render(
      <Provider store={store}>

          <ResultsPage />

      </Provider>
    );

    await screen.findByText('refund');
    expect(screen.getByText('refund')).toBeInTheDocument();
  });
});