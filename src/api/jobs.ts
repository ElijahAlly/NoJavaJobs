import { NewDiceJobType } from "@/types/Jobs";
import { API_BASE_URL } from "./api_utils/all_api";

// Fetch all dice jobs
export const fetchAllDiceJobs = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/dice`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${yourAuthToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching all jobs:', error);
        throw error;
    }
};

// Fetch a single dice job by ID
export const fetchDiceJobById = async (id: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/dice/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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
