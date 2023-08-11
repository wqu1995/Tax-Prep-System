import { render, screen } from '@testing-library/react';
import { Provider, useSelector } from 'react-redux';
import ResultsPage from '../Components/Results/ResultsPage.tsx';
import store from '../store';


const selectorMock = jest.fn();

const axiosMock = jest.fn();

describe('ResultsPage', () => {
  beforeEach(() => {
    selectorMock.mockReturnValue('S');
  });

  test('renders tax owed message when tax is owed', async () => {
    axiosMock.mockResolvedValueOnce({ data: [
      {w2Id: {empTin: 123123123, social: 1234569081}, wages: 1234536, fedWithheld: 3450}, 
      {w2Id: {empTin: 890678567, social: 1234569081}, wages: 55555, fedWithheld: 56}] });
    axiosMock.mockResolvedValueOnce({ data: [
      {ten99Id: {payerTin: 123123123, social: 1234569081}, wages: 1234536, fedWithheld: 3450},
      {ten99Id: {payerTin: 456456456, social: 1234569081}, wages: 654223, fedWithheld: 73430}
    ] });
    axiosMock.mockResolvedValueOnce({ data: { status: 'S' } });

    render(
      <Provider store={store}>

          <ResultsPage />

      </Provider>
    );

    await screen.findByText('$');
    expect(screen.getByText('$')).toBeInTheDocument();
  });

  test('renders tax refund message when no tax is owed', async () => {
    axiosMock.mockResolvedValueOnce({ data: [
      {w2Id: {empTin: 123123123, social: 1234569081}, wages: 1234536, fedWithheld: 3450}, 
      {w2Id: {empTin: 890678567, social: 1234569081}, wages: 55555, fedWithheld: 56}] });
    axiosMock.mockResolvedValueOnce({ data: [
      {ten99Id: {payerTin: 123123123, social: 1234569081}, wages: 1234536, fedWithheld: 3450},
      {ten99Id: {payerTin: 123123123, social: 1234569081}, wages: 1234536, fedWithheld: 3450}
    ] });
    axiosMock.mockResolvedValueOnce({ data: { status: 'S' } });

    render(
      <Provider store={store}>

          <ResultsPage />

      </Provider>
    );

    await screen.findByText('$');
    expect(screen.getByText('$')).toBeInTheDocument();
  });
});