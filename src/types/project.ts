export interface GithubRepo {
  label: string;
  url: string;
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  github: GithubRepo[];
  demo?: string;
}
