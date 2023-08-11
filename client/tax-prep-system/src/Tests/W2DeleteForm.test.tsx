import { render, screen, fireEvent } from '@testing-library/react';
import { Provider, useSelector } from 'react-redux';
import W2DeleteForm from '../Components/W2/W2DeleteForm';
import store from '../store';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('W2DeleteForm component', () => {


  test('renders W2DeleteForm component properly', () => {

    render(
      <Provider store={store}>
        <W2DeleteForm />
      </Provider>
    );

    const deleteLabel = screen.getByText('Delete');
    expect(deleteLabel).toBeInTheDocument();

  });

  test('submitting form should dispatch action and reset form', () => {
    const mockW2Data = [
        {w2Id: {empTin: 123123123, social: 1234569081}, wages: 1234536, fedWithheld: 3450}, 
        {w2Id: {empTin: 890678567, social: 1234569081}, wages: 55555, fedWithheld: 56}
    ];
    const mockUserSSN = '123456789';

    const useDispatchMock = jest.fn();
    jest.mock('react-redux', () => ({
      ...jest.requireActual('react-redux'),
      useSelector: jest.fn(),
      useDispatch: () => useDispatchMock,
    }));

    (useSelector as jest.Mock).mockReturnValueOnce(mockW2Data)
      .mockReturnValueOnce(mockUserSSN);

    render(
      <Provider store={store}>
        <W2DeleteForm />
      </Provider>
    );

    // Find form elements
    const deleteSelect = screen.getByLabelText('Which W2');
    const deleteButton = screen.getByText('Delete');
    fireEvent.change(deleteSelect, { target: { value: '123456789' } });

    fireEvent.click(deleteButton);

    expect(useDispatchMock).toHaveBeenCalled();
  });

});
