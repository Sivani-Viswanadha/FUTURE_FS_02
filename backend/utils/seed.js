require("dotenv").config();
const connectDB = require("../config/db");
const User = require("../models/User");
const Lead = require("../models/Lead");

const sampleLeads = [
  { firstName:"Aarav", lastName:"Sharma", email:"aarav@acme.io", phone:"+91 98765 43210", company:"Acme Corp", jobTitle:"CTO", status:"Qualified", source:"LinkedIn", industry:"SaaS", priority:"High", dealValue:12000, location:"Bengaluru", preferredChannel:"Email", followUpDate:new Date(Date.now()+86400000*3), tags:["enterprise","hot"], notes:"Demo scheduled." },
  { firstName:"Sara", lastName:"Khan", email:"sara@northwind.com", phone:"+1 415 555 0142", company:"Northwind", jobTitle:"Head of Ops", status:"Contacted", source:"Website", industry:"Logistics", priority:"Medium", dealValue:5400, location:"San Francisco", preferredChannel:"Phone", followUpDate:new Date(Date.now()+86400000*1), tags:["smb"] },
  { firstName:"Lukas", lastName:"Müller", email:"lukas@bauer.de", phone:"+49 30 123456", company:"Bauer GmbH", jobTitle:"Procurement", status:"New", source:"Event", industry:"Manufacturing", priority:"Low", dealValue:2300, location:"Berlin", preferredChannel:"Email", followUpDate:new Date(Date.now()+86400000*7) },
  { firstName:"Emily", lastName:"Chen", email:"emily@brightlabs.co", phone:"+1 212 555 0188", company:"Brightlabs", jobTitle:"Founder", status:"Proposal", source:"Referral", industry:"Health", priority:"High", dealValue:24000, location:"New York", preferredChannel:"WhatsApp", followUpDate:new Date(Date.now()+86400000*2), tags:["urgent"] },
  { firstName:"Diego", lastName:"Garcia", email:"diego@solmedia.mx", phone:"+52 55 5555 5555", company:"Sol Media", jobTitle:"Marketing Lead", status:"Won", source:"Cold Call", industry:"Media", priority:"Medium", dealValue:8600, location:"Mexico City", preferredChannel:"Email" },
  { firstName:"Yuki", lastName:"Tanaka", email:"yuki@kintetsu.jp", phone:"+81 3 5555 5555", company:"Kintetsu", jobTitle:"Director", status:"Lost", source:"Email", industry:"Travel", priority:"Low", dealValue:0, location:"Tokyo", preferredChannel:"LinkedIn" },
  { firstName:"Olivia", lastName:"Brown", email:"olivia@finhub.io", phone:"+44 20 7946 0991", company:"FinHub", jobTitle:"VP Sales", status:"Qualified", source:"LinkedIn", industry:"Fintech", priority:"High", dealValue:18900, location:"London", preferredChannel:"Email", followUpDate:new Date(Date.now()+86400000*5), tags:["enterprise"] },
  { firstName:"Noah", lastName:"Wilson", email:"noah@greenleaf.org", phone:"+1 312 555 0123", company:"Greenleaf", jobTitle:"Ops Manager", status:"New", source:"Website", industry:"Nonprofit", priority:"Medium", dealValue:1500, location:"Chicago", preferredChannel:"Email" },
  { firstName:"Mia", lastName:"Rossi", email:"mia@volante.it", phone:"+39 02 5555 5555", company:"Volante", jobTitle:"COO", status:"Contacted", source:"Referral", industry:"Automotive", priority:"High", dealValue:32000, location:"Milan", preferredChannel:"Phone", followUpDate:new Date(Date.now()+86400000*4) },
  { firstName:"Ethan", lastName:"Lee", email:"ethan@pixelforge.co", phone:"+82 2 555 5555", company:"PixelForge", jobTitle:"Lead Designer", status:"Proposal", source:"Event", industry:"Design", priority:"Medium", dealValue:7400, location:"Seoul", preferredChannel:"Email", followUpDate:new Date(Date.now()+86400000*6), tags:["creative"] },
];

(async () => {
  await connectDB();
  const email = (process.env.ADMIN_EMAIL || "admin@crm.io").toLowerCase();
  let admin = await User.findOne({ email });
  if (!admin) {
    admin = await User.create({
      name: process.env.ADMIN_NAME || "Admin",
      email,
      password: process.env.ADMIN_PASSWORD || "admin123",
      role: "admin",
    });
    console.log(`👤 Created admin: ${email}`);
  } else {
    console.log(`👤 Admin already exists: ${email}`);
  }
  await Lead.deleteMany({});
  const leads = await Lead.insertMany(sampleLeads.map(l => ({ ...l, owner: admin._id })));
  console.log(`✅ Inserted ${leads.length} sample leads`);
  process.exit(0);
})().catch((e) => { console.error(e); process.exit(1); });
