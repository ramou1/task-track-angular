export interface UserModel {
  id?: string;
  name?: string;
  email?: string;
  gender?: string;
  phone?: string;
  workplace?: string;
  jobTitle?: string;
  city?: string;
  language?: string;
  timezone?: string;
  dateFormat?: string;
  timeFormat?: string;
  weekStart?: string;
  emailNotifications?: boolean;
  registerDate?: Date;
  role?: 'admin' | 'user' | string;
  password?: string;
}
