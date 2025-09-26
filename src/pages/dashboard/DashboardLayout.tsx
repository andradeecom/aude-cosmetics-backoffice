import { Outlet } from "react-router";
import { AppSidebar } from "@/components";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarProvider } from "@/contexts";
import { useAuth } from "@/hooks";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

// Sidebar working. Time to fine tuning

export default function DashboardLayout() {
  const { signout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signout();
    navigate("/sign-in");
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 p-4 md:p-8">
        <header className="bg-white px-4 py-4 md:px-8 border-b border-gray-200 flex justify-between items-center">
          <div>
            <svg
              width="15%"
              height="15%"
              viewBox="0 0 1080 1080"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xmlSpace="preserve"
              style={{
                fillRule: "evenodd",
                clipRule: "evenodd",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeMiterlimit: 1.5,
              }}
            >
              <g id="A" transform="matrix(1.04778,0,0,1.04778,-503.164,-1584.05)">
                <path
                  d="M910.473,1852.38L720.61,2381.32C720.61,2381.32 707.097,2415.55 721.462,2441C729.79,2418.16 922.262,1883.01 922.262,1883.01L910.473,1852.38Z"
                  style={{ stroke: "black", strokeWidth: "0.95px" }}
                />
                <path
                  d="M743.995,2195.89L766.542,2196.13L706.384,2363.29C706.384,2363.29 675.455,2433.39 720.259,2475C736.169,2489.77 762.779,2516.52 859.287,2517.43C859.249,2522.48 859.399,2526.42 859.399,2526.42L480.22,2526.47L480.22,2517.26L502.112,2517.5C502.112,2517.5 583.844,2518.02 630.013,2449.36C653.295,2420.94 686.047,2351.1 697.096,2322.29C704.989,2304.53 743.995,2195.89 743.995,2195.89Z"
                  style={{ stroke: "black", strokeWidth: "0.95px" }}
                />
                <path
                  d="M751.944,2174.51L774.357,2174.51L901.033,1822.73L889.136,1791.86L751.944,2174.51Z"
                  style={{ stroke: "black", strokeWidth: "0.95px" }}
                />
                <path
                  d="M830.697,2195.89L837.888,2174.51L1050.08,2175.32L901.033,1757.49L980.488,1535.01C980.488,1535.01 991.996,1518.8 1004.73,1535.36C1010.65,1551.05 1285.2,2304.6 1308.23,2341.7C1328.05,2378.67 1395.16,2519.94 1510.97,2517.96C1510.96,2521.66 1510.94,2524.22 1510.94,2526.47C1505.58,2526.38 1015.5,2526.47 1015.5,2526.47L1015.63,2517.61L1095.99,2515.28C1095.99,2515.28 1131.99,2514.8 1149.66,2496.8C1156.64,2486.91 1160.69,2482.04 1150.96,2457.23C1148.96,2451.56 1057.72,2195.89 1057.72,2195.89L830.697,2195.89Z"
                  style={{ stroke: "black", strokeWidth: "0.95px" }}
                />
              </g>
            </svg>
          </div>
          <div className="flex items-center gap-4">
            <span>Welcome, {user?.firstName}</span>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </header>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
