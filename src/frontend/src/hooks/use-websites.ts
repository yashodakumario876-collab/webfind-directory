import { createActor } from "@/backend";
import type { Website } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useWebsites() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Website[]>({
    queryKey: ["websites"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllWebsites();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useWebsiteById(id: bigint | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Website | null>({
    queryKey: ["website", id?.toString()],
    queryFn: async () => {
      if (!actor || id === undefined) return null;
      const result = await actor.getWebsiteById(id);
      return result ?? null;
    },
    enabled: !!actor && !isFetching && id !== undefined,
  });
}

export function useCategories() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCategories();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useSubmitWebsite() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      description: string;
      url: string;
      category: string;
      tags: string[];
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitWebsite(
        data.name,
        data.description,
        data.url,
        data.category,
        data.tags,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["websites"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
