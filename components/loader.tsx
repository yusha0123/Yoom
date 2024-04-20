import { cn } from "@/lib/utils";

const Loader = ({ className }: { className?: string }) => (
  <div className="fixed inset-0 flex items-center justify-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      className={cn("h-20 w-20 z-[999]", className)}
    >
      <radialGradient
        id="a"
        cx={0.66}
        cy={0.313}
        fx={0.66}
        fy={0.313}
        gradientTransform="scale(1.5)"
      >
        <stop offset={0} stopColor="#C9DDFF" />
        <stop offset={0.3} stopColor="#C9DDFF" stopOpacity={0.9} />
        <stop offset={0.6} stopColor="#C9DDFF" stopOpacity={0.6} />
        <stop offset={0.8} stopColor="#C9DDFF" stopOpacity={0.3} />
        <stop offset={1} stopColor="#C9DDFF" stopOpacity={0} />
      </radialGradient>
      <circle
        cx={100}
        cy={100}
        r={70}
        fill="none"
        stroke="url(#a)"
        strokeDasharray="200 1000"
        strokeLinecap="round"
        strokeWidth={15}
        transform-origin="center"
      >
        <animateTransform
          attributeName="transform"
          calcMode="spline"
          dur={2}
          keySplines="0 0 1 1"
          keyTimes="0;1"
          repeatCount="indefinite"
          type="rotate"
          values="360;0"
        />
      </circle>
      <circle
        cx={100}
        cy={100}
        r={70}
        fill="none"
        stroke="#C9DDFF"
        strokeLinecap="round"
        strokeWidth={15}
        opacity={0.2}
        transform-origin="center"
      />
    </svg>
  </div>
);
export default Loader;
