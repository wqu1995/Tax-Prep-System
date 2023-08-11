import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import UserFinancialInfo from '../Components/User/UserFinancialInfo';
import store from '../store';


jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('UserFinancialInfo component', () => {

  test('renders UserFinancialInfo component properly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserFinancialInfo />
        </MemoryRouter>
      </Provider>
    );

    const welcomeHeading = screen.getByText('Welcome');
    expect(welcomeHeading).toBeInTheDocument();


  });

  test('toggles W2 edit mode', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserFinancialInfo />
        </MemoryRouter>
      </Provider>
    );

    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    const wageInputs = screen.getAllByLabelText('Wages');
    expect(wageInputs[0]).toBeEnabled();

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    expect(wageInputs[0]).toBeDisabled();
  });

  test('toggles 1099 edit mode', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserFinancialInfo />
        </MemoryRouter>
      </Provider>
    );

    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    const wageInputs = screen.getAllByLabelText('Wages');
    expect(wageInputs[0]).toBeEnabled();

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    expect(wageInputs[0]).toBeDisabled();
  });

});
