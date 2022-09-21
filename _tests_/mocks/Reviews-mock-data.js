const mockReviews = [
    {
      review_id: 1276486,
      rating: 5,
      summary: 'Amazing',
      recommend: true,
      response: null,
      body: "This is so great I'm going to buy it for everyone as a gift. ",
      date: '2022-09-06T00:00:00.000Z',
      reviewer_name: 'Mario',
      helpfulness: 54,
      photos: [
        {
          id: 2456041,
          url: 'http://res.cloudinary.com/red-bean-rulez/image/upload/v1662494659/FEC_project/d840oamy6ipgcivbl52l.jpg',
        },
      ],
    },
    {
      review_id: 1276118,
      rating: 2,
      summary: '2 star',
      recommend: false,
      response: null,
      body: 'creía q era algo más mono, pero no es así, demasiado baja calidad , el estampado igual q en la foto',
      date: '2022-08-06T00:00:00.000Z',
      reviewer_name: 'cow200',
      helpfulness: 25,
      photos: [],
    },
    {
      review_id: 1276722,
      rating: 5,
      summary: 'I love this!',
      recommend: true,
      response: null,
      body: "I can't wait to show all my friends. This is the best ever!",
      date: '2022-09-10T00:00:00.000Z',
      reviewer_name: 'SamIAm',
      helpfulness: 25,
      photos: [
        {
          id: 2456187,
          url: 'http://res.cloudinary.com/red-bean-rulez/image/upload/v1662780449/FEC_project/m4apunrxwilu1535vi87.jpg',
        },
      ],
    },
    {
      review_id: 1276723,
      rating: 3,
      summary: 'Not the best',
      recommend: false,
      response: null,
      body: 'This product is too big. It was a bit uncomfortable too. ',
      date: '2022-09-10T00:00:00.000Z',
      reviewer_name: 'kermit',
      helpfulness: 18,
      photos: [
        {
          id: 2456188,
          url: 'http://res.cloudinary.com/red-bean-rulez/image/upload/v1662781940/FEC_project/fspszyduqqvualfbr6us.jpg',
        },
      ],
    },
    {
      review_id: 1276572,
      rating: 5,
      summary: 'Purrrfect',
      recommend: true,
      response: null,
      body: 'My cat looks ridiculous in this hat, and I love it.',
      date: '2022-09-08T00:00:00.000Z',
      reviewer_name: 'KittyBluth',
      helpfulness: 2,
      photos: [
        {
          id: 2456069,
          url: 'https://res.cloudinary.com/deitkdfiq/image/upload/v1662595858/cdwzsqexbon0dn9okliu.jpg',
        },
      ],
    },
  ];


const mockMetadata = {
  "product_id": "71701",
  "ratings": {
      "1": "9",
      "2": "16",
      "3": "23",
      "4": "14",
      "5": "29"
  },
  "recommended": {
      "false": "41",
      "true": "50"
  },
  "characteristics": {
      "Size": {
          "id": 240595,
          "value": "2.9107142857142857"
      },
      "Width": {
          "id": 240596,
          "value": "2.7307692307692308"
      },
      "Comfort": {
          "id": 240597,
          "value": "3.2641509433962264"
      },
      "Quality": {
          "id": 240598,
          "value": "3.5438596491228070"
      }
  }
}

export { mockReviews, mockMetadata };
