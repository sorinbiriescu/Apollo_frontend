import React from "react";
import ContentLoader from "react-content-loader";

export default function CardContentSkeleton(props) {
  return (
    <React.Fragment>
      {props.renderer === "Indicator_Total_Score" && (
        <ContentLoader speed={2} width={230} height={78} viewBox="0 0 230 78">
          <rect x="0" y="0" rx="0" ry="0" width="120" height="15" />
          <rect x="0" y="25" rx="0" ry="0" width="65" height="30" />
          <rect x="0" y="65" rx="0" ry="0" width="135" height="15" />
        </ContentLoader>
      )}
      {props.renderer === "Indicator_Total" && (
        <ContentLoader speed={2} width={230} height={20} viewBox="0 0 230 21">
          <rect x="0" y="0" rx="0" ry="0" width="120" height="20" />
          <rect x="125" y="0" rx="0" ry="0" width="20" height="20" />
        </ContentLoader>
      )}
      {props.renderer === "Requests_Expiration_Table" && (
        <ContentLoader speed={2} width={230} height={120} viewBox="0 0 230 120">
          <circle cx="10" cy="20" r="8" />
          <rect x="25" y="15" rx="5" ry="5" width="220" height="10" />
          <circle cx="10" cy="50" r="8" />
          <rect x="25" y="45" rx="5" ry="5" width="220" height="10" />
          <circle cx="10" cy="80" r="8" />
          <rect x="25" y="75" rx="5" ry="5" width="220" height="10" />
          <circle cx="10" cy="110" r="8" />
          <rect x="25" y="105" rx="5" ry="5" width="220" height="10" />
        </ContentLoader>
      )}
      {props.renderer === "Suspended_Not_Recontacted_Table" && (
        <ContentLoader speed={2} width={230} height={120} viewBox="0 0 230 120">
          <circle cx="10" cy="20" r="8" />
          <rect x="25" y="15" rx="5" ry="5" width="220" height="10" />
          <circle cx="10" cy="50" r="8" />
          <rect x="25" y="45" rx="5" ry="5" width="220" height="10" />
          <circle cx="10" cy="80" r="8" />
          <rect x="25" y="75" rx="5" ry="5" width="220" height="10" />
          <circle cx="10" cy="110" r="8" />
          <rect x="25" y="105" rx="5" ry="5" width="220" height="10" />
        </ContentLoader>
      )}
      {props.renderer === "Total_Requests_By_Tech_Table" && (
        <ContentLoader speed={2} width={230} height={120} viewBox="0 0 230 120">
          <circle cx="10" cy="20" r="8" />
          <rect x="25" y="15" rx="5" ry="5" width="220" height="10" />
          <circle cx="10" cy="50" r="8" />
          <rect x="25" y="45" rx="5" ry="5" width="220" height="10" />
          <circle cx="10" cy="80" r="8" />
          <rect x="25" y="75" rx="5" ry="5" width="220" height="10" />
          <circle cx="10" cy="110" r="8" />
          <rect x="25" y="105" rx="5" ry="5" width="220" height="10" />
        </ContentLoader>
      )}
    </React.Fragment>
  );
}
