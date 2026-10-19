import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

import { track } from "@/util/activity";

const usePageVisitLogger = () => {
  const router = useRouter();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (!router.isReady) return;
    const path = router.asPath.split(/[?#]/)[0];
    if (!path || path === lastPath.current) return;
    lastPath.current = path;
    track.pageView(path);
  }, [router.isReady, router.asPath]);
};

export default usePageVisitLogger;
