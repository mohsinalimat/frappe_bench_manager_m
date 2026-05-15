# -*- coding: utf-8 -*-
# Copyright (c) 2026, Frappe and contributors
# For license information, please see license.txt

import frappe

def execute():
    """Migrate Bench Settings to Bench Node Manager"""
    
    # 1. Migrate existing single record to named record
    try:
        old_settings = frappe.db.get_single("Bench Settings")
        if old_settings:
            # Create new record
            new_settings = frappe.new_doc("Bench Node Manager")
            new_settings.name = "Local Bench"
            new_settings.node_type = "Local Node"
            new_settings.node_name = "Local Bench"
            new_settings.node_id = "LOCAL-001"
            
            # Copy all existing fields
            for field in old_settings:
                if field not in ["name", "doctype", "creation", "modified", "owner", "modified_by"]:
                    # Skip git SSH keys that have been renamed
                    if field == "ssh_public_key":
                        setattr(new_settings, "ssh_public_key_git", getattr(old_settings, field))
                    elif field == "ssh_private_key":
                        setattr(new_settings, "ssh_private_key_git", getattr(old_settings, field))
                    else:
                        setattr(new_settings, field, getattr(old_settings, field))
            
            new_settings.save()
            
            # Delete old single record
            frappe.db.delete("Bench Settings", old_settings.name)
            
            frappe.db.commit()
            print("Migrated Bench Settings to Bench Node Manager: Local Bench")
    except Exception as e:
        print(f"Error migrating Bench Settings: {str(e)}")
    
    # 2. Update all Site records to link to Local Bench
    try:
        frappe.db.sql("""
            UPDATE `tabSite`
            SET bench_node = 'Local Bench'
            WHERE bench_node IS NULL OR bench_node = ''
        """)
        frappe.db.commit()
        print("Updated Site records to link to Local Bench")
    except Exception as e:
        print(f"Error updating Site records: {str(e)}")
    
    # 3. Update all App records to link to Local Bench
    try:
        frappe.db.sql("""
            UPDATE `tabApp`
            SET bench_node = 'Local Bench'
            WHERE bench_node IS NULL OR bench_node = ''
        """)
        frappe.db.commit()
        print("Updated App records to link to Local Bench")
    except Exception as e:
        print(f"Error updating App records: {str(e)}")
    
    # 4. Update all Site Backup records to link to Local Bench
    try:
        frappe.db.sql("""
            UPDATE `tabSite Backup`
            SET bench_node = 'Local Bench'
            WHERE bench_node IS NULL OR bench_node = ''
        """)
        frappe.db.commit()
        print("Updated Site Backup records to link to Local Bench")
    except Exception as e:
        print(f"Error updating Site Backup records: {str(e)}")
    
    # 5. Update all Bench Manager Command records to link to Local Bench
    try:
        frappe.db.sql("""
            UPDATE `tabBench Manager Command`
            SET bench_node = 'Local Bench'
            WHERE bench_node IS NULL OR bench_node = ''
        """)
        frappe.db.commit()
        print("Updated Bench Manager Command records to link to Local Bench")
    except Exception as e:
        print(f"Error updating Bench Manager Command records: {str(e)}")
    
    # 6. Update workspace references
    try:
        workspace = frappe.get_doc("Workspace", "Bench Manager")
        for link in workspace.links:
            if link.link_to == "Bench Settings":
                link.link_to = "Bench Node Manager"
        workspace.save()
        frappe.db.commit()
        print("Updated Workspace references")
    except Exception as e:
        print(f"Error updating Workspace: {str(e)}")
    
    print("Migration completed successfully")
