import { Studio } from "sanity";
import config from "../../sanity.config";
import { isSanityConfigured } from "../lib/sanity";

export function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <div className="max-w-xl text-center">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-4">
            Studio is not configured.
          </h1>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Set <code className="font-mono text-sm bg-secondary/50 px-2 py-1 rounded">VITE_SANITY_PROJECT_ID</code>{" "}
            and{" "}
            <code className="font-mono text-sm bg-secondary/50 px-2 py-1 rounded">VITE_SANITY_DATASET</code>{" "}
            in your <code className="font-mono text-sm bg-secondary/50 px-2 py-1 rounded">.env</code> file.
          </p>
          <p className="text-sm text-muted-foreground/80">
            See <code className="font-mono text-xs">docs/sanity-setup.md</code>{" "}
            for step-by-step instructions.
          </p>
        </div>
      </div>
    );
  }
  return <Studio config={config} />;
}
