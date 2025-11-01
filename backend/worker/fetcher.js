const fs = require("fs");
const path = require("path");
const cron = require("node-cron");

const SAMPLE_OUT = path.join(__dirname, "../db/sample_snapshots.json");

async function updateDistrict(district) {
  console.log(`Fetching data for ${district}...`);
  const randomPeople = Math.floor(12000 + Math.random() * 3000);
  const randomWages = Math.floor(20000000 + Math.random() * 5000000);

  const current = JSON.parse(fs.readFileSync(SAMPLE_OUT, "utf8"));
  current[district.toLowerCase()] = {
    district,
    state: "Madhya Pradesh",
    last_updated: new Date().toISOString(),
    metrics: {
      people_worked: { this_month: randomPeople, last_month: 11800 },
      wages_paid: { this_month: randomWages, last_month: 21000000 },
      avg_days: { this_month: 11 + Math.random() * 3, last_month: 11.8 }
    },
    history: current[district.toLowerCase()]?.history || []
  };

  fs.writeFileSync(SAMPLE_OUT, JSON.stringify(current, null, 2));
  console.log(`✅ Data updated for ${district}`);
}

// Run hourly
cron.schedule("0 * * * *", () => updateDistrict("Jabalpur"));
updateDistrict("Jabalpur");
