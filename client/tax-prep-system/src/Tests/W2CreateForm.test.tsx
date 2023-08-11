import { render, screen, fireEvent } from '@testing-library/react';
import { Provider, useSelector } from 'react-redux';
import W2CreateForm from '../Components/W2/W2CreateForm';
import store from '../store';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('W2CreateForm component', () => {

  test('renders W2CreateForm component properly', () => {

    render(
      <Provider store={store}>
        <W2CreateForm />
      </Provider>
    );

    const einLabel = screen.getByText('Employer');
    expect(einLabel).toBeInTheDocument();

  });

  test('submitting form with valid data should dispatch action and reset form', () => {
    const mockUserSSN = '123456789';
    const mockW2Data = [
        {w2Id: {empTin: 123123123, social: 1234569081}, wages: 1234536, fedWithheld: 3450}, 
        {w2Id: {empTin: 890678567, social: 1234569081}, wages: 55555, fedWithheld: 56}
    ];

    const useDispatchMock = jest.fn();
    jest.mock('react-redux', () => ({
      ...jest.requireActual('react-redux'),
      useSelector: jest.fn(),
      useDispatch: () => useDispatchMock,
    }));

    (useSelector as jest.Mock).mockReturnValueOnce(mockUserSSN)
      .mockReturnValueOnce(mockW2Data);

    render(
      <Provider store={store}>
        <W2CreateForm />
      </Provider>
    );

    const einInput = screen.getByLabelText('Employer identification'); 
    const wagesInput = screen.getByLabelText('Wages'); 
    const fedWithheldInput = screen.getByLabelText('Federal Tax Withheld'); 
    const submitButton = screen.getByText('Add'); 

    fireEvent.change(einInput, { target: { value: '123456789' } });
    fireEvent.change(wagesInput, { target: { value: '5000.00' } });
    fireEvent.change(fedWithheldInput, { target: { value: '500.00' } });

    fireEvent.click(submitButton);

    expect(useDispatchMock).toHaveBeenCalled();

    expect(einInput).toHaveValue('');
    expect(wagesInput).toHaveValue('');
    expect(fedWithheldInput).toHaveValue('');
  });

});
