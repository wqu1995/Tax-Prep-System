import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider, useSelector } from 'react-redux';
import ResultsPage from '../Components/Results/ResultsPage';
import api from '../api/axiosConfig'
import store from '../store';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

// Mock useSelector and api
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('../api/axiosConfig', () => ({
  get: jest.fn(),
}));

describe('ResultsPage', () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockReturnValue('S'); // Mock useSelector return value
  });

  test('renders tax owed message when tax is owed', async () => {
    // Mock api responses
    (api.get as jest.Mock).mockResolvedValueOnce({ data: [
      {w2Id: {empTin: 123123123, social: 1234569081}, wages: 1234536, fedWithheld: 3450}, 
      {w2Id: {empTin: 890678567, social: 1234569081}, wages: 55555, fedWithheld: 56}] });
    (api.get as jest.Mock).mockResolvedValueOnce({ data: [
      {ten99Id: {payerTin: 123123123, social: 1234569081}, wages: 1234536, fedWithheld: 3450},
      {ten99Id: {payerTin: 123123123, social: 1234569081}, wages: 1234536, fedWithheld: 3450}
    ] });
    (api.get as jest.Mock).mockResolvedValueOnce({ data: { status: 'S' } });

    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <ResultsPage />
        </I18nextProvider>
      </Provider>
    );

    await screen.findByText('You owe');
    expect(screen.getByText('You owe')).toBeInTheDocument();
  });

  test('renders tax refund message when no tax is owed', async () => {
    // Mock api responses
    (api.get as jest.Mock).mockResolvedValueOnce({ data: [/* mock W2 data */] });
    (api.get as jest.Mock).mockResolvedValueOnce({ data: [/* mock Ten99 data */] });
    (api.get as jest.Mock).mockResolvedValueOnce({ data: { status: 'S' } });

    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <ResultsPage />
        </I18nextProvider>
      </Provider>
    );

    // Wait for component to update with data
    await screen.findByText('refund');
    expect(screen.getByText('refund')).toBeInTheDocument();
  });
});