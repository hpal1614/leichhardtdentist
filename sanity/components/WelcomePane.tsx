import { Box, Card, Grid, Heading, Stack, Text } from "@sanity/ui";
import { LaunchIcon } from "@sanity/icons";

const sections = [
  {
    emoji: "⚙️",
    label: "Practice Settings",
    desc: "Phone number, email, opening hours, and social media links.",
  },
  {
    emoji: "🏠",
    label: "Home Hero",
    desc: "The big headline, background video, and Dr. Nick card on the home page.",
  },
  {
    emoji: "🦷",
    label: "Treatments & Services",
    desc: "The 4 treatment pages — content, FAQs, process steps, and images.",
  },
  {
    emoji: "👥",
    label: "Our Team",
    desc: "Dr. Nick's bio, the associate dentists, portrait photos, and credentials.",
  },
];

export function WelcomePane() {
  return (
    <Box padding={6} style={{ maxWidth: 680, margin: "0 auto" }}>
      <Stack space={6}>
        {/* Header */}
        <Stack space={3}>
          <Text size={0} muted style={{ letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Leichhardt Dental Centre
          </Text>
          <Heading size={3}>Content dashboard.</Heading>
          <Text size={2} muted>
            Everything on your website can be updated from here — no developers
            needed. Changes you publish appear on the live site within a few
            seconds.
          </Text>
        </Stack>

        {/* Section cards */}
        <Grid columns={[1, 2]} gap={3}>
          {sections.map((s) => (
            <Card key={s.label} padding={4} radius={3} border>
              <Stack space={3}>
                <Text size={3}>{s.emoji}</Text>
                <Text size={1} weight="semibold">
                  {s.label}
                </Text>
                <Text size={1} muted>
                  {s.desc}
                </Text>
              </Stack>
            </Card>
          ))}
        </Grid>

        {/* How-to tip */}
        <Card padding={4} radius={3} tone="primary" border>
          <Stack space={3}>
            <Text size={1} weight="semibold">
              How to make changes live
            </Text>
            <Text size={1} muted>
              1. Click a section in the left sidebar.{"\n"}
              2. Edit any field — changes are auto-saved as a draft.{"\n"}
              3. Click the <strong>Publish</strong> button at the bottom right to push
              changes to the website. Drafts are <em>not</em> visible to visitors until
              published.
            </Text>
          </Stack>
        </Card>

        {/* Image tip */}
        <Card padding={4} radius={3} tone="default" border>
          <Stack space={3}>
            <Text size={1} weight="semibold">
              Uploading photos
            </Text>
            <Text size={1} muted>
              Use the <strong>Media</strong> tab (camera icon, left sidebar) to upload
              and manage all photos in one place. Once uploaded, you can select them
              from any image field without re-uploading.
            </Text>
          </Stack>
        </Card>

        {/* Live site link */}
        <a
          href="https://leichhardtdental.com.au"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            color: "inherit",
            textDecoration: "underline",
            fontSize: 14,
          }}
        >
          Visit the live website <LaunchIcon />
        </a>
      </Stack>
    </Box>
  );
}
