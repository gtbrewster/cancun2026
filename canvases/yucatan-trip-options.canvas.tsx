import { useState } from "react";
import {
  Stack,
  Row,
  Grid,
  H1,
  H2,
  H3,
  Text,
  Card,
  CardHeader,
  CardBody,
  Table,
  Pill,
  Stat,
  Callout,
  Divider,
  CollapsibleSection,
  useHostTheme,
  mergeStyle,
} from "cursor/canvas";

type DayRow = {
  date: string;
  day: string;
  lodging: string;
  lodgingStatus: "locked" | "tbd" | "travel";
  meals: string;
  driving: string;
  highlights: string;
};

type Option = {
  id: string;
  name: string;
  tagline: string;
  jul7Drive: string;
  moves: string;
  tulum: string;
  bestFor: string;
  cenotes: string;
  days: DayRow[];
  jul4Timeline: { time: string; activity: string }[];
};

const LOCKED = {
  cancun: "Riu Cancun · AI · Hotel Zone",
  playa: "Hyatt Vivid Playa · AI · Adults-only",
};

const OPTIONS: Option[] = [
  {
    id: "a",
    name: "Option A",
    tagline: "Playa only after ruins",
    jul7Drive: "~1 hr",
    moves: "None",
    tulum: "Day trip Jul 6",
    bestFor: "Simplest",
    cenotes: "Zací · Oxmán",
    days: [
      { date: "Jul 1", day: "Tue", lodging: LOCKED.cancun, lodgingStatus: "locked", meals: "AI", driving: "None", highlights: "Arrive · Riu pool party" },
      { date: "Jul 2", day: "Wed", lodging: LOCKED.cancun, lodgingStatus: "locked", meals: "AI", driving: "None", highlights: "Full Riu day" },
      { date: "Jul 3", day: "Thu", lodging: "Valladolid — TBD", lodgingStatus: "tbd", meals: "Dinner on own", driving: "~2 hr", highlights: "Checkout Riu · Cenote Zací" },
      { date: "Jul 4", day: "Fri", lodging: "Travel → Playa", lodgingStatus: "travel", meals: "Lunch paid", driving: "~2.5–3 hr", highlights: "Chichen Itza · Oxmán · drive south" },
      { date: "Jul 5", day: "Sat", lodging: LOCKED.playa, lodgingStatus: "locked", meals: "AI", driving: "None", highlights: "Check in Vivid · 5th Ave / Mamitas" },
      { date: "Jul 6", day: "Sun", lodging: LOCKED.playa, lodgingStatus: "locked", meals: "AI", driving: "Optional Tulum RT", highlights: "AI beach · optional Tulum day" },
      { date: "Jul 7", day: "Mon", lodging: "—", lodgingStatus: "travel", meals: "—", driving: "~1 hr", highlights: "Checkout · airport" },
    ],
    jul4Timeline: [
      { time: "6:45 AM", activity: "Checkout Valladolid (Yucatán time)" },
      { time: "7:40 AM", activity: "Chichen Itza · gates 8:00 AM" },
      { time: "8:00–10:30", activity: "Ruins" },
      { time: "10:50 AM", activity: "Cenote Oxmán" },
      { time: "12:15 PM", activity: "Lunch (paid)" },
      { time: "1:15 PM", activity: "Drive toward Playa (+1 hr watch in Q.Roo)" },
      { time: "3:30 PM", activity: "Free evening near Playa before Jul 5 check-in" },
    ],
  },
  {
    id: "g",
    name: "Option G",
    tagline: "Tulum 1 night → Vivid 2 nights",
    jul7Drive: "~1 hr",
    moves: "Jul 5",
    tulum: "Overnight Jul 4",
    bestFor: "See Tulum",
    cenotes: "Zací · Hubiku",
    days: [
      { date: "Jul 1", day: "Tue", lodging: LOCKED.cancun, lodgingStatus: "locked", meals: "AI", driving: "None", highlights: "Arrive · Riu" },
      { date: "Jul 2", day: "Wed", lodging: LOCKED.cancun, lodgingStatus: "locked", meals: "AI", driving: "None", highlights: "Full Riu day" },
      { date: "Jul 3", day: "Thu", lodging: "Valladolid — TBD", lodgingStatus: "tbd", meals: "Dinner on own", driving: "~2 hr", highlights: "Checkout Riu · Cenote Zací" },
      { date: "Jul 4", day: "Fri", lodging: "Tulum — TBD", lodgingStatus: "tbd", meals: "Lunch paid", driving: "~2.5 hr", highlights: "Chichen Itza · Hubiku · Tulum town" },
      { date: "Jul 5", day: "Sat", lodging: LOCKED.playa, lodgingStatus: "locked", meals: "AI", driving: "~1 hr", highlights: "Tulum → Vivid · 5th Ave night" },
      { date: "Jul 6", day: "Sun", lodging: LOCKED.playa, lodgingStatus: "locked", meals: "AI", driving: "None", highlights: "Full AI day · optional cenote" },
      { date: "Jul 7", day: "Mon", lodging: "—", lodgingStatus: "travel", meals: "—", driving: "~1 hr", highlights: "Checkout · airport" },
    ],
    jul4Timeline: [
      { time: "6:45 AM", activity: "Checkout Valladolid" },
      { time: "7:40 AM", activity: "Chichen Itza · gates 8:00 AM" },
      { time: "8:00–10:15", activity: "Ruins" },
      { time: "10:40 AM", activity: "Cenote Hubiku + lunch option" },
      { time: "12:15 PM", activity: "Drive to Tulum (~2 hr)" },
      { time: "2:30 PM", activity: "Check in Tulum hotel TBD" },
      { time: "7:00 PM", activity: "Tulum pueblo dinner" },
    ],
  },
  {
    id: "h",
    name: "Option H",
    tagline: "Vivid → back to Riu Cancun",
    jul7Drive: "~20–30 min",
    moves: "Jul 6",
    tulum: "Skip or AM only",
    bestFor: "Easy Jul 7",
    cenotes: "Zací · San Lorenzo",
    days: [
      { date: "Jul 1", day: "Tue", lodging: LOCKED.cancun, lodgingStatus: "locked", meals: "AI", driving: "None", highlights: "Arrive · Riu" },
      { date: "Jul 2", day: "Wed", lodging: LOCKED.cancun, lodgingStatus: "locked", meals: "AI", driving: "None", highlights: "Full Riu day" },
      { date: "Jul 3", day: "Thu", lodging: "Valladolid — TBD", lodgingStatus: "tbd", meals: "Dinner on own", driving: "~2 hr", highlights: "Checkout Riu · Cenote Zací" },
      { date: "Jul 4", day: "Fri", lodging: "Travel → Playa", lodgingStatus: "travel", meals: "Lunch paid", driving: "~2.5–3 hr", highlights: "Chichen Itza · San Lorenzo" },
      { date: "Jul 5", day: "Sat", lodging: LOCKED.playa, lodgingStatus: "locked", meals: "AI", driving: "None", highlights: "Check in Vivid · nightlife" },
      { date: "Jul 6", day: "Sun", lodging: LOCKED.cancun, lodgingStatus: "locked", meals: "AI ~3 PM", driving: "~1 hr", highlights: "Checkout Vivid · Riu bookend night" },
      { date: "Jul 7", day: "Mon", lodging: "—", lodgingStatus: "travel", meals: "—", driving: "~20–30 min", highlights: "Short airport run" },
    ],
    jul4Timeline: [
      { time: "6:45 AM", activity: "Checkout Valladolid" },
      { time: "7:40 AM", activity: "Chichen Itza · gates 8:00 AM" },
      { time: "8:00–10:30", activity: "Ruins" },
      { time: "10:50 AM", activity: "Cenote San Lorenzo" },
      { time: "12:15 PM", activity: "Lunch (paid)" },
      { time: "1:15 PM", activity: "Drive toward Playa" },
      { time: "3:30 PM", activity: "Free evening before Jul 5 check-in" },
    ],
  },
];

function statusLabel(status: DayRow["lodgingStatus"]): string {
  if (status === "locked") return "Locked";
  if (status === "tbd") return "TBD";
  return "Travel";
}

function statusTone(status: DayRow["lodgingStatus"]): "success" | "warning" | "neutral" {
  if (status === "locked") return "success";
  if (status === "tbd") return "warning";
  return "neutral";
}

export default function YucatanTripOptions() {
  const theme = useHostTheme();
  const [activeId, setActiveId] = useState("a");
  const active = OPTIONS.find((o) => o.id === activeId) ?? OPTIONS[0];

  const scheduleHeaders = ["Date", "Lodging", "Meals", "Driving", "Highlights"];
  const scheduleRows = active.days.map((d) => [
    `${d.date} (${d.day})`,
    `${statusLabel(d.lodgingStatus)} — ${d.lodging}`,
    d.meals,
    d.driving,
    d.highlights,
  ]);

  const compareHeaders = ["Option", "Jul 7", "Moves", "Tulum", "Cenotes"];
  const compareRows = OPTIONS.map((o) => [o.name, o.jul7Drive, o.moves, o.tulum, o.cenotes]);

  const jul4Headers = ["Time", "Activity"];
  const jul4Rows = active.jul4Timeline.map((t) => [t.time, t.activity]);

  return (
    <Stack gap={24} style={{ padding: 24, maxWidth: 960, margin: "0 auto" }}>
      <Stack gap={8}>
        <H1>Yucatán Trip · Jul 1–7</H1>
        <Text tone="secondary">2 adults · rental car · AI except Valladolid (+ Tulum TBD in G)</Text>
      </Stack>

      <Card>
        <CardHeader>Locked hotels</CardHeader>
        <CardBody>
          <Grid columns={2} gap={16}>
            <Stack gap={6}>
              <Text weight="semibold" size="small">Jul 1–2 · Cancun</Text>
              <Text size="small">{LOCKED.cancun}</Text>
              <Pill tone="success">Booked</Pill>
            </Stack>
            <Stack gap={6}>
              <Text weight="semibold" size="small">Jul 5–6 · Playa</Text>
              <Text size="small">{LOCKED.playa}</Text>
              <Pill tone="success">Selected</Pill>
            </Stack>
          </Grid>
        </CardBody>
      </Card>

      <Callout tone="info" title="Next steps">
        Pick Valladolid hotel (Jul 3). Option G also needs Tulum hotel (Jul 4).
      </Callout>

      <Row gap={8} wrap>
        {OPTIONS.map((o) => {
          const selected = activeId === o.id;
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => setActiveId(o.id)}
              style={mergeStyle(
                {
                  cursor: "pointer",
                  border: `1px solid ${selected ? theme.accent.primary : theme.stroke.secondary}`,
                  background: selected ? theme.fill.secondary : theme.bg.elevated,
                  borderRadius: 8,
                  padding: "12px 16px",
                  textAlign: "left",
                  flex: "1 1 200px",
                  minWidth: 200,
                  color: theme.text.primary,
                },
                undefined,
              )}
            >
              <Stack gap={4}>
                <Text weight="semibold" style={{ color: selected ? theme.accent.primary : theme.text.primary }}>
                  {o.name}
                </Text>
                <Text size="small" tone="secondary">{o.tagline}</Text>
              </Stack>
            </button>
          );
        })}
      </Row>

      <Grid columns={4} gap={12}>
        <Stat label="Jul 7 drive" value={active.jul7Drive} />
        <Stat label="Resort moves" value={active.moves} />
        <Stat label="Tulum" value={active.tulum} />
        <Stat label="Best for" value={active.bestFor} />
      </Grid>

      <Stack gap={8}>
        <H2>{active.name} — full schedule</H2>
        <Text tone="secondary" size="small">{active.tagline}</Text>
        <Table
          headers={scheduleHeaders}
          rows={scheduleRows}
          rowTone={active.days.map((d) => statusTone(d.lodgingStatus))}
          striped
        />
      </Stack>

      <CollapsibleSection title="Jul 4 hour-by-hour (Yucatán time)" defaultOpen>
        <Table headers={jul4Headers} rows={jul4Rows} striped />
      </CollapsibleSection>

      <Stack gap={8}>
        <H2>Compare all three</H2>
        <Table headers={compareHeaders} rows={compareRows} striped />
      </Stack>

      <Divider />

      <Grid columns={3} gap={12}>
        <Card>
          <CardHeader>Option A</CardHeader>
          <CardBody>
            <Text size="small">Fewest moves. Optional Tulum day trip from Vivid Jul 6.</Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Option G</CardHeader>
          <CardBody>
            <Text size="small">One Tulum night Jul 4. Needs Tulum + Valladolid picks.</Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Option H</CardHeader>
          <CardBody>
            <Text size="small">Rebook Riu Jul 6. Shortest Jul 7 drive (~20–30 min).</Text>
          </CardBody>
        </Card>
      </Grid>

      <Text tone="tertiary" size="small">
        Chichen Itza: 8:00 AM Yucatán time · Jul 4 = longest drive day (~2.5–3 hr)
      </Text>
    </Stack>
  );
}
