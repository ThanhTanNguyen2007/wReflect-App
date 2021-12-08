export enum Status {
  Done = 'Done',
  InProgress = 'In Progress',
  New = 'New',
}

export type WorkSpace = {
  id: number;
  name: string;
};

export type Project = {
  id: number;
  name: string;
  description: string;
  ownerEmail: string;
  members: Member[];
  startDate: Date;
  endDate: Date;
  status: string;
};

export type Member = {
  id: number;
  userId: number;
  name: string;
  joinedAt: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  status: string;
};

export type Me = {
  id: number;
  email: string;
  name: string;
  isAdmin: boolean;
  picture: string | null;
};
