
import { FarmerDetails } from '@/types/farmer';

// Sample farmer data - in a real app, this would come from an API
export const getFarmerData = (farmerName: string): FarmerDetails => {
  const farmers: Record<string, FarmerDetails> = {
    'Johnson Family Farm': {
      farmer: 'Johnson Family Farm',
      location: 'Midwest Plains',
      about: 'A fourth-generation family farm dedicated to sustainable farming practices. The Johnson family has been cultivating crops using traditional methods combined with modern innovations to ensure the highest quality produce.',
      image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      since: '1952',
      specialties: ['Organic Wheat', 'Corn', 'Soybeans'],
      certifications: ['USDA Organic', 'Fair Trade'],
      rating: 4.8,
      reviews: [
        { id: 1, name: 'Sarah M.', rating: 5, comment: 'Best organic wheat I\'ve ever purchased. Will definitely buy again!', date: '2023-06-15' },
        { id: 2, name: 'Michael T.', rating: 5, comment: 'Great quality and fast delivery. Highly recommend.', date: '2023-05-22' },
        { id: 3, name: 'Linda K.', rating: 4, comment: 'Very good products, just wish they had more variety.', date: '2023-04-10' }
      ]
    },
    'Green Valley Cooperative': {
      farmer: 'Green Valley Cooperative',
      location: 'River Delta',
      about: 'Green Valley is a cooperative of small farmers committed to sustainable agriculture. Together, they grow a variety of crops using eco-friendly methods that protect the soil and water resources.',
      image: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      since: '2005',
      specialties: ['Rice', 'Pulses', 'Vegetables'],
      certifications: ['Rainforest Alliance', 'GMO-Free'],
      rating: 4.5,
      reviews: [
        { id: 1, name: 'James W.', rating: 5, comment: 'The rice from Green Valley is amazing. So flavorful!', date: '2023-07-05' },
        { id: 2, name: 'Patricia D.', rating: 4, comment: 'Good quality, but shipping took longer than expected.', date: '2023-06-18' },
        { id: 3, name: 'Robert L.', rating: 5, comment: 'Love supporting this cooperative. Great community impact.', date: '2023-05-30' }
      ]
    },
    'Bee Happy Apiary': {
      farmer: 'Bee Happy Apiary',
      location: 'Flowering Fields',
      about: 'Specializing in raw, unfiltered honey and bee products, Bee Happy Apiary is dedicated to protecting pollinators while producing high-quality honey from diverse floral sources.',
      image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      since: '2010',
      specialties: ['Raw Honey', 'Beeswax Products', 'Pollen'],
      certifications: ['Certified Naturally Grown', 'Bee Friendly Farming'],
      rating: 4.9,
      reviews: [
        { id: 1, name: 'Elizabeth R.', rating: 5, comment: 'The most delicious honey I\'ve ever tasted!', date: '2023-07-12' },
        { id: 2, name: 'David P.', rating: 5, comment: 'Great quality honey and excellent customer service.', date: '2023-06-25' },
        { id: 3, name: 'Catherine M.', rating: 4, comment: 'Love their products and mission. Delivery was prompt.', date: '2023-05-18' }
      ]
    },
    'Sunshine Farms': {
      farmer: 'Sunshine Farms',
      location: 'Southern Gardens',
      about: 'Located in the sunny south, Sunshine Farms specializes in growing heirloom vegetables and fruits with a focus on flavor and nutritional value above all else.',
      image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      since: '1999',
      specialties: ['Heirloom Tomatoes', 'Peppers', 'Melons'],
      certifications: ['USDA Organic', 'Certified Humane'],
      rating: 4.7,
      reviews: [
        { id: 1, name: 'Thomas H.', rating: 5, comment: 'These tomatoes are incredible! Just like I remember from my grandmother\'s garden.', date: '2023-07-08' },
        { id: 2, name: 'Jennifer S.', rating: 4, comment: 'Very satisfied with the quality. Will order again.', date: '2023-06-20' },
        { id: 3, name: 'William B.', rating: 5, comment: 'The melons were perfectly ripe and so sweet!', date: '2023-06-02' }
      ]
    }
  };

  // Return the farmer data or a default if not found
  return farmers[farmerName] || {
    farmer: farmerName,
    location: 'Unknown',
    about: 'Information about this farmer is not available at the moment.',
    image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    since: 'Unknown',
    specialties: [],
    certifications: [],
    rating: 0,
    reviews: []
  };
};
