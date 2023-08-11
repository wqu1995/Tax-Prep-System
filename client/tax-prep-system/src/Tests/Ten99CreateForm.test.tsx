import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Ten99CreateForm from '../Components/Ten99/Ten99CreateForm';
import store from '../store';



jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('Ten99CreateForm component', () => {




  test('renders Ten99CreateForm component properly', () => {
    render(
      <Provider store={store}>
        <Ten99CreateForm />
      </Provider>
    );

    const ptinLabel = screen.getByLabelText('ptin');
    expect(ptinLabel).toBeInTheDocument();

    const compLabel = screen.getByLabelText('comp');
    expect(compLabel).toBeInTheDocument();

    const ptaxLabel = screen.getByLabelText('ptax');
    expect(ptaxLabel).toBeInTheDocument();

    const addButton = screen.getByText('add');
    expect(addButton).toBeInTheDocument();


    const ptinInput = screen.getByLabelText('ptin');
    fireEvent.change(ptinInput, { target: { value: 'invalid' } });

    const submitButton = screen.getByText('add');
    fireEvent.click(submitButton);

    const ptinErrorMessage = screen.getByText('ptinerror');
    expect(ptinErrorMessage).toBeInTheDocument();


  });

});
