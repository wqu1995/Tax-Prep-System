import { render, screen, fireEvent } from '@testing-library/react';
import { Provider, useSelector } from 'react-redux';
import W2Form from '../Components/W2/W2Form';
import store from '../store';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('W2Form component', () => {

  test('renders W2Form component properly', () => {
    const mockFormData = { empTin: '123123123', wages: '12353', fedWithheld: '3453' };
    render(
      <Provider store={store}>
        <W2Form index={0} />
      </Provider>
    );

    const empTinLabel = screen.getByText('Employer Identification');
    const wagesLabel = screen.getByText('Wages');
    const fedWithheldLabel = screen.getByText('Federal Tax'); 

    expect(empTinLabel).toBeInTheDocument();
    expect(wagesLabel).toBeInTheDocument();
    expect(fedWithheldLabel).toBeInTheDocument();

  });

  test('input validation and dispatch actions work correctly', () => {
    const mockFormData = { empTin: '123123123', wages: '12353', fedWithheld: '3453' };
    const useDispatchMock = jest.fn();
    jest.mock('react-redux', () => ({
      ...jest.requireActual('react-redux'),
      useSelector: jest.fn(),
      useDispatch: () => useDispatchMock,
    }));

    (useSelector as jest.Mock).mockReturnValue(mockFormData);

    render(
      <Provider store={store}>
        <W2Form index={0} />
      </Provider>
    );

    const einInput = screen.getByLabelText('Employer identification'); 
    const wagesInput = screen.getByLabelText('Wages'); 
    const fedWithheldInput = screen.getByLabelText('Federal Tax Withheld');

    fireEvent.change(einInput, { target: { value: '12345' } });
    fireEvent.change(wagesInput, { target: { value: '1000' } });
    fireEvent.change(fedWithheldInput, { target: { value: '200' } });

    expect(useDispatchMock).toHaveBeenCalledTimes(3);


  });

});