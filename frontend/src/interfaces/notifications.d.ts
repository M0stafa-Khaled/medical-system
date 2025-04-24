export interface INotification {
  id: string;
  last_view: null | string;
  created_at: string;
  data: {
    patient?: {
      id: number;
    };
    booking?: {
      id: number;
    };
    sender: {
      name: string;
      image: string;
    };
    message: string;
  };
}

export interface INotificationsRes {
  status: boolean;
  data: INotification[];
  message: string | null;
}
