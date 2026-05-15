# Bench Node Manager Migration

This document describes the migration from `Bench Settings` to `Bench Node Manager` to support both local and remote bench management.

## Changes Made

### 1. New Doctype: Bench Node Manager
- Renamed from `Bench Settings` to `Bench Node Manager`
- Changed from Single DocType to regular DocType (allows multiple records)
- Added `node_type` field: "Local Node" or "Remote Node"
- Added `node_name` and `node_id` fields for identification
- Added remote-specific fields for SSH-based management:
  - `server_ip`: Remote server IP/hostname
  - `ssh_user`: SSH username
  - `ssh_port`: SSH port (default 22)
  - `ssh_auth_method`: "Private Key" or "Password"
  - `ssh_private_key`: SSH private key for authentication
  - `ssh_public_key`: SSH public key (read-only)
  - `ssh_password`: SSH password (alternative to private key)
  - `bench_path`: Path to bench on remote server
  - `connection_status`: Connection status (Connected/Disconnected/Error)
  - `last_sync`: Last sync timestamp

### 2. Site Doctype Updates
- Renamed `bench_settings` field to `bench_node`
- Changed field type from Data to Link
- Added default value: "Local Bench"
- Links sites to their respective bench nodes

### 3. New Python Methods
- `autoname()`: Auto-generates name and node_id
- `validate()`: Validates remote node configuration
- `_get_ssh_connection()`: Establishes SSH connection
- `generate_ssh_key_pair()`: Generates SSH key pairs for remote authentication
- `discover_benches()`: Auto-discovers benches on remote server
- `test_connection()`: Tests SSH connection and verifies bench
- `execute_remote_command()`: Executes commands on remote bench via SSH
- `sync_remote_sites()`: Syncs sites from remote bench

### 4. JavaScript Updates
- Added remote node button handlers
- Added bench discovery dialog
- Added SSH key generation button
- Added test connection button
- Added sync sites button

### 5. Dependencies
- Added `paramiko>=3.0.0` for SSH connections
- Added `rsa>=4.9` for SSH key generation

### 6. Workspace Updates
- Updated workspace references from "Bench Settings" to "Bench Node Manager"
- Updated shortcuts and links

## Migration Steps

### 1. Run the Migration Script
```bash
bench migrate
```

Or run the migration manually:
```bash
bench --site [site-name] migrate
```

The migration script will:
- Migrate existing Bench Settings single record to "Local Bench"
- Update all Site records to link to "Local Bench"
- Update workspace references

### 2. Install New Dependencies
```bash
bench setup requirements
```

### 3. Restart Bench
```bash
bench restart
```

## Usage

### Local Node (Existing Functionality)
All existing functionality remains unchanged for the local bench node:
- Site creation
- App management
- Backup operations
- GitHub integration
- SSH key generation for git

### Remote Node (New Functionality)

#### Setting up a Remote Node

1. Create a new Bench Node Manager record
2. Set `node_type` to "Remote Node"
3. Enter server details:
   - Server IP/Hostname
   - SSH User
   - SSH Port (default 22)
4. Choose authentication method:
   - **Private Key (Recommended)**:
     - Click "Generate SSH Key Pair"
     - Copy the public key
     - Add it to remote server's `~/.ssh/authorized_keys`
   - **Password**:
     - Enter SSH password
5. Click "Discover Benches" to auto-detect bench path, or enter manually
6. Click "Test Connection" to verify SSH connection and bench path

#### Managing Remote Sites

1. Click "Sync Sites" to import sites from remote bench
2. Sites will appear in Site list with `bench_node` set to remote node
3. Site operations will route through SSH for remote benches

## Architecture

```
Bench Manager Site
├── Local Node (Bench Node Manager)
│   ├── Uses subprocess for local commands
│   ├── Syncs sites from local filesystem
│   └── All existing functionality preserved
│
└── Remote Nodes (Bench Node Manager)
    ├── SSH-based communication
    ├── Paramiko for SSH connections
    ├── Agent-less design (no additional services needed)
    ├── Bench discovery
    └── Remote command execution
```

## Security Considerations

- SSH private keys are stored encrypted in the database
- Public keys are shown for adding to remote servers
- Supports both key-based and password authentication
- Key-based authentication is recommended for production
- Connection status tracking for monitoring

## Troubleshooting

### SSH Connection Fails
- Verify server IP is accessible
- Check SSH port (default 22) is open
- Verify SSH credentials
- Check firewall settings on remote server

### Bench Discovery Fails
- Ensure bench path is correct
- Verify user has read permissions on bench directory
- Check that bench is a valid Frappe bench (contains apps.txt and bench file)

### Remote Commands Fail
- Verify bench path is correct
- Check user has sudo permissions for commands requiring it
- Ensure bench CLI is available on remote server

## Future Enhancements

- Add support for multiple SSH keys
- Implement SSH tunneling for secure communication
- Add remote bench metrics monitoring
- Support for Docker-based remote benches
- Batch operations across multiple remote nodes
