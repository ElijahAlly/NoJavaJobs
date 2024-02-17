import { JobType } from "@/types/Jobs";
import { API_BASE_URL } from "./api_utils/all_api";

// Fetch all jobs
export const fetchAllJobs = async (): Promise<JobType[]> => {
  try {
    // console.log('API_BASE_URL', API_BASE_URL)
    const response = await fetch(`${API_BASE_URL}/api/jobs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': `Bearer ${yourAuthToken}`,
      },
    });
    // console.log('jobs', response);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching all  jobs:", error);
    throw error;
  }
};

// Fetch a single job by ID
export const fetchJobById = async (id: string): Promise<JobType> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/jobs/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Include authorization headers if needed
        // 'Authorization': `Bearer ${yourAuthToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching job with slug: ${id}:`, error);
    throw error;
  }
};

// // Fetch all top tech jobs
// export const fetchAllTopTechJobs = async (): Promise<TopTechJobType[]> => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/api/toptech`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         // 'Authorization': `Bearer ${yourAuthToken}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Error: ${response.status}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching all TopTech jobs:", error);
//     throw error;
//   }
// };