/// <reference types="vite/client">

interface Tweet {
  id: number;
  content: string;
  date: string;
  tag: string;
  author: string;
  avatar: string;
}

interface ImportMetaEnv {
  readonly NODE_ENV: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}