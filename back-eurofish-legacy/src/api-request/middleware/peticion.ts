import dotenv from "dotenv";
dotenv.config();

const fetchArielMessage = async (result: any): Promise<any> => {
    const response = await fetch(`${process.env.URL_ARIEL}/v1/message`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(result),
    });
    if (!response.ok) return null;
    return response.json();
};

export { fetchArielMessage };
