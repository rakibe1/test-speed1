import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  // Create some sample system stats
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  await prisma.systemStats.upsert({
    where: { date: today },
    update: {},
    create: {
      date: today,
      totalTests: 1250,
      totalUsers: 89,
      averageDownload: 67.8,
      averageUpload: 23.4,
      averagePing: 28,
    },
  })

  // Create an admin user first (you'll need to sign in with Google first to get this user created)
  // Then run this seed to update their role to ADMIN
  console.log("Creating sample admin user...")

  // Try to find an existing user to make admin, or create a placeholder
  const existingUser = await prisma.user.findFirst({
    where: {
      email: {
        contains: "@",
      },
    },
  })

  let adminUserId: string

  if (existingUser) {
    // Update existing user to admin
    const adminUser = await prisma.user.update({
      where: { id: existingUser.id },
      data: { role: "ADMIN" },
    })
    adminUserId = adminUser.id
    console.log(`Updated user ${existingUser.email} to ADMIN role`)
  } else {
    // Create a placeholder admin user
    const adminUser = await prisma.user.create({
      data: {
        email: "admin@ktscspeed.com",
        name: "KTSC Admin",
        role: "ADMIN",
      },
    })
    adminUserId = adminUser.id
    console.log("Created placeholder admin user")
  }

  // Create a dummy user
  const user = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      name: "Test User",
      email: "test@example.com",
      emailVerified: new Date(),
      image: "https://avatars.githubusercontent.com/u/0?v=4",
    },
  })

  console.log(`Created dummy user with ID: ${user.id}`)

  // Create dummy speed test records
  const speedTests = []
  for (let i = 0; i < 10; i++) {
    speedTests.push(
      prisma.speedTest.create({
        data: {
          userId: user.id,
          downloadSpeed: Number.parseFloat((Math.random() * 100 + 50).toFixed(2)), // 50-150 Mbps
          uploadSpeed: Number.parseFloat((Math.random() * 50 + 20).toFixed(2)), // 20-70 Mbps
          ping: Math.floor(Math.random() * 50 + 10), // 10-60 ms
          serverInfo: JSON.stringify({
            id: 12345 + i,
            name: `Server ${i + 1}`,
            location: `City ${i + 1}`,
            country: "US",
          }),
          location: `City ${i + 1}`,
          ipAddress: `hashed_ip_${i}`,
          userAgent:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36",
          createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000), // Spread over days
        },
      }),
    )
  }
  await Promise.all(speedTests)
  console.log(`Created ${speedTests.length} dummy speed test records.`)

  // Sample articles data
  const sampleArticles = [
    {
      title: "Understanding Internet Speed Test Results",
      description:
        "Learn how to interpret your speed test results and what download, upload, and ping measurements really mean.",
      content: `
        <h2>What Do Speed Test Results Mean?</h2>
        <p>When you run an internet speed test, you'll typically see three main measurements: download speed, upload speed, and ping (latency). Understanding these metrics is crucial for evaluating your internet connection quality.</p>
        
        <h3>Download Speed</h3>
        <p>Download speed measures how quickly data travels from the internet to your device. This affects activities like:</p>
        <ul>
          <li>Streaming videos and music</li>
          <li>Downloading files</li>
          <li>Loading web pages</li>
          <li>Online gaming</li>
        </ul>
        
        <h3>Upload Speed</h3>
        <p>Upload speed measures how quickly data travels from your device to the internet. This is important for:</p>
        <ul>
          <li>Video conferencing</li>
          <li>Uploading files to cloud storage</li>
          <li>Live streaming</li>
          <li>Sending emails with attachments</li>
        </ul>
        
        <h3>Ping (Latency)</h3>
        <p>Ping measures the time it takes for data to travel from your device to a server and back. Lower ping is better for:</p>
        <ul>
          <li>Online gaming</li>
          <li>Video calls</li>
          <li>Real-time applications</li>
        </ul>
        
        <h2>What Speeds Do You Need?</h2>
        <p>The internet speed you need depends on your usage patterns:</p>
        <ul>
          <li><strong>Basic browsing:</strong> 1-5 Mbps</li>
          <li><strong>HD video streaming:</strong> 5-25 Mbps</li>
          <li><strong>4K video streaming:</strong> 25+ Mbps</li>
          <li><strong>Online gaming:</strong> 3-6 Mbps (low ping important)</li>
          <li><strong>Video conferencing:</strong> 1-4 Mbps</li>
        </ul>
      `,
      category: "Basics",
      author: "KTSC Team",
      readTime: "5 min read",
      published: true,
      authorId: adminUserId,
    },
    {
      title: "How to Optimize Your Home Network",
      description: "Practical tips and tricks to improve your internet speed and reduce latency at home.",
      content: `
        <h2>Router Placement and Setup</h2>
        <p>The location and configuration of your router significantly impacts your internet speed and coverage.</p>
        
        <h3>Optimal Router Placement</h3>
        <ul>
          <li>Place your router in a central location</li>
          <li>Keep it elevated (on a shelf or mounted on a wall)</li>
          <li>Avoid enclosed spaces like cabinets</li>
          <li>Keep away from interference sources (microwaves, baby monitors)</li>
        </ul>
        
        <h3>Router Configuration</h3>
        <ul>
          <li>Use the 5GHz band for better performance</li>
          <li>Update your router's firmware regularly</li>
          <li>Choose the right channel (1, 6, or 11 for 2.4GHz)</li>
          <li>Enable Quality of Service (QoS) features</li>
        </ul>
        
        <h2>Network Optimization Tips</h2>
        <p>Simple changes can dramatically improve your network performance:</p>
        
        <h3>Wired vs Wireless</h3>
        <p>For the best performance, use Ethernet cables for stationary devices like desktop computers, gaming consoles, and smart TVs.</p>
        
        <h3>Bandwidth Management</h3>
        <ul>
          <li>Limit background downloads and updates</li>
          <li>Use QoS to prioritize important traffic</li>
          <li>Schedule large downloads for off-peak hours</li>
        </ul>
        
        <h3>Device Management</h3>
        <ul>
          <li>Disconnect unused devices</li>
          <li>Update device network drivers</li>
          <li>Use modern devices with current WiFi standards</li>
        </ul>
      `,
      category: "Optimization",
      author: "Network Expert",
      readTime: "8 min read",
      published: true,
      authorId: adminUserId,
    },
    {
      title: "WiFi vs Ethernet: Which is Better?",
      description: "Compare wired and wireless connections to understand which option works best for your needs.",
      content: `
        <h2>The Great Connectivity Debate</h2>
        <p>When it comes to internet connectivity, you have two main options: WiFi (wireless) and Ethernet (wired). Each has its advantages and disadvantages depending on your specific needs and use cases.</p>
        
        <h2>Ethernet: The Wired Champion</h2>
        <h3>Advantages of Ethernet</h3>
        <ul>
          <li><strong>Speed:</strong> Consistently faster speeds, especially with Gigabit Ethernet</li>
          <li><strong>Reliability:</strong> More stable connection with less interference</li>
          <li><strong>Security:</strong> Harder to intercept wired connections</li>
          <li><strong>Low Latency:</strong> Better for gaming and real-time applications</li>
          <li><strong>No Signal Degradation:</strong> Performance doesn't decrease with distance (within limits)</li>
        </ul>
        
        <h3>Disadvantages of Ethernet</h3>
        <ul>
          <li>Limited mobility - you're tethered to a cable</li>
          <li>Installation complexity in some locations</li>
          <li>Not practical for mobile devices</li>
          <li>Cable management can be messy</li>
        </ul>
        
        <h2>WiFi: The Wireless Wonder</h2>
        <h3>Advantages of WiFi</h3>
        <ul>
          <li><strong>Mobility:</strong> Connect from anywhere within range</li>
          <li><strong>Convenience:</strong> No cables required</li>
          <li><strong>Multiple Devices:</strong> Easy to connect many devices</li>
          <li><strong>Clean Setup:</strong> No cable clutter</li>
          <li><strong>Guest Access:</strong> Easy to provide internet to visitors</li>
        </ul>
        
        <h3>Disadvantages of WiFi</h3>
        <ul>
          <li>Slower speeds compared to wired connections</li>
          <li>Signal interference from other devices</li>
          <li>Speed decreases with distance from router</li>
          <li>Security vulnerabilities if not properly configured</li>
          <li>Higher latency than wired connections</li>
        </ul>
        
        <h2>When to Choose Each</h2>
        <h3>Choose Ethernet For:</h3>
        <ul>
          <li>Desktop computers in fixed locations</li>
          <li>Gaming consoles for competitive gaming</li>
          <li>Streaming devices for 4K content</li>
          <li>Work-from-home setups requiring reliability</li>
          <li>File servers and NAS devices</li>
        </ul>
        
        <h3>Choose WiFi For:</h3>
        <ul>
          <li>Laptops and mobile devices</li>
          <li>Smart home devices</li>
          <li>Temporary connections</li>
          <li>Areas where running cables is impractical</li>
          <li>Guest devices</li>
        </ul>
        
        <h2>The Best of Both Worlds</h2>
        <p>You don't have to choose just one! The optimal setup often involves using both:</p>
        <ul>
          <li>Ethernet for stationary, high-bandwidth devices</li>
          <li>WiFi for mobile devices and convenience</li>
          <li>Powerline adapters as a middle ground solution</li>
          <li>Mesh networks to extend WiFi coverage</li>
        </ul>
      `,
      category: "Comparison",
      author: "Tech Analyst",
      readTime: "6 min read",
      published: true,
      authorId: adminUserId,
    },
    {
      title: "Troubleshooting Slow Internet Connections",
      description: "Step-by-step guide to diagnose and fix common internet speed issues.",
      content: `
        <h2>Is Your Internet Really Slow?</h2>
        <p>Before diving into troubleshooting, it's important to establish whether your internet is actually slow or if your expectations don't match your plan. Run multiple speed tests at different times to get a baseline.</p>
        
        <h2>Quick Fixes to Try First</h2>
        <h3>1. Restart Your Equipment</h3>
        <p>The classic "turn it off and on again" often works:</p>
        <ul>
          <li>Unplug your modem and router for 30 seconds</li>
          <li>Plug in the modem first, wait 2 minutes</li>
          <li>Plug in the router, wait 2 minutes</li>
          <li>Test your connection</li>
        </ul>
        
        <h3>2. Check for Background Activity</h3>
        <ul>
          <li>Pause cloud backups and syncing</li>
          <li>Stop streaming on other devices</li>
          <li>Check for system updates downloading</li>
          <li>Close unnecessary browser tabs and applications</li>
        </ul>
        
        <h3>3. Test Wired vs Wireless</h3>
        <p>Connect directly to your router with an Ethernet cable. If speeds improve significantly, the issue is with your WiFi.</p>
        
        <h2>WiFi-Specific Troubleshooting</h2>
        <h3>Signal Strength Issues</h3>
        <ul>
          <li>Move closer to your router</li>
          <li>Remove obstacles between you and the router</li>
          <li>Switch to the 5GHz band if available</li>
          <li>Update your device's WiFi drivers</li>
        </ul>
        
        <h3>Interference Problems</h3>
        <ul>
          <li>Change your WiFi channel (try 1, 6, or 11 for 2.4GHz)</li>
          <li>Move away from microwaves, baby monitors, and other electronics</li>
          <li>Consider upgrading to a dual-band router</li>
        </ul>
        
        <h2>Advanced Troubleshooting</h2>
        <h3>Check Your Internet Plan</h3>
        <ul>
          <li>Verify what speeds you're paying for</li>
          <li>Understand the difference between Mbps and MBps</li>
          <li>Check if you have data caps or throttling</li>
        </ul>
        
        <h3>Network Congestion</h3>
        <ul>
          <li>Test speeds at different times of day</li>
          <li>Consider upgrading your plan if consistently slow</li>
          <li>Use QoS settings to prioritize important traffic</li>
        </ul>
        
        <h3>Hardware Issues</h3>
        <ul>
          <li>Check all cable connections</li>
          <li>Look for damaged cables</li>
          <li>Consider age of your router (5+ years may need replacement)</li>
          <li>Update router firmware</li>
        </ul>
        
        <h2>When to Call Your ISP</h2>
        <p>Contact your internet service provider if:</p>
        <ul>
          <li>Speeds are consistently much lower than advertised</li>
          <li>You've tried all troubleshooting steps</li>
          <li>Multiple devices have the same issues</li>
          <li>Problems persist across different times of day</li>
          <li>You suspect line or infrastructure issues</li>
        </ul>
        
        <h2>Prevention Tips</h2>
        <ul>
          <li>Regularly restart your router (monthly)</li>
          <li>Keep firmware updated</li>
          <li>Monitor your network usage</li>
          <li>Position your router optimally</li>
          <li>Consider mesh systems for large homes</li>
        </ul>
      `,
      category: "Troubleshooting",
      author: "Support Team",
      readTime: "10 min read",
      published: true,
      authorId: adminUserId,
    },
    {
      title: "Understanding Bandwidth vs Speed",
      description: "Clear explanation of the difference between bandwidth and speed, and why it matters.",
      content: `
        <h2>The Highway Analogy</h2>
        <p>Think of your internet connection like a highway. Bandwidth is the number of lanes, while speed is how quickly data can move through those lanes. Both are important, but they serve different purposes.</p>
        
        <h2>What is Bandwidth?</h2>
        <p>Bandwidth refers to the maximum amount of data that can be transmitted over your internet connection in a given time period. It's measured in bits per second (bps), typically expressed as:</p>
        <ul>
          <li><strong>Kbps:</strong> Kilobits per second (1,000 bits/second)</li>
          <li><strong>Mbps:</strong> Megabits per second (1,000,000 bits/second)</li>
          <li><strong>Gbps:</strong> Gigabits per second (1,000,000,000 bits/second)</li>
        </ul>
        
        <h3>Key Points About Bandwidth:</h3>
        <ul>
          <li>It's the theoretical maximum capacity</li>
          <li>Shared among all connected devices</li>
          <li>Determines how much data can flow simultaneously</li>
          <li>Like the width of a pipe - more bandwidth means more data can flow</li>
        </ul>
        
        <h2>What is Speed?</h2>
        <p>Internet speed refers to how quickly data actually travels from point A to point B. It's influenced by many factors beyond just bandwidth:</p>
        
        <h3>Factors Affecting Speed:</h3>
        <ul>
          <li><strong>Latency:</strong> Time delay in data transmission</li>
          <li><strong>Network congestion:</strong> Too much traffic on the network</li>
          <li><strong>Server response time:</strong> How quickly the destination responds</li>
          <li><strong>Protocol overhead:</strong> Extra data needed for transmission</li>
          <li><strong>Hardware limitations:</strong> Router, modem, and device capabilities</li>
        </ul>
        
        <h2>Why the Confusion?</h2>
        <p>Many people use "bandwidth" and "speed" interchangeably, but they're different:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background-color: #f5f5f5;">
            <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Bandwidth</th>
            <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Speed</th>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;">Capacity (how much)</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Rate (how fast)</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;">Fixed by your ISP plan</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Variable based on conditions</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;">Measured in bps</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Experienced as responsiveness</td>
          </tr>
        </table>
        
        <h2>Real-World Examples</h2>
        <h3>High Bandwidth, Low Speed</h3>
        <p>Imagine a 16-lane highway (high bandwidth) during rush hour with heavy traffic (network congestion). Cars can't move fast despite having many lanes available.</p>
        
        <h3>Low Bandwidth, High Speed</h3>
        <p>A 2-lane country road (low bandwidth) with no traffic allows cars to travel at the speed limit, but only a few cars can travel at once.</p>
        
        <h2>Practical Implications</h2>
        <h3>For Streaming</h3>
        <ul>
          <li>Need sufficient bandwidth for video quality</li>
          <li>Speed affects how quickly the stream starts</li>
          <li>Consistent speed prevents buffering</li>
        </ul>
        
        <h3>For Gaming</h3>
        <ul>
          <li>Bandwidth needs are relatively low</li>
          <li>Speed (low latency) is crucial for responsiveness</li>
          <li>Consistent speed prevents lag spikes</li>
        </ul>
        
        <h3>For File Downloads</h3>
        <ul>
          <li>Higher bandwidth = faster downloads</li>
          <li>Speed determines actual download rate</li>
          <li>Server limitations can bottleneck both</li>
        </ul>
        
        <h2>How to Optimize Both</h2>
        <h3>Maximizing Bandwidth Usage</h3>
        <ul>
          <li>Use wired connections when possible</li>
          <li>Upgrade to higher-tier internet plans</li>
          <li>Limit concurrent high-bandwidth activities</li>
          <li>Use Quality of Service (QoS) settings</li>
        </ul>
        
        <h3>Improving Speed</h3>
        <ul>
          <li>Reduce network latency</li>
          <li>Optimize router placement</li>
          <li>Update network hardware</li>
          <li>Choose servers geographically closer to you</li>
          <li>Avoid network congestion times</li>
        </ul>
        
        <h2>Testing and Monitoring</h2>
        <p>To understand your connection:</p>
        <ul>
          <li>Run speed tests to measure actual throughput</li>
          <li>Test at different times to identify patterns</li>
          <li>Monitor multiple devices simultaneously</li>
          <li>Use ping tests to measure latency</li>
          <li>Check for packet loss</li>
        </ul>
      `,
      category: "Basics",
      author: "KTSC Team",
      readTime: "4 min read",
      published: true,
      authorId: adminUserId,
    },
    {
      title: "Best Practices for Remote Work Connectivity",
      description: "Ensure reliable internet for video calls, file uploads, and remote collaboration.",
      content: `
        <h2>The Remote Work Revolution</h2>
        <p>Remote work has become the norm for millions of professionals worldwide. A reliable internet connection is no longer a luxury—it's essential for productivity, communication, and career success.</p>
        
        <h2>Internet Requirements for Remote Work</h2>
        <h3>Minimum Speed Recommendations</h3>
        <ul>
          <li><strong>Basic tasks (email, web browsing):</strong> 1-5 Mbps</li>
          <li><strong>Video conferencing (720p):</strong> 1.5 Mbps up/down</li>
          <li><strong>Video conferencing (1080p):</strong> 3 Mbps up/down</li>
          <li><strong>File sharing and cloud sync:</strong> 5-10 Mbps</li>
          <li><strong>Multiple users/devices:</strong> 25+ Mbps</li>
        </ul>
        
        <h3>Upload Speed Matters</h3>
        <p>Unlike casual internet use, remote work requires good upload speeds for:</p>
        <ul>
          <li>Video conferencing (your camera feed)</li>
          <li>Screen sharing during meetings</li>
          <li>Uploading files to cloud storage</li>
          <li>Backing up work to remote servers</li>
        </ul>
        
        <h2>Optimizing Your Home Network</h2>
        <h3>Router Placement and Setup</h3>
        <ul>
          <li>Position router centrally in your home</li>
          <li>Elevate the router (shelf or wall mount)</li>
          <li>Keep away from interference sources</li>
          <li>Use 5GHz band for work devices when possible</li>
          <li>Enable Quality of Service (QoS) for work traffic</li>
        </ul>
        
        <h3>Wired vs Wireless for Work</h3>
        <p><strong>Use Ethernet when possible:</strong></p>
        <ul>
          <li>More reliable connection</li>
          <li>Lower latency for video calls</li>
          <li>Consistent speeds</li>
          <li>Better security</li>
        </ul>
        
        <p><strong>If using WiFi:</strong></p>
        <ul>
          <li>Stay close to the router</li>
          <li>Use 5GHz band</li>
          <li>Minimize interference</li>
          <li>Consider a WiFi extender or mesh system</li>
        </ul>
        
        <h2>Video Conferencing Best Practices</h2>
        <h3>Before Important Meetings</h3>
        <ul>
          <li>Test your connection with a speed test</li>
          <li>Close unnecessary applications and browser tabs</li>
          <li>Pause cloud backups and file syncing</li>
          <li>Ask family members to limit streaming</li>
          <li>Use ethernet connection if available</li>
        </ul>
        
        <h3>During Video Calls</h3>
        <ul>
          <li>Turn off video if connection is unstable</li>
          <li>Mute when not speaking to save bandwidth</li>
          <li>Use "speaker view" instead of "gallery view"</li>
          <li>Avoid screen sharing large files or videos</li>
          <li>Have a backup plan (phone dial-in)</li>
        </ul>
        
        <h2>Managing Multiple Devices</h2>
        <h3>Bandwidth Allocation</h3>
        <ul>
          <li>Prioritize work devices in router settings</li>
          <li>Set up a separate work network if possible</li>
          <li>Schedule large downloads for off-hours</li>
          <li>Monitor network usage regularly</li>
        </ul>
        
        <h3>Family Considerations</h3>
        <ul>
          <li>Communicate work schedule to family members</li>
          <li>Set up parental controls for streaming limits</li>
          <li>Consider upgrading internet plan for multiple users</li>
          <li>Use mesh networks for better coverage</li>
        </ul>
        
        <h2>Cloud Services and File Management</h2>
        <h3>Optimizing Cloud Sync</h3>
        <ul>
          <li>Schedule syncing during off-peak hours</li>
          <li>Use selective sync to limit bandwidth usage</li>
          <li>Pause syncing during important meetings</li>
          <li>Consider business-grade cloud services</li>
        </ul>
        
        <h3>File Transfer Best Practices</h3>
        <ul>
          <li>Compress large files before uploading</li>
          <li>Use file sharing services instead of email attachments</li>
          <li>Schedule large transfers for overnight</li>
          <li>Monitor upload progress and pause if needed</li>
        </ul>
        
        <h2>Backup Internet Solutions</h2>
        <h3>Mobile Hotspot</h3>
        <ul>
          <li>Keep a mobile hotspot device as backup</li>
          <li>Understand data limits and costs</li>
          <li>Test hotspot speed and reliability beforehand</li>
          <li>Position device for best cellular signal</li>
        </ul>
        
        <h3>Alternative Locations</h3>
        <ul>
          <li>Identify nearby coworking spaces</li>
          <li>Test internet at local cafes or libraries</li>
          <li>Have a friend or family member as backup location</li>
          <li>Consider temporary office rentals for important days</li>
        </ul>
        
        <h2>Security Considerations</h2>
        <h3>Home Network Security</h3>
        <ul>
          <li>Use WPA3 encryption on your WiFi</li>
          <li>Change default router passwords</li>
          <li>Keep router firmware updated</li>
          <li>Set up a guest network for visitors</li>
          <li>Use VPN for sensitive work activities</li>
        </ul>
        
        <h3>Public WiFi Precautions</h3>
        <ul>
          <li>Always use VPN on public networks</li>
          <li>Avoid accessing sensitive information</li>
          <li>Turn off file sharing and auto-connect</li>
          <li>Use mobile hotspot instead when possible</li>
        </ul>
        
        <h2>Troubleshooting Common Issues</h2>
        <h3>Connection Drops During Meetings</h3>
        <ul>
          <li>Check for interference sources</li>
          <li>Switch to ethernet connection</li>
          <li>Restart router and modem</li>
          <li>Contact ISP if problem persists</li>
        </ul>
        
        <h3>Slow File Uploads</h3>
        <ul>
          <li>Test upload speed specifically</li>
          <li>Check for background applications using bandwidth</li>
          <li>Try uploading at different times</li>
          <li>Consider upgrading to plan with higher upload speeds</li>
        </ul>
        
        <h2>Monitoring and Maintenance</h2>
        <ul>
          <li>Run regular speed tests and keep records</li>
          <li>Monitor data usage if you have caps</li>
          <li>Restart router weekly</li>
          <li>Update all network-connected devices</li>
          <li>Review and optimize network settings monthly</li>
        </ul>
      `,
      category: "Remote Work",
      author: "Productivity Expert",
      readTime: "7 min read",
      published: true,
      authorId: adminUserId,
    },
    {
      title: "5G vs Fiber: The Future of Internet Connectivity",
      description: "Compare next-generation internet technologies and understand which is right for you.",
      content: `
        <h2>The Next Generation of Internet</h2>
        <p>As we move into an increasingly connected world, two technologies are leading the charge for next-generation internet: 5G wireless and fiber optic connections. Both promise blazing-fast speeds, but they serve different purposes and have unique advantages.</p>
        
        <h2>Understanding 5G Technology</h2>
        <h3>What is 5G?</h3>
        <p>5G is the fifth generation of cellular network technology, designed to provide:</p>
        <ul>
          <li>Speeds up to 100 times faster than 4G</li>
          <li>Ultra-low latency (1ms or less)</li>
          <li>Massive device connectivity</li>
          <li>Enhanced mobile broadband</li>
        </ul>
        
        <h3>5G Speed Capabilities</h3>
        <ul>
          <li><strong>Peak speeds:</strong> Up to 20 Gbps</li>
          <li><strong>Typical speeds:</strong> 100-300 Mbps</li>
          <li><strong>Latency:</strong> 1-10ms</li>
          <li><strong>Coverage:</strong> Expanding rapidly in urban areas</li>
        </ul>
        
        <h2>Understanding Fiber Optic Internet</h2>
        <h3>What is Fiber?</h3>
        <p>Fiber optic internet uses light signals transmitted through glass or plastic cables to deliver:</p>
        <ul>
          <li>Symmetrical upload and download speeds</li>
          <li>Consistent performance regardless of distance</li>
          <li>Immunity to electromagnetic interference</li>
          <li>Future-proof infrastructure</li>
        </ul>
        
        <h3>Fiber Speed Capabilities</h3>
        <ul>
          <li><strong>Residential speeds:</strong> 100 Mbps to 2 Gbps</li>
          <li><strong>Business speeds:</strong> Up to 100 Gbps</li>
          <li><strong>Latency:</strong> 5-10ms</li>
          <li><strong>Reliability:</strong> 99.9% uptime typical</li>
        </ul>
        
        <h2>Head-to-Head Comparison</h2>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background-color: #f5f5f5;">
            <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Feature</th>
            <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">5G</th>
            <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Fiber</th>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;"><strong>Speed</strong></td>
            <td style="border: 1px solid #ddd; padding: 12px;">100-300 Mbps typical</td>
            <td style="border: 1px solid #ddd; padding: 12px;">100 Mbps - 2 Gbps</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;"><strong>Latency</strong></td>
            <td style="border: 1px solid #ddd; padding: 12px;">1-10ms</td>
            <td style="border: 1px solid #ddd; padding: 12px;">5-10ms</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;"><strong>Mobility</strong></td>
            <td style="border: 1px solid #ddd; padding: 12px;">Full mobility</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Fixed location</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;"><strong>Installation</strong></td>
            <td style="border: 1px solid #ddd; padding: 12px;">No installation needed</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Professional installation required</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;"><strong>Weather Impact</strong></td>
            <td style="border: 1px solid #ddd; padding: 12px;">Can be affected</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Minimal impact</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;"><strong>Data Limits</strong></td>
            <td style="border: 1px solid #ddd; padding: 12px;">Often limited</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Usually unlimited</td>
          </tr>
        </table>
        
        <h2>Advantages of 5G</h2>
        <h3>Mobility and Convenience</h3>
        <ul>
          <li>Internet access anywhere with 5G coverage</li>
          <li>No need for physical installation</li>
          <li>Perfect for mobile devices and IoT</li>
          <li>Quick deployment in new areas</li>
        </ul>
        
        <h3>Use Cases Where 5G Excels</h3>
        <ul>
          <li>Mobile professionals and digital nomads</li>
          <li>Temporary internet solutions</li>
          <li>Areas where fiber isn't available</li>
          <li>IoT and smart city applications</li>
          <li>Emergency and disaster recovery</li>
        </ul>
        
        <h2>Advantages of Fiber</h2>
        <h3>Reliability and Performance</h3>
        <ul>
          <li>Consistent speeds regardless of network congestion</li>
          <li>Symmetrical upload and download speeds</li>
          <li>No data caps or throttling</li>
          <li>Future-proof technology</li>
        </ul>
        
        <h3>Use Cases Where Fiber Excels</h3>
        <ul>
          <li>Home offices and remote work</li>
          <li>Content creators and streamers</li>
          <li>Businesses requiring reliable connectivity</li>
          <li>Households with multiple heavy internet users</li>
          <li>Gaming and real-time applications</li>
        </ul>
        
        <h2>Current Limitations</h2>
        <h3>5G Challenges</h3>
        <ul>
          <li><strong>Coverage:</strong> Limited to urban areas initially</li>
          <li><strong>Building penetration:</strong> High-frequency signals don't travel far</li>
          <li><strong>Data costs:</strong> Can be expensive for heavy usage</li>
          <li><strong>Battery drain:</strong> 5G devices consume more power</li>
          <li><strong>Network congestion:</strong> Speeds can vary with user load</li>
        </ul>
        
        <h3>Fiber Challenges</h3>
        <ul>
          <li><strong>Availability:</strong> Not available in all areas</li>
          <li><strong>Installation:</strong> Requires physical infrastructure</li>
          <li><strong>Cost:</strong> Higher upfront installation costs</li>
          <li><strong>Mobility:</strong> Fixed location only</li>
          <li><strong>Vulnerability:</strong> Physical cables can be damaged</li>
        </ul>
        
        <h2>The Future Landscape</h2>
        <h3>Complementary Technologies</h3>
        <p>Rather than competing, 5G and fiber will likely complement each other:</p>
        <ul>
          <li>Fiber provides backbone infrastructure for 5G networks</li>
          <li>5G offers last-mile connectivity where fiber isn't feasible</li>
          <li>Hybrid solutions combining both technologies</li>
          <li>Edge computing bringing services closer to users</li>
        </ul>
        
        <h3>Emerging Applications</h3>
        <ul>
          <li><strong>Autonomous vehicles:</strong> Requiring ultra-low latency</li>
          <li><strong>Virtual/Augmented Reality:</strong> High bandwidth and low latency</li>
          <li><strong>Smart cities:</strong> Massive IoT device connectivity</li>
          <li><strong>Telemedicine:</strong> Real-time remote procedures</li>
          <li><strong>Industry 4.0:</strong> Connected manufacturing and automation</li>
        </ul>
        
        <h2>Making the Right Choice</h2>
        <h3>Choose 5G If:</h3>
        <ul>
          <li>You need internet access on the go</li>
          <li>Fiber isn't available in your area</li>
          <li>You have moderate internet usage</li>
          <li>You want quick setup without installation</li>
          <li>You're in an area with good 5G coverage</li>
        </ul>
        
        <h3>Choose Fiber If:</h3>
        <ul>
          <li>You work from home or run a business</li>
          <li>You have high bandwidth requirements</li>
          <li>You need consistent, reliable speeds</li>
          <li>You have multiple heavy internet users</li>
          <li>Upload speed is important for your activities</li>
        </ul>
        
        <h2>Cost Considerations</h2>
        <h3>5G Pricing</h3>
        <ul>
          <li>Monthly service fees: $50-$100+</li>
          <li>Data limits or throttling after certain usage</li>
          <li>Device costs for 5G-capable equipment</li>
          <li>Potential overage charges</li>
        </ul>
        
        <h3>Fiber Pricing</h3>
        <ul>
          <li>Monthly service fees: $40-$150+</li>
          <li>Installation fees: $0-$500</li>
          <li>Usually unlimited data</li>
          <li>Equipment rental or purchase costs</li>
        </ul>
        
        <h2>Looking Ahead</h2>
        <p>Both 5G and fiber represent the future of internet connectivity, each serving different needs and use cases. As these technologies mature and expand, we can expect:</p>
        <ul>
          <li>Improved coverage and availability</li>
          <li>Lower costs and better value</li>
          <li>New applications and services</li>
          <li>Integration with emerging technologies like AI and IoT</li>
        </ul>
        
        <p>The choice between 5G and fiber isn't always either/or—many users will benefit from having access to both technologies for different situations and needs.</p>
      `,
      category: "Comparison",
      author: "Future Tech Analyst",
      readTime: "9 min read",
      published: true,
      authorId: adminUserId,
    },
  ]

  // Create articles
  console.log("Creating sample articles...")
  for (const articleData of sampleArticles) {
    await prisma.article.upsert({
      where: {
        title: articleData.title,
      },
      update: articleData,
      create: articleData,
    })
  }

  console.log(`Created ${sampleArticles.length} sample articles`)

  // Create dummy articles
  const articles = []
  for (let i = 0; i < 5; i++) {
    articles.push(
      prisma.article.create({
        data: {
          title: `Sample Article ${i + 1}`,
          content: `This is the content for sample article ${i + 1}. It's a placeholder for demonstration purposes.`,
          authorId: user.id,
          published: true,
          createdAt: new Date(Date.now() - i * 2 * 24 * 60 * 60 * 1000), // Spread over days
          updatedAt: new Date(Date.now() - i * 2 * 24 * 60 * 60 * 1000),
        },
      }),
    )
  }
  await Promise.all(articles)
  console.log(`Created ${articles.length} dummy articles.`)

  console.log("Database seeded successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
