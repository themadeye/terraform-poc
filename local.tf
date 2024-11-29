resource "local_file" "cat" {
  filename = var.filename
  content = var.content
}

resource "local_file" "pet" {
  filename = "localfile/pets.txt"
  content = "We love pets, and more"
  lifecycle {
    create_before_destroy = true
  }
}

resource "random_pet" "my_pet" {
  prefix = var.prefix[1]
  separator = var.separator["period"]
  length = var.length
}

output "pet-name" {
  value = random_pet.my_pet.id
  description = "Record the value of pet ID"
}