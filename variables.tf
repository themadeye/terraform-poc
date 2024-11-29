variable "filename" {
  default = "localfile/cats.txt"
  type = string
  description = "The description of this variable, encourage to use"
}

variable "content" {
  default = "We love cats"
  type = string
}

variable "prefix" {
  default = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"]
  type = list(string)
}

variable "separator" {
  default = {
    "period" = "."
    "comma" = ","
  }
  type = map(string)
}

variable "length" {
  default = "1"
  type = string
}