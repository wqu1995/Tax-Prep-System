import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { Provider, useDispatch } from 'react-redux';
import UserLogInForm from '../Components/User/UserLogInForm';
import { useNavigate } from 'react-router-dom';
import store from '../store';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('UserLogInForm component', () => {

  test('renders UserLogInForm component properly', () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);

    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(
      <Provider store={store}>
        <UserLogInForm />
      </Provider>
    );

    const signInHeading = screen.getByText('Sign in');
    expect(signInHeading).toBeInTheDocument();

  });

  test('handles form submission', async () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);

    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(
      <Provider store={store}>
        <UserLogInForm />
      </Provider>
    );


    const emailInput = screen.getByLabelText('Email address');
    const passwordInput = screen.getByLabelText('Password');
    const signInButton = screen.getByText('Sign in');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(mockDispatch).toBeCalledTimes(2);
      expect(mockNavigate).toBeCalledTimes(1); 
    });


  });


});
