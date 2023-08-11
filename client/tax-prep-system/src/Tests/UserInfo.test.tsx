import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { Provider, useSelector } from 'react-redux';
import UserInfo from '../Components/User/UserInfo';
import store from '../store';
import api from '../api/axiosConfig';


jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('UserInfo component', () => {

  test('renders UserInfo component properly', () => {
    (useSelector as any).mockReturnValue('123456789');

    render(
      <Provider store={store}>
        <UserInfo />
      </Provider>
    );

    const welcomeHeading = screen.getByText('Welcome');
    expect(welcomeHeading).toBeInTheDocument();

  });

  test('toggles edit mode and submits user information', async () => {
    (useSelector as any).mockReturnValue('123456789');

    render(
      <Provider store={store}>
        <UserInfo />
      </Provider>
    );


    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);


    const firstNameInput = screen.getByLabelText('First Name');
    const streetAddrInput = screen.getByLabelText('Street Address');
    const submitButton = screen.getByText('Submit');

    expect(firstNameInput).toBeEnabled();
    expect(streetAddrInput).toBeEnabled();


    const mockedApiResponse = {
      data: {
        social: '123456789',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        streetAddr: '123 Main St',
        city: 'Cityville',
        state: 'CA',
        zip: '12345',
        status: 'S',
      },
    };
    const getApiSpy = jest.spyOn(api, 'get').mockResolvedValue(mockedApiResponse);


    fireEvent.submit(submitButton);


    await waitFor(() => expect(getApiSpy).toBeCalledTimes(1));


    expect(firstNameInput).toBeDisabled();
    expect(streetAddrInput).toBeDisabled();


    const updateSuccessMessage = screen.getByText('Update information Successfully!');
    expect(updateSuccessMessage).toBeInTheDocument();


    fireEvent.click(editButton);
    expect(firstNameInput).toBeDisabled();
    expect(streetAddrInput).toBeDisabled();
  });


});
