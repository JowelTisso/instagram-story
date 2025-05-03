export interface Story {
  id: string;
  image: string;
  timestamp: string;
}

export interface User {
  userId: string;
  username: string;
  avatar: string;
  isSeen: boolean;
  stories: Story[];
}

export interface InitialState {
  stories: User[];
}
