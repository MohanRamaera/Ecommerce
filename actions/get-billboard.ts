import { Billboard } from "@/types";
import axios from "axios";

const URL = `${process.env.FRONTEND_URL}/api/billboards`

const getBillboard = async (id: string): Promise<Billboard> => {
    // console.log("here",axios.get('http://localhost:3001/api/billboards/60322adf-9b74-4db4-bd61-f0a01ef60b2a'))
    const res = await axios.get(`${URL}/60322adf-9b74-4db4-bd61-f0a01ef60b2a`);
    console.log(res)
    return res.data
}

export default getBillboard;