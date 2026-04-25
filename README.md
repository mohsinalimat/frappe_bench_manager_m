# Bench Manager

<div align="center">
  <img src="bench_manager/public/images/fa-gamepad.svg" width="200" alt="Bench Manager Logo">
  
  <h3>Enterprise-Grade Frappe Ecosystem Management Platform</h3>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![Frappe](https://img.shields.io/badge/Frappe-Framework-orange.svg)](https://frappeframework.com)
  [![Vue 3](https://img.shields.io/badge/Vue-3-42b883.svg)](https://vuejs.org)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/amitascra/frappe-worf-bench/pulls)
</div>

---

## 📋 Overview

**Bench Manager** is a comprehensive Frappe ecosystem management platform that combines enterprise-grade bench management with a modern Frappe App Store. Built on the Frappe Framework with a Vue 3 frontend, it provides powerful tools for:

- **🏪 Frappe App Store** - Modern marketplace for Frappe applications
- **🖥️ Bench Management** - Complete GUI for Frappe bench operations
- **☁️ Cloud Infrastructure** - Deploy and manage cloud servers (AWS, Azure, GCP)
- **🤖 Agent Deployment** - Automated server provisioning with Ansible
- **🔄 Real-Time Sync** - Automatic synchronization every 15 minutes
- **📦 Site & App Management** - Full lifecycle management
- **🔐 SSL/TLS Management** - Automated certificate provisioning
- **📊 Resource Monitoring** - Server plans and resource allocation

### 🎯 Key Capabilities

**App Store Features:**
- Browse and discover Frappe applications
- Developer profiles and verification
- App reviews and ratings
- Category-based navigation
- Search and filtering
- Purchase and licensing management
- Developer dashboard
- Member wishlist and earnings

**Bench Management:**
- Update and sync bench configurations
- Site lifecycle management
- App installation and management
- Backup and restore operations
- Command execution logging
- Real-time monitoring

---

## 🚀 Quick Start

### Prerequisites

- **Frappe Bench** (v15+ recommended)
- **Node.js** (v18+)
- **Python** (v3.8+)
- **MariaDB** (v10.6+)
- **Redis** (v6+)

### Installation

#### Option 1: Clone Repository

```bash
# Navigate to your bench apps directory
cd ~/frappe-bench/apps

# Clone the repository
git clone https://github.com/amitascra/frappe-worf-bench.git bench_manager

# Get the app in your bench
cd ~/frappe-bench
bench get-app bench_manager --local

# Create a new site
bench new-site worf.local

# Install the app
bench --site worf.local install-app bench_manager

# Start the bench
bench start
```

#### Option 2: Using Frappe App Store

```bash
# Get the app from Frappe App Store
bench get-app bench_manager

# Create and configure site
bench new-site worf.local
bench --site worf.local install-app bench_manager
bench start
```

### Frontend Setup

The app includes a modern Vue 3 frontend that needs to be built:

```bash
# Navigate to the frontend directory
cd apps/bench_manager/app_store

# Install dependencies
yarn install

# Development mode
yarn dev

# Production build
yarn build

# Copy built files to Frappe public directory
yarn copy-html-entry
```

### First-Time Setup

1. **Access the Application**
   - Backend: `http://worf.local:8000/app`
   - Frontend: `http://worf.local:8000`

2. **Configure Bench Settings**
   - Navigate to **Bench Settings** in the desk
   - Click **Sync** to populate initial data
   - Configure cloud providers if using infrastructure features

3. **Configure App Store**
   - Navigate to **App Store Settings**
   - Set up categories, pricing, and moderation
   - Configure payment gateways if needed

---

## 🌟 Features

### Frappe App Store

#### 1. **Public App Marketplace**
Modern marketplace for Frappe applications:
- **Browse Apps** - Discover applications by category, popularity, or ratings
- **App Details** - Comprehensive app information including features, pricing, screenshots
- **Developer Profiles** - Verified developer profiles with app portfolios
- **Reviews & Ratings** - Community-driven reviews with verified purchase badges
- **Search & Filter** - Powerful search with category and developer filtering
- **Wishlist** - Save apps for later purchase

#### 2. **Developer Portal**
Complete developer experience:
- **App Submission** - Submit apps for review and publication
- **Developer Dashboard** - Track app performance, downloads, and earnings
- **Analytics** - View download statistics and revenue reports
- **App Management** - Update app details, pricing, and versions
- **Verification** - Apply for verified developer badge
- **Support System** - Manage customer support requests

#### 3. **Member Portal**
User account and purchase management:
- **Account Settings** - Profile management and preferences
- **Purchase History** - View all purchased apps and licenses
- **Wishlist** - Save apps for future purchase
- **Reviews** - Write and manage app reviews
- **Earnings** - For developers, track revenue and payouts

#### 4. **App Moderation**
Quality control and content moderation:
- **Review Queue** - Moderators review submitted apps
- **Approval Workflow** - Multi-step approval process
- **Content Standards** - Ensure apps meet quality guidelines
- **Developer Communication** - Feedback loop for improvements

### Core Bench Management

#### 1. **Bench Settings**
Central control panel for your bench instance:
- **Update Bench** - Emulates `bench update` command
- **Sync Data** - Automatically discovers and loads:
  - All installed apps
  - All sites in the bench
  - All backup files
- **Configuration Display** - View `common_site_config.json` parameters
- **Real-Time Sync** - Automatic hourly synchronization

#### 2. **Site Management**
Comprehensive site lifecycle management:

| Feature | Description |
|---------|-------------|
| **Migrate** | Apply schema changes and data migrations |
| **Backup** | Create full site backups with files |
| **Install App** | Add apps to existing sites |
| **Uninstall App** | Remove apps from sites |
| **Reinstall** | Fresh site reinstallation |
| **Drop Site** | Delete sites (auto-backup before deletion) |
| **View Site** | Direct browser access to sites |
| **Create Alias** | Multiple domains for one site |
| **Delete Alias** | Remove site aliases |

#### 3. **Site Backup & Restore**
- View all backups (active and archived sites)
- One-click restore to existing or new sites
- Automatic backup before destructive operations
- Backup file management and cleanup

#### 4. **App Management**
- List all installed apps
- View Git repository information
- Track app versions and branches
- Install/uninstall apps across sites

#### 5. **Command Logger**
Complete audit trail of all operations:
- Command source tracking (doctype and docname)
- Execution timestamps
- Status monitoring (Success/Failed/Ongoing)
- Full console output logs

### Cloud Infrastructure Management

#### 6. **Cloud Provider Integration**
Multi-cloud support with unified interface:

**Supported Providers:**
- Amazon Web Services (AWS)
- Microsoft Azure
- Google Cloud Platform (GCP)

**Features:**
- API key management
- SSH key pair generation
- Region selection
- Resource provisioning

#### 7. **Virtual Machine Management**
Deploy and manage cloud servers:
- **Automated Provisioning** - One-click server deployment
- **Agent Installation** - Automated Frappe agent setup
- **SSH Key Management** - Secure access configuration
- **Status Monitoring** - Real-time server status
- **Resource Allocation** - CPU, RAM, storage management

#### 8. **Server Plans**
Pre-configured server templates:
- Small (2 vCPU, 4GB RAM)
- Medium (4 vCPU, 8GB RAM)
- Large (8 vCPU, 16GB RAM)
- Custom configurations

#### 9. **Agent Deployment**
Automated server configuration using Ansible:
- **User Management** - Frappe user creation (UID 2000)
- **Repository Cloning** - Automated agent installation
- **NGINX Configuration** - Web server setup
- **Supervisor Setup** - Process management
- **TLS/SSL** - Certificate configuration
- **Error Handling** - Robust deployment with fallbacks

**Key Improvements:**
- ACL permission handling
- Empty certificate validation
- NGINX module compatibility
- Supervisor command fixes

#### 10. **SSL Certificate Management**
- Certificate generation and renewal
- Let's Encrypt integration
- Multi-domain support
- Automatic NGINX configuration

#### 11. **Load Balancing**
- Proxy server configuration
- Traffic distribution
- Health checks
- Failover management

#### 12. **Database & Application Servers**
- MariaDB server management
- Application server pools
- Connection management
- Performance monitoring

---

## 🔄 Real-Time Synchronization

### Automatic Sync Features

**Smart File Monitoring (Every 15 minutes):**
- Monitors `apps.txt` for new installations
- Watches `site_config.json` for new sites
- Detects new backup files
- Only syncs when changes detected (resource-efficient)

**Guaranteed Hourly Sync:**
- Full synchronization every hour
- Ensures data consistency
- Background processing (non-blocking)

**Manual Sync:**
- On-demand sync via UI button
- Force sync API endpoint
- Immediate updates when needed

### Configuration

Enable/disable in `common_site_config.json`:
```json
{
  "pause_scheduler": 0  // 0 = enabled, 1 = disabled
}
```

Adjust frequency in `hooks.py`:
```python
scheduler_events = {
    "cron": {
        "*/15 * * * *": [  // Every 15 minutes
            "bench_manager.bench_manager.realtime_sync.check_and_sync_if_needed"
        ]
    },
    "hourly": [
        "bench_manager.bench_manager.doctype.bench_settings.bench_settings.auto_sync_all"
    ]
}
```

---

## � API Reference

### App Store APIs

#### Get App List
```python
frappe.call("bench_manager.api.get_app_list", 
    filters={"category": "ERPNext"},
    fields=["name", "app_title", "rating"],
    order_by="rating desc",
    start=0,
    limit=20
)
```

#### Get App Details
```python
frappe.call("bench_manager.api.get_app_details", app_id="APP-001")
```

#### Get Category List
```python
frappe.call("bench_manager.api.get_category_list")
```

#### Search Apps
```python
frappe.call("bench_manager.api.search_apps", 
    query="inventory",
    filters={"category": "ERPNext"}
)
```

#### Get Developer Profile
```python
frappe.call("bench_manager.api.get_developer_profile", developer_id="DEV-001")
```

#### Submit App Review
```python
frappe.call("bench_manager.api.submit_review",
    app="APP-001",
    rating=5,
    review_text="Great app!"
)
```

### Bench Management APIs

#### Force Sync
```python
frappe.call("bench_manager.bench_manager.realtime_sync.force_sync_now")
```

#### Check Last Sync
```python
last_sync = frappe.db.get_single_value("Bench Settings", "last_sync_timestamp")
```

#### Execute Bench Command
```python
frappe.call("bench_manager.api.execute_command",
    command="bench update",
    site="worf.local"
)
```

### Cloud Infrastructure APIs

#### Create Virtual Machine
```python
frappe.call("bench_manager.api.create_vm",
    cloud_provider="AWS",
    server_plan="small",
    region="ap-south-1"
)
```

#### Deploy Agent
```python
frappe.call("bench_manager.api.deploy_agent",
    vm_id="VM-001",
    ssh_key_id="KEY-001"
)
```

---

## 🛠️ Development

### Backend Development

#### Setup Development Environment
```bash
# Clone repository
cd ~/frappe-bench/apps
git clone https://github.com/amitascra/frappe-worf-bench.git bench_manager

# Install in bench
cd ~/frappe-bench
bench get-app bench_manager --local
bench --site worf.local install-app bench_manager

# Enable developer mode
bench --site worf.local set-config developer_mode 1

# Start bench in development mode
bench start
```

#### Running Tests
```bash
# Run all tests
bench --site worf.local run-tests

# Run specific module tests
bench --site worf.local run-tests --module bench_manager

# Run specific doctype tests
bench --site worf.local run-tests --doctype "App"
```

#### Code Standards
- Follow PEP 8 for Python code
- Use meaningful variable and function names
- Add docstrings to all functions
- Include error handling
- Write unit tests for new features
- Update documentation

### Frontend Development

#### Setup Development Environment
```bash
# Navigate to frontend directory
cd apps/bench_manager/app_store

# Install dependencies
yarn install

# Start development server
yarn dev
```

The Vite dev server will start on port `8080` and proxy requests to Frappe (port `8000`).

#### Development Configuration
Add to your `site_config.json`:
```json
{
  "ignore_csrf": 1
}
```

This prevents CSRF errors during development.

#### Building for Production
```bash
# Build the frontend
yarn build

# Copy to Frappe public directory
yarn copy-html-entry

# Restart bench
bench restart
```

#### Frontend Project Structure
```
app_store/
├── src/
│   ├── assets/          # Static assets
│   ├── components/      # Reusable Vue components
│   ├── composables/     # Vue composables
│   ├── data/           # API calls and data fetching
│   ├── layouts/        # Page layouts
│   ├── pages/          # Page components
│   │   ├── public/     # Public pages (no auth)
│   │   ├── buyer/      # Buyer portal
│   │   ├── developer/  # Developer portal
│   │   └── admin/      # Admin pages
│   ├── router.js       # Vue Router configuration
│   ├── main.js         # Application entry point
│   └── App.vue         # Root component
├── public/             # Public assets
├── index.html          # HTML template
├── vite.config.js      # Vite configuration
└── tailwind.config.js  # TailwindCSS configuration
```

#### Adding New Pages
1. Create page component in `src/pages/`
2. Add route in `src/router.js`
3. Add meta tags for SEO
4. Choose appropriate layout

---

## 🏗️ Architecture

Bench Manager follows a modern multi-tier architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend Layer (Vue 3)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │ Public Pages │  │ Member Portal│  │ Admin Desk   │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                  API Layer (Frappe Framework)                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │ App Store    │  │ Bench Mgmt   │  │ Cloud Infra  │        │
│  │   APIs       │  │    APIs      │  │    APIs      │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                Data Layer (MariaDB + Redis)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │ App Store    │  │ Bench Config │  │ Cloud State  │        │
│  │   Data       │  │    Data      │  │    Data      │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

### Frontend Stack

- **Framework:** Vue 3 (Composition API)
- **Routing:** Vue Router 4
- **UI Components:** Frappe UI
- **Styling:** TailwindCSS
- **Build Tool:** Vite 5
- **State Management:** Pinia (via Frappe UI)
- **HTTP Client:** Frappe Request (via Frappe UI)
- **Icons:** Unplugin Icons

### Backend Stack

- **Framework:** Frappe Framework (v15+)
- **Language:** Python 3.8+
- **Database:** MariaDB 10.6+
- **Cache:** Redis 6+
- **Queue:** Redis Queue (RQ)
- **Web Server:** NGINX
- **Process Manager:** Supervisor
- **Automation:** Ansible

### DocTypes Overview

**App Store Module:**
| DocType | Purpose |
|---------|---------|
| **App** | Application metadata and details |
| **App Category** | App categorization |
| **App Developer** | Developer profiles |
| **App Review** | User reviews and ratings |
| **Member** | User accounts and purchases |
| **Member Wishlist** | User saved apps |
| **Payment Transaction** | Payment records |
| **App Store Settings** | Platform configuration |

**Bench Management Module:**
| DocType | Purpose |
|---------|---------|
| **Bench Settings** | Central configuration and sync control |
| **Site** | Site lifecycle management |
| **Site Backup** | Backup and restore operations |
| **App** | Application management |
| **Bench Manager Command** | Command execution logging |

**Cloud Infrastructure Module:**
| DocType | Purpose |
|---------|---------|
| **Cloud Provider** | Cloud platform credentials |
| **Virtual Machine** | Server instance management |
| **Server Plan** | Resource templates |
| **Site Plan** | Site resource allocation |
| **SSL Certificate** | TLS/SSL management |
| **Agent Job** | Background task tracking |
| **Database Server** | Database instance management |
| **Application Server** | App server management |
| **Proxy Server** | Load balancer configuration |

---

## 🔧 Configuration

### Cloud Provider Setup

#### AWS Configuration

```python
# In Cloud Provider doctype
provider_type = "AWS"
api_key = "YOUR_AWS_ACCESS_KEY"
api_secret = "YOUR_AWS_SECRET_KEY"
region = "ap-south-1"
```

#### SSH Key Management

```bash
# Keys are automatically generated and stored securely
# Format: BenchManager-{provider_name}-key
```

### NGINX Configuration

The agent deployment automatically:
- Removes incompatible directives (`more_set_headers`, `vhost_traffic_status`)
- Configures TLS certificates
- Sets up proxy rules
- Handles empty certificate files gracefully

---

## 🧪 Testing

### Test Site Creation

```bash
# Create test site
bench new-site test.local --admin-password admin

# Verify in Bench Manager (auto-syncs in 15 min)
bench --site bench-manager.local execute \
  "frappe.get_all('Site', pluck='site_name')"
```

### Test App Installation

```bash
# Install app
bench get-app erpnext

# Verify sync
bench --site bench-manager.local execute \
  "frappe.get_all('App', pluck='app_name')"
```

### Test Cloud Deployment

1. Configure Cloud Provider
2. Create Server Plan
3. Deploy Virtual Machine
4. Monitor Agent Job status
5. Verify server accessibility

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Setup

```bash
# Fork and clone repository
git clone https://github.com/YOUR_USERNAME/frappe_bench_manager.git
cd frappe_bench_manager

# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and test
bench --site bench-manager.local migrate
bench --site bench-manager.local clear-cache

# Commit with descriptive message
git commit -m "feat: add new feature description"

# Push and create pull request
git push origin feature/your-feature-name
```

### Code Standards

- Follow PEP 8 for Python code
- Use meaningful variable and function names
- Add docstrings to all functions
- Include error handling
- Write unit tests for new features
- Update documentation

### Pull Request Process

1. Ensure all tests pass
2. Update README if needed
3. Add description of changes
4. Link related issues
5. Request review from maintainers

---

## 🐛 Troubleshooting

### Common Issues

**Issue:** Sites not appearing after creation
- **Solution:** Wait 15 minutes for auto-sync or click Sync button manually

**Issue:** Agent deployment fails with ACL error
- **Solution:** Updated in latest version - uses `sudo -u frappe` instead of `become_user`

**Issue:** NGINX unknown directive errors
- **Solution:** Fixed - problematic directives automatically removed

**Issue:** Supervisor reread command fails
- **Solution:** Fixed - now uses `shell` module instead of `command`

**Issue:** Empty TLS certificates cause NGINX failure
- **Solution:** Fixed - certificates validated before NGINX config test

### Debug Mode

```bash
# Enable debug logging
bench --site bench-manager.local set-config developer_mode 1

# View logs
tail -f logs/bench-manager.local.log
```

### Support

- **Issues:** [GitHub Issues](https://github.com/amitascra/frappe_bench_manager/issues)
- **Discussions:** [GitHub Discussions](https://github.com/amitascra/frappe_bench_manager/discussions)
- **Email:** Open an issue for support requests

---

## 📊 Roadmap

### Upcoming Features

- [ ] Kubernetes deployment support
- [ ] Multi-region load balancing
- [ ] Automated backup to S3/Azure Blob
- [ ] Performance metrics dashboard
- [ ] Cost optimization recommendations
- [ ] Terraform integration
- [ ] Docker container support
- [ ] CI/CD pipeline integration

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](license.txt) file for details.

### MIT License Summary

- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use
- ❌ Liability
- ❌ Warranty

---

## 🙏 Acknowledgments

- **Frappe Technologies** - Original Bench Manager concept and Frappe Framework
- **Frappe Community** - Continuous support and feedback
- **Vue.js Team** - Modern reactive framework
- **Vite Team** - Fast build tool
- **Contributors** - All developers who have contributed to this project

---

## 📊 Project Statistics

- **Total DocTypes:** 40+
- **Frontend Pages:** 30+
- **API Endpoints:** 50+
- **Supported Cloud Providers:** 3 (AWS, Azure, GCP)
- **Frontend Framework:** Vue 3
- **Backend Framework:** Frappe v15+

---

## 📞 Contact

- **Repository:** [https://github.com/amitascra/frappe-worf-bench](https://github.com/amitascra/frappe-worf-bench)
- **Issues:** [Report a Bug](https://github.com/amitascra/frappe-worf-bench/issues/new)
- **Feature Requests:** [Request a Feature](https://github.com/amitascra/frappe-worf-bench/issues/new?labels=enhancement)
- **Company:** Worf Internet Services Private Limited
- **Email:** support@worf.cloud
- **Phone:** +91 120 492 7985

---

<div align="center">
  <p>Made with ❤️ by <a href="https://worf.cloud">Worf Internet Services Private Limited</a></p>
  <p>
    <a href="#-overview">Back to Top ↑</a>
  </p>
</div>
