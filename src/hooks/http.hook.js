import { useState, useCallback } from "react";

export const useHttp = () => {
    const [loadingStatus, setLoadingStatus] = useState("idle");
    // const [error, serError] = useState<string | null>(null);

    const request = useCallback(
        async ({
            url,
            method = "GET",
            body = null,
            headers = {
                "Content-Type": "application/json",
            },
        }) => {
            setLoadingStatus("loading");

            try {
                const response = await fetch(url, { method, body, headers });

                if (!response.ok) {
                    throw new Error(`Could not fetch ${url}, status: ${response.status}`);
                }

                const data = await response.json();

                setLoadingStatus("idle");
                return data;
            } catch (e) {
                setLoadingStatus("error");
                throw e;
            }
        },
        []
    );

    return { loadingStatus, request };
};
