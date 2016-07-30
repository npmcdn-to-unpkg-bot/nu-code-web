export interface User {
  // AKA `uid`, but named `$key` for easy casting
  $key: string;
  name: string;
  email: string;
  status: string;
}
