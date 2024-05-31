const getData = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiUrl}/checkout/`);
    if(!res.ok){
        throw new Error('Failed to fetch data');
    }
    return res.json();
};
export const getOrder = async(_id:string) => {
    const item = await getData();
    const order = await item.find((order:any) => order._id === _id);
    return order;
}