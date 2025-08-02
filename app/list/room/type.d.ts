export type OwnerDetails =
  | { id: string }
  | {
      ownerName: string;
      number: string;
      email?: string;
    };
