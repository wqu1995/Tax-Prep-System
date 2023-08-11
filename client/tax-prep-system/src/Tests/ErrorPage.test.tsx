import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ErrorPage from '../Components/Home/ErrorPage';

describe('ErrorPage component', () => {
  test('renders ErrorPage with correct text and button action', () => {
    const errorCode = 404; 

    render(
      <MemoryRouter>
        <ErrorPage errorCode={errorCode} />
      </MemoryRouter>
    );

    const pageTitle = screen.getByText('Page not found');
    expect(pageTitle).toBeInTheDocument();

    const errorMessage = screen.getByText(
      "We're sorry, we can’t find the page you're looking for."
    );
    expect(errorMessage).toBeInTheDocument();

    const visitHomepageButton = screen.getByText('Visit homepage');
    expect(visitHomepageButton).toBeInTheDocument();

    const errorCodeText = screen.getByText(`Error code: ${errorCode}`);
    expect(errorCodeText).toBeInTheDocument();


    fireEvent.click(visitHomepageButton);

  });


});