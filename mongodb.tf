data "mongodbatlas_roles_org_id" "org" {}

resource "mongodbatlas_project" "terraform-poc" {
  name = var.mongodb-project-name
  org_id = data.mongodbatlas_roles_org_id.org.org_id
  dynamic "teams" {
    for_each = var.mongodb-teams
    content {
      team_id    = teams.value.team_id
      role_names = teams.value.role_names
    }
  }

  dynamic "limits" {
    for_each = var.limits
    content {
      name  = limits.value.name
      value = limits.value.value
    }
  }

  with_default_alerts_settings                     = var.with_default_alerts_settings
  is_collect_database_specifics_statistics_enabled = var.is_collect_database_specifics_statistics_enabled
  is_data_explorer_enabled                         = var.is_data_explorer_enabled
  is_extended_storage_sizes_enabled                = var.is_extended_storage_sizes_enabled
  is_performance_advisor_enabled                   = var.is_performance_advisor_enabled
  is_realtime_performance_panel_enabled            = var.is_realtime_performance_panel_enabled
  is_schema_advisor_enabled                        = var.is_schema_advisor_enabled
}

resource "mongodbatlas_cluster" "poc-cluster" {
  project_id   = mongodbatlas_project.terraform-poc.id
  name         = var.mongodb-cluster-name
  mongo_db_major_version      = var.atlas_cluster_version
  provider_name               = var.atlas_cluster_provider_name
  backing_provider_name       = var.atlas_cluster_backing_provider
  provider_region_name        = var.atlas_cluster_region
  provider_instance_size_name = var.atlas_cluster_size_name
  termination_protection_enabled = true

  lifecycle {
    prevent_destroy = true
  }
}