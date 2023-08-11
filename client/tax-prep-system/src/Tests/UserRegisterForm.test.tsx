import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { Provider, useDispatch } from 'react-redux';
import UserRegisterForm from '../Components/User/UserRegisterForm'; 
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

describe('UserRegisterForm component', () => {

  test('renders UserRegisterForm component properly', () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);

    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(
      <Provider store={store}>
        <UserRegisterForm />
      </Provider>
    );

    const createAccountHeading = screen.getByText('Create account');
    expect(createAccountHeading).toBeInTheDocument();

  });

  test('handles form submission for registration', async () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);

    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(
      <Provider store={store}>
        <UserRegisterForm />
      </Provider>
    );

    const emailInput = screen.getByLabelText('Email address');
    const passwordInput = screen.getByLabelText('Password');
    const passwordConfirmInput = screen.getByLabelText('Re-type password');
    const ssnInput = screen.getByLabelText('Social Security Number');
    const createAccountButton = screen.getByText('Create account');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(passwordConfirmInput, { target: { value: 'password123' } });
    fireEvent.change(ssnInput, { target: { value: '123456789' } });
    fireEvent.click(createAccountButton);

    await waitFor(() => {
      expect(mockDispatch).toBeCalledTimes(1);
      expect(mockNavigate).toBeCalledTimes(1);
    });

  });

  test('handles form submission for user information', async () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);

    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(
      <Provider store={store}>
        <UserRegisterForm />
      </Provider>
    );

    const submitButton = screen.getByText('Submit!');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockDispatch).toBeCalledTimes(2); 
      expect(mockNavigate).toBeCalledTimes(1);
    });

  });

});
