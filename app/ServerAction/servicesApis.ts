export interface Service {
  id?: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  imageUrl?: string;
  featured: boolean;
}

const mockServices: Service[] = [
  {
    id: "1",
    name: "Luxury Ballroom",
    description: "Premium venues for any occasion",
    category: "Venue",
    icon: "Building",
    imageUrl:
      "https://images.unsplash.com/photo-1519167758481-83f29da8c2b0?w=500",
    featured: true,
  },
  {
    id: "2",
    name: "Garden Venue",
    description: "Beautiful outdoor spaces",
    category: "Venue",
    icon: "Building",
    imageUrl:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500",
    featured: true,
  },
  {
    id: "3",
    name: "Rooftop Space",
    description: "Stunning city views",
    category: "Venue",
    icon: "Building",
    imageUrl:
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=500",
    featured: false,
  },

  {
    id: "4",
    name: "Gourmet Buffet",
    description: "Gourmet catering services",
    category: "Catering",
    icon: "Utensils",
    imageUrl: "https://images.unsplash.com/photo-1555244162-803834f70033?w=500",
    featured: true,
  },
  {
    id: "5",
    name: "Fine Dining",
    description: "Premium plated meals",
    category: "Catering",
    icon: "Utensils",
    imageUrl:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500",
    featured: true,
  },
  {
    id: "6",
    name: "Cocktail Service",
    description: "Elegant cocktail catering",
    category: "Catering",
    icon: "Utensils",
    imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500",
    featured: false,
  },

  {
    id: "7",
    name: "Live Band",
    description: "Live music and performances",
    category: "Entertainment",
    icon: "Music",
    imageUrl:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500",
    featured: true,
  },
  {
    id: "8",
    name: "DJ Services",
    description: "Professional DJ entertainment",
    category: "Entertainment",
    icon: "Music",
    imageUrl:
      "https://images.unsplash.com/photo-1571266028243-d220c6e2e3b4?w=500",
    featured: true,
  },
  {
    id: "9",
    name: "Performers",
    description: "Dancers and entertainers",
    category: "Entertainment",
    icon: "Music",
    imageUrl:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500",
    featured: false,
  },

  {
    id: "10",
    name: "Sound System",
    description: "Professional AV setup",
    category: "Audio & Visual",
    icon: "Volume2",
    imageUrl:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500",
    featured: true,
  },
  {
    id: "11",
    name: "Projection",
    description: "LED screens and projectors",
    category: "Audio & Visual",
    icon: "Volume2",
    imageUrl:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=500",
    featured: false,
  },

  {
    id: "12",
    name: "Event Styling",
    description: "Event styling and decor",
    category: "Style & Design",
    icon: "Palette",
    imageUrl:
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=500",
    featured: true,
  },
  {
    id: "13",
    name: "Custom Decor",
    description: "Bespoke decoration packages",
    category: "Style & Design",
    icon: "Palette",
    imageUrl:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500",
    featured: true,
  },
  {
    id: "14",
    name: "Themed Design",
    description: "Complete themed experiences",
    category: "Style & Design",
    icon: "Palette",
    imageUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=500",
    featured: false,
  },

  {
    id: "15",
    name: "Event Photography",
    description: "Professional event photography",
    category: "Photographs",
    icon: "Camera",
    imageUrl:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500",
    featured: true,
  },
  {
    id: "16",
    name: "Videography",
    description: "Cinematic video coverage",
    category: "Photographs",
    icon: "Camera",
    imageUrl:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
    featured: false,
  },

  {
    id: "17",
    name: "Floral Arrangements",
    description: "Beautiful floral arrangements",
    category: "Floral",
    icon: "Flower",
    imageUrl:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=500",
    featured: true,
  },
  {
    id: "18",
    name: "Centerpieces",
    description: "Elegant table centerpieces",
    category: "Floral",
    icon: "Flower",
    imageUrl: "https://images.unsplash.com/photo-1545486332-9e0999c535b2?w=500",
    featured: true,
  },
  {
    id: "19",
    name: "Bouquets",
    description: "Custom floral bouquets",
    category: "Floral",
    icon: "Flower",
    imageUrl:
      "https://images.unsplash.com/photo-1487070183336-b863922373d4?w=500",
    featured: false,
  },
];

export const servicesApi = {
  getAll: async (): Promise<Service[]> => {
    return new Promise((resolve) =>
      setTimeout(() => resolve(mockServices), 500)
    );
  },

  create: async (service: Service): Promise<Service> => {
    return new Promise((resolve) =>
      setTimeout(() => resolve({ ...service, id: Date.now().toString() }), 500)
    );
  },

  update: async (id: string, service: Service): Promise<Service> => {
    return new Promise((resolve) =>
      setTimeout(() => resolve({ ...service, id }), 500)
    );
  },

  delete: async (id: string): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, 500));
  },
};
