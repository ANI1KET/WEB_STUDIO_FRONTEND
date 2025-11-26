export interface SiteSettings {
  id?: string;
  phone: string;
  email: string;
  location: string;
  quickLinks: string[];
  popularServices: string[];
}

const mockSettings: SiteSettings = {
  id: "1",
  phone: "+61 123 456 789",
  email: "info@eventsoc.com",
  location: "Gold Coast, Australia",
  quickLinks: ["Home", "Portfolio", "Services", "Contact"],
  popularServices: ["Wedding Planning", "Corporate Events", "Birthday Parties"],
};

export const settingsApi = {
  get: async (): Promise<SiteSettings> => {
    return new Promise((resolve) =>
      setTimeout(() => resolve(mockSettings), 500)
    );
  },

  update: async (settings: SiteSettings): Promise<SiteSettings> => {
    return new Promise((resolve) => setTimeout(() => resolve(settings), 500));
  },
};
