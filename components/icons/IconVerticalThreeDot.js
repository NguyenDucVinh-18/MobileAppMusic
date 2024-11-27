import React from "react";
import Svg, { Path } from "react-native-svg";

export default function IconVerticalThreeDot({ fill = "#A7A7A7" }) {
  return (
    <Svg width={4} height={18} viewBox="0 0 4 18" fill="none">
      <Path
        d="M0.5 1.5C0.5 1.89782 0.658035 2.27936 0.93934 2.56066C1.22064 2.84196 1.60218 3 2 3C2.39782 3 2.77936 2.84196 3.06066 2.56066C3.34196 2.27936 3.5 1.89782 3.5 1.5C3.5 1.10218 3.34196 0.720644 3.06066 0.43934C2.77936 0.158035 2.39782 0 2 0C1.60218 0 1.22064 0.158035 0.93934 0.43934C0.658035 0.720644 0.5 1.10218 0.5 1.5ZM0.5 16.5C0.5 16.8978 0.658035 17.2794 0.93934 17.5607C1.22064 17.842 1.60218 18 2 18C2.39782 18 2.77936 17.842 3.06066 17.5607C3.34196 17.2794 3.5 16.8978 3.5 16.5C3.5 16.1022 3.34196 15.7206 3.06066 15.4393C2.77936 15.158 2.39782 15 2 15C1.60218 15 1.22064 15.158 0.93934 15.4393C0.658035 15.7206 0.5 16.1022 0.5 16.5ZM0.5 9C0.5 9.39782 0.658035 9.77936 0.93934 10.0607C1.22064 10.342 1.60218 10.5 2 10.5C2.39782 10.5 2.77936 10.342 3.06066 10.0607C3.34196 9.77936 3.5 9.39782 3.5 9C3.5 8.60218 3.34196 8.22064 3.06066 7.93934C2.77936 7.65804 2.39782 7.5 2 7.5C1.60218 7.5 1.22064 7.65804 0.93934 7.93934C0.658035 8.22064 0.5 8.60218 0.5 9Z"
        fill={fill}
      />
    </Svg>
  );
}
