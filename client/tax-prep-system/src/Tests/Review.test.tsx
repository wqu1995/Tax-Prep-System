import { render, screen } from '@testing-library/react';
import { Provider, useSelector } from 'react-redux';
import Review from '../Components/W2/Review';
import store from '../store';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('Review component', () => {


  test('renders Review component properly', () => {
    const mockUserSSN = '1234569081';
    const mockUserName = 'John Doe';
    const mockAddress = '123 Main St, City, State, 12345';
    const mockPhone = '1234567890';
    const mockFilingStatus = 'S';
    const mockW2Data = [
        {w2Id: {empTin: 123123123, social: 1234569081}, wages: 1234536, fedWithheld: 3450}, 
        {w2Id: {empTin: 890678567, social: 1234569081}, wages: 55555, fedWithheld: 56}
    ];
    const mockTen99Data = [
        {ten99Id: {payerTin: 123123123, social: 1234569081}, wages: 1234536, fedWithheld: 3450},
        {ten99Id: {payerTin: 456456456, social: 1234569081}, wages: 654223, fedWithheld: 73430}
    ];

    (useSelector as jest.Mock).mockReturnValueOnce(mockUserSSN)
      .mockReturnValueOnce(mockUserName)
      .mockReturnValueOnce(mockAddress)
      .mockReturnValueOnce(mockPhone)
      .mockReturnValueOnce(mockFilingStatus)
      .mockReturnValueOnce(mockW2Data)
      .mockReturnValueOnce(mockTen99Data);

    render(
      <Provider store={store}>
        <Review />
      </Provider>
    );

    const reviewHeading = screen.getByText('Review');
    expect(reviewHeading).toBeInTheDocument();

    const personalInfoHeading = screen.getByText('Personal Information');
    expect(personalInfoHeading).toBeInTheDocument();


    const financialInfoHeading = screen.getByText('Financial Information');
    expect(financialInfoHeading).toBeInTheDocument();


    expect(useSelector).toHaveBeenCalledTimes(7);


  });


});
