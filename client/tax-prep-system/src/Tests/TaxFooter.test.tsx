import { render } from '@testing-library/react';
import TaxFooter from '../Components/Footer/TaxFooter';


jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

test('renders TaxFooter component', () => {
  const { getByText } = render(<TaxFooter />);


  const footerHeading = getByText('Skillstorm LLC');
  expect(footerHeading).toBeInTheDocument();

  const phoneNumber = getByText('(800) CALL-ASAP');
  expect(phoneNumber).toBeInTheDocument();

  const emailLink = getByText('amakiyama@skillstorm.com');
  expect(emailLink).toBeInTheDocument();
});