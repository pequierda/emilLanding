<?php
// Configuration
$siteName = "";
$siteDescription = "Welcome to my digital space";
$profileImage = "me.png";

// Upstash Redis Configuration
$upstashUrl = "YOUR_UPSTASH_REDIS_REST_URL"; // e.g., https://your-redis.upstash.io
$upstashToken = "YOUR_UPSTASH_REDIS_REST_TOKEN";

// Initialize visitor count
$visitorCount = 0;

// Function to increment and get visitor count from Upstash
function getVisitorCount($url, $token) {
    try {
        // Increment visitor count
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url . "/incr/visitor_count");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "Authorization: Bearer " . $token
        ]);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode === 200) {
            $data = json_decode($response, true);
            return isset($data['result']) ? $data['result'] : 0;
        }
    } catch (Exception $e) {
        error_log("Upstash Error: " . $e->getMessage());
    }
    
    return 0;
}

// Get current visitor count
if ($upstashUrl !== "YOUR_UPSTASH_REDIS_REST_URL" && $upstashToken !== "YOUR_UPSTASH_REDIS_REST_TOKEN") {
    $visitorCount = getVisitorCount($upstashUrl, $upstashToken);
}

// Your links - easily editable
$links = [
    [
        'title' => 'Portfolio',
        'description' => 'View my portfolio and personal projects',
        'url' => 'https://emilprotfolio.vercel.app',
        'icon' => '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>'
    ],
    [
        'title' => 'Encryptor',
        'description' => 'Secure text encryption and decryption tool',
        'url' => 'https://encryptor-emilpro.vercel.app',
        'icon' => '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>'
    ],
    [
        'title' => 'QR Generator',
        'description' => 'Create custom QR codes instantly',
        'url' => 'https://emilqrgen.vercel.app',
        'icon' => '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg>'
    ],
    [
        'title' => 'For Sale Landing Page',
        'description' => 'Modern landing page template for sales',
        'url' => 'https://forsalelandingpage.vercel.app',
        'icon' => '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>'
    ]
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
    <meta name="description" content="<?php echo htmlspecialchars($siteDescription); ?>">
    <meta name="theme-color" content="#090A0F">
    <title><?php echo htmlspecialchars($siteName); ?> - Links</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.0/flowbite.min.css" rel="stylesheet" />
    <link href="styles.css" rel="stylesheet" />
</head>
<body class="galaxy-background min-h-screen">
    <!-- Stars Background -->
    <div class="stars-container">
        <div class="stars"></div>
        <div class="stars2"></div>
        <div class="stars3"></div>
    </div>
    
    <!-- Central Sun -->
    <div class="sun">
        <div class="sun-core">☀️</div>
    </div>
    
    <!-- Orbiting Planets -->
    <div class="solar-system">
        <!-- Mercury -->
        <div class="orbit orbit-1">
            <div class="planet planet-mercury"</div>
        </div>
        
        <!-- Venus -->
        <div class="orbit orbit-2">
            <div class="planet planet-venus"></div>
        </div>
        
        <!-- Earth -->
        <div class="orbit orbit-3">
            <div class="planet planet-earth"></div>
        </div>
        
        <!-- Mars -->
        <div class="orbit orbit-4">
            <div class="planet planet-mars"></div>
        </div>
        
        <!-- Jupiter -->
        <div class="orbit orbit-5">
            <div class="planet planet-jupiter"></div>
        </div>
        
        <!-- Saturn -->
        <div class="orbit orbit-6">
            <div class="planet planet-saturn"></div>
        </div>
    </div>
    
    <!-- Floating Asteroids -->
    <div class="asteroids">
        <div class="asteroid asteroid-1">☄️</div>
        <div class="asteroid asteroid-2">☄️</div>
        <div class="asteroid asteroid-3">☄️</div>
        <div class="asteroid asteroid-4">☄️</div>
    </div>
    
    <!-- Shooting Stars -->
    <div class="shooting-stars">
        <div class="shooting-star"></div>
        <div class="shooting-star"></div>
        <div class="shooting-star"></div>
    </div>
    
    <div class="container mx-auto px-4 py-12 relative z-10">
        <div class="max-w-4xl mx-auto">
            <!-- Visitor Counter -->
            <div class="visitor-counter text-center mb-6 animate-fade-in">
                <div class="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    <span class="text-white font-semibold text-sm">
                        <span class="visitor-count"><?php echo number_format($visitorCount); ?></span> Visitors
                    </span>
                </div>
            </div>
            
            <!-- Profile Section -->
            <div class="text-center mb-12 animate-fade-in">
                <div class="mb-6 inline-block">
                    <img src="<?php echo htmlspecialchars($profileImage); ?>" 
                         alt="<?php echo htmlspecialchars($siteName); ?>" 
                         class="profile-image w-32 h-32 rounded-full mx-auto shadow-2xl border-4 border-white">
                </div>
                <h1 class="text-5xl font-bold text-white mb-4 drop-shadow-lg">
                    <?php echo htmlspecialchars($siteName); ?>
                </h1>
                <p class="text-xl text-white/90 drop-shadow">
                    <?php echo htmlspecialchars($siteDescription); ?>
                </p>
            </div>

            <!-- Links Grid -->
            <div class="links-grid grid md:grid-cols-2 gap-6 mb-8">
                <?php foreach ($links as $index => $link): ?>
                <a href="<?php echo htmlspecialchars($link['url']); ?>" 
                   target="_blank"
                   rel="noopener noreferrer"
                   class="link-card group block p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 hover:bg-gray-50">
                    <div class="flex items-start space-x-4">
                        <div class="flex-shrink-0">
                            <div class="icon-wrapper w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                                <?php echo $link['icon']; ?>
                            </div>
                        </div>
                        <div class="flex-1 min-w-0">
                            <h3 class="link-card-title text-xl font-bold text-gray-900 mb-1">
                                <?php echo htmlspecialchars($link['title']); ?>
                            </h3>
                            <p class="text-gray-600 text-sm">
                                <?php echo htmlspecialchars($link['description']); ?>
                            </p>
                        </div>
                        <div class="flex-shrink-0">
                            <svg class="arrow-icon w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </div>
                    </div>
                </a>
                <?php endforeach; ?>
            </div>

            <!-- Footer -->
            <div class="text-center text-white/80 text-sm">
                <p>&copy; <?php echo date('Y'); ?> <?php echo htmlspecialchars($siteName); ?>. All rights reserved.</p>
            </div>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.0/flowbite.min.js"></script>
    <script src="script.js"></script>
</body>
</html>

