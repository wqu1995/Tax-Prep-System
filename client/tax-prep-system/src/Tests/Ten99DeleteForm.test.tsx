import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Ten99DeleteForm from '../Components/Ten99/Ten99DeleteForm';
import store from '../store';


jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('Ten99DeleteForm component', () => {

  test('renders Ten99DeleteForm component properly', () => {
    render(
      <Provider store={store}>
        <Ten99DeleteForm />
      </Provider>
    );


    const deleteLabel = screen.getByLabelText('del1099');
    expect(deleteLabel).toBeInTheDocument();

    const selectOptions = screen.getAllByRole('option');
    expect(selectOptions).toHaveLength(3);

    const deleteButton = screen.getByText('delete');
    expect(deleteButton).toBeInTheDocument();

    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: '222' } });


    const submitButton = screen.getByText('delete');
    fireEvent.click(submitButton);


  });


});
