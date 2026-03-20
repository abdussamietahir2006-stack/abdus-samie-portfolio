import { useState, useEffect } from "react";
import { apiGetProjects } from "../utils/api.ts";
import { FALLBACK_PROJECTS } from "../utils/constants.ts";
import { Project } from "../types.ts";

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const { data } = await apiGetProjects();
        setProjects(Array.isArray(data) && data.length > 0 ? data : FALLBACK_PROJECTS);
      } catch (err) {
        console.error("Failed to fetch projects, using fallback data", err);
        setProjects(FALLBACK_PROJECTS);
        setError("Failed to fetch projects, using fallback data");
      } finally {
        setLoading(false);
      }
    };

    getProjects();
  }, []);

  return { projects, loading, error, setProjects };
};
