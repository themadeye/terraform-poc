terraform {
  required_version = ">= 1.9.7"
  required_providers {
    mongodbatlas = {
      source = "mongodb/mongodbatlas"
      version = "1.26.0"
    }
  }
}

provider "mongodbatlas" {
  public_key  = var.atlas_public_key
  private_key = var.atlas_private_key
}