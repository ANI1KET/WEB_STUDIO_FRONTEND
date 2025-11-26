export interface HomepageContent {
  id?: string;
  heroHeading: string;
  heroSubheading: string;
  eventsOcSectionCopy: string;
  eventsOfCenturySectionText: string;
}

const mockHomepageContent: HomepageContent = {
  id: "1",
  heroHeading: "Creating Unforgettable Moments",
  heroSubheading: "Premier event planning services in Gold Coast",
  eventsOcSectionCopy:
    "We specialize in creating extraordinary experiences that leave lasting impressions.",
  eventsOfCenturySectionText:
    "From intimate gatherings to grand celebrations, we bring your vision to life.",
};

export const homepageApi = {
  get: async (): Promise<HomepageContent> => {
    return new Promise((resolve) =>
      setTimeout(() => resolve(mockHomepageContent), 500)
    );
  },

  update: async (content: HomepageContent): Promise<HomepageContent> => {
    return new Promise((resolve) => setTimeout(() => resolve(content), 500));
  },
};
