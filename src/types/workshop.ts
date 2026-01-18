export interface Workshop {
  id: string,
  slug: string,
  title: string,
  subtitle: string | null,
  description: string,
  imageUrl: string | null,
  videoUrl: string | null,
  level: string,
  format: string,
  language: string,
  durationHours: number | null,
  price: number,
  originalPrice: number | null,
  currency: string,
  isOnSale: boolean,
  instructorId: string,
  whatYoullMaster: string[],
  createdAt: string,
  updatedAt: string,
  instructor: {
    id: string,
    name: string,
    title: string,
    bio: string,
    imgUrl: string,
    achievements: {
      id: string,
      title: string,
      icon: string,
      instructorId: string
    }[]
  },
  sessions: {
    id: string | undefined,
    idx: number,
    title: string,
    content: string,
    duration: number | undefined,
  }[],
  tools: {
    name: string,
    purpose: string,
    features: string[]
  }[],
  studentResults: {
    imageUrl: string,
    caption: string
  }[],
  reviews: {
    id: string,
    reviewerName: string,
    reviewerTitle: string,
    rating: number,
    content: string,
  }[]
}
