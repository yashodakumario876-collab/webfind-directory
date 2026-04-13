export type WebsiteId = bigint;

export interface Website {
  id: WebsiteId;
  name: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  submittedAt: bigint;
}

export interface SearchFilters {
  query: string;
  category: string;
}
