import { Providers } from "@/components/providers";
import { UserAgent } from "@/views/userAgent";
import { headers } from "next/headers";

const UserAgentRoot = () => {
  const serverHeader = headers();
  const userAgent = serverHeader.get("user-agent") || "Unknown";

  return (
    <Providers userAgent={userAgent}>
      <UserAgent />
    </Providers>
  );
};

export default UserAgentRoot;
