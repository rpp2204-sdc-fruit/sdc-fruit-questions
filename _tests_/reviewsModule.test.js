import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
  cleanup,
} from '@testing-library/react';

import ProductBreakdown from '../client/src/components/reviews_module/ProductBreakdown.jsx';
import RatingsBreakdown from '../client/src/components/reviews_module/RatingsBreakdown.jsx';
import Characteristics from '../client/src/components/reviews_module/Characteristics.jsx';
import ReviewsModule from '../client/src/components/reviews_module/ReviewsModule.jsx';
import SubmitReview from '../client/src/components/reviews_module/SubmitReview.jsx';
import ReviewsList from '../client/src/components/reviews_module/ReviewsList.jsx';
import ErrorModal from '../client/src/components/reviews_module/ErrorModal.jsx';
import PhotoModal from '../client/src/components/reviews_module/PhotoModal.jsx';
import StarRating from '../client/src/components/reviews_module/StarRating.jsx';
import Photos from '../client/src/components/reviews_module/Photos.jsx';
import Review from '../client/src/components/reviews_module/Review.jsx';

import {mockMetadata, mockReviews} from './mocks/Reviews-mock-data';

describe('Ratings and Reviews Module', () => {
  describe('Reviews Module', () => {
    it('Should render Reviews Module component', () => {
      render(
        <ReviewsModule product_id={71701} product_name="Heir Force Ones" />
      );
    });

    it('Should display a Ratings and Reviews header', async () => {
      render(<ReviewsModule />);

      await waitFor(() => {
        const element = screen.getByRole('heading', {
          name: /ratings and reviews/i,
        });

        expect(element).toBeInTheDocument();
      });
    });

    it('Should display an Add a Review Button', async () => {
      render(<ReviewsModule />);

      await waitFor(() => {
        const element = screen.getByRole('button', {
          name: /add a review \+/i,
        });

        expect(element).toBeInTheDocument();
      });
    });

    it('Should display a More Reviews Button', async () => {
      render(<ReviewsModule />);

      await waitFor(() => {
        const element = screen.getByRole('button', {
          name: /more reviews/i,
        });

        expect(element).toBeInTheDocument();
      });
    });

    // test('More Reviews button has a onClick event', async () => {

    //   const click = jest.fn();
    //   const { container } = render(<ReviewsModule  product_id={71701} product_name='Heir Force Ones' setShowReviewModal={click}/>);

    //   await waitFor(() => {
    //     const element = container.querySelector('#add-review');

    //     fireEvent.click(element);

    //     expect(click).toHaveBeenCalledTimes(1);
    //   });
    // });

    // test('Add a Review button has a onClick event', async () => {
    //   const handleClick = jest.fn()
    //   render(<ReviewsModule />);

    //   await waitFor(() => {
    //     const button = screen.getByRole('button', {
    //       name: /add a review/i,
    //     })
    //     fireEvent.click(button);
    //   })

    //   await waitFor (() => expect(handleClick).toHaveBeenCalledTimes(1));
    // });
  });

  describe('Reviews List Component', () => {
    it('Should render Reviews List', () => {
      render(<ReviewsList product_id={71701} product_name="Heir Force Ones" />);
    });

    it('Should display total number of reviews', async () => {
      render(<ReviewsList />);

      await waitFor(() => {
        const element = screen.getByText(/reviews, sorted by/i);

        expect(element).toBeInTheDocument();
      });
    });

    it('Should display a dropdown', async () => {
      render(<ReviewsList />);

      await waitFor(() => {
        const element = screen.getByRole('list');

        expect(element).toBeInTheDocument();
      });
    });

    it('Should contain a relevance option', async () => {
      render(<ReviewsList />);

      await waitFor(() => {
        const relevant = screen.getByRole('relevant');

        expect(relevant).toBeInTheDocument();
      });
    });

    it('Should contain a newest option', async () => {
      render(<ReviewsList />);

      await waitFor(() => {
        const newest = screen.getByRole('newest');

        expect(newest).toBeInTheDocument();
      });
    });

    it('Should contain a helpful option', async () => {
      render(<ReviewsList />);

      await waitFor(() => {
        const helpful = screen.getByRole('helpful');

        expect(helpful).toBeInTheDocument();
      });
    });
  });

  describe('Ratings Breakdown', () => {
    it('renders Ratings Breakdown', () => {
      render(<RatingsBreakdown />);
    });
  });

  describe('Product Breakdown', () => {
    it('renders Product Breakdown', () => {
      render(<ProductBreakdown />);
    });
  });

  describe('Review', () => {
    it('renders Reviews', () => {
      render(<Review />);
    });
  });

  describe('Submit Review Modal', () => {
    it('renders submit Review Modal', () => {
      render(<SubmitReview showReviewModal={true} />);
    });

    it('Should have a close button that closes that modal', async () => {
      const click = jest.fn();
      const { container } = render(
        <SubmitReview
          showReviewModal={true}
          setShowReviewModal={click}
          product_name={"Heir Force Ones"}
          characteristics={mockMetadata.characteristics}
        />
      );

      await waitFor(() => {
        const element = container.querySelector('#review-window-icon');

        fireEvent.click(element);

        expect(click).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Photo Modal ', () => {
    it('renders Photo Modal', () => {
      render(<PhotoModal viewPhoto={true} />);
    });

    it('Should have a close button that closes that modal', async () => {
      const click = jest.fn();
      const { container } = render(
        <PhotoModal viewPhoto={true} closePhotoModal={click} />);

      await waitFor(() => {
        const element = container.querySelector('#photo-window-icon');

        fireEvent.click(element);

        expect(click).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Error Modal Component', () => {
    it('Should render  Error Modal', () => {
      render(<ErrorModal errorModal={true} error={{ current: 'email' }} />);
    });

    it('Should display an error', async () => {
      render(<ErrorModal errorModal={true} error={{ current: 'email' }} />);

      await waitFor(() => {
        const element = screen.getByText(
          /you must enter the following: email/i
        );

        expect(element).toBeInTheDocument();
      });
    });

    it('Should display an error message', async () => {
      render(<ErrorModal errorModal={true} error={{ current: 'email' }} />);

      await waitFor(() => {
        const element = screen.getByText(/missing field or incorrect format/i);

        expect(element).toBeInTheDocument();
      });
    });

    it('Should have a close button that closes that modal', async () => {
      const click = jest.fn();
      const { container } = render(
        <ErrorModal
          error={{ current: 'email' }}
          errorModal={true}
          setErrorModal={click}
        />
      );

      await waitFor(() => {
        const element = container.querySelector('#error-modal-icon');

        fireEvent.click(element);

        expect(click).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Characteristics', () => {
    it('Should render Characteristics Component', () => {
      render(<Characteristics />);
    });

    it('Should display Characteristics titel', async () => {
      render(<Characteristics />);

      await waitFor(() => {
        const selected = screen.getByText(/characteristics\*/i);

        expect(selected).toBeInTheDocument();
      });
    });
  });

  describe('Photos', () => {
    it('Should render Photos Component', () => {
      render(<Photos />);
    });

    it('Should allow a user to upload photos', async () => {
      const { container } = render(<Photos viewPhoto={true} />);

      await waitFor(() => {
        const element = container.querySelector('#photo-input');

        expect(element).toBeInTheDocument();
      });
    });
  });

  describe('Star Rating', () => {
    it('renders Reviews Module', () => {
      render(<StarRating />);
    });
  });
});
