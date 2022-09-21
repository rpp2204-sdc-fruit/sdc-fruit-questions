import renderer from 'react-test-renderer';
import { render, screen, waitFor, act } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import Overview from '../client/src/components/overview_module/Overview.jsx'
import ProductInfo from '../client/src/components/overview_module/ProductInfo.jsx';
import App from '../client/src/components/App.jsx';
import Styles from '../client/src/components/overview_module/Styles.jsx';
import '@testing-library/jest-dom';

describe('Atelier topbar', () => {
  test('The Atelier Topbar renders correctly', () => {
    // eslint-disable-next-line react/jsx-filename-extension
    render(<App />);
    const element = screen.getByText(/atelier/i);
    expect(element).toBeInTheDocument();
  });
});

// describe('Overview Component', () => {
//   test('Renders the overview component', async () => {
//     // eslint-disable-next-line react/jsx-filename-extension
//     render(<Overview product_id={71701} />);
//     waitFor(() => {
//       const outfit = screen.getByRole('button', {
//         name: /add to my outfit/i,
//       });
//       expect(outfit).toBeInTheDocument();
//     });
//   });
// });

describe('Overview Component', () => {
  render(<Overview product_id={71701} />);
  describe('Renders the Product Info component', () => {
    test('Renders the add to outfit button', async () => {
      // eslint-disable-next-line react/jsx-filename-extension
      waitFor(() => {
        const outfit = screen.getByRole('button', {
          name: /add to my outfit/i,
        });
        expect(outfit).toBeInTheDocument();
      });
    });

    test('Renders the ratings', async () => {
      // eslint-disable-next-line react/jsx-filename-extension
      waitFor(() => {
        const starRatings = screen.getByRole('group');
        expect(starRatings).toBeInTheDocument();
      });
    });

    test('Renders the read all button', async () => {
      // eslint-disable-next-line react/jsx-filename-extension
      waitFor(() => {
        const readAll = screen.getByText(/read all \(87\) reviews/i);
        expect(readAll).toBeInTheDocument();
      });
    });

    test('Renders the category', async () => {
      // eslint-disable-next-line react/jsx-filename-extension
      waitFor(() => {
        const category = screen.getByText(/kicks/i);
        expect(category).toBeInTheDocument();
      });
    });

    test('Renders the product slogan', async () => {
      // eslint-disable-next-line react/jsx-filename-extension
      waitFor(() => {
        const slogan = screen.getByRole('heading', {
          name: /a sneaker dynasty/i,
        });
        expect(slogan).toBeInTheDocument();
      });
    });

    test('Renders the style name', async () => {
      // eslint-disable-next-line react/jsx-filename-extension
      waitFor(() => {
        const styleName = screen.getByRole('heading', {
          name: /a sneaker dynasty/i,
        });
        expect(styleName).toBeInTheDocument();
      });
    });

    test('Renders the price', async () => {
      // eslint-disable-next-line react/jsx-filename-extension
      waitFor(() => {
        const price = screen.getByText(/\$99\.00/i);
        expect(price).toBeInTheDocument();
      });
    });

    test('Renders the feature list', async () => {
      // eslint-disable-next-line react/jsx-filename-extension
      waitFor(() => {
        const features = screen.getByRole('list');
        expect(features).toBeInTheDocument();
      });
    });

    test('Renders the style selector', async () => {
      // eslint-disable-next-line react/jsx-filename-extension
      waitFor(() => {
        const styleSelector = screen.getByTestId('style-selector')
        expect(styleSelector).toBeInTheDocument();
      });
    });

    test('Renders the price', async () => {
      // eslint-disable-next-line react/jsx-filename-extension
      waitFor(() => {
        const price = screen.getByText(/\$99\.00/i);
        expect(price).toBeInTheDocument();
      });
    });

    test('Renders the price', async () => {
      // eslint-disable-next-line react/jsx-filename-extension
      waitFor(() => {
        const price = screen.getByText(/\$99\.00/i);
        expect(price).toBeInTheDocument();
      });
    });
  });
});
