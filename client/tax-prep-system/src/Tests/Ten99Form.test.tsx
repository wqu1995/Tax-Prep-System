import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Ten99Form from '../Components/Ten99/Ten99Form'; 
import store from '../store';


jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('Ten99Form component', () => {

  test('renders Ten99Form component properly', () => {
    render(
      <Provider store={store}>
        <Ten99Form index={0} />
      </Provider>
    );


    const ptinLabel = screen.getByLabelText('ptin');
    expect(ptinLabel).toBeInTheDocument();

    const compLabel = screen.getByLabelText('comp');
    expect(compLabel).toBeInTheDocument();

    const ptaxLabel = screen.getByLabelText('ptax');
    expect(ptaxLabel).toBeInTheDocument();


    const ptinInput = screen.getByLabelText('ptin');
    fireEvent.change(ptinInput, { target: { value: '123' } });

    const compInput = screen.getByLabelText('comp');
    fireEvent.change(compInput, { target: { value: '1000' } });

    const ptaxInput = screen.getByLabelText('ptax');
    fireEvent.change(ptaxInput, { target: { value: '200' } });


  });

});
