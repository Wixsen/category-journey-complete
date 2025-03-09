
export interface FarmerReview {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface FarmerDetails {
  farmer: string;
  location: string;
  about: string;
  image: string;
  since: string;
  specialties: string[];
  certifications: string[];
  rating: number;
  reviews: FarmerReview[];
}
