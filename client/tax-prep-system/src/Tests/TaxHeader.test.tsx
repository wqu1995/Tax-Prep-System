import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import TaxHeader from '../Components/Header/TaxHeader';
import store from '../store';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('TaxHeader component', () => {


  test('renders TaxHeader component with correct text', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <TaxHeader />
        </MemoryRouter>
      </Provider>
    );


    const homeLink = screen.getByLabelText('Home');
    expect(homeLink).toHaveTextContent('title');

    const languageDropdown = screen.getByText('Language');
    expect(languageDropdown).toHaveTextContent('Language');


  });

  test('renders TaxHeader component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <TaxHeader />
        </MemoryRouter>
      </Provider>
    );


    const homeLink = screen.getByLabelText('Home');
    expect(homeLink).toBeInTheDocument();


    const menuButton = screen.getByLabelText('Menu');
    fireEvent.click(menuButton);
    const mobileNav = screen.getByRole('navigation');
    expect(mobileNav).toBeInTheDocument();


    const languageDropdown = screen.getByText('Language');
    fireEvent.click(languageDropdown);
    const languageOptions = screen.getAllByText(/English|Chinese/);
    expect(languageOptions.length).toBe(2);

  });

});