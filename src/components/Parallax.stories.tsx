import type { Meta, StoryObj } from "@storybook/react";
import clsx from "clsx";
import { AutoParallaxLayer, ParallaxContainer } from "./Parallax";

const meta: Meta<typeof AutoParallaxLayer> = {
  title: "Components/Parallax",
  component: AutoParallaxLayer,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof AutoParallaxLayer>;

export const Default: Story = {
  name: "Parallax",
  render: () => (
    <div className={clsx(["h-screen", "w-full"])}>
      {/* Parallax section with auto-animation */}
      <ParallaxContainer className={clsx(["h-screen"])}>
        {/* Background layer - moves slowest */}
        <AutoParallaxLayer speed={0.4} className={clsx(["h-screen"])}>
          <div
            className={clsx([
              "w-full",
              "h-full",
              "bg-gradient-to-b",
              "from-blue-500",
              "to-purple-500",
            ])}
          />
        </AutoParallaxLayer>

        {/* Clouds layer */}
        <AutoParallaxLayer
          speed={1}
          distance={10}
          className={clsx(["h-screen"])}
        >
          <div
            className={clsx([
              "absolute",
              "top-40",
              "left-20",
              "w-32",
              "h-16",
              "bg-white",
              "rounded-full",
              "opacity-70",
            ])}
          ></div>
          <div
            className={clsx([
              "absolute",
              "top-50",
              "right-20",
              "w-48",
              "h-20",
              "bg-white",
              "rounded-full",
              "opacity-70",
            ])}
          ></div>
          <div
            className={clsx([
              "absolute",
              "top-20",
              "right-40",
              "w-40",
              "h-16",
              "bg-white",
              "rounded-full",
              "opacity-70",
            ])}
          ></div>
        </AutoParallaxLayer>

        {/* Waves at the bottom background */}
        <AutoParallaxLayer
          speed={2}
          className={clsx(["h-screen"])}
          direction="x"
          distance={6}
          reverse
        >
          <div
            className={clsx([
              "absolute",
              "-bottom-22",
              "-left-20",
              "w-full",
              "fill-sky-600/90",
            ])}
          >
            <svg
              width="1503"
              height="349"
              viewBox="0 0 1503 349"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1467.65 198C1454.65 236.5 1477.11 249 1459.15 288.25C1441.19 327.5 1408.15 337 1408.15 337C1324.15 358.25 1264.15 288.25 1168.15 288.25C1072.15 288.25 976.152 320.75 880.152 326.133C784.152 331.922 688.152 309.578 592.152 288.25C496.152 266.922 458.653 300.711 362.653 306.5C266.653 311.883 241.653 247.5 167.653 294.5C93.6527 341.5 77.652 358.441 35.1527 343.5C-7.3466 328.559 -13.8466 222.5 29.6534 163C73.1535 103.5 22.6534 57.4999 54.1534 12.4999C85.6535 -32.5001 231.152 60.4999 304.153 93.2499C377.153 126 490.153 21.4998 586.153 21.4998C682.153 21.4998 766.153 98.4999 862.153 98.4999C958.153 98.4999 1071.15 -27.5 1171.15 82C1271.15 191.5 1316.65 32 1365.65 10C1414.65 -12 1488.65 26.4999 1499.65 82.4999C1510.65 138.5 1482.73 153.352 1467.65 198Z" />
            </svg>
          </div>
        </AutoParallaxLayer>

        {/* Waves at the bottom background - 2*/}
        <AutoParallaxLayer
          speed={2}
          className={clsx(["h-screen"])}
          direction="x"
          distance={6}
          reverse
        >
          <div
            className={clsx([
              "absolute",
              "-bottom-26",
              "-left-20",
              "w-full",
              "fill-sky-700/90",
            ])}
          >
            <svg
              width="1503"
              height="349"
              viewBox="0 0 1503 349"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1467.65 198C1454.65 236.5 1477.11 249 1459.15 288.25C1441.19 327.5 1408.15 337 1408.15 337C1324.15 358.25 1264.15 288.25 1168.15 288.25C1072.15 288.25 976.152 320.75 880.152 326.133C784.152 331.922 688.152 309.578 592.152 288.25C496.152 266.922 458.653 300.711 362.653 306.5C266.653 311.883 241.653 247.5 167.653 294.5C93.6527 341.5 77.652 358.441 35.1527 343.5C-7.3466 328.559 -13.8466 222.5 29.6534 163C73.1535 103.5 22.6534 57.4999 54.1534 12.4999C85.6535 -32.5001 231.152 60.4999 304.153 93.2499C377.153 126 490.153 21.4998 586.153 21.4998C682.153 21.4998 766.153 98.4999 862.153 98.4999C958.153 98.4999 1071.15 -27.5 1171.15 82C1271.15 191.5 1316.65 32 1365.65 10C1414.65 -12 1488.65 26.4999 1499.65 82.4999C1510.65 138.5 1482.73 153.352 1467.65 198Z" />
            </svg>
          </div>
        </AutoParallaxLayer>

        {/* Waves at the bottom foreground */}
        <AutoParallaxLayer
          speed={4}
          className={clsx(["h-screen"])}
          direction="x"
          distance={4}
          reverse
        >
          <div
            className={clsx([
              "absolute",
              "-bottom-40",
              "-left-20",
              "w-full",
              "fill-sky-500/50",
            ])}
          >
            <svg
              width="1503"
              height="361"
              viewBox="0 0 1503 361"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M34.5 210C47.5 248.5 25.0388 261 43.0007 300.25C60.9626 339.5 94.0007 349 94.0007 349C178.001 370.25 238.001 300.25 334.001 300.25C430.001 300.25 526.001 332.75 622.001 338.133C718.001 343.922 814.001 321.578 910.001 300.25C1006 278.922 1043.5 312.711 1139.5 318.5C1235.5 323.883 1260.5 259.5 1334.5 306.5C1408.5 353.5 1424.5 370.441 1467 355.5C1509.5 340.559 1516 234.5 1472.5 175C1429 115.5 1479.5 69.4999 1448 24.4999C1416.5 -20.5001 1345 -5.50009 1198 105.25C1092 165 1012 33.4998 916 33.4998C820 33.4998 736 110.5 640 110.5C544 110.5 431 -15.5 331 94C231 203.5 185.5 44 136.5 22C87.5 0 13.5 38.4999 2.5 94.4999C-8.5 150.5 19.4242 165.352 34.5 210Z" />
            </svg>
          </div>
        </AutoParallaxLayer>

        {/* Waves at the bottom foreground - 2 */}
        <AutoParallaxLayer
          speed={2}
          className={clsx(["h-screen"])}
          direction="x"
          distance={4}
          reverse
        >
          <div
            className={clsx([
              "absolute",
              "-bottom-44",
              "-left-20",
              "w-full",
              "fill-sky-300/50",
            ])}
          >
            <svg
              width="1503"
              height="361"
              viewBox="0 0 1503 361"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M34.5 210C47.5 248.5 25.0388 261 43.0007 300.25C60.9626 339.5 94.0007 349 94.0007 349C178.001 370.25 238.001 300.25 334.001 300.25C430.001 300.25 526.001 332.75 622.001 338.133C718.001 343.922 814.001 321.578 910.001 300.25C1006 278.922 1043.5 312.711 1139.5 318.5C1235.5 323.883 1260.5 259.5 1334.5 306.5C1408.5 353.5 1424.5 370.441 1467 355.5C1509.5 340.559 1516 234.5 1472.5 175C1429 115.5 1479.5 69.4999 1448 24.4999C1416.5 -20.5001 1345 -5.50009 1198 105.25C1092 165 1012 33.4998 916 33.4998C820 33.4998 736 110.5 640 110.5C544 110.5 431 -15.5 331 94C231 203.5 185.5 44 136.5 22C87.5 0 13.5 38.4999 2.5 94.4999C-8.5 150.5 19.4242 165.352 34.5 210Z" />
            </svg>
          </div>
        </AutoParallaxLayer>

        {/* Content section (static) */}
        <div className={clsx(["relative", "z-10", "h-screen"])}>
          <section
            className={clsx([
              "h-screen",
              "flex",
              "items-center",
              "justify-center",
            ])}
          >
            <div className={clsx(["text-center", "text-white"])}>
              <h1 className={clsx(["text-6xl", "font-bold", "mb-4"])}>
                Parallax Experience
              </h1>
              <p className={clsx(["text-xl", "mb-8", "max-w-2xl", "mx-auto"])}>
                Auto-animated parallax effect with multiple layers moving at
                different speeds.
              </p>
              <button
                className={clsx([
                  "bg-white",
                  "text-indigo-600",
                  "px-6",
                  "py-3",
                  "rounded-full",
                  "font-bold",
                  "hover:bg-indigo-100",
                  "transition-colors",
                ])}
              >
                Get Started
              </button>
            </div>
          </section>
        </div>
      </ParallaxContainer>
    </div>
  ),
  args: {
    children: (
      <div style={{ height: "200px", background: "lightblue" }}>
        AutoParallaxLayer Content
      </div>
    ),
  },
};
