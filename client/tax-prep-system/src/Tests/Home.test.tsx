import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import Home from '../Components/Home/Home';
import store from '../store';



jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('Home component', () => {

  test('renders Home component with login form when not logged in', () => {
    (useSelector as jest.Mock).mockReturnValueOnce(null);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );


    const signInButton = screen.getByText('Sign in');
    expect(signInButton).toBeInTheDocument();

    const signUpButton = screen.getByText('Sign up');
    expect(signUpButton).toBeInTheDocument();


  });

  test('renders Home component with welcome message when logged in', () => {
    const mockFirstName = 'John';
    const mockLastName = 'Doe';

    (useSelector as jest.Mock).mockReturnValueOnce(mockFirstName);
    (useSelector as jest.Mock).mockReturnValueOnce(mockLastName);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );


    const welcomeMessage = screen.getByText(`Welcome back ${mockFirstName} ${mockLastName}!`);
    expect(welcomeMessage).toBeInTheDocument();


  });


});