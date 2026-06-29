import { MotionConfig } from "motion/react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

export default function App() {
  // `reducedMotion="user"` makes every Motion animation honour the visitor's
  // OS "reduce motion" setting (transforms/opacity are skipped). CSS-driven
  // animations are guarded separately in index.css.
  return (
    <MotionConfig reducedMotion="user">
      <RouterProvider router={router} />
    </MotionConfig>
  );
}
