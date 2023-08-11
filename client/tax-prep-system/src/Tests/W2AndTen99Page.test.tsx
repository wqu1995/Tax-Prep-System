import { render, screen, fireEvent } from '@testing-library/react';
import { Provider, useSelector } from 'react-redux';
import W2AndTen99Page from '../Components/W2/W2AndTen99Page'; 
import store from '../store';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('W2AndTen99Page component', () => {


  test('renders W2AndTen99Page component properly', () => {
    const mockW2Data = [
        {w2Id: {empTin: 123123123, social: 1234569081}, wages: 1234536, fedWithheld: 3450}, 
        {w2Id: {empTin: 890678567, social: 1234569081}, wages: 55555, fedWithheld: 56}
    ];
    const mockTen99Data = [
        {ten99Id: {payerTin: 123123123, social: 1234569081}, wages: 1234536, fedWithheld: 3450},
        {ten99Id: {payerTin: 456456456, social: 1234569081}, wages: 654223, fedWithheld: 73430}
    ];
    const mockUserSSN = '123456789';
    const mockNavigate = jest.fn();

    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: jest.fn(() => mockNavigate),
    }));

    (useSelector as jest.Mock).mockReturnValueOnce(mockW2Data)
      .mockReturnValueOnce(mockTen99Data)
      .mockReturnValueOnce(mockUserSSN);

    render(
      <Provider store={store}>
        <W2AndTen99Page />
      </Provider>
    );

    // Test rendering of component elements
    const titleElement = screen.getByText('Please Fill in all of your tax information, including all W2\'s and 1099\'s.');
    expect(titleElement).toBeInTheDocument();

    // Add more assertions based on your component's structure

    // Restore console.error to its original implementation
    (console.error as jest.Mock).mockRestore();
  });

  test('clicking "Next Step" button switches to 1099 section', () => {
    const mockW2Data = [
        {w2Id: {empTin: 123123123, social: 1234569081}, wages: 1234536, fedWithheld: 3450}, 
        {w2Id: {empTin: 890678567, social: 1234569081}, wages: 55555, fedWithheld: 56}
    ];
    const mockTen99Data = [
        {ten99Id: {payerTin: 123123123, social: 1234569081}, wages: 1234536, fedWithheld: 3450},
        {ten99Id: {payerTin: 456456456, social: 1234569081}, wages: 654223, fedWithheld: 73430}
    ];
    const mockUserSSN = '123456789';
    const mockNavigate = jest.fn();


    const useDispatchMock = jest.fn();
    jest.mock('react-redux', () => ({
      ...jest.requireActual('react-redux'),
      useSelector: jest.fn(),
      useDispatch: () => useDispatchMock,
    }));

    (useSelector as jest.Mock).mockReturnValueOnce(mockW2Data)
      .mockReturnValueOnce(mockTen99Data)
      .mockReturnValueOnce(mockUserSSN);

    render(
      <Provider store={store}>
        <W2AndTen99Page />
      </Provider>
    );

    const nextStepButton = screen.getByText('Next Step');
    fireEvent.click(nextStepButton);

    expect(useDispatchMock).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/review');

  });

});
