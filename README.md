# EmilPro Landing Page 🌌

A beautiful space-themed landing page with animated solar system and visitor counter.

## Features

✨ **Galaxy Theme** - Animated solar system with orbiting planets, twinkling stars, and shooting stars  
🔗 **Project Links** - Display your Vercel projects with beautiful cards  
📊 **Visitor Counter** - Track page visits using Upstash Redis  
📱 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop  
🎨 **Modern Design** - Built with Tailwind CSS and Flowbite  

## Setup Instructions

### 1. Basic Setup
- Place your logo image as `me.png` in the root folder
- Update `$siteName` and `$siteDescription` in `index.php`

### 2. Configure Upstash Redis (Visitor Counter)

1. Go to [Upstash.com](https://upstash.com/) and create a free account
2. Click "Create Database" and choose Redis
3. Select a region close to your users
4. Copy your **REST URL** and **REST TOKEN** from the dashboard
5. Open `index.php` and update lines 7-8:

```php
$upstashUrl = "https://your-redis-12345.upstash.io";
$upstashToken = "AYHgASQgNjE4YTM5...your-token-here";
```

### 3. Add Your Project Links

Edit the `$links` array in `index.php` (starting at line 41):

```php
$links = [
    [
        'title' => 'Your Project',
        'description' => 'Project description',
        'url' => 'https://yourproject.vercel.app',
        'icon' => '<!-- SVG icon code -->'
    ],
    // Add more projects...
];
```

## File Structure

```
📁 emilproLandingPage/
├── 📄 index.php           # Main page with PHP logic
├── 🎨 styles.css          # Custom CSS and animations
├── ⚙️ script.js            # JavaScript functionality
├── 🖼️ me.png              # Your logo/profile image
├── 📄 config.example.php  # Configuration example
└── 📖 README.md           # This file
```

## Technologies Used

- **PHP** - Server-side logic
- **Tailwind CSS** - Utility-first CSS framework
- **Flowbite** - UI component library
- **Upstash Redis** - Serverless Redis for visitor counting
- **CSS Animations** - Custom space-themed animations

## Browser Support

✅ Chrome / Edge (Latest)  
✅ Firefox (Latest)  
✅ Safari (Latest)  
✅ Mobile browsers  

## License

Free to use for personal and commercial projects.

---

Made with ❤️ by EmilPro

