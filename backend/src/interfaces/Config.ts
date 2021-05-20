export interface IConfig {
  mongoUrl: string;
  Server: {
    host: string;
    port: number;
  };
  Hosts: {
    Frontend: string;
    Backend: string;
  };
}
