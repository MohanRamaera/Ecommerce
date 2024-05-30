import Navbar from "@/components/navbar";

interface DashboardType {
    children: React.ReactNode;
    params: { storeId: string }
}
const Dashboard = ({children,params}:DashboardType) => {
    return ( <><Navbar />
    {children}</> );
}
 
export default Dashboard;